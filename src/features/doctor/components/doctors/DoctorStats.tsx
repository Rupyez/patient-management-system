import StatCard from "../common/StatCard";
import type { DoctorStats as DoctorStatsType } from "../../types/doctor.types";
import {Users, Activity, Clock, TrendingUp, Star, Stethoscope} from 'lucide-react'

interface DoctorStatsProps{
    stats: DoctorStatsType
}

export default function DoctorStats({stats}:DoctorStatsProps){

    const statItems = [
        {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: Users,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      title: 'Active Doctors',
      value: stats.activeDoctors,
      icon: Activity,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'On Leave',
      value: stats.onLeave,
      icon: Clock,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Busy',
      value: stats.busy,
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Average Rating',
      value: `${stats.averageRating} ★`,
      icon: Star,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'Patients Served',
      value: stats.totalPatientsServed.toLocaleString(),
      icon: Stethoscope,
      color: 'bg-rose-50 text-rose-600',
    },
    ]


    return(
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {statItems.map((item) =>(
                <StatCard key={item.title} {...item}/>
            ))}
        </div>
    )
}