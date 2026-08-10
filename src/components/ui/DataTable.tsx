import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function AppInput({
  className,
  ...props
}: Props) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full rounded-xl border border-slate-200 px-4 py-3 outline-none",
        "focus:ring-2 focus:ring-sky-400 focus:border-transparent",
        className
      )}
    />
  );
}