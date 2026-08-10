import { Users, Activity, Clock, Star, Stethoscope, TrendingUp } from 'lucide-react';
import Card from '../../../components/ui/Card';
import type{ DoctorStats as DoctorStatsType  } from './createDoctor/types/doctor';

interface DoctorStatsProps {
  stats: DoctorStatsType;
}

export default function DoctorStats({ stats }: DoctorStatsProps) {
  const statCards = [
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: Users,
      color: 'sky',
      trend: '+12%',
    },
    {
      title: 'Active Doctors',
      value: stats.activeDoctors,
      icon: Activity,
      color: 'emerald',
      trend: '+8%',
    },
    {
      title: 'On Leave',
      value: stats.onLeave,
      icon: Clock,
      color: 'amber',
    },
    {
      title: 'Busy',
      value: stats.busy,
      icon: TrendingUp,
      color: 'purple',
    },
    {
      title: 'Average Rating',
      value: `${stats.averageRating} ★`,
      icon: Star,
      color: 'yellow',
    },
    {
      title: 'Patients Served',
      value: stats.totalPatientsServed.toLocaleString(),
      icon: Stethoscope,
      color: 'rose',
    },
  ];

  const colorStyles = {
    sky: 'bg-sky-50 text-sky-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} hover className="overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-800">{stat.value}</h3>
                {stat.trend && (
                  <p className="mt-1 text-xs font-medium text-green-600">
                    ↑ {stat.trend} vs last month
                  </p>
                )}
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colorStyles[stat.color as keyof typeof colorStyles]}`}>
                <Icon size={24} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}