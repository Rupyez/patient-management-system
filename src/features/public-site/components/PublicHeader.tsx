import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/doctors", label: "Find Doctors" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const actionLinks = [
  { to: "/login", label: "Log In", variant: "outline" },
  { to: "/doctors", label: "Book Appointment", variant: "solid" },
];

export default function PublicHeader() {
  return (
    <header className="bg-white shadow-sm">
      <nav
        className=" sticky top-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
        aria-label="Main navigation"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors"
          >
            CarePoint Clinic
          </Link>

          {/* Navigation + Actions container */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* Nav links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {navLinks.map((link) =>
                link.to ? (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-600 hover:text-blue-600"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {actionLinks.map((action) => (
                <Link
                  key={action.to}
                  to={action.to}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    action.variant === "solid"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}