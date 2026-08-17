// ============================================================
// FILE: src/features/patient-portal/page/PatientPortal.tsx
// ============================================================
// COMPLETE PATIENT PORTAL WITH ALL FEATURES
// Import this in AppRoutes.tsx
// ============================================================

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  User,
  LogOut,
  Calendar,
  Clock,
  FileText,
  Pill,
  Heart,
  Activity,
  Phone,
  Video,
  MessageSquare,
  CreditCard,
  DollarSign,
  Bell,
  Plus,
  ChevronRight,
  Download,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Mic,
  Shield,
  Lock,
  Mail,
  Phone as PhoneIcon,
  Microscope,
  TestTube,
  Ambulance,
  Hospital,
  Pill as PillIcon,
  Stethoscope as StethoscopeIcon,
  Eye as EyeIcon,
  MessageCircle,
  Video as VideoIcon,
  Loader,
  LayoutDashboard
} from 'lucide-react';

// ============================================================
// TYPES & INTERFACES
// ============================================================

interface PatientUser {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodType: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  profileImage?: string;
  createdAt: string;
  lastLogin: string;
}

interface MedicalRecord {
  id: string;
  date: string;
  type: 'CONSULTATION' | 'LAB_RESULT' | 'PRESCRIPTION' | 'VACCINATION' | 'SURGERY' | 'OTHER';
  title: string;
  description: string;
  doctorName: string;
  doctorId: string;
  attachments?: string[];
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  createdAt: string;
}

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  date: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  refills: number;
  instructions: string;
}

interface LabResult {
  id: string;
  testName: string;
  date: string;
  results: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    status: 'NORMAL' | 'ABNORMAL' | 'CRITICAL';
  }[];
  doctorName: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  type: 'IN_PERSON' | 'VIDEO' | 'PHONE';
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  reason: string;
  notes?: string;
}

interface Payment {
  id: string;
  invoiceNumber: string;
  amount: number;
  date: string;
  status: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
  method: string;
  description: string;
}

interface Vital {
  id: string;
  date: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
  bmi: number;
  oxygenSaturation: number;
  bloodSugar: number;
  notes?: string;
}

interface Symptom {
  id: string;
  date: string;
  symptoms: string[];
  severity: 'MILD' | 'MODERATE' | 'SEVERE';
  duration: string;
  notes: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const mockPatient: PatientUser = {
  id: '1',
  patientId: 'PAT-001',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1985-03-15',
  gender: 'MALE',
  bloodType: 'A+',
  address: '123 Main St, New York, NY 10001',
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '(555) 987-6543',
  },
  insurance: {
    provider: 'Blue Cross',
    policyNumber: 'BC-123456',
    expiryDate: '2027-12-31',
  },
  createdAt: '2024-01-01T10:00:00Z',
  lastLogin: '2026-02-15T08:30:00Z',
};

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    date: '2026-01-15T10:00:00Z',
    type: 'CONSULTATION',
    title: 'Cardiology Follow-up',
    description: 'Regular checkup for heart condition. Patient reports improved symptoms.',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: 'DOC-001',
    status: 'COMPLETED',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '2',
    date: '2026-01-20T14:30:00Z',
    type: 'LAB_RESULT',
    title: 'Blood Work Panel',
    description: 'Complete blood count and lipid panel results',
    doctorName: 'Dr. Michael Chen',
    doctorId: 'DOC-002',
    status: 'COMPLETED',
    createdAt: '2026-01-20T14:30:00Z',
  },
  {
    id: '3',
    date: '2026-02-01T09:00:00Z',
    type: 'PRESCRIPTION',
    title: 'Medication Renewal',
    description: 'Renewed hypertension medication for 3 months',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: 'DOC-001',
    status: 'COMPLETED',
    createdAt: '2026-02-01T09:00:00Z',
  },
];

const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    duration: '90 days',
    prescribedBy: 'Dr. Sarah Johnson',
    date: '2026-02-01T09:00:00Z',
    status: 'ACTIVE',
    refills: 2,
    instructions: 'Take with food in the morning',
  },
  {
    id: '2',
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: '30 days',
    prescribedBy: 'Dr. Sarah Johnson',
    date: '2026-01-15T10:00:00Z',
    status: 'COMPLETED',
    refills: 0,
    instructions: 'Take with meals',
  },
];

const mockLabResults: LabResult[] = [
  {
    id: '1',
    testName: 'Complete Blood Count',
    date: '2026-01-20T14:30:00Z',
    results: [
      {
        parameter: 'WBC',
        value: '7.5',
        unit: '×10³/µL',
        referenceRange: '4.5-11.0',
        status: 'NORMAL',
      },
      {
        parameter: 'RBC',
        value: '5.2',
        unit: '×10⁶/µL',
        referenceRange: '4.7-6.1',
        status: 'NORMAL',
      },
      {
        parameter: 'Hemoglobin',
        value: '14.2',
        unit: 'g/dL',
        referenceRange: '13.8-17.2',
        status: 'NORMAL',
      },
      {
        parameter: 'Platelets',
        value: '250',
        unit: '×10³/µL',
        referenceRange: '150-400',
        status: 'NORMAL',
      },
    ],
    doctorName: 'Dr. Michael Chen',
    status: 'COMPLETED',
  },
  {
    id: '2',
    testName: 'Lipid Panel',
    date: '2026-01-20T14:30:00Z',
    results: [
      {
        parameter: 'Total Cholesterol',
        value: '220',
        unit: 'mg/dL',
        referenceRange: '125-200',
        status: 'ABNORMAL',
      },
      {
        parameter: 'LDL',
        value: '150',
        unit: 'mg/dL',
        referenceRange: '&lt;100',
        status: 'ABNORMAL',
      },
      {
        parameter: 'HDL',
        value: '55',
        unit: 'mg/dL',
        referenceRange: '&gt;40',
        status: 'NORMAL',
      },
      {
        parameter: 'Triglycerides',
        value: '150',
        unit: 'mg/dL',
        referenceRange: '&lt;150',
        status: 'NORMAL',
      },
    ],
    doctorName: 'Dr. Michael Chen',
    status: 'COMPLETED',
    notes: 'Elevated cholesterol levels. Consider dietary changes.',
  },
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2026-02-20',
    time: '10:00',
    duration: 30,
    type: 'IN_PERSON',
    status: 'CONFIRMED',
    reason: 'Follow-up on heart condition',
  },
  {
    id: '2',
    doctorId: 'DOC-002',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Neurology',
    date: '2026-03-15',
    time: '14:30',
    duration: 45,
    type: 'VIDEO',
    status: 'SCHEDULED',
    reason: 'Neurological consultation for headaches',
  },
];

const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2026-001',
    amount: 250.00,
    date: '2026-01-15T10:00:00Z',
    status: 'PAID',
    method: 'Credit Card',
    description: 'Cardiology Consultation',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2026-002',
    amount: 150.00,
    date: '2026-01-20T14:30:00Z',
    status: 'PAID',
    method: 'Debit Card',
    description: 'Blood Work Panel',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2026-003',
    amount: 220.00,
    date: '2026-02-01T09:00:00Z',
    status: 'PENDING',
    method: 'Insurance',
    description: 'Follow-up Consultation',
  },
];

const mockVitals: Vital[] = [
  {
    id: '1',
    date: '2026-02-15T08:30:00Z',
    bloodPressure: '120/80',
    heartRate: 72,
    temperature: 98.6,
    weight: 170,
    height: 70,
    bmi: 24.4,
    oxygenSaturation: 98,
    bloodSugar: 95,
    notes: 'Normal readings',
  },
  {
    id: '2',
    date: '2026-01-15T10:00:00Z',
    bloodPressure: '125/82',
    heartRate: 75,
    temperature: 98.4,
    weight: 172,
    height: 70,
    bmi: 24.7,
    oxygenSaturation: 97,
    bloodSugar: 98,
    notes: 'Slightly elevated blood pressure',
  },
];

const mockSymptoms: Symptom[] = [
  {
    id: '1',
    date: '2026-02-10T09:00:00Z',
    symptoms: ['Headache', 'Fatigue'],
    severity: 'MODERATE',
    duration: '2 days',
    notes: 'Started after long work hours',
  },
  {
    id: '2',
    date: '2026-01-25T14:00:00Z',
    symptoms: ['Chest tightness', 'Shortness of breath'],
    severity: 'MILD',
    duration: '30 minutes',
    notes: 'Occurred after exercise',
  },
];

// ============================================================
// SUB-COMPONENTS
// ============================================================

// Tab Navigation
const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  count?: number;
}> = ({ active, onClick, icon: Icon, label, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
      active
        ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
        : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    <Icon size={18} />
    <span>{label}</span>
    {count !== undefined && count > 0 && (
      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
        active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
      }`}>
        {count}
      </span>
    )}
  </button>
);

// Status Badge
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    SCHEDULED: 'bg-blue-100 text-blue-700',
    CONFIRMED: 'bg-emerald-100 text-emerald-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
    NO_SHOW: 'bg-gray-100 text-gray-700',
    ACTIVE: 'bg-green-100 text-green-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    PAID: 'bg-green-100 text-green-700',
    REFUNDED: 'bg-gray-100 text-gray-700',
    FAILED: 'bg-red-100 text-red-700',
    NORMAL: 'bg-green-100 text-green-700',
    ABNORMAL: 'bg-yellow-100 text-yellow-700',
    CRITICAL: 'bg-red-100 text-red-700',
  };

  const labels: Record<string, string> = {
    SCHEDULED: 'Scheduled',
    CONFIRMED: 'Confirmed',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    NO_SHOW: 'No Show',
    ACTIVE: 'Active',
    PENDING: 'Pending',
    PAID: 'Paid',
    REFUNDED: 'Refunded',
    FAILED: 'Failed',
    NORMAL: 'Normal',
    ABNORMAL: 'Abnormal',
    CRITICAL: 'Critical',
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {labels[status] || status}
    </span>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const PatientPortal: React.FC = () => {
  // State
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedVital, setSelectedVital] = useState<Vital | null>(null);
  
  // User data
  const [patient] = useState<PatientUser>(mockPatient);
  const [records] = useState<MedicalRecord[]>(mockMedicalRecords);
  const [prescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [labResults] = useState<LabResult[]>(mockLabResults);
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [payments] = useState<Payment[]>(mockPayments);
  const [vitals] = useState<Vital[]>(mockVitals);
  const [symptoms] = useState<Symptom[]>(mockSymptoms);

  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Loading state
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Handle Login
  const handleLogin = async () => {
    setIsLoading(true);
    setLoginError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email === 'john.doe@email.com' && password === 'password') {
        setIsAuthenticated(true);
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  // Render Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="text-center mb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Patient Portal</h1>
              <p className="text-sm text-slate-500 mt-1">Secure access to your health records</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-blue-500 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  'Login'
                )}
              </button>

              <div className="text-center text-sm text-slate-500">
                Demo: john.doe@email.com / password
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // RENDER PORTAL
  // ==========================================================
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ==========================================================
          HEADER
          ========================================================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white">
                <span className="text-lg font-bold">P</span>
              </div>
              <h1 className="text-xl font-bold text-blue-600">Patient Portal</h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="relative rounded-full p-2 hover:bg-slate-100 transition">
                <Bell size={20} className="text-slate-500" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-slate-800">{patient.firstName} {patient.lastName}</p>
                  <p className="text-xs text-slate-500">Patient ID: {patient.patientId}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
                >
                  <LogOut size={18} className="inline mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ==========================================================
            TABS
            ========================================================== */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          <TabButton
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            icon={LayoutDashboard}
            label="Dashboard"
          />
          <TabButton
            active={activeTab === 'records'}
            onClick={() => setActiveTab('records')}
            icon={FileText}
            label="Medical Records"
            count={records.length}
          />
          <TabButton
            active={activeTab === 'appointments'}
            onClick={() => setActiveTab('appointments')}
            icon={Calendar}
            label="Appointments"
            count={appointments.length}
          />
          <TabButton
            active={activeTab === 'prescriptions'}
            onClick={() => setActiveTab('prescriptions')}
            icon={Pill}
            label="Prescriptions"
            count={prescriptions.length}
          />
          <TabButton
            active={activeTab === 'lab-results'}
            onClick={() => setActiveTab('lab-results')}
            icon={Microscope}
            label="Lab Results"
            count={labResults.length}
          />
          <TabButton
            active={activeTab === 'vitals'}
            onClick={() => setActiveTab('vitals')}
            icon={Heart}
            label="Vitals & Symptoms"
            count={vitals.length}
          />
          <TabButton
            active={activeTab === 'payments'}
            onClick={() => setActiveTab('payments')}
            icon={CreditCard}
            label="Payments"
            count={payments.length}
          />
          <TabButton
            active={activeTab === 'telemedicine'}
            onClick={() => setActiveTab('telemedicine')}
            icon={Video}
            label="Telemedicine"
          />
          <TabButton
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            icon={User}
            label="Profile"
          />
        </div>

        {/* ==========================================================
            CONTENT AREA
            ========================================================== */}
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-500 via-blue-600 to-indigo-600 p-6 text-white">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white" />
              </div>
              <div className="relative">
                <h2 className="text-2xl font-bold">Welcome back, {patient.firstName}! 👋</h2>
                <p className="mt-1 text-blue-100">Here's your health summary at a glance</p>
                <p className="mt-2 text-sm text-blue-200">
                  Last login: {new Date(patient.lastLogin).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Upcoming Appointments</p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {appointments.filter(a => a.status === 'SCHEDULED' || a.status === 'CONFIRMED').length}
                    </p>
                  </div>
                  <div className="rounded-xl bg-blue-100 p-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Active Prescriptions</p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {prescriptions.filter(p => p.status === 'ACTIVE').length}
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-100 p-3">
                    <Pill className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Lab Results</p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {labResults.filter(r => r.status === 'COMPLETED').length}
                    </p>
                  </div>
                  <div className="rounded-xl bg-purple-100 p-3">
                    <Microscope className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Pending Payments</p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      ${payments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-amber-100 p-3">
                    <DollarSign className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {records.slice(0, 3).map((record) => (
                  <div key={record.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                    <div className="rounded-lg bg-blue-50 p-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{record.title}</p>
                      <p className="text-xs text-slate-500">{record.doctorName} • {new Date(record.date).toLocaleDateString()}</p>
                    </div>
                    <StatusBadge status={record.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MEDICAL RECORDS TAB */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Medical Records</h2>
              <button className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600">
                <Download size={18} className="inline mr-2" />
                Export All
              </button>
            </div>

            <div className="grid gap-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer"
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800">{record.title}</h3>
                        <StatusBadge status={record.status} />
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{record.description}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                        <span>👨‍⚕️ {record.doctorName}</span>
                        <span>📅 {new Date(record.date).toLocaleDateString()}</span>
                        <span>📋 {record.type}</span>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Appointments</h2>
              <button className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600">
                <Plus size={18} className="inline mr-2" />
                Book Appointment
              </button>
            </div>

            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800">{appointment.doctorName}</h3>
                        <StatusBadge status={appointment.status} />
                      </div>
                      <p className="text-sm text-slate-600">{appointment.specialty}</p>
                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span>📅 {new Date(appointment.date).toLocaleDateString()}</span>
                        <span>🕐 {appointment.time}</span>
                        <span>⏱️ {appointment.duration} min</span>
                        <span>📋 {appointment.type}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{appointment.reason}</p>
                    </div>
                    <div className="flex gap-2">
                      {appointment.type === 'VIDEO' && (
                        <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600">
                          <Video className="h-4 w-4 inline mr-2" />
                          Join Call
                        </button>
                      )}
                      <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200">
                        Reschedule
                      </button>
                      <button className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-200">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRESCRIPTIONS TAB */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Prescriptions</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {prescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200"
                >
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
                    <p>👨‍⚕️ {prescription.prescribedBy}</p>
                  </div>
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
                    {prescription.instructions}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LAB RESULTS TAB */}
        {activeTab === 'lab-results' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Lab Results</h2>
            {labResults.map((result) => (
              <div key={result.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{result.testName}</h3>
                    <p className="text-sm text-slate-600">{result.doctorName}</p>
                    <p className="text-xs text-slate-500">{new Date(result.date).toLocaleDateString()}</p>
                  </div>
                  <StatusBadge status={result.status} />
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-125">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Parameter</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Result</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Reference</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {result.results.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-slate-600">{item.parameter}</td>
                          <td className="px-4 py-2 text-sm font-medium text-slate-800">{item.value}</td>
                          <td className="px-4 py-2 text-sm text-slate-500">{item.referenceRange}</td>
                          <td className="px-4 py-2">
                            <StatusBadge status={item.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.notes && (
                  <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
                    📝 {result.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* VITALS & SYMPTOMS TAB */}
        {activeTab === 'vitals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Vitals & Symptoms</h2>
              <button className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600">
                <Plus size={18} className="inline mr-2" />
                Log New Vital
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {vitals.map((vital) => (
                <div key={vital.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">
                      {new Date(vital.date).toLocaleDateString()}
                    </h3>
                    <span className="text-xs text-slate-500">{new Date(vital.date).toLocaleTimeString()}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Blood Pressure</p>
                      <p className="text-sm font-semibold text-slate-800">{vital.bloodPressure}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Heart Rate</p>
                      <p className="text-sm font-semibold text-slate-800">{vital.heartRate} bpm</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Temperature</p>
                      <p className="text-sm font-semibold text-slate-800">{vital.temperature}°F</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">BMI</p>
                      <p className="text-sm font-semibold text-slate-800">{vital.bmi}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Weight</p>
                      <p className="text-sm font-semibold text-slate-800">{vital.weight} lbs</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Blood Sugar</p>
                      <p className="text-sm font-semibold text-slate-800">{vital.bloodSugar} mg/dL</p>
                    </div>
                  </div>
                  {vital.notes && (
                    <p className="mt-3 text-xs text-slate-500">{vital.notes}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Symptoms */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Symptom Tracker</h3>
              {symptoms.map((symptom) => (
                <div key={symptom.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                  <div className={`rounded-lg p-2 ${
                    symptom.severity === 'SEVERE' ? 'bg-red-100' :
                    symptom.severity === 'MODERATE' ? 'bg-yellow-100' :
                    'bg-green-100'
                  }`}>
                    <Activity className={`h-4 w-4 ${
                      symptom.severity === 'SEVERE' ? 'text-red-600' :
                      symptom.severity === 'MODERATE' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-800">
                        {symptom.symptoms.join(', ')}
                      </p>
                      <StatusBadge status={symptom.severity} />
                    </div>
                    <p className="text-xs text-slate-500">
                      {new Date(symptom.date).toLocaleDateString()} • Duration: {symptom.duration}
                    </p>
                    {symptom.notes && (
                      <p className="text-xs text-slate-500 mt-1">{symptom.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Payment History</h2>
              <button className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600">
                <CreditCard size={18} className="inline mr-2" />
                Make Payment
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-150">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Invoice</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Description</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-800">{payment.invoiceNumber}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{payment.description}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-800">${payment.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{new Date(payment.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={payment.status} />
                        </td>
                        <td className="px-6 py-4">
                          {payment.status === 'PENDING' && (
                            <button className="rounded-xl bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-600">
                              Pay Now
                            </button>
                          )}
                          {payment.status === 'PAID' && (
                            <button className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200">
                              <Download size={14} className="inline mr-1" />
                              Receipt
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TELEMEDICINE TAB */}
        {activeTab === 'telemedicine' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Telemedicine</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 mx-auto">
                  <Video className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-800">Start Video Consultation</h3>
                <p className="text-sm text-slate-500">Connect with your doctor remotely</p>
                <button className="mt-4 w-full rounded-xl bg-blue-500 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
                  Join Video Call
                </button>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mx-auto">
                  <Phone className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-800">Audio Consultation</h3>
                <p className="text-sm text-slate-500">Talk to your doctor over the phone</p>
                <button className="mt-4 w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600">
                  Start Audio Call
                </button>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 mx-auto">
                  <MessageSquare className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-800">Secure Messaging</h3>
                <p className="text-sm text-slate-500">Send messages to your healthcare team</p>
                <button className="mt-4 w-full rounded-xl bg-purple-500 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-600">
                  Send Message
                </button>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 mx-auto">
                  <Clock className="h-10 w-10 text-amber-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-800">Upcoming Calls</h3>
                <p className="text-sm text-slate-500">Your scheduled telemedicine appointments</p>
                <div className="mt-4 space-y-2 text-left">
                  {appointments.filter(a => a.type === 'VIDEO' && (a.status === 'SCHEDULED' || a.status === 'CONFIRMED')).map(a => (
                    <div key={a.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{a.doctorName}</p>
                        <p className="text-xs text-slate-500">{a.date} at {a.time}</p>
                      </div>
                      <button className="rounded-lg bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                        Join
                      </button>
                    </div>
                  ))}
                  {appointments.filter(a => a.type === 'VIDEO' && (a.status === 'SCHEDULED' || a.status === 'CONFIRMED')).length === 0 && (
                    <p className="text-sm text-slate-500 text-center">No upcoming calls</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Profile</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500">Full Name</p>
                    <p className="text-sm font-medium text-slate-800">{patient.firstName} {patient.lastName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Patient ID</p>
                    <p className="text-sm font-medium text-slate-800">{patient.patientId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Date of Birth</p>
                    <p className="text-sm font-medium text-slate-800">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Gender</p>
                    <p className="text-sm font-medium text-slate-800">{patient.gender}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Blood Type</p>
                    <p className="text-sm font-medium text-slate-800">{patient.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-medium text-slate-800">{patient.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm font-medium text-slate-800">{patient.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Address</p>
                    <p className="text-sm font-medium text-slate-800">{patient.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Emergency Contact</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500">Name</p>
                      <p className="text-sm font-medium text-slate-800">{patient.emergencyContact.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Relationship</p>
                      <p className="text-sm font-medium text-slate-800">{patient.emergencyContact.relationship}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Phone</p>
                      <p className="text-sm font-medium text-slate-800">{patient.emergencyContact.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Insurance Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500">Provider</p>
                      <p className="text-sm font-medium text-slate-800">{patient.insurance.provider}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Policy Number</p>
                      <p className="text-sm font-medium text-slate-800">{patient.insurance.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Expiry Date</p>
                      <p className="text-sm font-medium text-slate-800">{new Date(patient.insurance.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPortal;