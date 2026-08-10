import Card from '../ui/Card';
import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'sky' | 'emerald' | 'amber' | 'rose' | 'violet';
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'sky',
}: Props) {
  const colorStyles = {
    sky: 'bg-sky-50 text-sky-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    violet: 'bg-violet-50 text-violet-600',
  };

  return (
    <Card hover className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">{value}</h2>
          {trend && (
            <p
              className={`mt-1 text-xs font-medium ${
                trend.value >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%{' '}
              <span className="text-slate-400">{trend.label}</span>
            </p>
          )}
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colorStyles[color]}`}
        >
          <Icon size={28} />
        </div>
      </div>
    </Card>
  );
}