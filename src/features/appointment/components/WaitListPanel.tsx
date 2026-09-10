import type { WaitlistEntry } from "../types/appointment";
import { formatDate } from "../utils/date";

interface WaitlistPanelProps {
  entries: WaitlistEntry[];
  onAdd: () => void;
  onPromote: (entry: WaitlistEntry) => void;
  onRemove: (id: string) => void;
}

export function WaitlistPanel({ entries, onAdd, onPromote, onRemove }: WaitlistPanelProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Waitlist</h3>
          <p className="text-xs text-slate-400">Patients waiting for a slot to open up.</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          + Add to waitlist
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="px-5 py-6 text-center text-sm text-slate-400">No one on the waitlist.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {entries.map((entry) => (
            <li key={entry.id} className="flex flex-col gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">{entry.patientName}</p>
                <p className="text-xs text-slate-400">
                  Prefers {formatDate(entry.preferredDate)} · {entry.doctorName}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => onPromote(entry)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Schedule now
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(entry.id)}
                  className="text-slate-400 hover:text-rose-500"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}