import { Eye, Pencil, Trash } from "lucide-react";

interface DoctorActionProps{
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void; 
}

export default function DoctorActions({onView, onDelete, onEdit}:DoctorActionProps){
    return(
        <div className="flex items-center gap-1">
            {onView &&(
                <button onClick={(e) => {e.stopPropagation(); onView()}} title="View Details" className="rounded-lg p-2 transition hover:bg-sky-100">
                    <Eye size={18} className="text-sky-600"/>
                </button>
            )}

            {onEdit &&(
                <button onClick={(e) => { e.stopPropagation(); onEdit();}} title="Edit Doctor" className="rounded-lg p-2 transition hover:bg-amber-100">
                    <Pencil size={18} className="text-amber-600"/>
                </button>
            )}

            {onDelete && (
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} title="Delete Doctor" className="rounded-lg p-2 transition hover:bg-red-100">
                    <Trash size={18} className="text-red-600"/>
                </button>
            )}
        </div>
    )
}