import type{ DoctorStatus } from "./createDoctor/types/doctor";
import clsx from "clsx";


interface Props {
  status: DoctorStatus;
  showDot?: boolean;
}


export default function DoctorStatusBadge({status, showDot = true}:Props){

      const styles = {
        ACTIVE: "bg-green-100 text-green-700 border-green-200",
        INACTIVE: "bg-red-100 text-red-700 border-red-200",
        ON_LEAVE: "bg-amber-100 text-amber-700 border-amber-200",
        BUSY: "bg-purple-100 text-purple-700 border-purple-200",
  };

    const dotColors = {
        ACTIVE: "bg-green-500",
        INACTIVE: "bg-red-500",
        ON_LEAVE: "bg-amber-500",
        BUSY: "bg-purple-500",
  };

  const labels = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    ON_LEAVE: "On Leave",
    BUSY: "Busy",
  };


   return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
        styles[status]
      )}
    >
      {showDot && (
        <span className={`mr-1.5 h-2 w-2 rounded-full ${dotColors[status]}`} />
      )}
      {labels[status]}
    </span>
  );

}