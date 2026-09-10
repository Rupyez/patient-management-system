export type AppointmentStatus =
  | "Scheduled"
  | "Confirmed"
  | "Checked-In"
  | "Completed"
  | "Cancelled"
  | "No-Show";

export type AppointmentType =
  | "Consultation"
  | "Follow-up"
  | "Check-up"
  | "Procedure"
  | "Emergency";

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  patientPhone: string;
  doctorName: string;
  date: string; // ISO date, e.g. "2026-08-09"
  time: string; // e.g. "09:30"
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  cancelReason?: string;
  attachments: string[]; // file names only — no real upload/storage backend wired up
  createdAt: string;
}

/** Shape of the create/edit form. Omits fields the system derives itself. */
export type AppointmentFormValues = Omit<Appointment, "id" | "createdAt" | "cancelReason">;

/** A patient waiting for a slot to open up. Not yet a real appointment. */
export interface WaitlistEntry {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  preferredDate: string;
  notes?: string;
  createdAt: string;
}

export type WaitlistFormValues = Omit<WaitlistEntry, "id" | "createdAt">;

export type SortColumn = "patientName" | "doctorName" | "date";
export type SortDirection = "asc" | "desc";