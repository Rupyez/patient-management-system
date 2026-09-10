import { useMemo, useState, type ReactNode } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  yearsExperience: number;
  fee: number;
  location: string;
  address: string;
  availability: "today" | "tomorrow" | "week";
  acceptingNew: boolean;
  verified: boolean;
  image: string;
  bio: string;
  languages: string[];
  conditions: string[];
  education: { degree: string; school: string; year: string }[];
  ratingBreakdown: Record<1 | 2 | 3 | 4 | 5, number>;
  reviewList: { id: number; name: string; rating: number; date: string; text: string }[];
}

interface IconProps {
  className?: string;
}

/* ─────────────────────────────────────────────────────────────
   DATA — swap with your API / shared doctors file
   ───────────────────────────────────────────────────────────── */

const DOCTORS: Record<string, Doctor> = {
  "d-001": {
    id: "d-001",
    name: "Dr. Emily Rodriguez",
    specialty: "Radiology",
    rating: 4.9,
    reviews: 52,
    yearsExperience: 9,
    fee: 160,
    location: "Arlington, VA",
    address: "1201 Wilson Blvd, Suite 400, Arlington, VA 22209",
    availability: "today",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
    bio: "Dr. Emily Rodriguez is a board-certified radiologist with nearly a decade of experience in diagnostic imaging. She focuses on MRI and CT interpretation, with special interest in musculoskeletal and abdominal imaging. Patients value her clear explanations and calm approach.",
    languages: ["English", "Spanish"],
    conditions: [
      "MRI & CT interpretation",
      "Musculoskeletal imaging",
      "Abdominal imaging",
      "Pre-surgical evaluation",
      "Second opinions",
    ],
    education: [
      { degree: "MD, Radiology", school: "Johns Hopkins University", year: "2016" },
      { degree: "Residency, Diagnostic Radiology", school: "Massachusetts General Hospital", year: "2020" },
      { degree: "Fellowship, Musculoskeletal Imaging", school: "Mayo Clinic", year: "2021" },
    ],
    ratingBreakdown: { 5: 44, 4: 6, 3: 2, 2: 0, 1: 0 },
    reviewList: [
      {
        id: 1,
        name: "Amanda R.",
        rating: 5,
        date: "2 weeks ago",
        text: "Dr. Rodriguez was incredibly thorough and explained every step of my MRI. The report was ready the same day.",
      },
      {
        id: 2,
        name: "Marcus C.",
        rating: 5,
        date: "1 month ago",
        text: "Punctual, professional, and genuinely kind. I didn't feel rushed at all.",
      },
      {
        id: 3,
        name: "Priya S.",
        rating: 4,
        date: "2 months ago",
        text: "Great care overall. Only downside was the lobby wait, but the consultation itself was excellent.",
      },
    ],
  },
  "d-002": {
    id: "d-002",
    name: "Dr. Sarah Johnson",
    specialty: "Radiology",
    rating: 4.8,
    reviews: 218,
    yearsExperience: 12,
    fee: 120,
    location: "Arlington, VA",
    address: "1201 Wilson Blvd, Suite 400, Arlington, VA 22209",
    availability: "today",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    bio: "Dr. Sarah Johnson is a board-certified radiologist with over a decade of experience in diagnostic imaging.",
    languages: ["English", "Spanish"],
    conditions: ["Headaches", "Back pain", "Sports injuries", "Stroke evaluation"],
    education: [
      { degree: "MD, Radiology", school: "Johns Hopkins University", year: "2013" },
      { degree: "Residency, Diagnostic Radiology", school: "Massachusetts General Hospital", year: "2017" },
    ],
    ratingBreakdown: { 5: 180, 4: 28, 3: 8, 2: 1, 1: 1 },
    reviewList: [
      { id: 1, name: "Amanda R.", rating: 5, date: "2 weeks ago", text: "Excellent care, clear communication." },
      { id: 2, name: "Marcus C.", rating: 5, date: "1 month ago", text: "Same-day report — very efficient." },
    ],
  },
};

const FALLBACK: Doctor = DOCTORS["d-001"];

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

function ArrowLeftIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function StarIcon({ className = "h-4 w-4", filled = true }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2.5 14.9 9l6.6.5-5 4.4 1.5 6.6L12 17l-6 3.5 1.5-6.6-5-4.4L9.1 9 12 2.5Z" />
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

function ClockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
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

function VerifiedIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M12 3l2 2 3-1 1 3 3 1-1 3 2 2-2 2 1 3-3 1-1 3-3-1-2 2-2-2-3 1-1-3-3-1 1-3-2-2 2-2-1-3 3-1 1-3 3 1 2-2Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function GraduationIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

function getUpcomingDays(count = 7): Date[] {
  const days: Date[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}

const SLOT_TIMES = [
  "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
];

function getSlotsForDay(dateKey: string) {
  const seed = dateKey.split("-").join("").slice(-2);
  const offset = Number(seed) % 5;
  return SLOT_TIMES.map((time, i) => ({
    time,
    available: (i + offset) % 3 !== 0,
  }));
}

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatFullDate(dateKey: string): string {
  const d = new Date(`${dateKey}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

/* ─────────────────────────────────────────────────────────────
   SMALL COMPONENTS
   ───────────────────────────────────────────────────────────── */

function RatingStars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} className={className} filled={i <= Math.round(rating)} />
      ))}
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
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

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */

export default function DoctorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const doctor: Doctor = (id && DOCTORS[id]) || FALLBACK;

  const days = useMemo(() => getUpcomingDays(7), []);
  const [selectedDate, setSelectedDate] = useState<string>(() => toDateKey(days[0]));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"about" | "availability" | "reviews">("about");

  const slots = useMemo(() => getSlotsForDay(selectedDate), [selectedDate]);

  function handleDateSelect(key: string) {
    setSelectedDate(key);
    setSelectedTime(null);
  }

  function handleContinue() {
    if (!selectedTime) return;
    const params = new URLSearchParams({ date: selectedDate, time: selectedTime });
    navigate(`/book/${doctor.id}?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-24 lg:pb-0">
      {/* Top bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeftIcon />
            Back to doctors
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
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

            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                {doctor.specialty} · {doctor.yearsExperience} years experience
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {doctor.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <RatingStars rating={doctor.rating} />
                  <span className="font-semibold text-slate-900">
                    {doctor.rating.toFixed(1)}
                  </span>
                  <span className="text-slate-500">({doctor.reviews} reviews)</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="text-slate-400" />
                  {doctor.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ClockIcon className="text-slate-400" />
                  Next available{" "}
                  {doctor.availability === "today"
                    ? "today"
                    : doctor.availability === "tomorrow"
                    ? "tomorrow"
                    : "this week"}
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
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            {/* Tabs */}
            <div className="border-b border-slate-200">
              <div className="flex gap-8 overflow-x-auto">
                <Tab active={activeTab === "about"} onClick={() => setActiveTab("about")}>
                  About
                </Tab>
                <Tab
                  active={activeTab === "availability"}
                  onClick={() => setActiveTab("availability")}
                >
                  Availability
                </Tab>
                <Tab active={activeTab === "reviews"} onClick={() => setActiveTab("reviews")}>
                  Reviews ({doctor.reviews})
                </Tab>
              </div>
            </div>

            <div className="mt-8">
              {activeTab === "about" && (
                <div className="space-y-10">
                  <section>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Education & training
                    </h2>
                    <div className="mt-4 space-y-4">
                      {doctor.education.map((e) => (
                        <div
                          key={e.degree}
                          className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                        >
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

                  <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <h3 className="text-sm font-semibold text-slate-900">Specializes in</h3>
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
                      <h3 className="text-sm font-semibold text-slate-900">Languages</h3>
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
                          <p className="text-sm font-semibold text-slate-900">
                            {doctor.location}
                          </p>
                          <p className="mt-0.5 text-sm text-slate-600">{doctor.address}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "availability" && (
                <div className="space-y-6">
                  {/* Week picker */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day) => {
                        const key = toDateKey(day);
                        const isSelected = key === selectedDate;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleDateSelect(key)}
                            className={`flex flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-xs font-medium transition ${
                              isSelected
                                ? "bg-sky-600 text-white shadow-sm shadow-sky-600/30"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <span className={isSelected ? "text-white/80" : "text-slate-400"}>
                              {day.toLocaleDateString("en-US", { weekday: "short" })}
                            </span>
                            <span className="text-base font-bold">{day.getDate()}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-semibold text-slate-900">
                      Available times — {formatFullDate(selectedDate)}
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {slots.map(({ time, available }) => {
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={!available}
                            onClick={() => setSelectedTime(time)}
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
                  </div>

                  <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-sm text-sky-900">
                    <p className="font-semibold">Same-day appointments</p>
                    <p className="mt-1 text-sky-800/80">
                      Struck-through times are already taken. Choose any highlighted slot to continue.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-[200px_1fr]">
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-6 text-center">
                      <p className="text-5xl font-bold text-slate-900">
                        {doctor.rating.toFixed(1)}
                      </p>
                      <RatingStars rating={doctor.rating} className="mt-2 h-4 w-4" />
                      <p className="mt-2 text-xs text-slate-500">
                        {doctor.reviews} patient reviews
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {([5, 4, 3, 2, 1] as const).map((star) => {
                        const count = doctor.ratingBreakdown[star] ?? 0;
                        const pct = doctor.reviews ? (count / doctor.reviews) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-3">
                            <span className="w-10 text-xs font-medium text-slate-500">
                              {star} star
                            </span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-amber-400"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="w-10 text-right text-xs text-slate-500">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-5">
                    {doctor.reviewList.map((r) => (
                      <article
                        key={r.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                            <p className="text-xs text-slate-400">{r.date}</p>
                          </div>
                          <RatingStars rating={r.rating} />
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{r.text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar booking panel */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Consultation fee
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    ${doctor.fee}
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

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selectedTime}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Continue to booking
                  <ArrowRightIcon />
                </button>

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
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white px-4 py-3 shadow-2xl lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-slate-500">Consultation</p>
            <p className="text-base font-bold text-slate-900">${doctor.fee}</p>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedTime}
            className="flex-1 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {selectedTime ? `Book ${formatTime12(selectedTime)}` : "Book appointment"}
          </button>
        </div>
      </div>
    </main>
  );
}