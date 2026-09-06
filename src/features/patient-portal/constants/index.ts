/**
 * Patient Portal - Constants
 * Configuration and mapping for patient portal features
 */

import type { AppointmentStatus, AppointmentType } from '../types/index';

export const APPOINTMENT_STATUS_COLORS: Record<AppointmentStatus, string> = {
  SCHEDULED: 'blue',
  CONFIRMED: 'green',
  CHECKED_IN: 'purple',
  IN_PROGRESS: 'yellow',
  COMPLETED: 'green',
  CANCELLED: 'red',
  NO_SHOW: 'red',
};

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  SCHEDULED: 'Scheduled',
  CONFIRMED: 'Confirmed',
  CHECKED_IN: 'Checked In',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  NO_SHOW: 'No Show',
};

export const APPOINTMENT_TYPE_LABELS: Record<AppointmentType, string> = {
  IN_PERSON: 'In Person',
  VIDEO: 'Video Visit',
  PHONE: 'Phone Visit',
  FOLLOW_UP: 'Follow Up',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: 'Pending',
  PAID: 'Paid',
  INSURANCE: 'Insurance',
  FAILED: 'Failed',
};

export const SPECIALTIES = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Surgery',
  'Emergency Medicine',
  'Internal Medicine',
  'Obstetrics and Gynecology',
  'Ophthalmology',
  'Otolaryngology',
  'Psychiatry',
  'Radiology',
  'Urology',
];

export const DAYS_OF_WEEK = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

export const APPOINTMENT_DURATIONS = [15, 30, 45, 60];

export const APPOINTMENT_CONFIG = {
  MINUTES_BETWEEN_SLOTS: 15,
  DEFAULT_DURATION: 30,
  MAX_DAYS_ADVANCE: 90,
  CANCELLATION_HOURS: 24,
};

export const MEDICAL_HISTORY_CATEGORIES = [
  'Allergies',
  'Chronic Conditions',
  'Medications',
  'Immunizations',
  'Surgeries',
  'Family History',
  'Social History',
];

export const SYMPTOM_CATEGORIES = [
  'General',
  'Cardiovascular',
  'Respiratory',
  'Gastrointestinal',
  'Neurological',
  'Musculoskeletal',
  'Dermatological',
  'Psychological',
];

export const TEST_TYPES = [
  'Blood Test',
  'Urinalysis',
  'X-Ray',
  'MRI',
  'CT Scan',
  'Ultrasound',
  'ECG',
  'EEG',
  'Biopsy',
];

export const VALIDATION_RULES = {
  PATIENT: {
    FIRST_NAME: { min: 2, max: 50 },
    LAST_NAME: { min: 2, max: 50 },
    PHONE: { pattern: /^\+?[1-9]\d{1,14}$/ },
    EMAIL: { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  },
  APPOINTMENT: {
    SYMPTOMS: { min: 1, max: 10 },
    MEDICAL_HISTORY: { max: 2000 },
  },
};

export const ROUTES = {
  PATIENT: {
    ROOT: '/patient',
    DASHBOARD: '/patient/dashboard',
    SEARCH: '/patient/search',
    DOCTORS: '/patient/doctors',
    DOCTOR_PROFILE: (id: string) => `/patient/doctors/${id}`,
    BOOK: '/patient/book',
    APPOINTMENTS: '/patient/appointments',
    APPOINTMENT_DETAILS: (id: string) => `/patient/appointments/${id}`,
    PROFILE: '/patient/profile',
    MEDICAL_HISTORY: '/patient/history',
    PRESCRIPTIONS: '/patient/prescriptions',
    TEST_RESULTS: '/patient/tests',
    FOLLOW_UP: '/patient/follow-up',
    CHECK_IN: '/patient/check-in',
  },
};

export const STORAGE_KEYS = {
    PATIENT_SEARCH_FILTERS: 'patient_search_filters',
    PATIENT_APPOINTMENT_DRAFTS: 'appointment_drafts',
};