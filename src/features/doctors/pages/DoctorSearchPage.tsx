import { useMemo, useState, useEffect, type ChangeEvent } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

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
  availability: "today" | "tomorrow" | "week";
  acceptingNew: boolean;
  verified: boolean;
  image: string;
}

interface Filters {
  specialties: string[];
  availability: string[];
  locations: string[];
  minRating: number;
  maxFee: number;
  verifiedOnly: boolean;
  acceptingNewOnly: boolean;
}

type SortKey = "rating" | "reviews" | "fee-asc" | "fee-desc" | "experience";

interface Filters {
  specialties: string[];
  availability: string[];
  locations: string[];
  minRating: number;
  maxFee: number;
  verifiedOnly: boolean;
  acceptingNewOnly: boolean;
}

/* ─────────────────────────────────────────────────────────────
   DATA (replace with API later)
   ───────────────────────────────────────────────────────────── */

const ALL_DOCTORS: Doctor[] = [
  {
    id: "d-001",
    name: "Dr. Emily Rodriguez",
    specialty: "Radiology",
    rating: 4.9,
    reviews: 52,
    yearsExperience: 9,
    fee: 160,
    location: "Arlington, VA",
    availability: "today",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-002",
    name: "Dr. Sarah Johnson",
    specialty: "Radiology",
    rating: 4.8,
    reviews: 218,
    yearsExperience: 12,
    fee: 120,
    location: "Arlington, VA",
    availability: "today",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-003",
    name: "Dr. Michael Brown",
    specialty: "Cardiology",
    rating: 4.8,
    reviews: 174,
    yearsExperience: 15,
    fee: 180,
    location: "Alexandria, VA",
    availability: "today",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-004",
    name: "Dr. David Lee",
    specialty: "Neurology",
    rating: 4.9,
    reviews: 302,
    yearsExperience: 18,
    fee: 200,
    location: "Washington, DC",
    availability: "tomorrow",
    acceptingNew: false,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-005",
    name: "Dr. Olivia Bennett",
    specialty: "Pediatrics",
    rating: 4.9,
    reviews: 287,
    yearsExperience: 14,
    fee: 110,
    location: "Bethesda, MD",
    availability: "today",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-006",
    name: "Dr. James Whitfield",
    specialty: "General Medicine",
    rating: 4.8,
    reviews: 412,
    yearsExperience: 9,
    fee: 90,
    location: "Arlington, VA",
    availability: "today",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-007",
    name: "Dr. Hannah Kim",
    specialty: "Dermatology",
    rating: 4.9,
    reviews: 341,
    yearsExperience: 11,
    fee: 140,
    location: "Alexandria, VA",
    availability: "today",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-008",
    name: "Dr. Marcus Reed",
    specialty: "Psychiatry",
    rating: 4.7,
    reviews: 129,
    yearsExperience: 16,
    fee: 210,
    location: "Fairfax, VA",
    availability: "tomorrow",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-009",
    name: "Dr. Nina Alvarez",
    specialty: "Neurology",
    rating: 4.8,
    reviews: 203,
    yearsExperience: 13,
    fee: 195,
    location: "Bethesda, MD",
    availability: "today",
    acceptingNew: false,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-010",
    name: "Dr. Aaron Patel",
    specialty: "Cardiology",
    rating: 4.6,
    reviews: 98,
    yearsExperience: 8,
    fee: 175,
    location: "Washington, DC",
    availability: "week",
    acceptingNew: true,
    verified: false,
    image:
      "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-011",
    name: "Dr. Grace Park",
    specialty: "Pediatrics",
    rating: 4.8,
    reviews: 244,
    yearsExperience: 10,
    fee: 105,
    location: "Fairfax, VA",
    availability: "today",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "d-012",
    name: "Dr. Sophia Nguyen",
    specialty: "General Medicine",
    rating: 4.9,
    reviews: 366,
    yearsExperience: 12,
    fee: 95,
    location: "Washington, DC",
    availability: "today",
    acceptingNew: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=400&q=80",
  },
];

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

function useDebouncedValue<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const SPECIALTY_OPTIONS = Array.from(
  new Set(ALL_DOCTORS.map((d) => d.specialty))
).sort();

const LOCATION_OPTIONS = Array.from(
  new Set(ALL_DOCTORS.map((d) => d.location))
).sort();

const AVAILABILITY_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "week", label: "This week" },
] as const;

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "rating", label: "Highest rated" },
  { value: "reviews", label: "Most reviewed" },
  { value: "fee-asc", label: "Fee: low to high" },
  { value: "fee-desc", label: "Fee: high to low" },
  { value: "experience", label: "Most experienced" },
];

const EMPTY_FILTERS: Filters = {
  specialties: [],
  availability: [],
  locations: [],
  minRating: 0,
  maxFee: 250,
  verifiedOnly: false,
  acceptingNewOnly: false,
};

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

function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function StarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
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

function FilterIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M3 5h18M6 12h12M10 19h4" />
    </svg>
  );
}

function XIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="M6 6l12 12M18 6l-12 12" />
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

function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   FILTER SUBCOMPONENTS
   ───────────────────────────────────────────────────────────── */

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-100 py-5 first:pt-0 last:border-0 last:pb-0">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-slate-700 hover:text-slate-900">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0"
      />
      {label}
    </label>
  );
}

function FilterPanel({
  filters,
  setFilter,
  clearAll,
}: {
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  clearAll: () => void;
}) {
  function toggleArray(key: "specialties" | "availability" | "locations", value: string) {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilter(key, next);
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-sm font-bold text-slate-900">Filters</h2>
        <button
          type="button"
          onClick={clearAll}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700"
        >
          Clear all
        </button>
      </div>

      <FilterSection title="Availability">
        {AVAILABILITY_OPTIONS.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            checked={filters.availability.includes(opt.value)}
            onChange={() => toggleArray("availability", opt.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Specialty">
        {SPECIALTY_OPTIONS.map((sp) => (
          <Checkbox
            key={sp}
            label={sp}
            checked={filters.specialties.includes(sp)}
            onChange={() => toggleArray("specialties", sp)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Location">
        {LOCATION_OPTIONS.map((loc) => (
          <Checkbox
            key={loc}
            label={loc}
            checked={filters.locations.includes(loc)}
            onChange={() => toggleArray("locations", loc)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Minimum rating">
        <div className="flex flex-wrap gap-2">
          {[4.5, 4.7, 4.8, 4.9].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setFilter("minRating", filters.minRating === r ? 0 : r)}
              className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                filters.minRating === r
                  ? "border-sky-500 bg-sky-50 text-sky-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <StarIcon className="h-3 w-3 text-amber-500" />
              {r}+
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Consultation fee">
        <div className="px-1">
          <input
            type="range"
            min={50}
            max={250}
            step={10}
            value={filters.maxFee}
            onChange={(e) => setFilter("maxFee", Number(e.target.value))}
            className="w-full accent-sky-600"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>$50</span>
            <span className="font-semibold text-slate-700">
              up to ${filters.maxFee}
            </span>
            <span>$250</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Preferences">
        <Checkbox
          label="Verified providers only"
          checked={filters.verifiedOnly}
          onChange={() => setFilter("verifiedOnly", !filters.verifiedOnly)}
        />
        <Checkbox
          label="Accepting new patients"
          checked={filters.acceptingNewOnly}
          onChange={() => setFilter("acceptingNewOnly", !filters.acceptingNewOnly)}
        />
      </FilterSection>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DOCTOR CARD
   ───────────────────────────────────────────────────────────── */

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const navigate = useNavigate();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-200/60">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {doctor.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur">
            <VerifiedIcon className="h-3.5 w-3.5" />
            Verified
          </span>
        )}

        {doctor.acceptingNew && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/95 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur">
            <CheckIcon className="h-3.5 w-3.5" />
            New patients
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-slate-900">{doctor.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-sky-600">{doctor.specialty}</p>

        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
            <StarIcon className="h-3.5 w-3.5 text-amber-500" />
            {doctor.rating.toFixed(1)}
          </span>
          <span className="text-slate-400">({doctor.reviews} reviews)</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <MapPinIcon className="h-3.5 w-3.5" />
            {doctor.location}
          </span>
          <span>{doctor.yearsExperience} yrs exp.</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-400">Consultation fee</p>
            <p className="text-base font-bold text-slate-900">
              ${doctor.fee}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Next available</p>
            <p className="text-sm font-semibold text-emerald-600 capitalize">
              {doctor.availability === "today"
                ? "Today"
                : doctor.availability === "tomorrow"
                ? "Tomorrow"
                : "This week"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/doctors/${doctor.id}`}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            View Profile
          </Link>
          <button
            type="button"
            onClick={() => navigate(`/doctors/${doctor.id}`)}
            className="flex-1 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition hover:bg-sky-700"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */

export default function FindDoctors() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const debouncedQuery = useDebouncedValue(query, 200);

  const [sort, setSort] = useState<SortKey>("rating");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>(() => {
    const fromUrl = searchParams.get("specialty");
    return {
      ...EMPTY_FILTERS,
      specialties: fromUrl ? [fromUrl] : [],
    };
  });

  // URL sync (shareable)
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery.trim()) params.set("q", debouncedQuery.trim());
    if (filters.specialties.length === 1)
      params.set("specialty", filters.specialties[0]);
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, filters.specialties, setSearchParams]);

  function setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function clearAll() {
    setFilters(EMPTY_FILTERS);
    setQuery("");
    setSort("rating");
    setPage(1);
  }

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    const result = ALL_DOCTORS.filter((d) => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q);

      const matchesAvailability =
        filters.availability.length === 0 ||
        filters.availability.includes(d.availability);

      const matchesSpecialty =
        filters.specialties.length === 0 ||
        filters.specialties.includes(d.specialty);

      const matchesLocation =
        filters.locations.length === 0 || filters.locations.includes(d.location);

      const matchesRating = d.rating >= filters.minRating;
      const matchesFee = d.fee <= filters.maxFee;
      const matchesVerified = !filters.verifiedOnly || d.verified;
      const matchesNew = !filters.acceptingNewOnly || d.acceptingNew;

      return (
        matchesQuery &&
        matchesAvailability &&
        matchesSpecialty &&
        matchesLocation &&
        matchesRating &&
        matchesFee &&
        matchesVerified &&
        matchesNew
      );
    });

    result.sort((a, b) => {
      switch (sort) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        case "fee-asc":
          return a.fee - b.fee;
        case "fee-desc":
          return b.fee - a.fee;
        case "experience":
          return b.yearsExperience - a.yearsExperience;
        default:
          return 0;
      }
    });

    return result;
  }, [debouncedQuery, filters, sort]);

  const PAGE_SIZE = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeChips = useMemo(() => {
    const chips: { type: keyof Filters | "query"; value: string; label: string }[] = [];

    filters.availability.forEach((v) => {
      const label =
        AVAILABILITY_OPTIONS.find((o) => o.value === v)?.label || v;
      chips.push({ type: "availability", value: v, label });
    });
    filters.specialties.forEach((v) =>
      chips.push({ type: "specialties", value: v, label: v })
    );
    filters.locations.forEach((v) =>
      chips.push({ type: "locations", value: v, label: v })
    );
    if (filters.minRating > 0)
      chips.push({
        type: "minRating",
        value: String(filters.minRating),
        label: `${filters.minRating}+ stars`,
      });
    if (filters.maxFee < 250)
      chips.push({
        type: "maxFee",
        value: String(filters.maxFee),
        label: `≤ $${filters.maxFee}`,
      });
    if (filters.verifiedOnly)
      chips.push({ type: "verifiedOnly", value: "1", label: "Verified" });
    if (filters.acceptingNewOnly)
      chips.push({ type: "acceptingNewOnly", value: "1", label: "New patients" });

    return chips;
  }, [filters]);

  function removeChip(type: keyof Filters | "query", value: string) {
    if (type === "query") {
      setQuery("");
      return;
    }
    if (type === "minRating") return setFilter("minRating", 0);
    if (type === "maxFee") return setFilter("maxFee", 250);
    if (type === "verifiedOnly") return setFilter("verifiedOnly", false);
    if (type === "acceptingNewOnly") return setFilter("acceptingNewOnly", false);

    const arr = filters[type] as string[];
    setFilter(type as "specialties" | "availability" | "locations", arr.filter((v) => v !== value));
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-700">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-700">Find a doctor</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find a Doctor
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600">
            Search by doctor name, specialty, or the type of care you need.
          </p>

          {/* Search + sort + mobile filter trigger */}
          <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Doctor, specialty, or symptom"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 lg:hidden"
            >
              <FilterIcon className="h-4 w-4" />
              Filters
              {activeChips.length > 0 && (
                <span className="rounded-full bg-sky-600 px-2 py-0.5 text-xs text-white">
                  {activeChips.length}
                </span>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6">
              <FilterPanel filters={filters} setFilter={setFilter} clearAll={clearAll} />
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600">
                <strong className="font-semibold text-slate-900">
                  {filtered.length}
                </strong>{" "}
                {filtered.length === 1 ? "doctor" : "doctors"} found
              </p>
            </div>

            {/* Active chips */}
            {activeChips.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {activeChips.map((chip) => (
                  <button
                    key={`${chip.type}-${chip.value}`}
                    type="button"
                    onClick={() => removeChip(chip.type, chip.value)}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    {chip.label}
                    <XIcon className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  Clear all
                </button>
              </div>
            )}

            {paginated.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                  <SearchIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  No doctors match your filters
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  Try adjusting your search terms, widening the price range, or removing some filters.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-6 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {paginated.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      const p = i + 1;
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPage(p)}
                          className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                            page === p
                              ? "bg-sky-600 text-white"
                              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => p + 1)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <FilterPanel filters={filters} setFilter={setFilter} clearAll={clearAll} />
            <div className="mt-6 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}