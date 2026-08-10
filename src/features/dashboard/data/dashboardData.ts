import type{ PatientDemographics, AppointmentStats, DoctorStats, RevenueStats } from "../types/dashboard";
import {
  UserPlus,
  CalendarPlus,
  Stethoscope,
  FileText,
  Users,
  CalendarDays,
  Clock,
} from "lucide-react";



export const patientDemographics: PatientDemographics = {
  total: 8450,
  male: 4120,
  female: 4150,
  other: 180,
  active: 7200,
  inactive: 850,
  pending: 400,
  newPatients: 45,
  returningPatients: 320,
  byAgeGroup: {
    "0-18": 1250,
    "19-35": 2450,
    "36-50": 2100,
    "51-65": 1650,
    "65+": 1000,
  },
};

export const appointmentStats: AppointmentStats = {
  total: 2850,
  scheduled: 850,
  completed: 1650,
  cancelled: 250,
  noShow: 100,
  inProgress: 0,
  today: 45,
  thisWeek: 320,
  thisMonth: 1200,

  byType: {
    checkup: 1200,
    followup: 800,
    consultation: 650,
    emergency: 200,
  },

};

export const doctorStats: DoctorStats = {
  total: 52,
  active: 42,
  onLeave: 5,
  busy: 3,
  available: 2,

  departments: {
    Cardiology: 8,
    Neurology: 6,
    Pediatrics: 5,
    Orthopedics: 7,
    Dermatology: 4,
    Surgery: 10,
    Psychiatry: 5,
    "Obstetrics & Gynecology": 7,
  },
};

export const revenueStats: RevenueStats = {
  today: 28450,
  thisWeek: 185000,
  thisMonth: 720000,
  total: 2450000,
  pending: 320000,
  collected: 2130000,

  byDepartment: {
    Cardiology: 450000,
    Surgery: 680000,
    Orthopedics: 420000,
    Neurology: 350000,
    Pediatrics: 250000,
    Others: 300000,
  },
};



export const quickActions = [
  {
    id: "add-patient",
    title: "Add Patient",
    description: "Register a new patient",
    icon: UserPlus,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "appointment",
    title: "Appointment",
    description: "Schedule an appointment",
    icon: CalendarPlus,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "doctor",
    title: "Doctors",
    description: "View doctors",
    icon: Stethoscope,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "medical-record",
    title: "Medical Records",
    description: "View patient records",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export const dashboardStats = [
  {
    id: "patients",
    title: "Total Patients",
    value: 1250,
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    trend: {
      value: 12,
      label: "from last month",
      positive: true,
    },
    subtitle: "Registered patients",
  },
  {
    id: "doctors",
    title: "Doctors",
    value: 24,
    icon: Stethoscope,
    color: "text-green-600",
    bgColor: "bg-green-100",
    trend: {
      value: 8,
      label: "from last month",
      positive: true,
    },
    subtitle: "Active doctors",
  },
  {
    id: "appointments",
    title: "Appointments",
    value: 86,
    icon: CalendarDays,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    trend: {
      value: 15,
      label: "from last week",
      positive: true,
    },
    subtitle: "Today's appointments",
  },
  {
    id: "pending",
    title: "Pending",
    value: 12,
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    trend: {
      value: 4,
      label: "from yesterday",
      positive: false,
    },
    subtitle: "Pending appointments",
  },
];