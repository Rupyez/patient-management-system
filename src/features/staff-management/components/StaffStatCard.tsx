import type { ElementType } from "react";


interface StaffStatCardProps{
 title: string;
  value: number;
  icon: ElementType;
  iconContainerClass: string;
}


export default function StaffStatCard({title, value, icon:Icon, iconContainerClass}:StaffStatCardProps){
return(
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${iconContainerClass}`}>
            <Icon className="h-5 w-5"/>
        </div>

        {/* Content */}
        <div>
            <p className="text-sm text-slate-500">{title}</p>
        </div>
    </div>
)
}