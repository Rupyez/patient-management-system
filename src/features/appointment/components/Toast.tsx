import { useCallback, useRef, useState } from "react";

export interface ToastItem {
  id: string;
  message: string;
  tone: "success" | "danger" | "info";
  onUndo?: () => void;
}

/** Manages a stack of auto-dismissing toasts. Render <ToastStack /> once near the root of the page. */
export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const showToast = useCallback(
    (message: string, tone: ToastItem["tone"] = "info", onUndo?: () => void) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, message, tone, onUndo }]);
      timers.current[id] = setTimeout(() => dismiss(id), onUndo ? 6000 : 3500);
    },
    [dismiss]
  );

  return { toasts, showToast, dismiss };
}

const toneStyles: Record<ToastItem["tone"], string> = {
  success: "bg-emerald-600",
  danger: "bg-rose-600",
  info: "bg-slate-800",
};

export function ToastStack({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white shadow-lg ${toneStyles[toast.tone]}`}
        >
          <span>{toast.message}</span>
          {toast.onUndo && (
            <button
              type="button"
              onClick={() => {
                toast.onUndo?.();
                onDismiss(toast.id);
              }}
              className="rounded-md bg-white/15 px-2 py-1 text-xs font-semibold hover:bg-white/25"
            >
              Undo
            </button>
          )}
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss"
            className="text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}