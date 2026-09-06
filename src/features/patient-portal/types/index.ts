/**
 * Patient Portal - Type Definitions
 * Core types for patient journey, appointments, and medical records
 */

export type AppointmentStatus = 
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export type AppointmentType = 
  | 'IN_PERSON'
  | 'VIDEO'
  | 'PHONE'
  | 'FOLLOW_UP';

export type PaymentStatus = 
  | 'PENDING'
  | 'PAID'
  | 'INSURANCE'
  | 'FAILED';

export interface Patient {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory: MedicalRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  type: 'CONSULTATION' | 'TEST' | 'PRESCRIPTION' | 'VACCINATION' | 'SURGERY';
  doctorId: string;
  doctorName: string;
  department: string;
  diagnosis?: string;
  symptoms: string[];
  notes: string;
  attachments: string[];
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  type: AppointmentType;
  status: AppointmentStatus;
  symptoms: string[];
  medicalHistory: string;
  notes?: string;
  paymentStatus: PaymentStatus;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: number;
  education: string[];
  certifications: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  availability: Availability[];
  consultationFee: number;
  profileImage?: string;
}

export interface Availability {
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  startTime: string;
  endTime: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  medications: Medication[];
  instructions: string;
  refillable: boolean;
  refillsRemaining: number;
  status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface TestOrder {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  testType: string;
  dateOrdered: string;
  datePerformed?: string;
  status: 'ORDERED' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  results?: TestResult;
  notes?: string;
}

export interface TestResult {
  id: string;
  testId: string;
  dateCompleted: string;
  findings: string;
  attachments: string[];
  interpretation: string;
  normalRange: string;
  abnormal?: boolean;
}

export interface FollowUp {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  reason: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

export interface SearchFilters {
  specialty?: string;
  department?: string;
  location?: string;
  rating?: number;
  availability?: string;
  insurance?: string;
}