// ============================================================
// FILE: src/features/doctor-dashboard/page/DoctorDashboard.tsx
// ============================================================
// COMPLETE DOCTOR DASHBOARD WITH ALL FEATURES
// Import this in AppRoutes.tsx
// ============================================================

import React, { useState, useEffect, useMemo } from 'react';
import {
  User,
  Calendar,
  Clock,
  Users,
  FileText,
  Pill,
  AlertCircle,
  Bell,
  Search,

  Plus,

  Eye,
  Edit,
  
  Printer,
  RefreshCw,
  Loader,
  TrendingUp,
  TrendingDown,
 
  Clock as ClockIcon,
  Video,
  Phone,
  Star,
  Clipboard,
  UserPlus,
  Mail,
  Phone as PhoneIcon,
  CalendarPlus,
  Clock as ClockTime,
  Activity as ActivityIcon,
  Download as DownloadIcon,
  Check,
  X as XIcon,
} from 'lucide-react';

// ============================================================
// TYPES & INTERFACES
// ============================================================

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  avatar?: string;
  experience: number;
  education: string[];
  certifications: string[];
  rating: number;
  totalPatients: number;
  totalAppointments: number;
  availability: {
    monday: { start: string; end: string };
    tuesday: { start: string; end: string };
    wednesday: { start: string; end: string };
    thursday: { start: string; end: string };
    friday: { start: string; end: string };
    saturday: { start: string; end: string };
    sunday: { start: string; end: string };
  };
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'CRITICAL';
  medicalHistory: string[];
  allergies: string[];
  medications: string[];
}

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  date: string;
  time: string;
  duration: number;
  type: 'IN_PERSON' | 'VIDEO' | 'PHONE';
  status: 'SCHEDULED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  reason: string;
  notes?: string;
}

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  refills: number;
  instructions: string;
}

interface ClinicalNote {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  title: string;
  content: string;
  type: 'CONSULTATION' | 'FOLLOW_UP' | 'EMERGENCY' | 'ROUTINE';
  attachments?: string[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string;
  assignedTo: string;
  createdAt: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const mockDoctor: Doctor = {
  id: 'DOC-001',
  name: 'Dr. Sarah Johnson',
  specialty: 'Cardiology',
  email: 'sarah.johnson@hospital.com',
  phone: '(555) 111-2222',
  experience: 15,
  education: ['MD - Harvard Medical School', 'Fellowship in Cardiology - Mayo Clinic'],
  certifications: ['Board Certified in Cardiology', 'Advanced Cardiac Life Support'],
  rating: 4.9,
  totalPatients: 1250,
  totalAppointments: 8760,
  availability: {
    monday: { start: '08:00', end: '17:00' },
    tuesday: { start: '08:00', end: '17:00' },
    wednesday: { start: '08:00', end: '17:00' },
    thursday: { start: '08:00', end: '17:00' },
    friday: { start: '08:00', end: '15:00' },
    saturday: { start: '09:00', end: '13:00' },
    sunday: { start: '00:00', end: '00:00' },
  },
};

const mockPatients: Patient[] = [
  {
    id: 'PAT-001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    phone: '(555) 123-4567',
    email: 'john.doe@email.com',
    lastVisit: '2026-02-10T10:00:00Z',
    nextAppointment: '2026-03-10T10:00:00Z',
    status: 'ACTIVE',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin'],
    medications: ['Lisinopril', 'Metformin'],
  },
  {
    id: 'PAT-002',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    phone: '(555) 234-5678',
    email: 'jane.smith@email.com',
    lastVisit: '2026-02-05T14:30:00Z',
    status: 'ACTIVE',
    medicalHistory: ['Migraine', 'Anxiety'],
    allergies: ['Latex'],
    medications: ['Sumatriptan', 'Sertraline'],
  },
  {
    id: 'PAT-003',
    name: 'Robert Johnson',
    age: 58,
    gender: 'Male',
    phone: '(555) 345-6789',
    email: 'robert.johnson@email.com',
    lastVisit: '2026-01-20T09:00:00Z',
    nextAppointment: '2026-02-20T09:00:00Z',
    status: 'CRITICAL',
    medicalHistory: ['Heart Disease', 'High Cholesterol'],
    allergies: ['Aspirin'],
    medications: ['Atorvastatin', 'Clopidogrel'],
  },
  {
    id: 'PAT-004',
    name: 'Maria Garcia',
    age: 28,
    gender: 'Female',
    phone: '(555) 456-7890',
    email: 'maria.garcia@email.com',
    lastVisit: '2026-02-01T11:00:00Z',
    status: 'ACTIVE',
    medicalHistory: ['Asthma'],
    allergies: ['Peanuts'],
    medications: ['Albuterol'],
  },
  {
    id: 'PAT-005',
    name: 'David Lee',
    age: 52,
    gender: 'Male',
    phone: '(555) 567-8901',
    email: 'david.lee@email.com',
    lastVisit: '2026-01-25T15:00:00Z',
    nextAppointment: '2026-02-25T15:00:00Z',
    status: 'INACTIVE',
    medicalHistory: ['Arthritis'],
    allergies: ['Sulfa'],
    medications: ['Ibuprofen', 'Methotrexate'],
  },
];

const mockAppointments: Appointment[] = [
  {
    id: 'APT-001',
    patientId: 'PAT-001',
    patientName: 'John Doe',
    patientAge: 45,
    date: '2026-02-20',
    time: '10:00',
    duration: 30,
    type: 'IN_PERSON',
    status: 'CONFIRMED',
    reason: 'Follow-up on heart condition',
    notes: 'Patient reports improved symptoms',
  },
  {
    id: 'APT-002',
    patientId: 'PAT-002',
    patientName: 'Jane Smith',
    patientAge: 32,
    date: '2026-02-20',
    time: '14:30',
    duration: 45,
    type: 'VIDEO',
    status: 'SCHEDULED',
    reason: 'Neurological consultation',
  },
  {
    id: 'APT-003',
    patientId: 'PAT-003',
    patientName: 'Robert Johnson',
    patientAge: 58,
    date: '2026-02-21',
    time: '09:00',
    duration: 60,
    type: 'IN_PERSON',
    status: 'CONFIRMED',
    reason: 'Cardiac evaluation',
    notes: 'Critical patient - needs immediate attention',
  },
  {
    id: 'APT-004',
    patientId: 'PAT-004',
    patientName: 'Maria Garcia',
    patientAge: 28,
    date: '2026-02-21',
    time: '11:00',
    duration: 30,
    type: 'PHONE',
    status: 'SCHEDULED',
    reason: 'Asthma follow-up',
  },
  {
    id: 'APT-005',
    patientId: 'PAT-005',
    patientName: 'David Lee',
    patientAge: 52,
    date: '2026-02-22',
    time: '15:00',
    duration: 30,
    type: 'IN_PERSON',
    status: 'SCHEDULED',
    reason: 'Orthopedic consultation',
  },
];

const mockPrescriptions: Prescription[] = [
  {
    id: 'PRS-001',
    patientId: 'PAT-001',
    patientName: 'John Doe',
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    duration: '90 days',
    prescribedDate: '2026-02-01',
    status: 'ACTIVE',
    refills: 2,
    instructions: 'Take with food in the morning',
  },
  {
    id: 'PRS-002',
    patientId: 'PAT-001',
    patientName: 'John Doe',
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: '30 days',
    prescribedDate: '2026-02-01',
    status: 'ACTIVE',
    refills: 1,
    instructions: 'Take with meals',
  },
  {
    id: 'PRS-003',
    patientId: 'PAT-002',
    patientName: 'Jane Smith',
    medication: 'Sumatriptan',
    dosage: '50mg',
    frequency: 'As needed',
    duration: '30 days',
    prescribedDate: '2026-01-15',
    status: 'COMPLETED',
    refills: 0,
    instructions: 'Take at onset of migraine',
  },
];

const mockClinicalNotes: ClinicalNote[] = [
  {
    id: 'CN-001',
    patientId: 'PAT-001',
    patientName: 'John Doe',
    date: '2026-02-10T10:00:00Z',
    title: 'Cardiology Follow-up',
    content: 'Patient reports improved symptoms. Blood pressure well controlled. Continue current medication regimen.',
    type: 'FOLLOW_UP',
  },
  {
    id: 'CN-002',
    patientId: 'PAT-003',
    patientName: 'Robert Johnson',
    date: '2026-01-20T09:00:00Z',
    title: 'Emergency Consultation',
    content: 'Patient presented with chest pain. Immediate cardiac evaluation recommended. Scheduled for stress test.',
    type: 'EMERGENCY',
  },
];

const mockTasks: Task[] = [
  {
    id: 'TSK-001',
    title: 'Review lab results for John Doe',
    description: 'Check cholesterol levels and adjust medication if needed',
    priority: 'HIGH',
    status: 'PENDING',
    dueDate: '2026-02-20',
    assignedTo: 'Dr. Sarah Johnson',
    createdAt: '2026-02-19T08:00:00Z',
  },
  {
    id: 'TSK-002',
    title: 'Follow up with Robert Johnson',
    description: 'Call patient to check symptoms after medication change',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    dueDate: '2026-02-21',
    assignedTo: 'Dr. Sarah Johnson',
    createdAt: '2026-02-19T09:00:00Z',
  },
  {
    id: 'TSK-003',
    title: 'Prepare case study for conference',
    description: 'Compile patient data for cardiology conference presentation',
    priority: 'MEDIUM',
    status: 'PENDING',
    dueDate: '2026-03-01',
    assignedTo: 'Dr. Sarah Johnson',
    createdAt: '2026-02-18T10:00:00Z',
  },
];

// ============================================================
// SUB-COMPONENTS
// ============================================================

// Status Badge
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700',
    INACTIVE: 'bg-gray-100 text-gray-700',
    CRITICAL: 'bg-red-100 text-red-700',
    SCHEDULED: 'bg-blue-100 text-blue-700',
    CONFIRMED: 'bg-emerald-100 text-emerald-700',
    IN_PROGRESS: 'bg-purple-100 text-purple-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
    NO_SHOW: 'bg-gray-100 text-gray-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    HIGH: 'bg-orange-100 text-orange-700',
    URGENT: 'bg-red-100 text-red-700',
    MEDIUM: 'bg-blue-100 text-blue-700',
    LOW: 'bg-gray-100 text-gray-700',
  };
  const labels: Record<string, string> = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    CRITICAL: 'Critical',
    SCHEDULED: 'Scheduled',
    CONFIRMED: 'Confirmed',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    NO_SHOW: 'No Show',
    PENDING: 'Pending',
    HIGH: 'High',
    URGENT: 'Urgent',
    MEDIUM: 'Medium',
    LOW: 'Low',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {labels[status] || status}
    </span>
  );
};

// Stat Card
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  trend?: { value: number; isPositive: boolean };
}> = ({ title, value, icon: Icon, color, trend }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:shadow-lg">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-800">{value}</h3>
        {trend && (
          <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  </div>
);

// ============================================================
// MAIN COMPONENT
// ============================================================

const DoctorDashboard: React.FC = () => {
  // ==========================================================
  // STATE MANAGEMENT
  // ==========================================================
  
  const [loading, setLoading] = useState(true);
  const [doctor] = useState<Doctor>(mockDoctor);
  const [patients] = useState<Patient[]>(mockPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [prescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [clinicalNotes] = useState<ClinicalNote[]>(mockClinicalNotes);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // ==========================================================
  // DATA LOADING
  // ==========================================================
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
      } catch (error) {
        console.error('Failed to load doctor dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ==========================================================
  // COMPUTED VALUES
  // ==========================================================
  
  // Today's appointments
  const todayAppointments = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(a => a.date === today);
  }, [appointments]);

  // Upcoming appointments
  const upcomingAppointments = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(a => a.date > today && a.status !== 'CANCELLED');
  }, [appointments]);

  // Critical patients
  const criticalPatients = useMemo(() => {
    return patients.filter(p => p.status === 'CRITICAL');
  }, [patients]);

  // Pending tasks
  const pendingTasks = useMemo(() => {
    return tasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS');
  }, [tasks]);

  // Filtered patients
  const filteredPatients = useMemo(() => {
    if (!searchQuery) return patients;
    const query = searchQuery.toLowerCase();
    return patients.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query)
    );
  }, [patients, searchQuery]);

  // ==========================================================
  // HANDLERS
  // ==========================================================
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    setAppointments(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: status as any } : a
      )
    );
  };

  const handleTaskComplete = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: 'COMPLETED' as any } : t
      )
    );
  };

  // ==========================================================
  // RENDER
  // ==========================================================
  
  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-10 w-10 animate-spin text-blue-500" />
          <p className="text-sm text-slate-500">Loading doctor dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      {/* ==========================================================
          HEADER
          ========================================================== */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-md">
            <User className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{doctor.name}</h1>
            <p className="text-sm text-slate-500">{doctor.specialty} • {doctor.experience} years experience</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">{doctor.rating}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-600">
            <CalendarPlus size={18} />
            New Appointment
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
            <Bell size={18} />
            <span className="relative">
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* ==========================================================
          STATISTICS CARDS
          ========================================================== */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={doctor.totalPatients}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={Calendar}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks.length}
          icon={Clipboard}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
          trend={{ value: 8, isPositive: false }}
        />
        <StatCard
          title="Critical Patients"
          value={criticalPatients.length}
          icon={AlertCircle}
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
      </div>

      {/* ==========================================================
          TABS
          ========================================================== */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'overview', label: 'Overview', icon: ActivityIcon },
          { id: 'appointments', label: 'Appointments', icon: Calendar },
          { id: 'patients', label: 'Patients', icon: Users },
          { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
          { id: 'notes', label: 'Clinical Notes', icon: FileText },
          { id: 'tasks', label: 'Tasks', icon: Clipboard },
          { id: 'schedule', label: 'Schedule', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ==========================================================
          CONTENT AREA - OVERVIEW TAB
          ========================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-500 via-blue-600 to-indigo-600 p-6 text-white">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white" />
            </div>
            <div className="relative">
              <h2 className="text-2xl font-bold">Good Morning, Dr. Johnson! 👋</h2>
              <p className="mt-1 text-blue-100">You have {todayAppointments.length} appointments today</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                  <p className="text-sm text-blue-100">Patients</p>
                  <p className="text-lg font-bold">{doctor.totalPatients}</p>
                </div>
                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                  <p className="text-sm text-blue-100">Pending Tasks</p>
                  <p className="text-lg font-bold">{pendingTasks.length}</p>
                </div>
                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                  <p className="text-sm text-blue-100">Critical Patients</p>
                  <p className="text-lg font-bold">{criticalPatients.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-200 transition hover:shadow-md">
              <div className="rounded-xl bg-blue-100 p-3">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-800">New Patient</p>
                <p className="text-xs text-slate-500">Add patient record</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-200 transition hover:shadow-md">
              <div className="rounded-xl bg-emerald-100 p-3">
                <Pill className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-800">Prescribe</p>
                <p className="text-xs text-slate-500">New prescription</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-200 transition hover:shadow-md">
              <div className="rounded-xl bg-purple-100 p-3">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-800">Clinical Note</p>
                <p className="text-xs text-slate-500">Add consultation notes</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-200 transition hover:shadow-md">
              <div className="rounded-xl bg-amber-100 p-3">
                <Video className="h-5 w-5 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-800">Telemedicine</p>
                <p className="text-xs text-slate-500">Start video call</p>
              </div>
            </button>
          </div>

          {/* Today's Appointments */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Today's Appointments</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            {todayAppointments.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No appointments today</p>
            ) : (
              <div className="space-y-3">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:border-blue-200 transition">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                        {appointment.patientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{appointment.patientName}</p>
                        <p className="text-sm text-slate-500">{appointment.time} • {appointment.duration} min</p>
                        <p className="text-xs text-slate-400">{appointment.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={appointment.status} />
                      <button className="rounded-lg p-2 hover:bg-slate-100">
                        <Eye size={16} className="text-slate-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tasks & Critical Patients */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Pending Tasks */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Pending Tasks</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
              </div>
              <div className="space-y-3">
                {pendingTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3">
                    <div className={`mt-0.5 h-2 w-2 rounded-full ${
                      task.priority === 'URGENT' ? 'bg-red-500' :
                      task.priority === 'HIGH' ? 'bg-orange-500' :
                      task.priority === 'MEDIUM' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{task.title}</p>
                      <p className="text-xs text-slate-500">Due: {task.dueDate}</p>
                    </div>
                    <button
                      onClick={() => handleTaskComplete(task.id)}
                      className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-200"
                    >
                      Complete
                    </button>
                  </div>
                ))}
                {pendingTasks.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">No pending tasks</p>
                )}
              </div>
            </div>

            {/* Critical Patients */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Critical Patients</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
              </div>
              <div className="space-y-3">
                {criticalPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-200 text-red-600 font-semibold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{patient.name}</p>
                        <p className="text-xs text-slate-500">Age: {patient.age} • {patient.gender}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status="CRITICAL" />
                      <button className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-200">
                        View
                      </button>
                    </div>
                  </div>
                ))}
                {criticalPatients.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">No critical patients</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          CONTENT AREA - APPOINTMENTS TAB
          ========================================================== */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex gap-2">
              <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option value="ALL">All Status</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <button className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
                <Plus size={18} className="inline mr-2" />
                New
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Patient</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-800">{appointment.patientName}</p>
                          <p className="text-xs text-slate-500">Age: {appointment.patientAge}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-slate-800">{appointment.date}</p>
                          <p className="text-xs text-slate-500">{appointment.time} ({appointment.duration} min)</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          appointment.type === 'VIDEO' ? 'bg-purple-100 text-purple-700' :
                          appointment.type === 'PHONE' ? 'bg-cyan-100 text-cyan-700' :
                          'bg-indigo-100 text-indigo-700'
                        }`}>
                          {appointment.type === 'VIDEO' && <Video className="h-3 w-3" />}
                          {appointment.type === 'PHONE' && <Phone className="h-3 w-3" />}
                          {appointment.type === 'IN_PERSON' && <User className="h-3 w-3" />}
                          {appointment.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={appointment.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="rounded-lg p-2 transition hover:bg-blue-100">
                            <Eye size={16} className="text-blue-600" />
                          </button>
                          <button className="rounded-lg p-2 transition hover:bg-emerald-100">
                            <Check size={16} className="text-emerald-600" />
                          </button>
                          <button className="rounded-lg p-2 transition hover:bg-red-100">
                            <XIcon size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          CONTENT AREA - PATIENTS TAB
          ========================================================== */}
      {activeTab === 'patients' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patients..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              <UserPlus size={18} className="inline mr-2" />
              Add Patient
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-lg">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{patient.name}</p>
                      <p className="text-sm text-slate-500">{patient.age} years • {patient.gender}</p>
                      <p className="text-xs text-slate-400">{patient.id}</p>
                    </div>
                  </div>
                  <StatusBadge status={patient.status} />
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <PhoneIcon size={14} className="text-slate-400" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail size={14} className="text-slate-400" />
                    {patient.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar size={14} className="text-slate-400" />
                    Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    View Records
                  </button>
                  <button className="flex-1 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
                    Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================================
          CONTENT AREA - PRESCRIPTIONS TAB
          ========================================================== */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Active Prescriptions</h2>
            <button className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              <Pill size={18} className="inline mr-2" />
              New Prescription
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {prescriptions.filter(p => p.status === 'ACTIVE').map((prescription) => (
              <div key={prescription.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{prescription.medication}</h3>
                    <p className="text-sm text-slate-600">{prescription.dosage}</p>
                  </div>
                  <StatusBadge status={prescription.status} />
                </div>
                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>💊 {prescription.frequency}</p>
                  <p>📅 Duration: {prescription.duration}</p>
                  <p>🔄 Refills: {prescription.refills}</p>
                  <p>👤 Patient: {prescription.patientName}</p>
                </div>
                <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
                  {prescription.instructions}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    Renew
                  </button>
                  <button className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================================
          CONTENT AREA - CLINICAL NOTES TAB
          ========================================================== */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Clinical Notes</h2>
            <button className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              <Plus size={18} className="inline mr-2" />
              New Note
            </button>
          </div>

          <div className="space-y-4">
            {clinicalNotes.map((note) => (
              <div key={note.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{note.title}</h3>
                    <p className="text-sm text-slate-500">Patient: {note.patientName}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    note.type === 'EMERGENCY' ? 'bg-red-100 text-red-700' :
                    note.type === 'FOLLOW_UP' ? 'bg-blue-100 text-blue-700' :
                    note.type === 'CONSULTATION' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {note.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{note.content}</p>
                <p className="mt-2 text-xs text-slate-400">{new Date(note.date).toLocaleString()}</p>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    <Edit size={14} className="inline mr-1" />
                    Edit
                  </button>
                  <button className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
                    <Printer size={14} className="inline mr-1" />
                    Print
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================================
          CONTENT AREA - TASKS TAB
          ========================================================== */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Tasks</h2>
            <button className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              <Plus size={18} className="inline mr-2" />
              New Task
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        task.priority === 'URGENT' ? 'bg-red-500' :
                        task.priority === 'HIGH' ? 'bg-orange-500' :
                        task.priority === 'MEDIUM' ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`} />
                      <h3 className={`font-semibold ${
                        task.status === 'COMPLETED' ? 'text-slate-400 line-through' : 'text-slate-800'
                      }`}>
                        {task.title}
                      </h3>
                      <StatusBadge status={task.status} />
                      <StatusBadge status={task.priority} />
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{task.description}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                      <span>Due: {task.dueDate}</span>
                      <span>Assigned to: {task.assignedTo}</span>
                    </div>
                  </div>
                  {task.status !== 'COMPLETED' && (
                    <button
                      onClick={() => handleTaskComplete(task.id)}
                      className="rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-200"
                    >
                      <Check size={16} className="inline mr-1" />
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================================
          CONTENT AREA - SCHEDULE TAB
          ========================================================== */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Weekly Schedule</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            {Object.entries(doctor.availability).map(([day, hours]) => (
              <div key={day} className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-800 capitalize">{day}</h3>
                {hours.start !== '00:00' ? (
                  <div className="mt-2">
                    <p className="text-sm text-slate-600">
                      {hours.start} - {hours.end}
                    </p>
                    <div className="mt-2 h-1 w-full rounded-full bg-emerald-200">
                      <div className="h-1 rounded-full bg-emerald-500" style={{ width: '100%' }} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Working</p>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">Off Day</p>
                )}
                <div className="mt-3">
                  <p className="text-xs text-slate-500">
                    {day === 'monday' && '3 appointments'}
                    {day === 'tuesday' && '4 appointments'}
                    {day === 'wednesday' && '2 appointments'}
                    {day === 'thursday' && '5 appointments'}
                    {day === 'friday' && '3 appointments'}
                    {day === 'saturday' && '1 appointment'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Upcoming Appointments</h3>
            <div className="space-y-3">
              {upcomingAppointments.slice(0, 5).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                      {appointment.patientName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{appointment.patientName}</p>
                      <p className="text-sm text-slate-500">{appointment.date} at {appointment.time}</p>
                    </div>
                  </div>
                  <StatusBadge status={appointment.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;