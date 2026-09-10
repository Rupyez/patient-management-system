import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   UI PRIMITIVES
   ───────────────────────────────────────────────────────────── */

function Container({ className = "", children }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants = {
  primary:
    "bg-sky-600 text-white shadow-sm shadow-sky-600/20 hover:bg-sky-700 hover:shadow-md hover:shadow-sky-600/30 focus-visible:ring-sky-500",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400",
  dark:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-700",
};

function Button({ to, href, variant = "primary", className = "", children, ...props }) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ICONS
   ───────────────────────────────────────────────────────────── */

const iconBase = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function ArrowRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CalendarIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}

function BellIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8Z" />
      <path d="M10.5 21a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function StarIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2.5 14.9 9l6.6.5-5 4.4 1.5 6.6L12 17l-6 3.5 1.5-6.6-5-4.4L9.1 9 12 2.5Z" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MapPinIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────── */

const specialties = [
  {
    name: "Neurology",
    description: "Headaches, migraines, and neurological conditions",
    count: 24,
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Radiology",
    description: "MRI, CT, ultrasound, and diagnostic imaging",
    count: 18,
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cardiology",
    description: "Heart and cardiovascular care",
    count: 31,
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Orthopedics",
    description: "Bones, joints, and musculoskeletal conditions",
    count: 22,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Radiology",
    rating: 4.9,
    reviews: 218,
    location: "Arlington, VA",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Dr. Michael Brown",
    specialty: "Cardiology",
    rating: 4.8,
    reviews: 174,
    location: "Alexandria, VA",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Dr. David Lee",
    specialty: "Neurology",
    rating: 4.9,
    reviews: 302,
    location: "Washington, DC",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Dr. Emily Carter",
    specialty: "Orthopedics",
    rating: 4.7,
    reviews: 156,
    location: "Fairfax, VA",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
  },
];

const journeySteps = [
  {
    icon: SearchIcon,
    title: "Find care",
    description: "Search doctors by specialty, symptom, or availability.",
  },
  {
    icon: CalendarIcon,
    title: "Book and pay",
    description: "Choose a time, review the details, and complete payment.",
  },
  {
    icon: BellIcon,
    title: "Stay informed",
    description:
      "Receive appointment confirmations, reminders, and future report notifications.",
  },
];

const trustStats = [
  { value: "120+", label: "Verified specialists" },
  { value: "24k+", label: "Appointments booked" },
  { value: "4.9/5", label: "Average patient rating" },
  { value: "HIPAA", label: "Compliant & secure" },
];

const testimonials = [
  {
    name: "Amanda Rivera",
    role: "Patient since 2022",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    quote:
      "Booking was effortless. I found a cardiologist near me, saw real availability, and paid in one flow. Follow-up reminders were spot on.",
  },
  {
    name: "Marcus Chen",
    role: "Patient since 2023",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    quote:
      "The radiology report showed up in the app the moment it was ready. No phone tag, no waiting rooms for paperwork. It just works.",
  },
  {
    name: "Priya Shah",
    role: "Patient since 2021",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    quote:
      "I've used three different clinic portals. CarePoint is the only one that actually respects my time and keeps everything in one place.",
  },
];

const faqs = [
  {
    q: "How do I know which specialist to choose?",
    a: "Search by specialty, symptom, or doctor name. Each doctor profile lists their focus areas, availability, and verified patient reviews so you can decide with confidence.",
  },
  {
    q: "Can I reschedule or cancel an appointment?",
    a: "Yes. You can reschedule or cancel from your patient dashboard at any time, up to two hours before the appointment. Refunds follow the clinic's cancellation policy.",
  },
  {
    q: "Is my medical information secure?",
    a: "All data is encrypted in transit and at rest. CarePoint is HIPAA-compliant and never shares your information without your explicit consent.",
  },
  {
    q: "Do you accept insurance?",
    a: "We accept most major insurance providers. You can verify coverage during checkout, and we'll show your out-of-pocket estimate before you confirm payment.",
  },
];

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */

export default function HomePage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [selectedSlot, setSelectedSlot] = useState("9:30");
  const [openFaq, setOpenFaq] = useState(0);

  const filteredDoctors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return doctors.filter((d) => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q);
      const matchesSpecialty =
        activeSpecialty === "All" || d.specialty === activeSpecialty;
      return matchesQuery && matchesSpecialty;
    });
  }, [query, activeSpecialty]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (activeSpecialty !== "All") params.set("specialty", activeSpecialty);
    navigate(`/doctors${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <main className="bg-white">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/70 via-white to-white"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl"
        />

        <Container className="py-20 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Badge>Patient-first healthcare</Badge>

              <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Find the right doctor and book your appointment with{" "}
                <span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">
                  confidence.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Search by doctor, specialty, or symptom. Choose an available
                time, review your appointment, and continue to secure payment.
              </p>

              {/* Live search bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="mt-8 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/5 sm:flex-row"
              >
                <div className="relative flex-1">
                  <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Doctor, specialty, or symptom…"
                    className="w-full rounded-xl border-0 bg-transparent py-3 pl-11 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <Button type="submit" variant="primary" className="sm:px-6">
                  Search
                  <ArrowRightIcon />
                </Button>
              </form>

              {/* Quick specialty chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["All", ...specialties.map((s) => s.name)].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActiveSpecialty(name)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      activeSpecialty === name
                        ? "bg-sky-600 text-white shadow-sm shadow-sky-600/30"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <span>
                  Trusted by{" "}
                  <strong className="font-semibold text-slate-700">
                    24,000+
                  </strong>{" "}
                  patients
                </span>
              </div>
            </div>

            {/* Interactive booking preview */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
                <div className="relative h-40 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1000&q=80"
                    alt="Modern clinic reception"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <p className="text-xs font-medium uppercase tracking-wider opacity-90">
                      Next available
                    </p>
                    <p className="text-sm font-semibold">
                      Dr. Sarah Johnson · Radiology
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Select a time
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Available
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {["9:00", "9:30", "10:00"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedSlot(time)}
                        className={`rounded-xl border px-3 py-2 text-center text-sm font-semibold transition ${
                          selectedSlot === time
                            ? "border-sky-500 bg-sky-50 text-sky-700"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="dark"
                    className="mt-6 w-full"
                    onClick={() =>
                      navigate(
                        `/doctors?specialty=Radiology&time=${encodeURIComponent(selectedSlot)}`
                      )
                    }
                  >
                    Confirm {selectedSlot} appointment
                  </Button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheckIcon className="h-3.5 w-3.5" />
                    Secure payment · HIPAA compliant
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block">
                <p className="text-xs text-slate-400">Reminder sent</p>
                <p className="text-sm font-semibold text-slate-800">
                  Tomorrow, 8:30 AM
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Trust bar ────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50/70">
        <Container className="py-8">
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Specialties with images ──────────────────────── */}
      <section>
        <Container className="py-20 lg:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Specialties"
              title="Popular specialties"
              description="Start with the type of care you need — filter doctors by specialty in a single tap."
            />
            <Button to="/doctors" variant="ghost" className="self-start">
              Browse all
              <ArrowRightIcon />
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((specialty) => (
              <button
                key={specialty.name}
                type="button"
                onClick={() =>
                  navigate(
                    `/doctors?specialty=${encodeURIComponent(specialty.name)}`
                  )
                }
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={specialty.image}
                    alt={specialty.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                    {specialty.count} doctors
                  </span>
                  <h3 className="absolute bottom-3 left-4 text-lg font-semibold text-white">
                    {specialty.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="flex-1 text-sm leading-6 text-slate-600">
                    {specialty.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 transition-colors group-hover:text-sky-700">
                    View doctors
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Featured doctors with live filter ────────────── */}
      <section className="bg-slate-50">
        <Container className="py-20 lg:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Top rated"
              title="Doctors available near you"
              description="Verified specialists with same-week availability."
            />
            <Button to="/doctors" variant="ghost" className="self-start">
              See all doctors
              <ArrowRightIcon />
            </Button>
          </div>

          <div className="mt-10">
            {filteredDoctors.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-sm font-medium text-slate-700">
                  No doctors match “{query}”.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveSpecialty("All");
                  }}
                  className="mt-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {filteredDoctors.map((doctor) => (
                  <article
                    key={doctor.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                        <StarIcon className="h-3 w-3 text-amber-500" />
                        {doctor.rating}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-semibold text-slate-900">
                        {doctor.name}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-sky-600">
                        {doctor.specialty}
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                        <MapPinIcon />
                        {doctor.location}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>{doctor.reviews} reviews</span>
                        <span className="font-semibold text-emerald-600">
                          Available today
                        </span>
                      </div>

                      <Button
                        to={`/doctors/${doctor.id}`}
                        variant="secondary"
                        className="mt-4 w-full"
                      >
                        Book appointment
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Journey ──────────────────────────────────────── */}
      <section className="bg-slate-900">
        <Container className="py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-sky-400">
              How it works
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Designed around your appointment journey
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-400">
              Three simple steps from finding care to staying informed.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-sky-400/40 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
                      <Icon />
                    </div>
                    <span className="font-mono text-sm font-semibold text-slate-500">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section>
        <Container className="py-20 lg:py-24">
          <SectionHeading
            eyebrow="Patient stories"
            title="Loved by patients and providers"
            description="Real feedback from people who use CarePoint every day."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 hover:shadow-md"
              >
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-7 text-slate-700">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ accordion ────────────────────────────────── */}
      <section className="bg-slate-50">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered"
              description="Everything you need to know before your first appointment."
            />

            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-slate-50"
                    >
                      <span className="text-sm font-semibold text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDownIcon
                        className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 text-sm leading-7 text-slate-600">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section>
        <Container className="py-20 lg:py-24">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-8 py-14 text-center sm:px-16">
            <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Ready to book your next appointment?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
              Find a specialist, pick a time that works, and confirm in under
              two minutes.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/doctors" variant="primary">
                Find a Doctor
                <ArrowRightIcon />
              </Button>
              <Button to="/login" variant="secondary">
                Log in to your account
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}