import { CalendarDays, CheckCircle2, Circle, ClipboardCheck, UserPlus } from "lucide-react";


interface OnboardingTask{
    id:string;
    title:string;
    completed:boolean
}

interface OnboardingStaff {
  id: string;
  employeeName: string;
  employeeId: string;
  position: string;
  department: string;
  joinDate: string;
  tasks: OnboardingTask[];
}


const onboardingStaff: OnboardingStaff[] = [
  {
    id: "1",
    employeeName: "David Wilson",
    employeeId: "EMP-007",
    position: "Registered Nurse",
    department: "Emergency",
    joinDate: "2026-09-01",
    tasks: [
      {
        id: "1",
        title: "Personal Information",
        completed: true,
      },
      {
        id: "2",
        title: "Document Verification",
        completed: true,
      },
      {
        id: "3",
        title: "Hospital Orientation",
        completed: false,
      },
      {
        id: "4",
        title: "Department Training",
        completed: false,
      },
    ],
  },
  {
    id: "2",
    employeeName: "Sophia Martinez",
    employeeId: "EMP-008",
    position: "Lab Technician",
    department: "Laboratory",
    joinDate: "2026-09-05",
    tasks: [
      {
        id: "1",
        title: "Personal Information",
        completed: true,
      },
      {
        id: "2",
        title: "Document Verification",
        completed: false,
      },
      {
        id: "3",
        title: "Hospital Orientation",
        completed: false,
      },
      {
        id: "4",
        title: "Department Training",
        completed: false,
      },
    ],
  },
];

export default function StaffOnboardingSection(){
    return(
        <div className="mt-6">
            
            {/* Section header */}
            <div className="mb-5 flex items-center justify-between">

                <div>
                    <h3 className="text-lg font-semibold text-slate-900">Staff onBoarding</h3>
                    <p className="mt-1 text-sm text-slate-900">Track new staff onboarding progress</p>
                </div>


                <div className="rounded-lg bg-blue-50 text-blue-600">
                    <UserPlus className="h-5 w-5"/>
                </div>
            </div>


            {/* Onboarding  Staff List */}
            <div className="space-y-4">
                {onboardingStaff.map((staffMember) =>{

                    //calculate completed onboarding tasks
                    const completedTasks = staffMember.tasks.filter((task) => task.completed).length;

                    //calculate progress percentage
                    const progress = (completedTasks/staffMember.tasks.length) * 100;

                    return(
                        <div key={staffMember.id} className="rounded-xl border borders-slate-200 bg-white p-5">

                            {/* Employee information */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-slate-900">{staffMember.employeeName}</h4>
                                    <p className="mt-1 text-sm text-slate-500">{staffMember.position} . {staffMember.department}</p>
                                    <p className="mt-1 text-xs text-slate-400">{staffMember.employeeId}</p>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <CalendarDays className="h-4 w-4"/>
                                    {staffMember.joinDate}
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="mt-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="text-sm font-medium text-slate-700">Onboarding Progress</p>
                                    <p className="text-sm font-semibold text-blue-600">{Math.round(progress)}</p>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full rounded-full bg-blue-600" style={{width: `${progress}%`}}/>
                                    <p className="mt-2 text-xs text-slate-500">{completedTasks} of {staffMember.tasks.length} tasks completed</p>
                                </div>


                                {/* Onboarding Tasks */}
                                <div className="mt-6 grid gap-3 md:grid-cols-2">
                                    {staffMember.tasks.map((task) => (
                                        <div key={task.id} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                                            {task.completed ? (
                                                <CheckCircle2 className="h-5 w-5 text-emerald-50-600"/>
                                            ):(
                                                <Circle className="h-5 w-5 text-slate-400"/>
                                            )}

                                            <span className={`text-sm ${task.completed ? "font-medium text-slate-700":"text-slate-500"}`}>{task.title}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
                                    <button type="button" className="flex items-center gap-2 rounded-lg border border-salte-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                                        <ClipboardCheck className="h-4 w-4"/> Manage Onboarding
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}