import { X, Mail, Phone, MapPin, BadgeCheck } from "lucide-react";
import type { Staff } from "../types";

interface StaffProfileModalProps {
  staff: Staff;
  onClose: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  ACTIVE:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  ON_LEAVE:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
  INACTIVE:
    "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20",
  SUSPENDED:
    "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
};

const AVATAR_PALETTE = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
];

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function getAvatarClass(id: string) {
  const index = id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return AVATAR_PALETTE[index % AVATAR_PALETTE.length];
}

export default function StaffProfileModal({
  staff,
  onClose,
}: StaffProfileModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      {/* Modal container */}
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Modal header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold ${getAvatarClass(
                staff.id
              )}`}
            >
              {getInitials(staff.firstName, staff.lastName)}
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {staff.firstName} {staff.lastName}
              </h2>

              <p className="text-sm text-slate-500">
                {staff.position} · {staff.employeeId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="space-y-6 p-6">

          {/* Contact */}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              {staff.email}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
              <Phone className="h-3.5 w-3.5 text-slate-400" />
              {staff.phone}
            </span>

            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${
                STATUS_STYLES[staff.status] ??
                STATUS_STYLES.INACTIVE
              }`}
            >
              {staff.status}
            </span>
          </div>

          {/* Details */}
          <div className="grid gap-x-6 gap-y-4 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Role
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {staff.role}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Department
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {staff.department}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Experience
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {staff.experience} years
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Join Date
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {staff.joinDate}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Shift Preference
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {staff.shiftPreference}
              </p>
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              <MapPin className="h-3.5 w-3.5" />
              Address
            </p>

            <p className="text-sm text-slate-700">
              {staff.address}
            </p>
          </div>

          {/* Emergency contact */}
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              Emergency Contact
            </p>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">
                {staff.emergencyContact.name}
              </p>

              <p className="text-sm text-slate-500">
                {staff.emergencyContact.relationship}
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {staff.emergencyContact.phone}
              </p>
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              <BadgeCheck className="h-3.5 w-3.5" />
              Qualifications
            </p>

            <div className="flex flex-wrap gap-2">
              {(staff.qualifications ?? []).map((qualification) => (
                <span
                  key={qualification}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {qualification}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              Certifications
            </p>

            <div className="flex flex-wrap gap-2">
              {(staff.certifications?? []).map((certification) => (
                <span
                  key={certification}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                >
                  {certification}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}