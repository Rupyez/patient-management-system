import { Eye, Edit, Trash2, Users } from "lucide-react";
import type { Staff } from "../types";

interface StaffTableProps {
  staff: Staff[];
  onView: (staff: Staff) => void;
  onEdit: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
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

export default function StaffTable({
  staff,
  onView,
  onEdit,
  onDelete,
}: StaffTableProps) {
  return (
    <div className="border-t border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">

          {/* Table header */}
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Staff
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Role
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Department
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Position
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="divide-y divide-slate-100">
            {staff.map((staffMember) => (
              <tr
                key={staffMember.id}
                className="group transition-colors hover:bg-slate-50"
              >
                {/* Staff */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarClass(
                        staffMember.id
                      )}`}
                    >
                      {getInitials(
                        staffMember.firstName,
                        staffMember.lastName
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">
                        {staffMember.firstName} {staffMember.lastName}
                      </p>

                      <p className="truncate text-sm text-slate-500">
                        {staffMember.email}
                      </p>

                      <p className="text-xs text-slate-400">
                        {staffMember.employeeId}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {staffMember.role}
                  </span>
                </td>

                {/* Department */}
                <td className="px-4 py-4 text-sm text-slate-600">
                  {staffMember.department}
                </td>

                {/* Position */}
                <td className="px-4 py-4 text-sm text-slate-600">
                  {staffMember.position}
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      STATUS_STYLES[staffMember.status] ??
                      STATUS_STYLES.INACTIVE
                    }`}
                  >
                    {staffMember.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onView(staffMember)}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      title="View Staff"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(staffMember)}
                      className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"
                      title="Edit Staff"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(staffMember)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      title="Delete Staff"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {staff.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 p-14 text-center">
          <Users className="h-8 w-8 text-slate-300" />

          <p className="text-sm font-medium text-slate-600">
            No staff found
          </p>

          <p className="text-sm text-slate-400">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}