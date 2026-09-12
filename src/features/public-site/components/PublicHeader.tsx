import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/doctors", label: "Find Doctors" },
  { href: "/#services", label: "Services" },
  { to: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const actionLinks = [
  { to: "/login", label: "Log In", variant: "outline" as const },
  { to: "/doctors", label: "Book Appointment", variant: "solid" as const },
];

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Shadow + shrink on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-600"
        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/85 shadow-md backdrop-blur-md"
          : "border-transparent bg-white shadow-none"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <Link
          to="/"
          className="group flex items-center gap-2 text-lg font-bold text-slate-800 transition-colors hover:text-blue-600 sm:text-xl"
          aria-label="CarePoint Clinic home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white transition-transform group-hover:scale-105">
            C
          </span>
          <span className="whitespace-nowrap">CarePoint Clinic</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-1">
            {navLinks.map((link) =>
              link.to ? (
                <NavLink key={link.to} to={link.to} className={navLinkClass}>
                  {link.label}
                </NavLink>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            {actionLinks.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  action.variant === "solid"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 hover:shadow-md"
                    : "border border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                mobileOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-current transition-all duration-200 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                mobileOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* ── Overlay ────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          mobileOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile slide-in panel ─────────────────────── */}
      <aside
        id="mobile-menu"
        className={`fixed right-0 top-[57px] z-50 h-[calc(100dvh-57px)] w-[85%] max-w-sm overflow-y-auto border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col gap-6 p-6">
          {/* Close button (extra, always visible when open) */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </p>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
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

          <div className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.to ? (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6">
            {actionLinks.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className={`rounded-xl px-4 py-3 text-center text-sm font-semibold transition-colors ${
                  action.variant === "solid"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
                    : "border border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {action.label}
              </Link>
            ))}
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">Need help?</p>
            <p className="mt-1">
              Call us at{" "}
              <a
                href="tel:+17035550100"
                className="font-semibold text-blue-600 hover:underline"
              >
                (703) 555‑0100
              </a>
            </p>
          </div>
        </div>
      </aside>
    </header>
  );
}