import { AlertTriangle, X } from "lucide-react";
import type { Staff } from "../types";


interface StaffDeleteModalProps{
    staff:Staff;
    onClose: () => void;
    onDelete: (staffId: string) => void;
}


export default function StaffDeleteModal({staff, onClose, onDelete}:StaffDeleteModalProps){


    return(
    //Modal background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">


        {/* Delete Modal */}
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">


            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">Delete Staff Member</h3>
                <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={20}/></button>
            </div>


            {/* Warning content */}
            <div className="p-6">
                <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-5 w-5 text-red-600"/>
                    </div>

                    <div className="font-semibold text-slate-900">
                        <h3>Are you sure?</h3>
                        <p className="mt-2 text-sm text-slate-500">You are about to delete{" "}
                            <span>{staff.firstName}{staff.lastName}</span>
                            . This action cannot be undone
                        </p>

                        <p className="mt-2 text-sm text-slate-500">Employee Id: {staff.employeeId}</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
                <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                <button type="button" onClick={() => onDelete(staff.id)} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Delete Staff</button>
            </div>
        </div>
    </div>

    )

}