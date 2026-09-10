import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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
    "bg-sky-600 text-white shadow-sm shadow-sky-600/20 hover:bg-sky-700 hover:shadow-md focus-visible:ring-sky-500",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400",
  dark: "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-700",
};

function Button({ to, href, variant = "primary", className = "", children, ...props }) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`;
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{children}</a>;
  return <button className={classes} {...props}>{children}</button>;
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

const icon = (path) =>
  function Icon({ className = "h-5 w-5" }) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
        {path}
      </svg>
    );
  };

const ArrowLeftIcon = icon(<path d="M19 12H5M11 6l-6 6 6 6" />);
const ArrowRightIcon = icon(<path d="M5 12h14M13 6l6 6-6 6" />);
const MapPinIcon = icon(<><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></>);
const ClockIcon = icon(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
const VerifiedIcon = icon(<><path d="M12 3l2 2 3-1 1 3 3 1-1 3 2 2-2 2 1 3-3 1-1 3-3-1-2 2-2-2-3 1-1-3-3-1 1-3-2-2 2-2-1-3 3-1 1-3 3 1 2-2Z" /><path d="m9 12 2 2 4-4" /></>);
const CalendarIcon = icon(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 11h18" /></>);
const CheckIcon = icon(<path d="m5 13 4 4L19 7" />);
const ChevronLeftIcon = icon(<path d="m15 6-6 6 6 6" />);
const ChevronRightIcon = icon(<path d="m9 6 6 6-6 6" />);
const GraduationIcon = icon(<><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" /></>);
const BriefcaseIcon = icon(<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>);
const GlobeIcon = icon(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" /></>);

function StarIcon({ className = "h-4 w-4", filled = true }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2.5 14.9 9l6.6.5-5 4.4 1.5 6.6L12 17l-6 3.5 1.5-6.6-5-4.4L9.1 9 12 2.5Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   DATA (replace with API later)
   ───────────────────────────────────────────────────────────── */

const DOCTORS = {
  1: {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Radiology",
    rating: 4.9,
    reviewsCount: 218,
    location: "Arlington, VA",
    address: "1201 Wilson Blvd, Suite 400, Arlington, VA 22209",
    price: 120,
    experience: 12,
    verified: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    bio: "Dr. Sarah Johnson is a board-certified radiologist with over a decade of experience in diagnostic imaging. She specializes in MRI and CT interpretation, with a focus on neurological and musculoskeletal imaging. She is known for her clear communication and patient-first approach.",
    education: [
      { degree: "MD, Radiology", school: "Johns Hopkins University", year: "2013" },
      { degree: "Residency, Diagnostic Radiology", school: "Massachusetts General Hospital", year: "2017" },
      { degree: "Fellowship, Neuroradiology", school: "Mayo Clinic", year: "2019" },
    ],
    languages: ["English", "Spanish"],
    conditions: ["Headaches", "Back pain", "Sports injuries", "Stroke evaluation", "Tumor imaging"],
    reviews: [
      { id: 1, name: "Amanda R.", rating: 5, date: "2 weeks ago", text: "Dr. Johnson was incredibly thorough and explained every step of my MRI. She followed up with a clear summary I could actually understand." },
      { id: 2, name: "Marcus C.", rating: 5, date: "1 month ago", text: "Best radiology experience I've had. Punctual, professional, and the report was ready the same day." },
      { id: 3, name: "Priya S.", rating: 4, date: "2 months ago", text: "Very knowledgeable and kind. The only downside was the wait time in the lobby, but the care itself was excellent." },
    ],
    ratingBreakdown: { 5: 180, 4: 28, 3: 8, 2: 1, 1: 1 },
  },
};

// Fallback if id not in map — reuse first doctor with modified name
const FALLBACK_DOCTOR = DOCTORS[1];

/* ─────────────────────────────────────────────────────────────
   AVAILABILITY HELPERS
   ───────────────────────────────────────────────────────────── */

function getUpcomingDays(count = 7) {
  const days = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}

const SLOTS = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

// Deterministic "availability" per day so it doesn't change on re-render
function getSlotsForDay(dateStr) {
  const seed = dateStr.split("-").join("") % 5;
  return SLOTS.map((time, i) => ({
    time,
    available: (i + Number(seed)) % 3 !== 0,
  }));
}

function formatDayLabel(date) {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function formatDayNumber(date) {
  return date.getDate();
}

function formatMonthYear(date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatFullDate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatTime12(time) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
   ───────────────────────────────────────────────────────────── */

function RatingStars({ rating, className = "h-4 w-4" }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} className={className} filled={i <= Math.round(rating)} />
      ))}
    </div>
  );
}

function Tab({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative whitespace-nowrap px-1 pb-4 text-sm font-semibold transition ${
        active ? "text-sky-600" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-sky-600" />
      )}
    </button>
  );
}

function WeekPicker({ days, selectedKey, onSelect }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-sm font-semibold text-slate-900">
          {formatMonthYear(days[0])}
        </p>
        <div className="flex items-center gap-1">
          <button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" disabled>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" disabled>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = toDateKey(day);
          const isSelected = key === selectedKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-xs font-medium transition ${
                isSelected
                  ? "bg-sky-600 text-white shadow-sm shadow-sky-600/30"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className={isSelected ? "text-white/80" : "text-slate-400"}>
                {formatDayLabel(day)}
              </span>
              <span className="text-base font-bold">{formatDayNumber(day)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SlotGrid({ slots, selectedTime, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map(({ time, available }) => {
        const isSelected = selectedTime === time;
        return (
          <button
            key={time}
            type="button"
            disabled={!available}
            onClick={() => onSelect(time)}
            className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
              !available
                ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through"
                : isSelected
                ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm shadow-sky-100"
                : "border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50/50"
            }`}
          >
            {formatTime12(time)}
          </button>
        );
      })}
    </div>
  );
}

function BookingPanel({ doctor, selectedDate, selectedTime, onBook }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Consultation fee
        </p>
        <p className="text-2xl font-bold text-slate-900">
          ${doctor.price}
          <span className="text-sm font-normal text-slate-400"> / visit</span>
        </p>
      </div>

      <div className="mt-5 space-y-3 rounded-xl bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <CalendarIcon className="h-4 w-4 text-slate-400" />
          {selectedDate ? formatFullDate(selectedDate) : "Select a date"}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <ClockIcon className="h-4 w-4 text-slate-400" />
          {selectedTime ? formatTime12(selectedTime) : "Select a time"}
        </div>
      </div>

      <Button
        variant="primary"
        className="mt-5 w-full"
        disabled={!selectedDate || !selectedTime}
        onClick={onBook}
      >
        Continue to booking
        <ArrowRightIcon />
      </Button>

      <p className="mt-3 text-center text-xs text-slate-400">
        No payment required until confirmation
      </p>

      <div className="mt-5 space-y-2 border-t border-slate-100 pt-5">
        {[
          "Free cancellation up to 2 hours before",
          "Verified & HIPAA compliant",
          "Instant email confirmation",
        ].map((line) => (
          <div key={line} className="flex items-start gap-2 text-xs text-slate-500">
            <CheckIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSection({ doctor }) {
  const total = doctor.reviewsCount;
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[200px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-6 text-center">
          <p className="text-5xl font-bold text-slate-900">{doctor.rating.toFixed(1)}</p>
          <RatingStars rating={doctor.rating} className="mt-2 h-4 w-4" />
          <p className="mt-2 text-xs text-slate-500">{total} patient reviews</p>
        </div>

        <div className="space-y-2.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = doctor.ratingBreakdown[star] || 0;
            const pct = total ? (count / total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="w-10 text-xs font-medium text-slate-500">{star} star</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-10 text-right text-xs text-slate-500">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-5">
        {doctor.reviews.map((r) => (
          <article key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                <p className="text-xs text-slate-400">{r.date}</p>
              </div>
              <RatingStars rating={r.rating} className="h-4 w-4" />
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{r.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */

export default function DoctorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = DOCTORS[id] || { ...FALLBACK_DOCTOR, id: Number(id) || FALLBACK_DOCTOR.id };

  const days = useMemo(() => getUpcomingDays(7), []);
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(days[0]));
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  const slots = useMemo(() => getSlotsForDay(selectedDate), [selectedDate]);

  // Reset time whenever date changes
  function handleDateSelect(key) {
    setSelectedDate(key);
    setSelectedTime(null);
  }

  function handleBook() {
    if (!selectedDate || !selectedTime) return;
    const params = new URLSearchParams({ date: selectedDate, time: selectedTime });
    navigate(`/book/${doctor.id}?${params.toString()}`);
  }

  return (
    <main className="bg-slate-50 pb-24 lg:pb-0">
      {/* ── Top bar ──────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white">
        <Container className="py-4">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to doctors
          </Link>
        </Container>
      </div>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            {/* Photo */}
            <div className="relative mx-auto w-full max-w-xs lg:mx-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="aspect-square w-full rounded-3xl object-cover shadow-lg shadow-slate-900/10"
              />
              {doctor.verified && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur">
                  <VerifiedIcon className="h-3.5 w-3.5" />
                  Verified
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600">
                <span>{doctor.specialty}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{doctor.experience} years experience</span>
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {doctor.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <RatingStars rating={doctor.rating} className="h-4 w-4" />
                  <span className="font-semibold text-slate-900">{doctor.rating.toFixed(1)}</span>
                  <span className="text-slate-500">({doctor.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="h-4 w-4 text-slate-400" />
                  {doctor.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4 text-slate-400" />
                  Next available today
                </span>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
                {doctor.bio}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {doctor.conditions.slice(0, 4).map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Body ─────────────────────────────────────── */}
      <Container className="py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main column */}
          <div>
            {/* Tabs */}
            <div className="border-b border-slate-200">
              <div className="flex gap-8 overflow-x-auto">
                <Tab active={activeTab === "about"} onClick={() => setActiveTab("about")}>
                  About
                </Tab>
                <Tab active={activeTab === "availability"} onClick={() => setActiveTab("availability")}>
                  Availability
                </Tab>
                <Tab active={activeTab === "reviews"} onClick={() => setActiveTab("reviews")}>
                  Reviews ({doctor.reviewsCount})
                </Tab>
              </div>
            </div>

            {/* Tab content */}
            <div className="mt-8">
              {activeTab === "about" && (
                <div className="space-y-10">
                  {/* Education */}
                  <section>
                    <h2 className="text-lg font-semibold text-slate-900">Education & training</h2>
                    <div className="mt-4 space-y-4">
                      {doctor.education.map((e) => (
                        <div key={e.degree} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                            <GraduationIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{e.degree}</p>
                            <p className="mt-0.5 text-sm text-slate-600">{e.school}</p>
                            <p className="mt-0.5 text-xs text-slate-400">Class of {e.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Specialties & languages */}
                  <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="flex items-center gap-2 text-slate-900">
                        <BriefcaseIcon className="h-4 w-4 text-sky-600" />
                        <h3 className="text-sm font-semibold">Specializes in</h3>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {doctor.conditions.map((c) => (
                          <li key={c} className="flex items-center gap-2">
                            <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="flex items-center gap-2 text-slate-900">
                        <GlobeIcon className="h-4 w-4 text-sky-600" />
                        <h3 className="text-sm font-semibold">Languages</h3>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {doctor.languages.map((l) => (
                          <li key={l} className="flex items-center gap-2">
                            <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
                            {l}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* Location */}
                  <section>
                    <h2 className="text-lg font-semibold text-slate-900">Practice location</h2>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <div className="aspect-[16/8] w-full bg-slate-100">
                        <img
                          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                          alt="Clinic location"
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-start gap-3 p-5">
                        <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{doctor.location}</p>
                          <p className="mt-0.5 text-sm text-slate-600">{doctor.address}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "availability" && (
                <div className="space-y-6">
                  <WeekPicker days={days} selectedKey={selectedDate} onSelect={handleDateSelect} />

                  <div>
                    <p className="mb-3 text-sm font-semibold text-slate-900">
                      Available times — {formatFullDate(selectedDate)}
                    </p>
                    <SlotGrid slots={slots} selectedTime={selectedTime} onSelect={setSelectedTime} />
                  </div>

                  <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-sm text-sky-900">
                    <p className="font-semibold">Same-day appointments</p>
                    <p className="mt-1 text-sky-800/80">
                      Slots marked with a strike-through are already taken. Choose any highlighted
                      time to continue.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && <ReviewsSection doctor={doctor} />}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <BookingPanel
                doctor={doctor}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onBook={handleBook}
              />
            </div>
          </aside>
        </div>
      </Container>

      {/* ── Mobile bottom bar ───────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white px-4 py-3 shadow-2xl lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-slate-500">Consultation</p>
            <p className="text-base font-bold text-slate-900">${doctor.price}</p>
          </div>
          <Button
            variant="primary"
            onClick={handleBook}
            disabled={!selectedDate || !selectedTime}
            className="flex-1"
          >
            {selectedTime ? `Book ${formatTime12(selectedTime)}` : "Book appointment"}
          </Button>
        </div>
      </div>
    </main>
  );
}