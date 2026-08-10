import type{ PatientStatus } from "../types/patient";

interface Props {
  status: PatientStatus;
}

export default function PatientStatusBadge({
  status,
}: Props) {
  const colors = {
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-red-100 text-red-700",
    PENDING: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}