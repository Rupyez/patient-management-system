import { useEffect, useRef, useState } from "react";

interface ActionsMenuProps {
  onView: () => void;
  onEdit: () => void;
  onCancel: () => void;
  cancelDisabled?: boolean;
}

export function ActionsMenu({ onView, onEdit, onCancel, cancelDisabled }: ActionsMenuProps) {
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
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open appointment actions"
        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="3" r="1.3" />
          <circle cx="8" cy="8" r="1.3" />
          <circle cx="8" cy="13" r="1.3" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onView();
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-left text-xs font-medium text-slate-600 transition hover:bg-slate-50"
          >
            View details
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-left text-xs font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Edit
          </button>
          <button
            type="button"
            role="menuitem"
            disabled={cancelDisabled}
            onClick={() => {
              onCancel();
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-left text-xs font-medium text-rose-500 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
          >
            Cancel appointment
          </button>
        </div>
      )}
    </div>
  );
}