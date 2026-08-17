import { statusColorMap, statusDotColors, statusLabels } from "../../data/doctor.data";
import type { DoctorStatus } from "../../types/doctor.types";

interface DoctorStatusBadgeProps {
  status: DoctorStatus;
}

export default function DoctorStatusBadge({ status }: DoctorStatusBadgeProps) {
  const dotColor = statusDotColors[status];
  const label = statusLabels[status];

  return (
    <span 
      className={`
        inline-flex 
        items-center 
        rounded-full 
        px-3 
        py-1 
        text-xs 
        font-semibold 
        ${statusColorMap[status]}
        transition-all 
        duration-200
      `}
    >
      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}