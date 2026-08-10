import type { ColumnDef } from "@tanstack/react-table";

import type{ Patient } from "../types/patient";
import PatientAvatar from "../components/PatientAvatar";
import PatientStatusBadge from "../components/PatientStatusBadge";
import PatientActions from "../components/PatientActions";

export const patientColumns: ColumnDef<Patient>[] = [
  {
    id: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <PatientAvatar
          firstName={row.original.firstName}
          lastName={row.original.lastName}
        />

        <div>
          <p className="font-semibold">
            {row.original.firstName} {row.original.lastName}
          </p>

          <p className="text-sm text-slate-500">
            {row.original.medicalRecordNumber}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <PatientStatusBadge
        status={row.original.status}
      />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <PatientActions />
    ),
  },
];