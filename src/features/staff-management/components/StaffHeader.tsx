
import { Plus } from "lucide-react";

interface StaffHeadProps{
    onAddStaff:() => void;
}

export default function StaffHeader({onAddStaff}:StaffHeadProps){
    // Header Section

    return(

        <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Staff Management</h1>
                        <p className="mt-1 text-sm text-slate-500">Manage hospital staff, schedules, leave requests, performance and onboarding</p>
                    </div>

                    <button
                        type="button"
                        onClick={onAddStaff}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                        Add Staff
                    </button>
        </div>
    )
}