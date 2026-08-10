import type{ ReactNode } from "react";
import clsx from "clsx";

interface AppContainerProps {
  children: ReactNode;
  className?: string;
}

export default function AppContainer({
  children,
  className,
}: AppContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-7xl px-6 py-6",
        className
      )}
    >
      {children}
    </div>
  );
}