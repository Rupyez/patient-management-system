import { useMemo } from "react";
import type { Appointment } from "../types/appointment";
import { getWeekdayName } from "../utils/date";

const WEEKDAY_ORDER = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function AnalyticsPanel({ appointments }: { appointments: Appointment[] }) {
  const byWeekday = useMemo(() => {
    const counts = Object.fromEntries(WEEKDAY_ORDER.map((day) => [day, 0])) as Record<string, number>;
    appointments.forEach((a) => {
      if (!a.date) return;
      counts[getWeekdayName(a.date)] = (counts[getWeekdayName(a.date)] ?? 0) + 1;
    });
    return WEEKDAY_ORDER.map((day) => ({ day, count: counts[day] }));
  }, [appointments]);

  const maxCount = Math.max(1, ...byWeekday.map((d) => d.count));

  const total = appointments.length;
  const cancelled = appointments.filter((a) => a.status === "Cancelled").length;
  const noShow = appointments.filter((a) => a.status === "No-Show").length;
  const cancelRate = total ? Math.round((cancelled / total) * 100) : 0;
  const noShowRate = total ? Math.round((noShow / total) * 100) : 0;

  if (total === 0) return null;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Appointments by day of week</h3>
        <div className="flex items-end gap-3" style={{ height: 120 }}>
          {byWeekday.map(({ day, count }) => (
            <div key={day} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-blue-500/80 transition-all"
                style={{ height: `${Math.max(4, (count / maxCount) * 100)}px` }}
                title={`${count} appointment${count === 1 ? "" : "s"}`}
              />
              <span className="text-xs text-slate-400">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-400">Cancellation rate</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">{cancelRate}%</p>
          <p className="text-xs text-slate-400">{cancelled} of {total} appointments</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-400">No-show rate</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{noShowRate}%</p>
          <p className="text-xs text-slate-400">{noShow} of {total} appointments</p>
        </div>
      </div>
    </div>
  );
}