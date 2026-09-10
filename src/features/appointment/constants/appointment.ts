import type { AppointmentFormValues, AppointmentStatus, AppointmentType } from "../types/appointment";

export const statusOptions: AppointmentStatus[] = [
  "Scheduled",
  "Confirmed",
  "Checked-In",
  "Completed",
  "Cancelled",
  "No-Show",
];

export const typeOptions: AppointmentType[] = [
  "Consultation",
  "Follow-up",
  "Check-up",
  "Procedure",
  "Emergency",
];

export const doctors: string[] = [
  "Dr. Sarah Johnson",
  "Dr. Michael Chen",
  "Dr. Priya Patel",
  "Dr. James Wilson",
  "Dr. Elena Garcia",
];

export const emptyForm: AppointmentFormValues = {
  patientName: "",
  patientId: "",
  patientPhone: "",
  doctorName: doctors[0],
  date: "",
  time: "",
  type: typeOptions[0],
  status: "Scheduled",
  notes: "",
  attachments: [],
};

/** Badge styling for each appointment status, kept in one place so it stays consistent. */
export const statusStyles: Record<AppointmentStatus, string> = {
  Scheduled: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
  Confirmed: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  "Checked-In": "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
  Completed: "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-300",
  Cancelled: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
  "No-Show": "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
};

/** Solid dot color to pair with each status badge/menu. */
export const statusDotStyles: Record<AppointmentStatus, string> = {
  Scheduled: "bg-blue-500",
  Confirmed: "bg-emerald-500",
  "Checked-In": "bg-violet-500",
  Completed: "bg-slate-400",
  Cancelled: "bg-rose-500",
  "No-Show": "bg-amber-500",
};