

import { useMemo, useState } from "react";

type AppointmentStatus =
  | "Scheduled"
  | "Confirmed"
  | "Checked-In"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "No-Show";

type AppointmentType =
  | "Consultation"
  | "Follow-up"
  | "Diagnostic"
  | "Procedure"
  | "Other";

type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes: string;
};

const initialAppointments: Appointment[] = [
  {
    id: "APT-1001",
    patientId: "PAT-001",
    patientName: "John Smith",
    patientPhone: "(703) 555-1001",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Radiology",
    date: "2026-08-09",
    time: "08:30",
    duration: 30,
    type: "Consultation",
    status: "Confirmed",
    reason: "Initial consultation",
    notes: "Patient requested morning appointment.",
  },
  {
    id: "APT-1002",
    patientId: "PAT-002",
    patientName: "Emily Davis",
    patientPhone: "(703) 555-1002",
    doctorName: "Dr. Michael Brown",
    specialty: "Cardiology",
    date: "2026-08-09",
    time: "09:00",
    duration: 30,
    type: "Follow-up",
    status: "Checked-In",
    reason: "Follow-up consultation",
    notes: "Review previous report.",
  },
  {
    id: "APT-1003",
    patientId: "PAT-003",
    patientName: "Robert Wilson",
    patientPhone: "(703) 555-1003",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Radiology",
    date: "2026-08-09",
    time: "09:30",
    duration: 45,
    type: "Diagnostic",
    status: "Scheduled",
    reason: "Diagnostic imaging",
    notes: "",
  },
  {
    id: "APT-1004",
    patientId: "PAT-004",
    patientName: "Jessica Miller",
    patientPhone: "(703) 555-1004",
    doctorName: "Dr. David Lee",
    specialty: "Neurology",
    date: "2026-08-09",
    time: "10:00",
    duration: 30,
    type: "Consultation",
    status: "Completed",
    reason: "Neurology consultation",
    notes: "Consultation completed.",
  },
  {
    id: "APT-1005",
    patientId: "PAT-005",
    patientName: "Daniel Anderson",
    patientPhone: "(703) 555-1005",
    doctorName: "Dr. Michael Brown",
    specialty: "Cardiology",
    date: "2026-08-09",
    time: "10:30",
    duration: 30,
    type: "Follow-up",
    status: "Cancelled",
    reason: "Follow-up visit",
    notes: "Patient requested cancellation.",
  },
  {
    id: "APT-1006",
    patientId: "PAT-006",
    patientName: "Sophia Martinez",
    patientPhone: "(703) 555-1006",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Radiology",
    date: "2026-08-10",
    time: "08:00",
    duration: 30,
    type: "Consultation",
    status: "Confirmed",
    reason: "Consultation",
    notes: "",
  },
  {
    id: "APT-1007",
    patientId: "PAT-007",
    patientName: "James Taylor",
    patientPhone: "(703) 555-1007",
    doctorName: "Dr. David Lee",
    specialty: "Neurology",
    date: "2026-08-10",
    time: "09:30",
    duration: 30,
    type: "Diagnostic",
    status: "No-Show",
    reason: "Diagnostic appointment",
    notes: "Patient did not arrive.",
  },
  {
    id: "APT-1008",
    patientId: "PAT-008",
    patientName: "Olivia Thomas",
    patientPhone: "(703) 555-1008",
    doctorName: "Dr. Michael Brown",
    specialty: "Cardiology",
    date: "2026-08-11",
    time: "11:00",
    duration: 30,
    type: "Procedure",
    status: "Scheduled",
    reason: "Scheduled procedure",
    notes: "",
  },
];

const statusOptions: AppointmentStatus[] = [
  "Scheduled",
  "Confirmed",
  "Checked-In",
  "In Progress",
  "Completed",
  "Cancelled",
  "No-Show",
];

const typeOptions: AppointmentType[] = [
  "Consultation",
  "Follow-up",
  "Diagnostic",
  "Procedure",
  "Other",
];

const doctors = [
  "Dr. Sarah Johnson",
  "Dr. Michael Brown",
  "Dr. David Lee",
];

const emptyForm = {
  patientName: "",
  patientId: "",
  patientPhone: "",
  doctorName: doctors[0],
  specialty: "Radiology",
  date: "2026-08-09",
  time: "09:00",
  duration: "30",
  type: "Consultation" as AppointmentType,
  status: "Scheduled" as AppointmentStatus,
  reason: "",
  notes: "",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function statusClasses(status: AppointmentStatus) {
  switch (status) {
    case "Confirmed":
      return "bg-blue-50 text-blue-700 ring-blue-200";
    case "Scheduled":
      return "bg-slate-50 text-slate-700 ring-slate-200";
    case "Checked-In":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    case "In Progress":
      return "bg-violet-50 text-violet-700 ring-violet-200";
    case "Completed":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "Cancelled":
      return "bg-red-50 text-red-700 ring-red-200";
    case "No-Show":
      return "bg-orange-50 text-orange-700 ring-orange-200";
    default:
      return "bg-slate-50 text-slate-700 ring-slate-200";
  }
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClasses(
        status,
      )}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function AppointmentPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [doctorFilter, setDoctorFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);

  const [cancelReason, setCancelReason] = useState(
    "Patient requested cancellation",
  );

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const today = "2026-08-09";

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      today: appointments.filter((a) => a.date === today).length,
      scheduled: appointments.filter((a) => a.status === "Scheduled").length,
      confirmed: appointments.filter((a) => a.status === "Confirmed").length,
      checkedIn: appointments.filter((a) => a.status === "Checked-In").length,
      completed: appointments.filter((a) => a.status === "Completed").length,
      cancelled: appointments.filter((a) => a.status === "Cancelled").length,
      noShow: appointments.filter((a) => a.status === "No-Show").length,
    };
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return appointments.filter((appointment) => {
      const matchesSearch =
        !query ||
        appointment.id.toLowerCase().includes(query) ||
        appointment.patientName.toLowerCase().includes(query) ||
        appointment.patientId.toLowerCase().includes(query) ||
        appointment.patientPhone.toLowerCase().includes(query) ||
        appointment.doctorName.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      const matchesType =
        typeFilter === "All" || appointment.type === typeFilter;

      const matchesDoctor =
        doctorFilter === "All" || appointment.doctorName === doctorFilter;

      const matchesDate =
        !dateFilter || appointment.date === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesDoctor &&
        matchesDate
      );
    });
  }, [
    appointments,
    search,
    statusFilter,
    typeFilter,
    doctorFilter,
    dateFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAppointments.length / pageSize),
  );

  const paginatedAppointments = filteredAppointments.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(appointment: Appointment) {
    setEditingId(appointment.id);

    setForm({
      patientName: appointment.patientName,
      patientId: appointment.patientId,
      patientPhone: appointment.patientPhone,
      doctorName: appointment.doctorName,
      specialty: appointment.specialty,
      date: appointment.date,
      time: appointment.time,
      duration: String(appointment.duration),
      type: appointment.type,
      status: appointment.status,
      reason: appointment.reason,
      notes: appointment.notes,
    });

    setShowForm(true);
  }

  function handleFormChange(
    field: keyof typeof form,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function saveAppointment() {
    if (!form.patientName.trim() || !form.patientId.trim()) {
      alert("Please enter patient name and patient ID.");
      return;
    }

    if (!form.date || !form.time) {
      alert("Please select appointment date and time.");
      return;
    }

    if (editingId) {
      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment.id === editingId
            ? {
                ...appointment,
                patientName: form.patientName,
                patientId: form.patientId,
                patientPhone: form.patientPhone,
                doctorName: form.doctorName,
                specialty: form.specialty,
                date: form.date,
                time: form.time,
                duration: Number(form.duration),
                type: form.type,
                status: form.status,
                reason: form.reason,
                notes: form.notes,
              }
            : appointment,
        ),
      );
    } else {
      const newAppointment: Appointment = {
        id: `APT-${1000 + appointments.length + 1}`,
        patientName: form.patientName,
        patientId: form.patientId,
        patientPhone: form.patientPhone,
        doctorName: form.doctorName,
        specialty: form.specialty,
        date: form.date,
        time: form.time,
        duration: Number(form.duration),
        type: form.type,
        status: form.status,
        reason: form.reason,
        notes: form.notes,
      };

      setAppointments((previous) => [newAppointment, ...previous]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function updateStatus(
    appointmentId: string,
    status: AppointmentStatus,
  ) {
    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status }
          : appointment,
      ),
    );

    setSelectedAppointment((previous) =>
      previous && previous.id === appointmentId
        ? { ...previous, status }
        : previous,
    );
  }

  function handleCheckIn(appointment: Appointment) {
    updateStatus(appointment.id, "Checked-In");
  }

  function handleComplete(appointment: Appointment) {
    updateStatus(appointment.id, "Completed");
  }

  function openCancelModal(appointment: Appointment) {
    setSelectedAppointment(appointment);
    setCancelReason("Patient requested cancellation");
    setShowCancel(true);
  }

  function cancelAppointment() {
    if (!selectedAppointment) return;

    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === selectedAppointment.id
          ? {
              ...appointment,
              status: "Cancelled",
              notes: `${appointment.notes}${
                appointment.notes ? " " : ""
              }Cancellation reason: ${cancelReason}`,
            }
          : appointment,
      ),
    );

    setShowCancel(false);
    setSelectedAppointment(null);
  }

  function deleteAppointment(appointmentId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?",
    );

    if (!confirmed) return;

    setAppointments((previous) =>
      previous.filter((appointment) => appointment.id !== appointmentId),
    );
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setDoctorFilter("All");
    setDateFilter("");
    setPage(1);
  }

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
              Manage patient appointments, schedules, check-ins, and
              consultations.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <span className="text-lg">+</span>
            New Appointment
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            title="Total"
            value={stats.total}
            icon="📅"
          />

          <StatCard
            title="Today"
            value={stats.today}
            icon="🗓️"
          />

          <StatCard
            title="Scheduled"
            value={stats.scheduled}
            icon="⏱️"
          />

          <StatCard
            title="Confirmed"
            value={stats.confirmed}
            icon="✓"
          />

          <StatCard
            title="Checked-In"
            value={stats.checkedIn}
            icon="👤"
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            icon="✓"
          />
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    🔍
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Search patient, appointment, doctor, phone..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Clear Filters
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All Statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <select
                  value={typeFilter}
                  onChange={(event) => {
                    setTypeFilter(event.target.value);
                    setPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All Types</option>
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <select
                  value={doctorFilter}
                  onChange={(event) => {
                    setDoctorFilter(event.target.value);
                    setPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All Doctors</option>
                  {doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  value={dateFilter}
                  onChange={(event) => {
                    setDateFilter(event.target.value);
                    setPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Appointment
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Patient
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Doctor
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date & Time
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowDetails(true);
                        }}
                        className="font-semibold text-blue-600 hover:text-blue-700"
                      >
                        {appointment.id}
                      </button>

                      <div className="mt-1 text-xs text-slate-400">
                        {appointment.duration} minutes
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800">
                        {appointment.patientName}
                      </div>

                      <div className="text-xs text-slate-500">
                        {appointment.patientId}
                      </div>

                      <div className="text-xs text-slate-400">
                        {appointment.patientPhone}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-800">
                        {appointment.doctorName}
                      </div>

                      <div className="text-xs text-slate-500">
                        {appointment.specialty}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-800">
                        {formatDate(appointment.date)}
                      </div>

                      <div className="text-sm text-slate-500">
                        {formatTime(appointment.time)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                        {appointment.type}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={appointment.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          title="View"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowDetails(true);
                          }}
                          className="rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          title="Edit"
                          onClick={() => openEditForm(appointment)}
                          className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        >
                          Edit
                        </button>

                        {appointment.status === "Confirmed" ||
                        appointment.status === "Scheduled" ? (
                          <button
                            type="button"
                            onClick={() => handleCheckIn(appointment)}
                            className="rounded-lg bg-emerald-50 px-2.5 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                          >
                            Check-in
                          </button>
                        ) : null}

                        {appointment.status === "Checked-In" ||
                        appointment.status === "In Progress" ? (
                          <button
                            type="button"
                            onClick={() => handleComplete(appointment)}
                            className="rounded-lg bg-emerald-50 px-2.5 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                          >
                            Complete
                          </button>
                        ) : null}

                        {appointment.status !== "Cancelled" &&
                        appointment.status !== "Completed" &&
                        appointment.status !== "No-Show" ? (
                          <button
                            type="button"
                            onClick={() => openCancelModal(appointment)}
                            className="rounded-lg bg-red-50 px-2.5 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
                          >
                            Cancel
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedAppointments.length === 0 && (
              <EmptyState onCreate={openCreateForm} />
            )}
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="divide-y divide-slate-100 lg:hidden">
            {paginatedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowDetails(true);
                      }}
                      className="font-bold text-blue-600"
                    >
                      {appointment.id}
                    </button>

                    <div className="mt-1 text-xs text-slate-400">
                      {formatDate(appointment.date)} at{" "}
                      {formatTime(appointment.time)}
                    </div>
                  </div>

                  <StatusBadge status={appointment.status} />
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                  <div className="font-semibold text-slate-800">
                    {appointment.patientName}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {appointment.patientId} · {appointment.patientPhone}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-slate-400">
                        Doctor
                      </div>
                      <div className="font-medium text-slate-700">
                        {appointment.doctorName}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-400">
                        Type
                      </div>
                      <div className="font-medium text-slate-700">
                        {appointment.type}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-400">
                        Specialty
                      </div>
                      <div className="font-medium text-slate-700">
                        {appointment.specialty}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-400">
                        Duration
                      </div>
                      <div className="font-medium text-slate-700">
                        {appointment.duration} min
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowDetails(true);
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditForm(appointment)}
                    className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700"
                  >
                    Edit
                  </button>

                  {(appointment.status === "Scheduled" ||
                    appointment.status === "Confirmed") && (
                    <button
                      type="button"
                      onClick={() => handleCheckIn(appointment)}
                      className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700"
                    >
                      Check-in
                    </button>
                  )}

                  {(appointment.status === "Checked-In" ||
                    appointment.status === "In Progress") && (
                    <button
                      type="button"
                      onClick={() => handleComplete(appointment)}
                      className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700"
                    >
                      Complete
                    </button>
                  )}

                  {appointment.status !== "Cancelled" &&
                    appointment.status !== "Completed" &&
                    appointment.status !== "No-Show" && (
                      <button
                        type="button"
                        onClick={() => openCancelModal(appointment)}
                        className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600"
                      >
                        Cancel
                      </button>
                    )}

                  <button
                    type="button"
                    onClick={() => deleteAppointment(appointment.id)}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {paginatedAppointments.length === 0 && (
              <EmptyState onCreate={openCreateForm} />
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredAppointments.length === 0
                  ? 0
                  : (page - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-700">
                {Math.min(page * pageSize, filteredAppointments.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {filteredAppointments.length}
              </span>{" "}
              appointments
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((previous) => previous - 1)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                {page} / {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((previous) => previous + 1)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showForm && (
        <Modal
          title={editingId ? "Edit Appointment" : "New Appointment"}
          onClose={() => {
            setShowForm(false);
            setEditingId(null);
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="Patient Name"
              value={form.patientName}
              onChange={(value) =>
                handleFormChange("patientName", value)
              }
              placeholder="Enter patient name"
            />

            <FormInput
              label="Patient ID"
              value={form.patientId}
              onChange={(value) =>
                handleFormChange("patientId", value)
              }
              placeholder="PAT-001"
            />

            <FormInput
              label="Phone Number"
              value={form.patientPhone}
              onChange={(value) =>
                handleFormChange("patientPhone", value)
              }
              placeholder="(703) 555-0000"
            />

            <FormSelect
              label="Doctor"
              value={form.doctorName}
              options={doctors}
              onChange={(value) =>
                handleFormChange("doctorName", value)
              }
            />

            <FormInput
              label="Specialty"
              value={form.specialty}
              onChange={(value) =>
                handleFormChange("specialty", value)
              }
              placeholder="Radiology"
            />

            <FormSelect
              label="Appointment Type"
              value={form.type}
              options={typeOptions}
              onChange={(value) =>
                handleFormChange(
                  "type",
                  value as AppointmentType,
                )
              }
            />

            <FormInput
              label="Date"
              type="date"
              value={form.date}
              onChange={(value) =>
                handleFormChange("date", value)
              }
            />

            <FormInput
              label="Time"
              type="time"
              value={form.time}
              onChange={(value) =>
                handleFormChange("time", value)
              }
            />

            <FormInput
              label="Duration (minutes)"
              type="number"
              value={form.duration}
              onChange={(value) =>
                handleFormChange("duration", value)
              }
              placeholder="30"
            />

            <FormSelect
              label="Status"
              value={form.status}
              options={statusOptions}
              onChange={(value) =>
                handleFormChange(
                  "status",
                  value as AppointmentStatus,
                )
              }
            />

            <div className="sm:col-span-2">
              <FormInput
                label="Reason for Visit"
                value={form.reason}
                onChange={(value) =>
                  handleFormChange("reason", value)
                }
                placeholder="Reason for appointment"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Notes
              </label>

              <textarea
                rows={4}
                value={form.notes}
                onChange={(event) =>
                  handleFormChange("notes", event.target.value)
                }
                placeholder="Additional notes..."
                className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={saveAppointment}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {editingId ? "Update Appointment" : "Create Appointment"}
            </button>
          </div>
        </Modal>
      )}

      {/* Details Modal */}
      {showDetails && selectedAppointment && (
        <Modal
          title="Appointment Details"
          onClose={() => {
            setShowDetails(false);
            setSelectedAppointment(null);
          }}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Appointment Number
              </p>
              <p className="text-xl font-bold text-slate-900">
                {selectedAppointment.id}
              </p>
            </div>

            <StatusBadge status={selectedAppointment.status} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailItem
              label="Patient"
              value={selectedAppointment.patientName}
            />

            <DetailItem
              label="Patient ID"
              value={selectedAppointment.patientId}
            />

            <DetailItem
              label="Phone"
              value={selectedAppointment.patientPhone}
            />

            <DetailItem
              label="Doctor"
              value={selectedAppointment.doctorName}
            />

            <DetailItem
              label="Specialty"
              value={selectedAppointment.specialty}
            />

            <DetailItem
              label="Appointment Type"
              value={selectedAppointment.type}
            />

            <DetailItem
              label="Date"
              value={formatDate(selectedAppointment.date)}
            />

            <DetailItem
              label="Time"
              value={formatTime(selectedAppointment.time)}
            />

            <DetailItem
              label="Duration"
              value={`${selectedAppointment.duration} minutes`}
            />

            <DetailItem
              label="Reason"
              value={selectedAppointment.reason || "—"}
            />
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Notes
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {selectedAppointment.notes || "No notes available."}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-5">
            {(selectedAppointment.status === "Scheduled" ||
              selectedAppointment.status === "Confirmed") && (
              <button
                type="button"
                onClick={() => {
                  handleCheckIn(selectedAppointment);
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Check-in
              </button>
            )}

            {(selectedAppointment.status === "Checked-In" ||
              selectedAppointment.status === "In Progress") && (
              <button
                type="button"
                onClick={() => {
                  handleComplete(selectedAppointment);
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Complete
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setShowDetails(false);
                openEditForm(selectedAppointment);
              }}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        </Modal>
      )}

      {/* Cancel Modal */}
      {showCancel && selectedAppointment && (
        <Modal
          title="Cancel Appointment"
          onClose={() => {
            setShowCancel(false);
            setSelectedAppointment(null);
          }}
        >
          <div className="rounded-xl bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">
              You are cancelling appointment{" "}
              {selectedAppointment.id}.
            </p>

            <p className="mt-1 text-sm text-red-600">
              {selectedAppointment.patientName} with{" "}
              {selectedAppointment.doctorName}.
            </p>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Cancellation Reason
            </label>

            <select
              value={cancelReason}
              onChange={(event) =>
                setCancelReason(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>
                Patient requested cancellation
              </option>
              <option>Doctor unavailable</option>
              <option>Patient rescheduled</option>
              <option>Clinic unavailable</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => setShowCancel(false)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600"
            >
              Keep Appointment
            </button>

            <button
              type="button"
              onClick={cancelAppointment}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Cancel Appointment
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xl">{icon}</span>

        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-3 text-xs font-medium text-slate-500">
        {title}
      </p>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

function FormSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function EmptyState({
  onCreate,
}: {
  onCreate: () => void;
}) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
        📅
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        No appointments found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        There are no appointments matching your current
        search and filters.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Create Appointment
      </button>
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}