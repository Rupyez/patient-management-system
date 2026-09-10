import type{ AppointmentStatus } from "../types/appointment";

export function statusClasses(status: AppointmentStatus): string {
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