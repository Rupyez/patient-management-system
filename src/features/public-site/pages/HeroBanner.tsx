// import { useState, type FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";

// /* ─────────────────────────────────────────────────────────────
//    ICONS
//    ───────────────────────────────────────────────────────────── */

// const iconBase = {
//   fill: "none",
//   stroke: "currentColor",
//   strokeWidth: 1.75,
//   strokeLinecap: "round" as const,
//   strokeLinejoin: "round" as const,
// };

// interface IconProps {
//   className?: string;
// }

// function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
//   return (
//     <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
//       <path d="M5 12h14M13 6l6 6-6 6" />
//     </svg>
//   );
// }

// function SearchIcon({ className = "h-5 w-5" }: IconProps) {
//   return (
//     <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
//       <circle cx="11" cy="11" r="7" />
//       <path d="m20 20-3.5-3.5" />
//     </svg>
//   );
// }

// function CheckIcon({ className = "h-4 w-4" }: IconProps) {
//   return (
//     <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
//       <path d="m5 13 4 4L19 7" />
//     </svg>
//   );
// }

// function ShieldCheckIcon({ className = "h-4 w-4" }: IconProps) {
//   return (
//     <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
//       <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" />
//       <path d="m9 12 2 2 4-4" />
//     </svg>
//   );
// }

// function StarIcon({ className = "h-4 w-4" }: IconProps) {
//   return (
//     <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
//       <path d="M12 2.5 14.9 9l6.6.5-5 4.4 1.5 6.6L12 17l-6 3.5 1.5-6.6-5-4.4L9.1 9 12 2.5Z" />
//     </svg>
//   );
// }

// /* ─────────────────────────────────────────────────────────────
//    HERO BANNER
//    ───────────────────────────────────────────────────────────── */

// export default function HeroBanner() {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");

//   function handleSearch(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const params = new URLSearchParams();
//     if (query.trim()) params.set("q", query.trim());
//     navigate(`/doctors${params.toString() ? `?${params.toString()}` : ""}`);
//   }

//   return (
//     <section className="relative overflow-hidden">
//       {/* Background layers */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/70 via-white to-white"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-32 right-[-10%] -z-10 h-[28rem] w-[28rem] rounded-full bg-sky-200/40 blur-3xl"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-emerald-100/40 blur-3xl"
//       />

//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
//         <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
//           {/* ── Copy ───────────────────────────────────── */}
//           <div>
//             {/* Eyebrow badge */}
//             <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur">
//               <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
//               Patient-first healthcare
//             </span>

//             {/* Headline */}
//             <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
//               Find the right doctor and book with{" "}
//               <span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">
//                 confidence.
//               </span>
//             </h1>

//             {/* Subhead */}
//             <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
//               Search by doctor, specialty, or symptom. Choose an available time,
//               review the appointment, and pay securely — all in one flow.
//             </p>

//             {/* Search bar */}
//             <form
//               onSubmit={handleSearch}
//               className="mt-8 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/5 sm:flex-row sm:items-center"
//               role="search"
//             >
//               <div className="relative flex-1">
//                 <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Doctor, specialty, or symptom…"
//                   aria-label="Search doctors"
//                   className="w-full rounded-xl border-0 bg-transparent py-3 pl-11 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition hover:bg-sky-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
//               >
//                 Search
//                 <ArrowRightIcon />
//               </button>
//             </form>

//             {/* Quick links */}
//             <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
//               <span className="font-medium text-slate-400">Popular:</span>
//               {["Cardiology", "Neurology", "Pediatrics", "Dermatology"].map((s) => (
//                 <Link
//                   key={s}
//                   to={`/doctors?specialty=${encodeURIComponent(s)}`}
//                   className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
//                 >
//                   {s}
//                 </Link>
//               ))}
//             </div>

//             {/* Trust row */}
//             <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-0.5 text-amber-500">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <StarIcon key={i} className="h-4 w-4" />
//                   ))}
//                 </div>
//                 <span>
//                   <strong className="font-semibold text-slate-700">4.9</strong> / 5
//                 </span>
//               </div>
//               <span className="hidden h-4 w-px bg-slate-200 sm:block" />
//               <span>
//                 Trusted by{" "}
//                 <strong className="font-semibold text-slate-700">24,000+</strong>{" "}
//                 patients
//               </span>
//               <span className="hidden h-4 w-px bg-slate-200 sm:block" />
//               <span className="inline-flex items-center gap-1.5">
//                 <ShieldCheckIcon className="h-4 w-4 text-emerald-500" />
//                 HIPAA compliant
//               </span>
//             </div>
//           </div>

//           {/* ── Visual ─────────────────────────────────── */}
//           <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
//             {/* Main image card */}
//             <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
//               <img
//                 src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1000&q=80"
//                 alt="Doctor consulting with a patient at CarePoint Clinic"
//                 className="h-[420px] w-full object-cover sm:h-[480px]"
//                 loading="eager"
//               />

//               {/* Bottom overlay info */}
//               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent p-5">
//                 <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
//                   <img
//                     src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80"
//                     alt=""
//                     className="h-10 w-10 rounded-xl object-cover"
//                   />
//                   <div className="min-w-0 flex-1">
//                     <p className="truncate text-sm font-semibold text-white">
//                       Dr. Emily Rodriguez
//                     </p>
//                     <p className="text-xs text-white/70">
//                       Radiology · Available today
//                     </p>
//                   </div>
//                   <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white">
//                     <span className="h-1.5 w-1.5 rounded-full bg-white" />
//                     Online
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Floating card — top left */}
//             <div className="absolute -left-3 top-6 hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:block">
//               <div className="flex items-center gap-2">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
//                   <CheckIcon className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-slate-400">Booking confirmed</p>
//                   <p className="text-sm font-semibold text-slate-800">
//                     Today, 9:30 AM
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Floating card — bottom right */}
//             <div className="absolute -right-3 bottom-8 hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:block">
//               <div className="flex items-center gap-2">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
//                   <ShieldCheckIcon className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-slate-400">Secure payments</p>
//                   <p className="text-sm font-semibold text-slate-800">
//                     256-bit encrypted
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }