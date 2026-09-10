import type { Appointment } from "../types/appointment";

function escapeCsvValue(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportAppointmentsToCsv(appointments: Appointment[], filename = "appointments.csv") {
  const headers = [
    "ID",
    "Patient Name",
    "Patient ID",
    "Phone",
    "Doctor",
    "Date",
    "Time",
    "Type",
    "Status",
    "Notes",
  ];

  const rows = appointments.map((a) =>
    [a.id, a.patientName, a.patientId, a.patientPhone, a.doctorName, a.date, a.time, a.type, a.status, a.notes ?? ""].map(
      escapeCsvValue
    )
  );

  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}