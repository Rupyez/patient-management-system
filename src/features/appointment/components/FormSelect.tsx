import React from "react";

interface FormSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

export function FormSelect({ label, value, options, onChange, required, error }: FormSelectProps) {
  return (
    <label className="flex flex-1 flex-col gap-1.5 text-sm">
      <span className="font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 ${
          error
            ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100"
            : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </label>
  );
}