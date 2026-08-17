// ============================================================
// FILE: src/features/staff-management/page/StaffManagement.tsx
// ============================================================
// COMPLETE STAFF MANAGEMENT SYSTEM
// Import this in AppRoutes.tsx
// ============================================================

import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  UserPlus,
  UserCheck,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  
  AlertCircle,

  Mail,
  Phone,
  Briefcase,
  TrendingUp,
  TrendingDown,
  FileText,
  Download,
 
  RefreshCw,
  Loader,
 
  X,
  Settings,
 
  Shield,

  Users as UsersIcon,
  
  Clock as ClockIcon,
  Check,
  X as XIcon,
  CalendarPlus,
  CalendarMinus,
  UserPlus as UserPlusIcon,
  Building,
  Target as TargetIcon,
} from 'lucide-react';

// ============================================================
// TYPES & INTERFACES
// ============================================================

type StaffRole = 'ADMIN' | 'DOCTOR' | 'NURSE' | 'RECEPTIONIST' | 'LAB_TECHNICIAN' | 'PHARMACIST' | 'MANAGER' | 'HR';
type StaffStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'SUSPENDED' | 'TERMINATED';
type Department = 'CARDIOLOGY' | 'NEUROLOGY' | 'PEDIATRICS' | 'ORTHOPEDICS' | 'DERMATOLOGY' | 'SURGERY' | 'EMERGENCY' | 'LABORATORY' | 'PHARMACY' | 'ADMINISTRATION' | 'HR' | 'IT' | 'MAINTENANCE';
type ShiftType = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT' | 'FLEXIBLE';
type LeaveType = 'ANNUAL' | 'SICK' | 'PERSONAL' | 'MATERNITY' | 'PATERNITY' | 'BEREAVEMENT' | 'UNPAID';
type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
type PerformanceRating = 'EXCELLENT' | 'GOOD' | 'SATISFACTORY' | 'NEEDS_IMPROVEMENT' | 'POOR';

interface Staff {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: StaffRole;
  department: Department;
  position: string;
  joinDate: string;
  status: StaffStatus;
  profileImage?: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  qualifications: string[];
  certifications: string[];
  experience: number;
  salary: number;
  shiftPreference: ShiftType;
  createdAt: string;
  updatedAt: string;
}

interface Shift {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: ShiftType;
  department: Department;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  days: number;
  approvedBy?: string;
  approvedDate?: string;
  notes?: string;
  createdAt: string;
}

interface PerformanceReview {
  id: string;
  staffId: string;
  staffName: string;
  reviewer: string;
  reviewDate: string;
  rating: PerformanceRating;
  scores: {
    qualityOfWork: number;
    communication: number;
    teamwork: number;
    punctuality: number;
    problemSolving: number;
  };
  strengths: string[];
  improvements: string[];
  goals: string[];
  comments: string;
  status: 'DRAFT' | 'SUBMITTED' | 'COMPLETED';
}

interface OnboardingTask {
  id: string;
  staffId: string;
  staffName: string;
  title: string;
  description: string;
  department: Department;
  assignedTo: string;
  dueDate: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  attachments?: string[];
  createdAt: string;
}

interface Permission {
  id: string;
  role: StaffRole;
  module: string;
  actions: ('CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'MANAGE')[];
}

// ============================================================
// MOCK DATA
// ============================================================

const mockStaff: Staff[] = [
  {
    id: '1',
    employeeId: 'EMP-001',
    firstName: 'John',
    lastName: 'Admin',
    email: 'john.admin@hospital.com',
    phone: '(555) 111-2222',
    role: 'ADMIN',
    department: 'ADMINISTRATION',
    position: 'System Administrator',
    joinDate: '2024-01-01',
    status: 'ACTIVE',
    address: '123 Admin St, New York, NY 10001',
    emergencyContact: {
      name: 'Jane Admin',
      relationship: 'Spouse',
      phone: '(555) 999-8888',
    },
    qualifications: ['MBA', 'BS Computer Science'],
    certifications: ['PMP', 'ITIL'],
    experience: 10,
    salary: 95000,
    shiftPreference: 'MORNING',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
  },
  {
    id: '2',
    employeeId: 'EMP-002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@hospital.com',
    phone: '(555) 222-3333',
    role: 'DOCTOR',
    department: 'CARDIOLOGY',
    position: 'Senior Cardiologist',
    joinDate: '2024-06-15',
    status: 'ACTIVE',
    address: '456 Medical Ave, New York, NY 10001',
    emergencyContact: {
      name: 'Mike Johnson',
      relationship: 'Brother',
      phone: '(555) 777-6666',
    },
    qualifications: ['MD', 'Fellowship in Cardiology'],
    certifications: ['Board Certified in Cardiology', 'ACLS'],
    experience: 15,
    salary: 180000,
    shiftPreference: 'FLEXIBLE',
    createdAt: '2024-06-15T10:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
  },
  {
    id: '3',
    employeeId: 'EMP-003',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@hospital.com',
    phone: '(555) 333-4444',
    role: 'NURSE',
    department: 'EMERGENCY',
    position: 'Head Nurse',
    joinDate: '2024-03-01',
    status: 'ACTIVE',
    address: '789 Healthcare Dr, New York, NY 10001',
    emergencyContact: {
      name: 'Carlos Rodriguez',
      relationship: 'Father',
      phone: '(555) 555-4444',
    },
    qualifications: ['BSN', 'MSN'],
    certifications: ['RN', 'BLS', 'ACLS'],
    experience: 8,
    salary: 85000,
    shiftPreference: 'EVENING',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
  },
  {
    id: '4',
    employeeId: 'EMP-004',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@hospital.com',
    phone: '(555) 444-5555',
    role: 'LAB_TECHNICIAN',
    department: 'LABORATORY',
    position: 'Senior Lab Technician',
    joinDate: '2024-08-10',
    status: 'ACTIVE',
    address: '321 Lab Lane, New York, NY 10001',
    emergencyContact: {
      name: 'Lisa Chen',
      relationship: 'Sister',
      phone: '(555) 333-2222',
    },
    qualifications: ['BS Medical Technology'],
    certifications: ['MLT', 'ASCP'],
    experience: 6,
    salary: 70000,
    shiftPreference: 'NIGHT',
    createdAt: '2024-08-10T10:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
  },
  {
    id: '5',
    employeeId: 'EMP-005',
    firstName: 'Lisa',
    lastName: 'Park',
    email: 'lisa.park@hospital.com',
    phone: '(555) 555-6666',
    role: 'PHARMACIST',
    department: 'PHARMACY',
    position: 'Clinical Pharmacist',
    joinDate: '2024-09-20',
    status: 'ACTIVE',
    address: '654 Pharmacy Blvd, New York, NY 10001',
    emergencyContact: {
      name: 'David Park',
      relationship: 'Husband',
      phone: '(555) 111-0000',
    },
    qualifications: ['PharmD'],
    certifications: ['RPh', 'BCPS'],
    experience: 12,
    salary: 120000,
    shiftPreference: 'MORNING',
    createdAt: '2024-09-20T10:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
  },
  {
    id: '6',
    employeeId: 'EMP-006',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert.taylor@hospital.com',
    phone: '(555) 666-7777',
    role: 'RECEPTIONIST',
    department: 'ADMINISTRATION',
    position: 'Front Desk Receptionist',
    joinDate: '2025-01-15',
    status: 'ON_LEAVE',
    address: '987 Front Desk Rd, New York, NY 10001',
    emergencyContact: {
      name: 'Anna Taylor',
      relationship: 'Mother',
      phone: '(555) 888-9999',
    },
    qualifications: ['High School Diploma'],
    certifications: ['Customer Service Certification'],
    experience: 3,
    salary: 45000,
    shiftPreference: 'MORNING',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
  },
];

const mockShifts: Shift[] = [
  {
    id: '1',
    staffId: '1',
    staffName: 'John Admin',
    date: '2026-02-20',
    startTime: '08:00',
    endTime: '17:00',
    type: 'MORNING',
    department: 'ADMINISTRATION',
    status: 'SCHEDULED',
  },
  {
    id: '2',
    staffId: '2',
    staffName: 'Sarah Johnson',
    date: '2026-02-20',
    startTime: '09:00',
    endTime: '18:00',
    type: 'FLEXIBLE',
    department: 'CARDIOLOGY',
    status: 'SCHEDULED',
  },
  {
    id: '3',
    staffId: '3',
    staffName: 'Emily Rodriguez',
    date: '2026-02-20',
    startTime: '15:00',
    endTime: '23:00',
    type: 'EVENING',
    department: 'EMERGENCY',
    status: 'SCHEDULED',
  },
  {
    id: '4',
    staffId: '4',
    staffName: 'Michael Chen',
    date: '2026-02-20',
    startTime: '23:00',
    endTime: '07:00',
    type: 'NIGHT',
    department: 'LABORATORY',
    status: 'IN_PROGRESS',
  },
  {
    id: '5',
    staffId: '5',
    staffName: 'Lisa Park',
    date: '2026-02-21',
    startTime: '08:00',
    endTime: '17:00',
    type: 'MORNING',
    department: 'PHARMACY',
    status: 'SCHEDULED',
  },
];

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    staffId: '1',
    staffName: 'John Admin',
    type: 'ANNUAL',
    startDate: '2026-03-01',
    endDate: '2026-03-07',
    reason: 'Family vacation',
    status: 'APPROVED',
    days: 7,
    approvedBy: 'HR Manager',
    approvedDate: '2026-02-15',
    notes: 'Approved by HR',
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: '2',
    staffId: '6',
    staffName: 'Robert Taylor',
    type: 'SICK',
    startDate: '2026-02-18',
    endDate: '2026-02-22',
    reason: 'Medical leave due to illness',
    status: 'PENDING',
    days: 5,
    createdAt: '2026-02-17T10:00:00Z',
  },
  {
    id: '3',
    staffId: '3',
    staffName: 'Emily Rodriguez',
    type: 'PERSONAL',
    startDate: '2026-03-10',
    endDate: '2026-03-12',
    reason: 'Personal errands',
    status: 'PENDING',
    days: 3,
    createdAt: '2026-02-16T10:00:00Z',
  },
];

const mockPerformanceReviews: PerformanceReview[] = [
  {
    id: '1',
    staffId: '1',
    staffName: 'John Admin',
    reviewer: 'HR Manager',
    reviewDate: '2026-01-15',
    rating: 'EXCELLENT',
    scores: {
      qualityOfWork: 4.5,
      communication: 4.5,
      teamwork: 4.5,
      punctuality: 5.0,
      problemSolving: 4.5,
    },
    strengths: ['Excellent leadership', 'Strong technical skills'],
    improvements: ['Needs more delegation'],
    goals: ['Complete IT infrastructure upgrade', 'Implement new system'],
    comments: 'Outstanding performance overall',
    status: 'COMPLETED',
  },
  {
    id: '2',
    staffId: '2',
    staffName: 'Sarah Johnson',
    reviewer: 'Chief of Medicine',
    reviewDate: '2026-01-20',
    rating: 'GOOD',
    scores: {
      qualityOfWork: 4.0,
      communication: 4.0,
      teamwork: 4.5,
      punctuality: 4.0,
      problemSolving: 4.0,
    },
    strengths: ['Excellent patient care', 'Strong clinical skills'],
    improvements: ['More research publications'],
    goals: ['Publish 2 papers this year', 'Mentor junior doctors'],
    comments: 'Consistent performer',
    status: 'COMPLETED',
  },
];

const mockOnboardingTasks: OnboardingTask[] = [
  {
    id: '1',
    staffId: '5',
    staffName: 'Lisa Park',
    title: 'Pharmacy System Training',
    description: 'Complete training on new pharmacy management system',
    department: 'PHARMACY',
    assignedTo: 'IT Department',
    dueDate: '2026-03-01',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: '2',
    staffId: '5',
    staffName: 'Lisa Park',
    title: 'Hospital Policy Review',
    description: 'Review and sign hospital policies and procedures',
    department: 'PHARMACY',
    assignedTo: 'HR Department',
    dueDate: '2026-02-28',
    status: 'PENDING',
    priority: 'MEDIUM',
    createdAt: '2026-02-01T10:00:00Z',
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
    ON_LEAVE: 'bg-yellow-100 text-yellow-700',
    SUSPENDED: 'bg-red-100 text-red-700',
    TERMINATED: 'bg-red-100 text-red-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
    CANCELLED: 'bg-gray-100 text-gray-700',
    SCHEDULED: 'bg-blue-100 text-blue-700',
    IN_PROGRESS: 'bg-purple-100 text-purple-700',
    COMPLETED: 'bg-green-100 text-green-700',
    OVERDUE: 'bg-red-100 text-red-700',
    EXCELLENT: 'bg-green-100 text-green-700',
    GOOD: 'bg-blue-100 text-blue-700',
    SATISFACTORY: 'bg-yellow-100 text-yellow-700',
    NEEDS_IMPROVEMENT: 'bg-orange-100 text-orange-700',
    POOR: 'bg-red-100 text-red-700',
    DRAFT: 'bg-gray-100 text-gray-700',
    SUBMITTED: 'bg-blue-100 text-blue-700',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
};

// Role Badge
const RoleBadge: React.FC<{ role: StaffRole }> = ({ role }) => {
  const styles: Record<StaffRole, string> = {
    ADMIN: 'bg-purple-100 text-purple-700',
    DOCTOR: 'bg-blue-100 text-blue-700',
    NURSE: 'bg-green-100 text-green-700',
    RECEPTIONIST: 'bg-cyan-100 text-cyan-700',
    LAB_TECHNICIAN: 'bg-amber-100 text-amber-700',
    PHARMACIST: 'bg-emerald-100 text-emerald-700',
    MANAGER: 'bg-indigo-100 text-indigo-700',
    HR: 'bg-pink-100 text-pink-700',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[role]}`}>
      {role}
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

const StaffManagement: React.FC = () => {
  // ==========================================================
  // STATE MANAGEMENT
  // ==========================================================
  
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [performanceReviews, setPerformanceReviews] = useState<PerformanceReview[]>(mockPerformanceReviews);
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>(mockOnboardingTasks);
  
  const [activeTab, setActiveTab] = useState('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ==========================================================
  // DATA LOADING
  // ==========================================================
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
      } catch (error) {
        console.error('Failed to load staff data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ==========================================================
  // COMPUTED VALUES
  // ==========================================================
  
  const filteredStaff = useMemo(() => {
    let filtered = staff;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.firstName.toLowerCase().includes(query) ||
        s.lastName.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.employeeId.toLowerCase().includes(query)
      );
    }

    if (selectedRole !== 'ALL') {
      filtered = filtered.filter(s => s.role === selectedRole);
    }

    if (selectedDepartment !== 'ALL') {
      filtered = filtered.filter(s => s.department === selectedDepartment);
    }

    if (selectedStatus !== 'ALL') {
      filtered = filtered.filter(s => s.status === selectedStatus);
    }

    return filtered;
  }, [staff, searchQuery, selectedRole, selectedDepartment, selectedStatus]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedRole !== 'ALL') count++;
    if (selectedDepartment !== 'ALL') count++;
    if (selectedStatus !== 'ALL') count++;
    return count;
  }, [selectedRole, selectedDepartment, selectedStatus]);

  const stats = useMemo(() => {
    const total = staff.length;
    const active = staff.filter(s => s.status === 'ACTIVE').length;
    const onLeave = staff.filter(s => s.status === 'ON_LEAVE').length;
    const suspended = staff.filter(s => s.status === 'SUSPENDED').length;
    const byRole = staff.reduce((acc, s) => {
      acc[s.role] = (acc[s.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, active, onLeave, suspended, byRole };
  }, [staff]);

  const pendingLeaves = useMemo(() => {
    return leaveRequests.filter(l => l.status === 'PENDING');
  }, [leaveRequests]);

  const pendingOnboarding = useMemo(() => {
    return onboardingTasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS');
  }, [onboardingTasks]);

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

  const handleStatusChange = (id: string, status: StaffStatus) => {
    setStaff(prev =>
      prev.map(s =>
        s.id === id ? { ...s, status, updatedAt: new Date().toISOString() } : s
      )
    );
  };

  const handleLeaveAction = (id: string, status: LeaveStatus) => {
    setLeaveRequests(prev =>
      prev.map(l =>
        l.id === id ? { ...l, status, approvedDate: new Date().toISOString() } : l
      )
    );
  };

  const handleTaskComplete = (id: string) => {
    setOnboardingTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: 'COMPLETED' } : t
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
          <p className="text-sm text-slate-500">Loading staff data...</p>
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
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-500" />
            Staff Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage all employees, roles, shifts, and performance
          </p>
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
            <UserPlus size={18} />
            Add Staff
          </button>
        </div>
      </div>

      {/* ==========================================================
          STATISTICS CARDS
          ========================================================== */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Employees"
          value={stats.total}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Active Staff"
          value={stats.active}
          icon={UserCheck}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="On Leave"
          value={stats.onLeave}
          icon={Clock}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
        />
        <StatCard
          title="Pending Leave"
          value={pendingLeaves.length}
          icon={AlertCircle}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
        />
        <StatCard
          title="Pending Onboarding"
          value={pendingOnboarding.length}
          icon={FileText}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* ==========================================================
          TABS
          ========================================================== */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'directory', label: 'Staff Directory', icon: Users },
          { id: 'roles', label: 'Role Management', icon: Shield },
          { id: 'shifts', label: 'Shift Scheduling', icon: Calendar },
          { id: 'leave', label: 'Leave Management', icon: CalendarMinus },
          { id: 'performance', label: 'Performance', icon: TargetIcon },
          { id: 'onboarding', label: 'Onboarding', icon: UserPlusIcon },
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
          CONTENT AREA - STAFF DIRECTORY
          ========================================================== */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 min-w-50">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff by name, email, or ID..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  showFilters || activeFilterCount > 0
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Filter size={18} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm animate-in">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-600">Role:</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="ALL">All Roles</option>
                    <option value="ADMIN">Admin</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="NURSE">Nurse</option>
                    <option value="RECEPTIONIST">Receptionist</option>
                    <option value="LAB_TECHNICIAN">Lab Technician</option>
                    <option value="PHARMACIST">Pharmacist</option>
                    <option value="MANAGER">Manager</option>
                    <option value="HR">HR</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-600">Department:</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="ALL">All Departments</option>
                    <option value="CARDIOLOGY">Cardiology</option>
                    <option value="NEUROLOGY">Neurology</option>
                    <option value="PEDIATRICS">Pediatrics</option>
                    <option value="ORTHOPEDICS">Orthopedics</option>
                    <option value="DERMATOLOGY">Dermatology</option>
                    <option value="SURGERY">Surgery</option>
                    <option value="EMERGENCY">Emergency</option>
                    <option value="LABORATORY">Laboratory</option>
                    <option value="PHARMACY">Pharmacy</option>
                    <option value="ADMINISTRATION">Administration</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-600">Status:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="ALL">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="ON_LEAVE">On Leave</option>
                    <option value="SUSPENDED">Suspended</option>
                    <option value="TERMINATED">Terminated</option>
                  </select>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      setSelectedRole('ALL');
                      setSelectedDepartment('ALL');
                      setSelectedStatus('ALL');
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Staff Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStaff.map((staff) => (
              <div
                key={staff.id}
                className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer"
                onClick={() => {
                  setSelectedStaff(staff);
                  setShowProfileModal(true);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white font-bold text-lg">
                      {staff.firstName.charAt(0)}{staff.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {staff.firstName} {staff.lastName}
                      </p>
                      <RoleBadge role={staff.role} />
                      <p className="text-xs text-slate-500 mt-1">{staff.employeeId}</p>
                    </div>
                  </div>
                  <StatusBadge status={staff.status} />
                </div>

                <div className="mt-4 space-y-1.5 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-slate-400" />
                    {staff.position}
                  </div>
                  <div className="flex items-center gap-2">
                    <Building size={14} className="text-slate-400" />
                    {staff.department}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" />
                    {staff.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" />
                    {staff.phone}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    <Eye size={14} className="inline mr-1" />
                    View
                  </button>
                  <button className="flex-1 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
                    <Edit size={14} className="inline mr-1" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="rounded-2xl bg-white p-12 text-center border border-slate-200">
              <Users className="h-12 w-12 text-slate-300 mx-auto" />
              <p className="mt-4 text-slate-500">No staff members found</p>
              <p className="text-sm text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* ==========================================================
          CONTENT AREA - ROLE MANAGEMENT
          ========================================================== */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Role Management</h2>
            <button className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              <Shield size={18} className="inline mr-2" />
              Create Role
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(stats.byRole).map(([role, count]) => (
              <div key={role} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{role}</p>
                      <p className="text-sm text-slate-500">{count} employees</p>
                    </div>
                  </div>
                  <button className="rounded-lg p-2 hover:bg-slate-100">
                    <Settings size={18} className="text-slate-400" />
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-slate-500">Permissions:</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Read</span>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Create</span>
                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">Update</span>
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">Delete</span>
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">Manage</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Permission Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-150">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Module</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-600">Create</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-600">Read</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-600">Update</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-600">Delete</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-600">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {['Patients', 'Doctors', 'Appointments', 'Billing', 'Staff', 'Reports'].map((module) => (
                    <tr key={module}>
                      <td className="px-4 py-3 text-sm font-medium text-slate-700">{module}</td>
                      <td className="px-4 py-3 text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <X className="h-4 w-4 text-red-500 mx-auto" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
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
          CONTENT AREA - SHIFT SCHEDULING
          ========================================================== */}
      {activeTab === 'shifts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Shift Scheduling</h2>
            <div className="flex gap-2">
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                <CalendarPlus size={18} className="inline mr-2" />
                Create Shift
              </button>
              <button className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
                <Download size={18} className="inline mr-2" />
                Export Schedule
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Staff</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Shift</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Department</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {shifts.map((shift) => (
                    <tr key={shift.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">{shift.staffName}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{shift.date}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-slate-800">{shift.startTime} - {shift.endTime}</p>
                          <p className="text-xs text-slate-500">{shift.type}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{shift.department}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={shift.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="rounded-lg p-2 hover:bg-blue-100">
                            <Edit size={16} className="text-blue-600" />
                          </button>
                          <button className="rounded-lg p-2 hover:bg-red-100">
                            <Trash2 size={16} className="text-red-600" />
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
          CONTENT AREA - LEAVE MANAGEMENT
          ========================================================== */}
      {activeTab === 'leave' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Leave Management</h2>
            <button className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              <Plus size={18} className="inline mr-2" />
              Request Leave
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Total Leave</p>
              <p className="text-2xl font-bold text-slate-800">{leaveRequests.length}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingLeaves.length}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Approved</p>
              <p className="text-2xl font-bold text-green-600">{leaveRequests.filter(l => l.status === 'APPROVED').length}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{leaveRequests.filter(l => l.status === 'REJECTED').length}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-225">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Staff</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Start Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">End Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Days</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaveRequests.map((leave) => (
                    <tr key={leave.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">{leave.staffName}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{leave.type}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{leave.startDate}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{leave.endDate}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">{leave.days}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={leave.status} />
                      </td>
                      <td className="px-6 py-4">
                        {leave.status === 'PENDING' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleLeaveAction(leave.id, 'APPROVED')}
                              className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-200"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleLeaveAction(leave.id, 'REJECTED')}
                              className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-200"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {leave.status !== 'PENDING' && (
                          <span className="text-xs text-slate-400">No action needed</span>
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

      {/* ==========================================================
          CONTENT AREA - PERFORMANCE
          ========================================================== */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Performance Reviews</h2>
            <button className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              <Plus size={18} className="inline mr-2" />
              New Review
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {performanceReviews.map((review) => (
              <div key={review.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{review.staffName}</p>
                    <p className="text-sm text-slate-500">Reviewer: {review.reviewer}</p>
                  </div>
                  <StatusBadge status={review.rating} />
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Quality:</span>
                    <span className="font-medium text-slate-700">{review.scores.qualityOfWork}/5</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Communication:</span>
                    <span className="font-medium text-slate-700">{review.scores.communication}/5</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Teamwork:</span>
                    <span className="font-medium text-slate-700">{review.scores.teamwork}/5</span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-slate-500">Strengths:</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {review.strengths.map((s, i) => (
                      <span key={i} className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    <Eye size={14} className="inline mr-1" />
                    View
                  </button>
                  <button className="flex-1 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
                    <FileText size={14} className="inline mr-1" />
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================================
          CONTENT AREA - ONBOARDING
          ========================================================== */}
      {activeTab === 'onboarding' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Onboarding Tasks</h2>
            <button className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              <Plus size={18} className="inline mr-2" />
              Create Task
            </button>
          </div>

          <div className="space-y-4">
            {onboardingTasks.map((task) => (
              <div key={task.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        task.priority === 'HIGH' ? 'bg-red-500' :
                        task.priority === 'MEDIUM' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`} />
                      <h3 className={`font-semibold ${
                        task.status === 'COMPLETED' ? 'text-slate-400 line-through' : 'text-slate-800'
                      }`}>
                        {task.title}
                      </h3>
                      <StatusBadge status={task.status} />
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{task.description}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                      <span>👤 {task.staffName}</span>
                      <span>📅 Due: {task.dueDate}</span>
                      <span>🏢 {task.department}</span>
                      <span>📋 {task.assignedTo}</span>
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
          PROFILE MODAL
          ========================================================== */}
      {showProfileModal && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl my-8 animate-in fade-in zoom-in duration-200">
            <div className="rounded-2xl bg-white shadow-xl border border-slate-200">
              <div className="border-b border-slate-200 p-6 bg-linear-to-r from-blue-50 to-indigo-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white font-bold text-2xl">
                      {selectedStaff.firstName.charAt(0)}{selectedStaff.lastName.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">
                        {selectedStaff.firstName} {selectedStaff.lastName}
                      </h2>
                      <p className="text-sm text-slate-500">{selectedStaff.position}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <RoleBadge role={selectedStaff.role} />
                        <StatusBadge status={selectedStaff.status} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      setSelectedStaff(null);
                    }}
                    className="rounded-lg p-2 transition hover:bg-white/50"
                  >
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Employee ID</p>
                    <p className="font-medium text-slate-800">{selectedStaff.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Department</p>
                    <p className="font-medium text-slate-800">{selectedStaff.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-medium text-slate-800">{selectedStaff.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="font-medium text-slate-800">{selectedStaff.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Join Date</p>
                    <p className="font-medium text-slate-800">{selectedStaff.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Experience</p>
                    <p className="font-medium text-slate-800">{selectedStaff.experience} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Shift Preference</p>
                    <p className="font-medium text-slate-800">{selectedStaff.shiftPreference}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Salary</p>
                    <p className="font-medium text-slate-800">${selectedStaff.salary.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Address</p>
                  <p className="text-sm text-slate-700">{selectedStaff.address}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Emergency Contact</p>
                    <div className="mt-1 rounded-lg bg-slate-50 p-3">
                      <p className="text-sm font-medium text-slate-800">{selectedStaff.emergencyContact.name}</p>
                      <p className="text-xs text-slate-500">{selectedStaff.emergencyContact.relationship}</p>
                      <p className="text-xs text-slate-500">{selectedStaff.emergencyContact.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Qualifications</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedStaff.qualifications.map((q, i) => (
                        <span key={i} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-200">
                  <button className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600">
                    <Edit size={16} className="inline mr-2" />
                    Edit Profile
                  </button>
                  <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600">
                    <Calendar size={16} className="inline mr-2" />
                    Schedule Shift
                  </button>
                  <button className="rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600">
                    <FileText size={16} className="inline mr-2" />
                    Performance Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;