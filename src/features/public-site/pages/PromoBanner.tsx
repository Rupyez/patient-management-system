import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PromoBannerProps {
  /** Unique key so multiple banners can be dismissed independently */
  storageKey?: string;
  message?: string;
  ctaLabel?: string;
  ctaTo?: string;
  variant?: "info" | "promo" | "success";
}

const VARIANTS = {
  info: {
    wrap: "bg-slate-900 text-white",
    accent: "text-sky-300",
    cta: "bg-white text-slate-900 hover:bg-slate-100",
    icon: "bg-sky-500/20 text-sky-300",
  },
  promo: {
    wrap: "bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 text-white",
    accent: "text-white/80",
    cta: "bg-white text-blue-700 hover:bg-blue-50",
    icon: "bg-white/15 text-white",
  },
  success: {
    wrap: "bg-emerald-600 text-white",
    accent: "text-white/80",
    cta: "bg-white text-emerald-700 hover:bg-emerald-50",
    icon: "bg-white/15 text-white",
  },
} as const;

export default function PromoBanner({
  storageKey = "carepoint:promo-banner",
  message = "New to CarePoint? Get $20 off your first consultation with code CARE20.",
  ctaLabel = "Book now",
  ctaTo = "/doctors",
  variant = "promo",
}: PromoBannerProps) {
  const [visible, setVisible] = useState(false);
  const style = VARIANTS[variant];

  // Only show if not dismissed before
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(storageKey);
      if (!dismissed) setVisible(true);
    } catch {
      // localStorage can throw in private mode — fail safe
      setVisible(true);
    }
  }, [storageKey]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className={`relative ${style.wrap}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg sm:flex ${style.icon}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
            </svg>
          </span>

          <p className="truncate text-xs font-medium sm:text-sm">
            {message}
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          <Link
            to={ctaTo}
            className={`hidden rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors sm:inline-block ${style.cta}`}
          >
            {ctaLabel}
          </Link>

          <button
            type="button"
            onClick={dismiss}
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${style.accent} hover:bg-white/10`}
            aria-label="Dismiss announcement"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile-only CTA row */}
      <div className="border-t border-white/10 px-4 py-2 sm:hidden">
        <Link
          to={ctaTo}
          className={`inline-block w-full rounded-lg py-2 text-center text-xs font-semibold transition-colors ${style.cta}`}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}