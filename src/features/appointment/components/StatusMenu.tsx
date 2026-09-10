import { useEffect, useRef, useState } from "react";
import type { AppointmentStatus } from "../types/appointment";
import { statusOptions, statusStyles, statusDotStyles } from "../constants/appointment";

interface StatusMenuProps {
  status: AppointmentStatus;
  onChange: (status: AppointmentStatus) => void;
  disabled?: boolean;
}

/**
 * The status pill in the table used to render as inert text (it looked clickable
 * but did nothing). This is a real dropdown: clicking it lets you change the
 * appointment's status without opening the full edit form.
 */
export function StatusMenu({ status, onChange, disabled }: StatusMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition ${
          statusStyles[status]
        } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:brightness-95"}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[status]}`} />
        {status}
        {!disabled && (
          <svg width="9" height="9" viewBox="0 0 10 10" className="ml-0.5 opacity-60">
            <path
              d="M2 4l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {open && !disabled && (
        <div
          role="listbox"
          className="absolute left-0 z-20 mt-1 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {statusOptions.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option === status}
              onClick={() => {
                if (option !== status) onChange(option);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[option]}`} />
              {option}
              {option === status && <span className="ml-auto text-blue-600">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Read-only pill for places like the details modal, where inline editing doesn't make sense. */
export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[status]}`} />
      {status}
    </span>
  );
}