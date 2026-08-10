import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PatientActions({
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onView}
        className="rounded-lg p-2 transition hover:bg-sky-100"
        title="View"
      >
        <Eye size={18} className="text-sky-600" />
      </button>

      <button
        onClick={onEdit}
        className="rounded-lg p-2 transition hover:bg-amber-100"
        title="Edit"
      >
        <Pencil size={18} className="text-amber-600" />
      </button>

      <button
        onClick={onDelete}
        className="rounded-lg p-2 transition hover:bg-red-100"
        title="Delete"
      >
        <Trash2 size={18} className="text-red-600" />
      </button>
    </div>
  );
}