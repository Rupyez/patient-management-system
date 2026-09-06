import { CalendarDays, Check, X } from "lucide-react";


interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}


const leaveRequests: LeaveRequest[] = [
      {
    id: "1",
    employeeName: "Sarah Johnson",
    employeeId: "EMP-002",
    leaveType: "Annual Leave",
    startDate: "2026-09-05",
    endDate: "2026-09-10",
    reason: "Family vacation",
    status: "PENDING",
  },
  {
    id: "2",
    employeeName: "Emily Rodriguez",
    employeeId: "EMP-003",
    leaveType: "Sick Leave",
    startDate: "2026-08-25",
    endDate: "2026-08-27",
    reason: "Medical recovery",
    status: "APPROVED",
  },
  {
    id: "3",
    employeeName: "Robert Taylor",
    employeeId: "EMP-006",
    leaveType: "Personal Leave",
    startDate: "2026-09-15",
    endDate: "2026-09-16",
    reason: "Personal work",
    status: "PENDING",
  },
];

const STATUS_STYLES = {
  PENDING: "bg-amber-50 text-amber-700",
  APPROVED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-700",
};


export default function StaffLeaveSection(){
    return(
        <div className="mt-6">

            {/* Section header */}
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-900">Leave Request</h3>
                <p className="mt-1 text-sm text-slate-500">Review and manage staff leave requests</p>
            </div>


            {/* Leave request list */}
            <div className="space-y-4">
                {leaveRequests.map((request) =>(
                    <div key={request.id} className="rounded-xl border border-slate-200 bg-white p-5">

                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-semibold text-slate-900">{request.employeeName}</h4>
                                <p className="mt-1 text-sm text-slate-500">{request.employeeId}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[request.status]}`}>{request.status}</span>
                        </div>


                        {/* Leave information */}
                        <div  className="mt-5 grid gap-4 md:grid-cols-3">
                          <div>
                                <p className="text-xs font-medium uppercase text-slate-400">Leave Type</p>
                                <p className="mt-1 text-sm font-medium text-slate-700">{request.leaveType}</p>
                          </div>


                        <div>
                            <p className="text-xs font-medium uppercase text-slate-400">Start Date</p>
                            <div className="mt-1 flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-slate-400" />
                                <p className="text-sm text-slate-700">{request.startDate}</p>
                            </div>
                             
                        </div>


                        <div>
                            <p className="text-xs font-medium uppercase text-slate-400">End Date</p>

                            <div className="mt-1 flex items-center gap-2">
                                <CalendarDays  className="h-4 w-4 text-slate-400" />
                                <p className="text-sm text-slate-700">{request.endDate}</p>
                            </div>
                        </div>

                        </div>


                        {/* Reason */}
                        <div className="mt-5 rounded-lg bg-slate-50 p-3">
                            <p className="text-xs font-medium text-slate-500">Reason</p>
                            <p className="mt-1 text-sm text-slate-700">{request.reason}</p>
                        </div>


                        {/* Actions */}
                        {request.status === 'PENDING' &&(
                            <div  className="mt-5 flex items-center justify-end gap-3">
                                <button type="button" className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"><X className="h-4 w-4"/>Reject</button>
                                <button type="button"
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"><Check/>Approve</button>
                            </div>
                        )}


                        {request.status === 'APPROVED' &&(
                            <div  className="mt-5 flex items-center justify-end gap-3">
                                <Check className="h-4 w-4"/>Leave Approved
                            </div>
                        )}

                        {request.status === 'REJECTED' &&(
                            <div className="mt-5 flex items-center gap-2 text-sm text-red-600">
                                <X className="h-4 w-4"/>Leave rejected
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}