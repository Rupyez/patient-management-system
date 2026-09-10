import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import type {
  Appointment,
  AppointmentFormValues,
  SortColumn,
  SortDirection,
  WaitlistEntry,
  WaitlistFormValues,
} from "../types/appointment";
import { doctors, emptyForm, statusOptions, typeOptions } from "../constants/appointment";
import StatCard from "../components/StatCard";
import { Modal } from "../components/Modal";
import { FormSelect } from "../components/FormSelect";
import { FormInput } from "../components/FormInput";
import { StatusBadge, StatusMenu } from "../components/StatusMenu";
import { ActionsMenu } from "../components/ActionMenu";
import { AnalyticsPanel } from "../components/AnalyticsPanel";
import { WaitlistPanel } from "../components/WaitListPanel";
import { ToastStack, useToasts } from "../components/Toast";
import { getAvatarStyle, getInitials } from "../utils/appointment";
import { addDays, formatDate, isPastDateTime } from "../utils/date";
import { exportAppointmentsToCsv } from "../utils/csv";
import { useLocalStorage } from "../hooks/useStorage";

const TODAY = "2026-08-09";
const PAGE_SIZE = 6;

function generateId(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}

function validateForm(values: AppointmentFormValues) {
  const errors: Partial<Record<keyof AppointmentFormValues, string>> = {};
  if (!values.patientName.trim()) errors.patientName = "Patient name is required";
  if (!values.patientId.trim()) errors.patientId = "Patient ID is required";
  if (!values.patientPhone.trim()) errors.patientPhone = "Phone number is required";
  if (!values.date) errors.date = "Date is required";
  if (!values.time) errors.time = "Time is required";
  return errors;
}

function validateWaitlistForm(values: WaitlistFormValues) {
  const errors: Partial<Record<keyof WaitlistFormValues, string>> = {};
  if (!values.patientName.trim()) errors.patientName = "Patient name is required";
  if (!values.patientPhone.trim()) errors.patientPhone = "Phone number is required";
  if (!values.preferredDate) errors.preferredDate = "Preferred date is required";
  return errors;
}

export default function AppointmentPage() {
  // Persisted state — survives a page refresh via localStorage.
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>("clinic:appointments", []);
  const [waitlist, setWaitlist] = useLocalStorage<WaitlistEntry[]>("clinic:waitlist", []);

  const { toasts, showToast, dismiss } = useToasts();

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [doctorFilter, setDoctorFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // Sorting
  const [sortColumn, setSortColumn] = useState<SortColumn>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Bulk selection (desktop table only)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modals
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const [bulkCancelMode, setBulkCancelMode] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<AppointmentFormValues>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof AppointmentFormValues, string>>>({});
  const [cancelReason, setCancelReason] = useState("Patient requested cancellation");

  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [occurrences, setOccurrences] = useState(4);
  const [attachmentDraft, setAttachmentDraft] = useState("");

  const [waitlistForm, setWaitlistForm] = useState<WaitlistFormValues>({
    patientName: "",
    patientPhone: "",
    doctorName: doctors[0],
    preferredDate: "",
    notes: "",
  });
  const [waitlistErrors, setWaitlistErrors] = useState<
    Partial<Record<keyof WaitlistFormValues, string>>
  >({});

  const [page, setPage] = useState(1);

  // ---------- Derived data ----------

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      today: appointments.filter((a) => a.date === TODAY).length,
      scheduled: appointments.filter((a) => a.status === "Scheduled").length,
      confirmed: appointments.filter((a) => a.status === "Confirmed").length,
      checkedIn: appointments.filter((a) => a.status === "Checked-In").length,
      completed: appointments.filter((a) => a.status === "Completed").length,
    };
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const query = search.toLowerCase().trim();

    const filtered = appointments.filter((appointment) => {
      const matchesSearch =
        !query ||
        appointment.id.toLowerCase().includes(query) ||
        appointment.patientName.toLowerCase().includes(query) ||
        appointment.patientId.toLowerCase().includes(query) ||
        appointment.patientPhone.toLowerCase().includes(query) ||
        appointment.doctorName.toLowerCase().includes(query);

      const matchesStatus = statusFilter === "All" || appointment.status === statusFilter;
      const matchesType = typeFilter === "All" || appointment.type === typeFilter;
      const matchesDoctor = doctorFilter === "All" || appointment.doctorName === doctorFilter;
      const matchesDate = !dateFilter || appointment.date === dateFilter;

      return matchesSearch && matchesStatus && matchesType && matchesDoctor && matchesDate;
    });

    const sorted = [...filtered].sort((a, b) => {
      let compare = 0;
      if (sortColumn === "date") {
        compare = `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
      } else {
        compare = a[sortColumn].localeCompare(b[sortColumn]);
      }
      return sortDirection === "asc" ? compare : -compare;
    });

    return sorted;
  }, [appointments, search, statusFilter, typeFilter, doctorFilter, dateFilter, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const hasActiveFilters =
    search !== "" ||
    statusFilter !== "All" ||
    typeFilter !== "All" ||
    doctorFilter !== "All" ||
    dateFilter !== "";

  const overdueCount = useMemo(
    () =>
      appointments.filter(
        (a) => (a.status === "Scheduled" || a.status === "Confirmed") && isPastDateTime(a.date, a.time)
      ).length,
    [appointments]
  );

  // ---------- Filter & sort handlers ----------

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setDoctorFilter("All");
    setDateFilter("");
    setPage(1);
  }

  function toggleSort(column: SortColumn) {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  function sortIndicator(column: SortColumn) {
    if (sortColumn !== column) return null;
    return <span className="ml-1 text-slate-400">{sortDirection === "asc" ? "▲" : "▼"}</span>;
  }

  // ---------- Selection / bulk actions ----------

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAllOnPage() {
    const pageIds = paginatedAppointments.map((a) => a.id);
    const allSelected = pageIds.every((id) => selectedIds.has(id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      pageIds.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
      return next;
    });
  }

  function bulkCancel() {
    const targetIds = new Set(selectedIds);
    const previousStatuses = appointments
      .filter((a) => targetIds.has(a.id))
      .map((a) => ({ id: a.id, status: a.status }));

    setAppointments((prev) =>
      prev.map((a) =>
        targetIds.has(a.id) && a.status !== "Cancelled"
          ? { ...a, status: "Cancelled", cancelReason: "Cancelled via bulk action" }
          : a
      )
    );
    setSelectedIds(new Set());
    setBulkCancelMode(false);

    showToast(`Cancelled ${targetIds.size} appointment${targetIds.size === 1 ? "" : "s"}`, "danger", () => {
      setAppointments((prev) =>
        prev.map((a) => {
          const original = previousStatuses.find((p) => p.id === a.id);
          return original ? { ...a, status: original.status, cancelReason: undefined } : a;
        })
      );
    });
  }

  // ---------- No-show detection ----------

  function flagOverdueAsNoShow() {
    let flagged = 0;
    setAppointments((prev) =>
      prev.map((a) => {
        if ((a.status === "Scheduled" || a.status === "Confirmed") && isPastDateTime(a.date, a.time)) {
          flagged += 1;
          return { ...a, status: "No-Show" };
        }
        return a;
      })
    );
    if (flagged > 0) {
      showToast(`Marked ${flagged} overdue appointment${flagged === 1 ? "" : "s"} as No-Show`, "info");
    }
  }

  // ---------- CSV export ----------

  function handleExportCsv() {
    exportAppointmentsToCsv(filteredAppointments, "appointments.csv");
    showToast(`Exported ${filteredAppointments.length} appointment${filteredAppointments.length === 1 ? "" : "s"} to CSV`, "success");
  }

  // ---------- Form (create / edit) handlers ----------

  function openCreateForm(prefill?: Partial<AppointmentFormValues>) {
    setEditingId(null);
    setForm({ ...emptyForm, ...prefill });
    setFormErrors({});
    setRepeatWeekly(false);
    setOccurrences(4);
    setAttachmentDraft("");
    setShowForm(true);
  }

  function openEditForm(appointment: Appointment) {
    setEditingId(appointment.id);
    setForm({
      patientName: appointment.patientName,
      patientId: appointment.patientId,
      patientPhone: appointment.patientPhone,
      doctorName: appointment.doctorName,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes ?? "",
      attachments: appointment.attachments ?? [],
    });
    setFormErrors({});
    setRepeatWeekly(false);
    setAttachmentDraft("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormErrors({});
  }

  function handleFormChange<K extends keyof AppointmentFormValues>(
    field: K,
    value: AppointmentFormValues[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function addAttachment() {
    const name = attachmentDraft.trim();
    if (!name) return;
    handleFormChange("attachments", [...form.attachments, name]);
    setAttachmentDraft("");
  }

  function removeAttachment(index: number) {
    handleFormChange(
      "attachments",
      form.attachments.filter((_, i) => i !== index)
    );
  }

  function saveAppointment() {
    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingId) {
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === editingId ? { ...appointment, ...form } : appointment
        )
      );
      showToast("Appointment updated", "success");
    } else if (repeatWeekly && occurrences > 1) {
      const newAppointments: Appointment[] = Array.from({ length: occurrences }, (_, i) => ({
        ...form,
        id: generateId("APT"),
        date: addDays(form.date, i * 7),
        createdAt: new Date().toISOString(),
      }));
      setAppointments((prev) => [...newAppointments, ...prev]);
      showToast(`Created ${occurrences} recurring appointments`, "success");
    } else {
      const newAppointment: Appointment = {
        ...form,
        id: generateId("APT"),
        createdAt: new Date().toISOString(),
      };
      setAppointments((prev) => [newAppointment, ...prev]);
      showToast("Appointment created", "success");
    }

    closeForm();
  }

  // ---------- Details modal ----------

  function openDetails(appointment: Appointment) {
    setSelectedAppointment(appointment);
    setShowDetails(true);
  }

  function closeDetails() {
    setShowDetails(false);
    setSelectedAppointment(null);
  }

  const patientHistory = useMemo(() => {
    if (!selectedAppointment) return [];
    return appointments
      .filter((a) => a.patientId === selectedAppointment.patientId && a.id !== selectedAppointment.id)
      .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));
  }, [appointments, selectedAppointment]);

  // ---------- Cancel modal ----------

  function openCancel(appointment: Appointment) {
    setSelectedAppointment(appointment);
    setCancelReason("Patient requested cancellation");
    setShowCancel(true);
  }

  function closeCancel() {
    setShowCancel(false);
    setSelectedAppointment(null);
  }

  function confirmCancel() {
    if (!selectedAppointment) return;
    const previousStatus = selectedAppointment.status;
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === selectedAppointment.id
          ? { ...appointment, status: "Cancelled", cancelReason }
          : appointment
      )
    );
    closeCancel();
    showToast("Appointment cancelled", "danger", () => {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedAppointment.id ? { ...a, status: previousStatus, cancelReason: undefined } : a
        )
      );
    });
  }

  // ---------- Inline status change ----------

  function handleStatusChange(appointment: Appointment, nextStatus: Appointment["status"]) {
    if (nextStatus === "Cancelled") {
      openCancel(appointment);
      return;
    }
    setAppointments((prev) =>
      prev.map((item) => (item.id === appointment.id ? { ...item, status: nextStatus } : item))
    );
    showToast(`Marked as ${nextStatus}`, "success");
  }

  // ---------- Waitlist ----------

  function openWaitlistForm() {
    setWaitlistForm({
      patientName: "",
      patientPhone: "",
      doctorName: doctors[0],
      preferredDate: "",
      notes: "",
    });
    setWaitlistErrors({});
    setShowWaitlistForm(true);
  }

  function saveWaitlistEntry() {
    const errors = validateWaitlistForm(waitlistForm);
    if (Object.keys(errors).length > 0) {
      setWaitlistErrors(errors);
      return;
    }
    const entry: WaitlistEntry = {
      ...waitlistForm,
      id: generateId("WL"),
      createdAt: new Date().toISOString(),
    };
    setWaitlist((prev) => [entry, ...prev]);
    setShowWaitlistForm(false);
    showToast("Added to waitlist", "success");
  }

  function removeWaitlistEntry(id: string) {
    setWaitlist((prev) => prev.filter((entry) => entry.id !== id));
  }

  function promoteWaitlistEntry(entry: WaitlistEntry) {
    removeWaitlistEntry(entry.id);
    openCreateForm({
      patientName: entry.patientName,
      patientPhone: entry.patientPhone,
      doctorName: entry.doctorName,
      date: entry.preferredDate,
      notes: entry.notes,
    });
  }

  // ---------- Render ----------

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <span>Clinic Management</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">Appointments</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Appointments
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage patient appointments, schedules, check-ins, and consultations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportCsv}
              disabled={filteredAppointments.length === 0}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => openCreateForm()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <span className="text-lg leading-none">+</span>
              New Appointment
            </button>
          </div>
        </div>

        {overdueCount > 0 && (
          <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-sm text-amber-800">
              {overdueCount} appointment{overdueCount === 1 ? " is" : "s are"} past its scheduled time and still marked
              Scheduled or Confirmed.
            </p>
            <button
              type="button"
              onClick={flagOverdueAsNoShow}
              className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-100"
            >
              Mark as No-Show
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard title="Total" value={stats.total} icon="📅" />
          <StatCard title="Today" value={stats.today} icon="🗓️" />
          <StatCard title="Scheduled" value={stats.scheduled} icon="⏱️" />
          <StatCard title="Confirmed" value={stats.confirmed} icon="✓" />
          <StatCard title="Checked-In" value={stats.checkedIn} icon="👤" />
          <StatCard title="Completed" value={stats.completed} icon="✓" />
        </div>

        <AnalyticsPanel appointments={appointments} />

        <WaitlistPanel
          entries={waitlist}
          onAdd={openWaitlistForm}
          onPromote={promoteWaitlistEntry}
          onRemove={removeWaitlistEntry}
        />

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Filters */}
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <SearchIcon size={18} />
                  </span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search patient, appointment, doctor, phone..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Clear Filters
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <FormSelect
                  label="Status"
                  value={statusFilter}
                  options={["All", ...statusOptions]}
                  onChange={(val) => {
                    setStatusFilter(val);
                    setPage(1);
                  }}
                />
                <FormSelect
                  label="Type"
                  value={typeFilter}
                  options={["All", ...typeOptions]}
                  onChange={(val) => {
                    setTypeFilter(val);
                    setPage(1);
                  }}
                />
                <FormSelect
                  label="Doctor"
                  value={doctorFilter}
                  options={["All", ...doctors]}
                  onChange={(val) => {
                    setDoctorFilter(val);
                    setPage(1);
                  }}
                />
                <FormInput
                  label="Date"
                  type="date"
                  value={dateFilter}
                  onChange={(val) => {
                    setDateFilter(val);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bulk actions bar */}
          {selectedIds.size > 0 && (
            <div className="flex items-center justify-between gap-3 border-b border-blue-100 bg-blue-50 px-5 py-3 text-sm">
              <span className="font-medium text-blue-800">{selectedIds.size} selected</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setBulkCancelMode(true)}
                  className="rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Cancel selected
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIds(new Set())}
                  className="text-xs font-medium text-blue-700 hover:text-blue-900"
                >
                  Clear selection
                </button>
              </div>
            </div>
          )}

          {/* Appointment list */}
          {filteredAppointments.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
              <span className="text-3xl">📭</span>
              <p className="text-sm font-medium text-slate-700">
                {appointments.length === 0
                  ? "No appointments yet"
                  : "No appointments match your filters"}
              </p>
              <p className="text-sm text-slate-400">
                {appointments.length === 0
                  ? "Create your first appointment to get started."
                  : "Try adjusting or clearing your filters."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop / tablet table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                      <th className="w-10 px-5 py-3">
                        <input
                          type="checkbox"
                          checked={
                            paginatedAppointments.length > 0 &&
                            paginatedAppointments.every((a) => selectedIds.has(a.id))
                          }
                          onChange={toggleSelectAllOnPage}
                          aria-label="Select all on page"
                        />
                      </th>
                      <th className="px-5 py-3 font-medium">
                        <button type="button" onClick={() => toggleSort("patientName")} className="hover:text-slate-600">
                          Patient{sortIndicator("patientName")}
                        </button>
                      </th>
                      <th className="px-5 py-3 font-medium">
                        <button type="button" onClick={() => toggleSort("doctorName")} className="hover:text-slate-600">
                          Doctor{sortIndicator("doctorName")}
                        </button>
                      </th>
                      <th className="px-5 py-3 font-medium">
                        <button type="button" onClick={() => toggleSort("date")} className="hover:text-slate-600">
                          Date &amp; Time{sortIndicator("date")}
                        </button>
                      </th>
                      <th className="px-5 py-3 font-medium">Type</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedAppointments.map((appointment) => (
                      <tr key={appointment.id} className="transition hover:bg-slate-50">
                        <td className="px-5 py-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(appointment.id)}
                            onChange={() => toggleSelect(appointment.id)}
                            aria-label={`Select ${appointment.patientName}`}
                          />
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => openDetails(appointment)}
                            className="flex items-center gap-3 text-left"
                          >
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${getAvatarStyle(
                                appointment.patientName
                              )}`}
                            >
                              {getInitials(appointment.patientName)}
                            </span>
                            <span>
                              <p className="font-medium text-slate-900 hover:text-blue-600">
                                {appointment.patientName}
                              </p>
                              <p className="text-xs text-slate-400">{appointment.patientId}</p>
                            </span>
                          </button>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{appointment.doctorName}</td>
                        <td className="px-5 py-4 text-slate-600">
                          {formatDate(appointment.date)}
                          <span className="text-slate-400"> · {appointment.time}</span>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{appointment.type}</td>
                        <td className="px-5 py-4">
                          <StatusMenu
                            status={appointment.status}
                            onChange={(next) => handleStatusChange(appointment, next)}
                          />
                        </td>
                        <td className="px-5 py-4 text-right">
                          <ActionsMenu
                            onView={() => openDetails(appointment)}
                            onEdit={() => openEditForm(appointment)}
                            onCancel={() => openCancel(appointment)}
                            cancelDisabled={appointment.status === "Cancelled"}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="divide-y divide-slate-100 md:hidden">
                {paginatedAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex flex-col gap-3 px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => openDetails(appointment)}
                        className="flex items-center gap-3 text-left"
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${getAvatarStyle(
                            appointment.patientName
                          )}`}
                        >
                          {getInitials(appointment.patientName)}
                        </span>
                        <span>
                          <p className="font-medium text-slate-900">{appointment.patientName}</p>
                          <p className="text-xs text-slate-400">{appointment.patientId}</p>
                        </span>
                      </button>
                      <ActionsMenu
                        onView={() => openDetails(appointment)}
                        onEdit={() => openEditForm(appointment)}
                        onCancel={() => openCancel(appointment)}
                        cancelDisabled={appointment.status === "Cancelled"}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-y-1.5 pl-12 text-xs text-slate-500">
                      <span>{appointment.doctorName}</span>
                      <span className="text-right">{appointment.type}</span>
                      <span>
                        {formatDate(appointment.date)} · {appointment.time}
                      </span>
                      <span className="flex justify-end">
                        <StatusMenu
                          status={appointment.status}
                          onChange={(next) => handleStatusChange(appointment, next)}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row">
                <p className="text-xs text-slate-400">
                  Showing {(currentPage - 1) * PAGE_SIZE + 1}
                  {"–"}
                  {Math.min(currentPage * PAGE_SIZE, filteredAppointments.length)} of{" "}
                  {filteredAppointments.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-slate-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create / Edit modal */}
      <Modal
        open={showForm}
        onClose={closeForm}
        title={editingId ? "Edit Appointment" : "New Appointment"}
        footer={
          <>
            <button
              type="button"
              onClick={closeForm}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveAppointment}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {editingId ? "Save Changes" : "Create Appointment"}
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <FormInput
              label="Patient Name"
              value={form.patientName}
              onChange={(val) => handleFormChange("patientName", val)}
              placeholder="Jane Doe"
              required
              error={formErrors.patientName}
            />
            <FormInput
              label="Patient ID"
              value={form.patientId}
              onChange={(val) => handleFormChange("patientId", val)}
              placeholder="PT-00123"
              required
              error={formErrors.patientId}
            />
          </div>

          <FormInput
            label="Phone Number"
            value={form.patientPhone}
            onChange={(val) => handleFormChange("patientPhone", val)}
            placeholder="(555) 123-4567"
            required
            error={formErrors.patientPhone}
          />

          <FormSelect
            label="Doctor"
            value={form.doctorName}
            options={doctors}
            onChange={(val) => handleFormChange("doctorName", val)}
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <FormInput
              label="Date"
              type="date"
              value={form.date}
              onChange={(val) => handleFormChange("date", val)}
              required
              error={formErrors.date}
            />
            <FormInput
              label="Time"
              type="time"
              value={form.time}
              onChange={(val) => handleFormChange("time", val)}
              required
              error={formErrors.time}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <FormSelect
              label="Type"
              value={form.type}
              options={typeOptions}
              onChange={(val) => handleFormChange("type", val as AppointmentFormValues["type"])}
            />
            <FormSelect
              label="Status"
              value={form.status}
              options={statusOptions}
              onChange={(val) => handleFormChange("status", val as AppointmentFormValues["status"])}
            />
          </div>

          {!editingId && (
            <div className="rounded-xl border border-slate-200 p-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={repeatWeekly}
                  onChange={(e) => setRepeatWeekly(e.target.checked)}
                />
                Repeat weekly
              </label>
              {repeatWeekly && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-slate-500">Number of occurrences</span>
                  <input
                    type="number"
                    min={2}
                    max={26}
                    value={occurrences}
                    onChange={(e) => setOccurrences(Number(e.target.value))}
                    className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-sm"
                  />
                </div>
              )}
            </div>
          )}

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-slate-700">Notes</span>
            <textarea
              value={form.notes}
              onChange={(e) => handleFormChange("notes", e.target.value)}
              placeholder="Reason for visit, special instructions, etc."
              rows={3}
              className="resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <div>
            <span className="text-sm font-medium text-slate-700">Attachments</span>
            <p className="mb-2 text-xs text-slate-400">
              File names only — hook this up to real file storage before relying on it in production.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={attachmentDraft}
                onChange={(e) => setAttachmentDraft(e.target.value)}
                placeholder="e.g. lab-results.pdf"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={addAttachment}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Add
              </button>
            </div>
            {form.attachments.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1">
                {form.attachments.map((name, index) => (
                  <li key={`${name}-${index}`} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
                    {name}
                    <button type="button" onClick={() => removeAttachment(index)} className="text-slate-400 hover:text-rose-500">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Modal>

      {/* Details modal */}
      <Modal open={showDetails} onClose={closeDetails} title="Appointment Details" size="sm">
        {selectedAppointment && (
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {selectedAppointment.id}
              </span>
              <StatusBadge status={selectedAppointment.status} />
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <dt className="text-xs text-slate-400">Patient</dt>
                <dd className="font-medium text-slate-900">{selectedAppointment.patientName}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Patient ID</dt>
                <dd className="font-medium text-slate-900">{selectedAppointment.patientId}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Phone</dt>
                <dd className="font-medium text-slate-900">{selectedAppointment.patientPhone}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Doctor</dt>
                <dd className="font-medium text-slate-900">{selectedAppointment.doctorName}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Date</dt>
                <dd className="font-medium text-slate-900">
                  {formatDate(selectedAppointment.date)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Time</dt>
                <dd className="font-medium text-slate-900">{selectedAppointment.time}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Type</dt>
                <dd className="font-medium text-slate-900">{selectedAppointment.type}</dd>
              </div>
            </dl>

            {selectedAppointment.notes && (
              <div>
                <dt className="text-xs text-slate-400">Notes</dt>
                <dd className="mt-1 text-slate-700">{selectedAppointment.notes}</dd>
              </div>
            )}

            {selectedAppointment.attachments.length > 0 && (
              <div>
                <dt className="text-xs text-slate-400">Attachments</dt>
                <dd className="mt-1 flex flex-col gap-1">
                  {selectedAppointment.attachments.map((name) => (
                    <span key={name} className="text-slate-700">
                      📎 {name}
                    </span>
                  ))}
                </dd>
              </div>
            )}

            {selectedAppointment.cancelReason && (
              <div className="rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-600">
                Cancelled — {selectedAppointment.cancelReason}
              </div>
            )}

            {patientHistory.length > 0 && (
              <div>
                <dt className="mb-1 text-xs text-slate-400">Other appointments for this patient</dt>
                <dd className="flex flex-col gap-1.5">
                  {patientHistory.map((h) => (
                    <div key={h.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs">
                      <span className="text-slate-600">
                        {formatDate(h.date)} · {h.type}
                      </span>
                      <StatusBadge status={h.status} />
                    </div>
                  ))}
                </dd>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Cancel confirmation modal (used for single and bulk cancel) */}
      <Modal
        open={showCancel || bulkCancelMode}
        onClose={() => {
          closeCancel();
          setBulkCancelMode(false);
        }}
        title={bulkCancelMode ? `Cancel ${selectedIds.size} Appointments` : "Cancel Appointment"}
        size="sm"
        footer={
          <>
            <button
              type="button"
              onClick={() => {
                closeCancel();
                setBulkCancelMode(false);
              }}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Keep Appointment{bulkCancelMode ? "s" : ""}
            </button>
            <button
              type="button"
              onClick={bulkCancelMode ? bulkCancel : confirmCancel}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Confirm Cancellation
            </button>
          </>
        }
      >
        {bulkCancelMode ? (
          <p className="text-sm text-slate-600">
            You're about to cancel <span className="font-medium text-slate-900">{selectedIds.size}</span> selected
            appointments. This can be undone from the toast right after.
          </p>
        ) : (
          selectedAppointment && (
            <div className="flex flex-col gap-4 text-sm">
              <p className="text-slate-600">
                You're about to cancel the appointment for{" "}
                <span className="font-medium text-slate-900">{selectedAppointment.patientName}</span> on{" "}
                {formatDate(selectedAppointment.date)} at {selectedAppointment.time}.
              </p>
              <label className="flex flex-col gap-1.5">
                <span className="font-medium text-slate-700">Reason</span>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={3}
                  className="resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>
          )
        )}
      </Modal>

      {/* Waitlist add modal */}
      <Modal
        open={showWaitlistForm}
        onClose={() => setShowWaitlistForm(false)}
        title="Add to Waitlist"
        size="sm"
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowWaitlistForm(false)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveWaitlistEntry}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add to Waitlist
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <FormInput
            label="Patient Name"
            value={waitlistForm.patientName}
            onChange={(val) => setWaitlistForm((prev) => ({ ...prev, patientName: val }))}
            required
            error={waitlistErrors.patientName}
          />
          <FormInput
            label="Phone Number"
            value={waitlistForm.patientPhone}
            onChange={(val) => setWaitlistForm((prev) => ({ ...prev, patientPhone: val }))}
            required
            error={waitlistErrors.patientPhone}
          />
          <FormSelect
            label="Preferred Doctor"
            value={waitlistForm.doctorName}
            options={doctors}
            onChange={(val) => setWaitlistForm((prev) => ({ ...prev, doctorName: val }))}
          />
          <FormInput
            label="Preferred Date"
            type="date"
            value={waitlistForm.preferredDate}
            onChange={(val) => setWaitlistForm((prev) => ({ ...prev, preferredDate: val }))}
            required
            error={waitlistErrors.preferredDate}
          />
        </div>
      </Modal>

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}