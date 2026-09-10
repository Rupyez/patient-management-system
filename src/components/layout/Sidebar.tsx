// src/components/layout/Sidebar.tsx (or wherever your sidebar is)
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  Settings,
  BarChart3,
  DollarSign,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menus = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Patients', path: '/patients', icon: Users },
  { title: 'Doctors', path: '/doctors', icon: Stethoscope },
  { title: 'Appointments', path: '/appointments', icon: CalendarDays },
  { title: 'Billing', path: '/billing', icon: DollarSign },
  { title: 'Patient Portal', path: '/portal', icon: Users },
  { title: 'Analytics', path: '/analytics', icon: BarChart3 },
  { title: 'Settings', path: '/settings', icon: Settings },
  { title: 'Doctor Portal', path: '/doctor', icon: Stethoscope },
    { title: 'Staff Management', path: '/staff', icon: Users },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white">
            <span className="text-lg font-bold">P</span>
          </div>
          <h1 className="text-xl font-bold text-sky-600">PatientCare</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <NavLink
              key={menu.title}
              to={menu.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-200'
                    : 'text-slate-700 hover:bg-sky-50 hover:text-sky-600'
                }`
              }
            >
              <Icon size={22} />
              <span>{menu.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4 text-center text-sm text-slate-400">
        v1.0.0
      </div>
    </aside>
  );
}