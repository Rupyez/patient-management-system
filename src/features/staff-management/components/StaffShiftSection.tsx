import { CalendarDays, Clock } from "lucide-react";
import type { Staff } from "../types"


interface StaffShiftSectionProps{
    staff: Staff[];
}

export default function StaffShiftSection({staff}:StaffShiftSectionProps){
    return(
        <div className="mt-6">


            {/* Section header */}
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-900">Staff Shifts</h3>
                <p className="mt-1 text-sm text-slate-500">View Staff members and their preferred shifts</p>
            </div>


            {/* Shift List */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {staff.map((staffmember) =>(
                    <div key={staffmember.id} className="rounded-xl border border-slate-200 bg-white p-5">


                        {/* Staff information */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-slate-900">{staffmember.firstName}{staffmember.lastName}</h4>
                                <p className="text-sm text-slate-500">{staffmember.position}</p>
                            </div>
                            <CalendarDays className="h-5 w-5 text-slate-400" />
                        </div>


                        {/* Department */}
                        <div className="mt-4">
                            <p className="text-xs font-medium uppercase text-slate-400">Department</p>
                            <p className="mt-1 text-sm text-slate-700">{staffmember.department}</p>
                        </div>


                        {/* Shift */}
                        <div  className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 p-3">
                            <Clock className="h-4 w-4 text-blue-600"/>

                            <div>
                                <p className="text-xs text-slate-500">Preferred Shift</p>
                                <p  className="text-sm font-medium text-slate-900">{staffmember.shiftPreference}</p>
                            </div>
                        </div>

                        
                    </div>
                ))}
            </div>
        </div>
    )
}