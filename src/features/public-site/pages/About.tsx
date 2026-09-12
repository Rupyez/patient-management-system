import { Link } from "react-router-dom";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────
   ICONS
   ───────────────────────────────────────────────────────────── */

const iconBase = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

interface IconProps {
  className?: string;
}

function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function HeartIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M12 20.5s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10.5c0 5.5-7 10-7 10Z" />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function UsersIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 8.5a3 3 0 1 1 0 6" />
      <path d="M21.5 20a5 5 0 0 0-4-4.9" />
    </svg>
  );
}

function SparklesIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}

function MapPinIcon({ className = "h-4 w-4" }: IconProps) {
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

interface Value {
  icon: (p: IconProps) => ReactNode;
  title: string;
  body: string;
}

const VALUES: Value[] = [
  {
    icon: HeartIcon,
    title: "Patient first, always",
    body: "Every decision starts with the patient experience — from how fast we answer the phone to how clearly we explain a diagnosis.",
  },
  {
    icon: ShieldIcon,
    title: "Privacy by default",
    body: "Your medical data is encrypted, HIPAA-compliant, and never shared without your explicit consent. Ever.",
  },
  {
    icon: UsersIcon,
    title: "Care as a team",
    body: "Specialists, nurses, and coordinators work as one unit. You're never handed off — you're handed forward.",
  },
  {
    icon: SparklesIcon,
    title: "Modern, not complicated",
    body: "We bring technology that actually helps — same-day booking, digital reports, automated reminders — without the clutter.",
  },
];

interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

const TIMELINE: TimelineEntry[] = [
  {
    year: "2018",
    title: "A clinic opens in Arlington",
    body: "Two doctors, one nurse, and a shared belief that patients deserve better than a phone-tag booking process.",
  },
  {
    year: "2020",
    title: "Going digital",
    body: "We launched our first patient portal — online booking, digital intake, and secure messaging in one place.",
  },
  {
    year: "2022",
    title: "Growing the network",
    body: "Expanded to five locations across Virginia and Maryland, with 60+ verified specialists on staff.",
  },
  {
    year: "2024",
    title: "24,000 patients and counting",
    body: "Rebuilt the entire platform around patient feedback: same-week availability, transparent pricing, instant reports.",
  },
];

interface Leader {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const LEADERSHIP: Leader[] = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    bio: "Board-certified radiologist with 12 years of experience. Leads our clinical standards and quality programs.",
  },
  {
    name: "Dr. Michael Brown",
    role: "Head of Cardiology",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    bio: "Interventional cardiologist. Champions preventive care and same-day diagnostics for high-risk patients.",
  },
  {
    name: "Amanda Foster",
    role: "Director of Patient Experience",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Fifteen years designing healthcare journeys. Obsessed with cutting the time between symptom and answer.",
  },
  {
    name: "Marcus Reed",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: "Runs our clinics across Virginia and Maryland. Ensures every location meets the same CarePoint standard.",
  },
];

const STATS = [
  { value: "24k+", label: "Patients served" },
  { value: "120+", label: "Verified specialists" },
  { value: "5", label: "Locations" },
  { value: "4.9/5", label: "Average rating" },
];

const HIGHLIGHTS = [
  "Board-certified specialists across 8+ fields",
  "Same-week appointments, most days",
  "Digital reports delivered to your dashboard",
  "HIPAA-compliant, end-to-end encrypted",
];

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */

export default function About() {
  return (
    <main className="bg-white">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/70 via-white to-white"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-[-10%] -z-10 h-[26rem] w-[26rem] rounded-full bg-sky-200/40 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-700">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-700">About</span>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            Our story
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Healthcare that respects your time, your body, and your{" "}
            <span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">
              privacy.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            CarePoint Clinic started with a simple frustration: it shouldn't take
            three phone calls to see a doctor. Seven years later, we're a network
            of five clinics and 120+ specialists — still obsessed with that same
            problem.
          </p>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {s.label}
                </dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Story with image ────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80"
                alt="CarePoint Clinic reception"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-slate-900/10"
                loading="lazy"
              />

              <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Average wait</p>
                    <p className="text-base font-bold text-slate-900">
                      Under 8 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
                Why we exist
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Care that fits into your life — not the other way around.
              </h2>

              <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                <p>
                  Most clinics were built around paperwork. We rebuilt ours around
                  people. From the moment you open our site to the second you walk
                  out of a consultation, every step is designed to reduce friction.
                </p>
                <p>
                  We combine board-certified specialists with a modern, digital-first
                  experience: same-week availability, transparent pricing, secure
                  reports in your dashboard, and reminders that actually arrive on
                  time.
                </p>
                <p>
                  The result is a clinic you don't have to think about — just one
                  you can rely on.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {HIGHLIGHTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/doctors"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition hover:bg-sky-700"
                >
                  Find a doctor
                  <ArrowRightIcon />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <MapPinIcon />
                  Visit us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────── */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
              What we stand for
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Four values, applied to every appointment.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              These aren't slogans on a wall — they're the standards we measure
              ourselves against, every single day.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <article
                  key={v.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-200/60"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-slate-900">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{v.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
              Our journey
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Seven years of building better care.
            </h2>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <li key={t.year} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white shadow-sm shadow-sky-600/30">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wider text-sky-600">
                    {t.year}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Leadership ──────────────────────────────────── */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
              Leadership
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              The people behind the clinic.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Clinicians, operators, and designers who care deeply about the
              patient experience.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((p) => (
              <article
                key={p.name}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-900">
                    {p.name}
                  </h3>
                  <p className="text-sm font-medium text-sky-600">{p.role}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{p.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-6 py-14 text-center sm:px-16">
            <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Ready to experience the difference?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
              Find a specialist, pick a time that works, and confirm in under two
              minutes.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/doctors"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition hover:bg-sky-700"
              >
                Find a Doctor
                <ArrowRightIcon />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}