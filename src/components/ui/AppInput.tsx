import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export default function AppInput({
  label,
  error,
  className = '',
  required,
  ...props
}: AppInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          'h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400',
          'focus:border-sky-500 focus:ring-2 focus:ring-sky-100',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}