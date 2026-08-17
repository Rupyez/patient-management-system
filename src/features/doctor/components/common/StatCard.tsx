import type React from 'react';

interface StatCardProps {
  title: string; // Fixed: String → string
  value: string | number;
  icon: React.ElementType;
  color: string;
}

export default function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:border-slate-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">{value}</h3>
        </div>

        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}