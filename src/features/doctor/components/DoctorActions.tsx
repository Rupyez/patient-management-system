import { Eye, Pencil, Trash2, Calendar, UserPlus } from 'lucide-react';

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSchedule?: () => void;
  onAssignPatient?: () => void;
}

export default function DoctorActions({
  onView,
  onEdit,
  onDelete,
  onSchedule,
  onAssignPatient,
}: Props) {
  return (
    <div className="flex items-center gap-1">
      {onView && (
        <button
          onClick={(e) => { e.stopPropagation(); onView(); }}
          className="rounded-lg p-2 transition hover:bg-sky-100"
          title="View Details"
        >
          <Eye size={18} className="text-sky-600" />
        </button>
      )}
      {onEdit && (
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="rounded-lg p-2 transition hover:bg-amber-100"
          title="Edit Doctor"
        >
          <Pencil size={18} className="text-amber-600" />
        </button>
      )}
      {onSchedule && (
        <button
          onClick={(e) => { e.stopPropagation(); onSchedule(); }}
          className="rounded-lg p-2 transition hover:bg-purple-100"
          title="Schedule Appointment"
        >
          <Calendar size={18} className="text-purple-600" />
        </button>
      )}
      {onAssignPatient && (
        <button
          onClick={(e) => { e.stopPropagation(); onAssignPatient(); }}
          className="rounded-lg p-2 transition hover:bg-emerald-100"
          title="Assign Patient"
        >
          <UserPlus size={18} className="text-emerald-600" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="rounded-lg p-2 transition hover:bg-red-100"
          title="Delete Doctor"
        >
          <Trash2 size={18} className="text-red-600" />
        </button>
      )}
    </div>
  );
}