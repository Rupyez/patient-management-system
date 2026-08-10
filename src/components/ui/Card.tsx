import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?:boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-white p-6 shadow-sm border border-slate-200 transition-all duration-300',
        hover && 'hover:shadow-lg hover:border-slate-300',
        className
      )}
    >
      {children}
    </div>
  );
}
