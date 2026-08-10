import { AlertTriangle, X } from 'lucide-react';
import AppButton from './AppButton';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="rounded-lg p-1 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <AppButton variant="secondary" onClick={onCancel}>
            {cancelText}
          </AppButton>
          <AppButton variant="danger" onClick={onConfirm}>
            {confirmText}
          </AppButton>
        </div>
      </div>
    </div>
  );
}