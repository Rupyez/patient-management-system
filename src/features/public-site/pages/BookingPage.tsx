import { useMemo, useState, type ReactNode, type ChangeEvent, type FormEvent } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  address: string;
  fee: number;
  image: string;
}

interface Patient {
  fullName: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

type PaymentMethod = "Credit card" | "Debit card" | "Pay at clinic";

interface Insurance {
  provider: string;
  memberId: string;
  groupNumber: string;
  method: PaymentMethod;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

type PatientErrors = Partial<Record<keyof Patient, string>>;

interface IconProps {
  className?: string;
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  to?: string;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

/* ─────────────────────────────────────────────────────────────
   UI PRIMITIVES
   ───────────────────────────────────────────────────────────── */

function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-sky-600 text-white shadow-sm shadow-sky-600/20 hover:bg-sky-700 hover:shadow-md focus-visible:ring-sky-500",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400",
  dark: "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-700",
};

function Button({
  to,
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes}>
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

const icon = (path: ReactNode) =>
  function Icon({ className = "h-5 w-5" }: IconProps) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...iconBase}>
        {path}
      </svg>
    );
  };

const ArrowLeftIcon = icon(<path d="M19 12H5M11 6l-6 6 6 6" />);
const ArrowRightIcon = icon(<path d="M5 12h14M13 6l6 6-6 6" />);
const CheckIcon = icon(<path d="m5 13 4 4L19 7" />);
const MapPinIcon = icon(
  <>
    <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
);
const CalendarIcon = icon(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 11h18" />
  </>
);
const ClockIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>
);
const UserIcon = icon(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </>
);
const CardIcon = icon(
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </>
);
const ShieldCheckIcon = icon(
  <>
    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </>
);
const LockIcon = icon(
  <>
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </>
);
const DownloadIcon = icon(
  <>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </>
);

/* ─────────────────────────────────────────────────────────────
   DATA — replace with shared data source
   ───────────────────────────────────────────────────────────── */

const DOCTORS: Record<string, Doctor> = {
  "d-001": {
    id: "d-001",
    name: "Dr. Emily Rodriguez",
    specialty: "Radiology",
    location: "Arlington, VA",
    address: "1201 Wilson Blvd, Suite 400, Arlington, VA 22209",
    fee: 160,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
  },
  "d-002": {
    id: "d-002",
    name: "Dr. Sarah Johnson",
    specialty: "Radiology",
    location: "Arlington, VA",
    address: "1201 Wilson Blvd, Suite 400, Arlington, VA 22209",
    fee: 120,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
  },
  "d-003": {
    id: "d-003",
    name: "Dr. Michael Brown",
    specialty: "Cardiology",
    location: "Alexandria, VA",
    address: "2001 N Beauregard St, Alexandria, VA 22311",
    fee: 180,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
  },
};

const FALLBACK_DOCTOR: Doctor = DOCTORS["d-001"];

const VISIT_REASONS = [
  "New symptom or concern",
  "Follow-up consultation",
  "Review test results",
  "Second opinion",
  "Routine check-up",
  "Other",
] as const;

const INSURANCE_PROVIDERS = [
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "Kaiser Permanente",
  "UnitedHealthcare",
  "Self-pay (no insurance)",
] as const;

const PAYMENT_METHODS: PaymentMethod[] = ["Credit card", "Debit card", "Pay at clinic"];

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

function formatFullDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function generateConfirmationId(): string {
  return `CP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

/* ─────────────────────────────────────────────────────────────
   STEPPER
   ───────────────────────────────────────────────────────────── */

interface StepDef {
  id: number;
  label: string;
  icon: (props: IconProps) => ReactNode;
}

const STEPS: StepDef[] = [
  { id: 1, label: "Confirm slot", icon: CalendarIcon },
  { id: 2, label: "Your details", icon: UserIcon },
  { id: 3, label: "Payment", icon: CardIcon },
  { id: 4, label: "Confirmation", icon: CheckIcon },
];

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {STEPS.map((step, i) => {
        const StepIcon = step.icon;
        const isDone = current > step.id;
        const isActive = current === step.id;
        return (
          <li key={step.id} className="flex flex-1 items-center gap-2 sm:gap-3">
            <div
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition ${
                isDone
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : isActive
                  ? "border-sky-600 bg-sky-600 text-white"
                  : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {isDone ? <CheckIcon className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
            </div>
            <span
              className={`hidden text-sm font-medium sm:block ${
                isActive ? "text-slate-900" : "text-slate-500"
              }`}
            >
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={`hidden h-px flex-1 sm:block ${
                  isDone ? "bg-emerald-500" : "bg-slate-200"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ─────────────────────────────────────────────────────────────
   FORM FIELDS
   ───────────────────────────────────────────────────────────── */

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100";

/* ─────────────────────────────────────────────────────────────
   STEP 1 — CONFIRM SLOT
   ───────────────────────────────────────────────────────────── */

function Step1({
  doctor,
  date,
  time,
  reason,
  onReasonChange,
  onChangeSlot,
  onContinue,
}: {
  doctor: Doctor;
  date: string;
  time: string;
  reason: string;
  onReasonChange: (v: string) => void;
  onChangeSlot: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Confirm your appointment</h2>
        <p className="mt-1 text-sm text-slate-500">
          Review the details below, then tell us why you're visiting.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-start gap-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="h-16 w-16 flex-shrink-0 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <p className="text-base font-semibold text-slate-900">{doctor.name}</p>
            <p className="text-sm text-sky-600">{doctor.specialty}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
              <MapPinIcon className="h-3.5 w-3.5" />
              {doctor.location}
            </p>
          </div>
          <button
            type="button"
            onClick={onChangeSlot}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700"
          >
            Change
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <CalendarIcon className="h-5 w-5 text-sky-600" />
            <div>
              <p className="text-xs text-slate-400">Date</p>
              <p className="text-sm font-semibold text-slate-800">{formatFullDate(date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <ClockIcon className="h-5 w-5 text-sky-600" />
            <div>
              <p className="text-xs text-slate-400">Time</p>
              <p className="text-sm font-semibold text-slate-800">{formatTime12(time)}</p>
            </div>
          </div>
        </div>
      </div>

      <Field label="Reason for visit">
        <select
          value={reason}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onReasonChange(e.target.value)}
          className={inputClass}
        >
          <option value="">Select a reason…</option>
          {VISIT_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex justify-end">
        <Button variant="primary" onClick={onContinue} disabled={!reason}>
          Continue
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STEP 2 — PATIENT DETAILS
   ───────────────────────────────────────────────────────────── */

function Step2({
  form,
  errors,
  onChange,
  onBack,
  onContinue,
}: {
  form: Patient;
  errors: PatientErrors;
  onChange: <K extends keyof Patient>(key: K, value: Patient[K]) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Your details</h2>
        <p className="mt-1 text-sm text-slate-500">
          We'll use this to confirm your appointment and send reminders.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName}>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Jane Doe"
            className={inputClass}
          />
        </Field>

        <Field label="Date of birth" error={errors.dob}>
          <input
            type="date"
            value={form.dob}
            max={todayKey()}
            onChange={(e) => onChange("dob", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="jane@example.com"
            className={inputClass}
          />
        </Field>

        <Field label="Phone" error={errors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(703) 555-0100"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Address" error={errors.address} hint="Optional, but helps with billing">
        <input
          type="text"
          value={form.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="123 Main St, Arlington, VA 22209"
          className={inputClass}
        />
      </Field>

      <Field label="Notes for the doctor" hint="Allergies, medications, or anything else we should know">
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder="e.g. allergic to penicillin"
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeftIcon />
          Back
        </Button>
        <Button variant="primary" onClick={onContinue}>
          Continue to payment
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STEP 3 — INSURANCE & PAYMENT
   ───────────────────────────────────────────────────────────── */

function Step3({
  doctor,
  insurance,
  setInsurance,
  onBack,
  onConfirm,
}: {
  doctor: Doctor;
  insurance: Insurance;
  setInsurance: (v: Insurance) => void;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const subtotal = doctor.fee;
  const tax = Math.round(subtotal * 0.06 * 100) / 100;
  const total = subtotal + tax;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Insurance &amp; payment</h2>
        <p className="mt-1 text-sm text-slate-500">
          This is a demo — no real payment will be processed.
        </p>
      </div>

      <Field label="Insurance provider">
        <select
          value={insurance.provider}
          onChange={(e) => setInsurance({ ...insurance, provider: e.target.value })}
          className={inputClass}
        >
          {INSURANCE_PROVIDERS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Field>

      {insurance.provider !== "Self-pay (no insurance)" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Member ID">
            <input
              type="text"
              value={insurance.memberId}
              onChange={(e) => setInsurance({ ...insurance, memberId: e.target.value })}
              placeholder="ABC-123456789"
              className={inputClass}
            />
          </Field>
          <Field label="Group number">
            <input
              type="text"
              value={insurance.groupNumber}
              onChange={(e) => setInsurance({ ...insurance, groupNumber: e.target.value })}
              placeholder="GRP-0987"
              className={inputClass}
            />
          </Field>
        </div>
      )}

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Payment method</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setInsurance({ ...insurance, method })}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                insurance.method === method
                  ? "border-sky-500 bg-sky-50 text-sky-700 ring-1 ring-sky-500"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {insurance.method !== "Pay at clinic" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <LockIcon className="h-4 w-4 text-emerald-600" />
            Card details
          </div>

          <div className="mt-4 space-y-4">
            <Field label="Cardholder name">
              <input
                type="text"
                value={insurance.cardName}
                onChange={(e) => setInsurance({ ...insurance, cardName: e.target.value })}
                placeholder="Jane Doe"
                className={inputClass}
              />
            </Field>

            <Field label="Card number">
              <input
                type="text"
                inputMode="numeric"
                maxLength={19}
                value={insurance.cardNumber}
                onChange={(e) =>
                  setInsurance({
                    ...insurance,
                    cardNumber: e.target.value
                      .replace(/\D/g, "")
                      .replace(/(.{4})/g, "$1 ")
                      .trim(),
                  })
                }
                placeholder="4242 4242 4242 4242"
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry">
                <input
                  type="text"
                  maxLength={5}
                  value={insurance.expiry}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "");
                    if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2, 4)}`;
                    setInsurance({ ...insurance, expiry: v });
                  }}
                  placeholder="MM/YY"
                  className={inputClass}
                />
              </Field>
              <Field label="CVC">
                <input
                  type="text"
                  maxLength={4}
                  value={insurance.cvc}
                  onChange={(e) =>
                    setInsurance({ ...insurance, cvc: e.target.value.replace(/\D/g, "") })
                  }
                  placeholder="123"
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Consultation fee</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Estimated tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-xs text-emerald-800">
        <ShieldCheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
        Your payment info is encrypted and never stored on our servers.
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeftIcon />
          Back
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          <LockIcon className="h-4 w-4" />
          Confirm &amp; pay ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STEP 4 — CONFIRMATION
   ───────────────────────────────────────────────────────────── */

function Step4({
  doctor,
  date,
  time,
  confirmationId,
  patientEmail,
}: {
  doctor: Doctor;
  date: string;
  time: string;
  confirmationId: string;
  patientEmail: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckIcon className="h-8 w-8" />
      </div>

      <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
        Appointment confirmed
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
        A confirmation email has been sent to{" "}
        <strong className="font-semibold text-slate-800">{patientEmail}</strong>. Show this
        reference when you arrive.
      </p>

      <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
        <span className="text-slate-500">Reference</span>
        <span className="font-mono font-semibold text-slate-900">{confirmationId}</span>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-left">
        <div className="flex items-start gap-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="h-14 w-14 flex-shrink-0 rounded-xl object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">{doctor.name}</p>
            <p className="text-xs text-sky-600">{doctor.specialty}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-4 w-4 text-sky-600" />
            <div>
              <p className="text-xs text-slate-400">Date</p>
              <p className="text-sm font-semibold text-slate-800">{formatFullDate(date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ClockIcon className="h-4 w-4 text-sky-600" />
            <div>
              <p className="text-xs text-slate-400">Time</p>
              <p className="text-sm font-semibold text-slate-800">{formatTime12(time)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <MapPinIcon className="h-4 w-4 text-sky-600" />
            <div>
              <p className="text-xs text-slate-400">Location</p>
              <p className="text-sm font-semibold text-slate-800">{doctor.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button variant="secondary">
          <DownloadIcon className="h-4 w-4" />
          Download receipt
        </Button>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to home
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */

const EMPTY_PATIENT: Patient = {
  fullName: "",
  dob: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
};

const EMPTY_INSURANCE: Insurance = {
  provider: "Self-pay (no insurance)",
  memberId: "",
  groupNumber: "",
  method: "Credit card",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

export default function BookingPage() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const doctor: Doctor = (doctorId && DOCTORS[doctorId]) || FALLBACK_DOCTOR;

  const date = searchParams.get("date") || todayKey();
  const time = searchParams.get("time") || "09:30";

  const [step, setStep] = useState<number>(1);
  const [reason, setReason] = useState<string>("");
  const [patient, setPatient] = useState<Patient>(EMPTY_PATIENT);
  const [insurance, setInsurance] = useState<Insurance>(EMPTY_INSURANCE);
  const [errors, setErrors] = useState<PatientErrors>({});
  const [confirmationId] = useState<string>(generateConfirmationId);

  function updatePatient<K extends keyof Patient>(key: K, value: Patient[K]): void {
    setPatient((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateStep2(): boolean {
    const next: PatientErrors = {};
    if (!patient.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!patient.dob) next.dob = "Date of birth is required.";
    if (!patient.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.email))
      next.email = "Please enter a valid email address.";
    if (!patient.phone.trim()) next.phone = "Phone number is required.";
    else if (patient.phone.replace(/\D/g, "").length < 10)
      next.phone = "Please enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleStep2Continue(): void {
    if (validateStep2()) setStep(3);
  }

  function handleConfirm(): void {
    setStep(4);
  }

  const progressPct = useMemo(
    () => Math.round(((step - 1) / (STEPS.length - 1)) * 100),
    [step]
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* Top bar */}
      <div className="border-b border-slate-200 bg-white">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                step === 1 ? navigate(`/doctors/${doctor.id}`) : setStep(step - 1)
              }
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              {step === 1 ? "Back to doctor" : "Back"}
            </button>
            <p className="text-xs font-medium text-slate-400">Secure booking</p>
          </div>
        </Container>
      </div>

      <Container className="py-8 lg:py-12">
        <div className="mx-auto max-w-3xl">
          {/* Stepper */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <Stepper current={step} />
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-sky-600 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Card */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            {step === 1 && (
              <Step1
                doctor={doctor}
                date={date}
                time={time}
                reason={reason}
                onReasonChange={setReason}
                onChangeSlot={() => navigate(`/doctors/${doctor.id}`)}
                onContinue={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <Step2
                form={patient}
                errors={errors}
                onChange={updatePatient}
                onBack={() => setStep(1)}
                onContinue={handleStep2Continue}
              />
            )}

            {step === 3 && (
              <Step3
                doctor={doctor}
                insurance={insurance}
                setInsurance={setInsurance}
                onBack={() => setStep(2)}
                onConfirm={handleConfirm}
              />
            )}

            {step === 4 && (
              <Step4
                doctor={doctor}
                date={date}
                time={time}
                confirmationId={confirmationId}
                patientEmail={patient.email || "your email"}
              />
            )}
          </div>

          {/* Trust footer */}
          {step < 4 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheckIcon className="h-3.5 w-3.5" />
                HIPAA compliant
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LockIcon className="h-3.5 w-3.5" />
                256-bit encrypted
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon className="h-3.5 w-3.5" />
                Free cancellation up to 2 hours before
              </span>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}