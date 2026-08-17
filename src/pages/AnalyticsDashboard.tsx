// ============================================================
// FILE: src/pages/AnalyticsDashboard.tsx
// ============================================================
// COMPLETE ANALYTICS DASHBOARD WITH ALL FEATURES
// Import this in App.tsx or your main routing file
// ============================================================

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Stethoscope,
  
  DollarSign,
  Clock,
  Star,
 
  Download,

  ChevronDown,
  ChevronUp,
  AlertCircle,
 
  Clock as ClockIcon,
  UserPlus,

  Brain,

} from 'lucide-react';

// ============================================================
// TYPES & INTERFACES
// ============================================================

interface AnalyticsMetrics {
  // Patient Metrics
  totalPatients: number;
  newPatients: number;
  patientGrowth: number;
  averageAge: number;
  genderDistribution: { male: number; female: number; other: number };
  
  // Doctor Metrics
  totalDoctors: number;
  doctorPatientRatio: number;
  averageConsultationTime: number;
  doctorPerformance: DoctorPerformance[];
  
  // Appointment Metrics
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  noShows: number;
  appointmentTrend: TrendData[];
  
  // Revenue Metrics
  totalRevenue: number;
  revenueBySpecialty: RevenueBySpecialty[];
  averageRevenuePerPatient: number;
  revenueTrend: TrendData[];
  
  // Operational Metrics
  averageWaitTime: number;
  peakHours: PeakHour[];
  patientSatisfaction: number;
  occupancyRate: number;
}

interface DoctorPerformance {
  doctorId: string;
  name: string;
  specialty: string;
  patientsServed: number;
  averageRating: number;
  revenueGenerated: number;
  appointmentsCompleted: number;
  patientSatisfaction: number;
}

interface TrendData {
  date: string;
  value: number;
  label?: string;
}

interface RevenueBySpecialty {
  specialty: string;
  revenue: number;
  percentage: number;
}

interface PeakHour {
  hour: number;
  appointments: number;
  label: string;
}

// ============================================================
// MOCK DATA
// ============================================================

const mockAnalyticsData: AnalyticsMetrics = {
  // Patient Metrics
  totalPatients: 12543,
  newPatients: 342,
  patientGrowth: 12.5,
  averageAge: 45.3,
  genderDistribution: { male: 5800, female: 6300, other: 443 },
  
  // Doctor Metrics
  totalDoctors: 45,
  doctorPatientRatio: 1.2,
  averageConsultationTime: 23.5,
  doctorPerformance: [
    {
      doctorId: 'DOC-001',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      patientsServed: 1250,
      averageRating: 4.8,
      revenueGenerated: 312500,
      appointmentsCompleted: 980,
      patientSatisfaction: 96,
    },
    {
      doctorId: 'DOC-002',
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      patientsServed: 850,
      averageRating: 4.9,
      revenueGenerated: 255000,
      appointmentsCompleted: 720,
      patientSatisfaction: 94,
    },
    {
      doctorId: 'DOC-003',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      patientsServed: 2100,
      averageRating: 4.7,
      revenueGenerated: 378000,
      appointmentsCompleted: 1680,
      patientSatisfaction: 92,
    },
    {
      doctorId: 'DOC-004',
      name: 'Dr. James Williams',
      specialty: 'Orthopedics',
      patientsServed: 980,
      averageRating: 4.6,
      revenueGenerated: 269500,
      appointmentsCompleted: 780,
      patientSatisfaction: 90,
    },
    {
      doctorId: 'DOC-005',
      name: 'Dr. Lisa Park',
      specialty: 'Dermatology',
      patientsServed: 1500,
      averageRating: 4.9,
      revenueGenerated: 330000,
      appointmentsCompleted: 1200,
      patientSatisfaction: 95,
    },
  ],
  
  // Appointment Metrics
  totalAppointments: 8760,
  completedAppointments: 7890,
  cancelledAppointments: 520,
  noShows: 350,
  appointmentTrend: [
    { date: 'Jan', value: 680 },
    { date: 'Feb', value: 720 },
    { date: 'Mar', value: 690 },
    { date: 'Apr', value: 750 },
    { date: 'May', value: 810 },
    { date: 'Jun', value: 780 },
    { date: 'Jul', value: 820 },
    { date: 'Aug', value: 860 },
    { date: 'Sep', value: 890 },
    { date: 'Oct', value: 920 },
    { date: 'Nov', value: 850 },
    { date: 'Dec', value: 790 },
  ],
  
  // Revenue Metrics
  totalRevenue: 5245000,
  revenueBySpecialty: [
    { specialty: 'Cardiology', revenue: 875000, percentage: 16.7 },
    { specialty: 'Neurology', revenue: 655000, percentage: 12.5 },
    { specialty: 'Pediatrics', revenue: 728000, percentage: 13.9 },
    { specialty: 'Orthopedics', revenue: 945000, percentage: 18.0 },
    { specialty: 'Dermatology', revenue: 580000, percentage: 11.1 },
    { specialty: 'Surgery', revenue: 856000, percentage: 16.3 },
    { specialty: 'Other', revenue: 606000, percentage: 11.5 },
  ],
  averageRevenuePerPatient: 418,
  revenueTrend: [
    { date: 'Jan', value: 380000 },
    { date: 'Feb', value: 420000 },
    { date: 'Mar', value: 395000 },
    { date: 'Apr', value: 450000 },
    { date: 'May', value: 480000 },
    { date: 'Jun', value: 460000 },
    { date: 'Jul', value: 510000 },
    { date: 'Aug', value: 530000 },
    { date: 'Sep', value: 490000 },
    { date: 'Oct', value: 520000 },
    { date: 'Nov', value: 470000 },
    { date: 'Dec', value: 445000 },
  ],
  
  // Operational Metrics
  averageWaitTime: 12.5,
  peakHours: [
    { hour: 8, appointments: 45, label: '8 AM' },
    { hour: 9, appointments: 62, label: '9 AM' },
    { hour: 10, appointments: 58, label: '10 AM' },
    { hour: 11, appointments: 43, label: '11 AM' },
    { hour: 12, appointments: 28, label: '12 PM' },
    { hour: 13, appointments: 35, label: '1 PM' },
    { hour: 14, appointments: 52, label: '2 PM' },
    { hour: 15, appointments: 48, label: '3 PM' },
    { hour: 16, appointments: 41, label: '4 PM' },
    { hour: 17, appointments: 32, label: '5 PM' },
  ],
  patientSatisfaction: 4.6,
  occupancyRate: 78.5,
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

// Metric Card Component
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  color: string;
  subtitle?: string;
}> = ({ title, value, icon: Icon, trend, color, subtitle }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-slate-300">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-800">{value}</h3>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        {trend !== undefined && (
          <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${
            trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-slate-500'
          }`}>
            {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  </div>
);

// Chart Placeholder Component
const ChartPlaceholder: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
  onExport?: () => void;
}> = ({ title, children, className = '', onExport }) => (
  <div className={`rounded-2xl bg-white p-6 shadow-sm border border-slate-200 ${className}`}>
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      {onExport && (
        <button
          onClick={onExport}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <Download size={16} />
        </button>
      )}
    </div>
    <div className="min-h-50">
      {children}
    </div>
  </div>
);

// Bar Chart (Simulated)
const BarChart: React.FC<{
  data: { label: string; value: number; color?: string }[];
  height?: number;
}> = ({ data, height = 200 }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="flex h-full w-full items-end justify-between gap-2" style={{ height }}>
      {data.map((item, index) => (
        <div key={index} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="w-full rounded-lg transition-all duration-500 hover:opacity-80"
            style={{
              height: `${(item.value / maxValue) * 100}%`,
              backgroundColor: item.color || '#818cf8',
              minHeight: '4px',
            }}
          />
          <span className="text-xs text-slate-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// Donut Chart (Simulated)
const DonutChart: React.FC<{
  data: { label: string; value: number; color: string }[];
}> = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;
  
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-48 w-48">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle = endAngle;
            
            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
            const largeArc = angle > 180 ? 1 : 0;
            
            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={item.color}
                className="transition-opacity duration-300 hover:opacity-80"
              />
            );
          })}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800">{total}</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const AnalyticsDashboard: React.FC = () => {
  // ==========================================================
  // STATE MANAGEMENT
  // ==========================================================
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsMetrics | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'predictive'>('overview');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    patients: true,
    doctors: true,
    appointments: true,
    revenue: true,
    operations: true,
  });
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  
  // ==========================================================
  // DATA LOADING
  // ==========================================================
  
  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setData(mockAnalyticsData);
      } catch (error) {
        console.error('Failed to load analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [timeRange]);
  
  // ==========================================================
  // COMPUTED VALUES
  // ==========================================================
  
  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);
  
  const exportReport = useCallback(() => {
    // Simulate export
    alert('Exporting report...');
  }, []);
  
  // Top performing doctors
  const topDoctors = useMemo(() => {
    if (!data) return [];
    return [...data.doctorPerformance]
      .sort((a, b) => b.patientsServed - a.patientsServed)
      .slice(0, 5);
  }, [data]);
  
  // Peak hours data for chart
  const peakHoursData = useMemo(() => {
    if (!data) return [];
    return data.peakHours.map(h => ({
      label: h.label,
      value: h.appointments,
    }));
  }, [data]);
  
  // Revenue by specialty for donut chart
  const revenueColors = [
    '#818cf8', // Indigo
    '#34d399', // Emerald
    '#fbbf24', // Amber
    '#f472b6', // Pink
    '#60a5fa', // Blue
    '#a78bfa', // Purple
    '#94a3b8', // Slate
  ];
  
  const revenueData = useMemo(() => {
    if (!data) return [];
    return data.revenueBySpecialty.map((item, index) => ({
      label: item.specialty,
      value: item.revenue,
      color: revenueColors[index % revenueColors.length],
    }));
  }, [data]);
  
  // Monthly trend data
  const monthlyTrendData = useMemo(() => {
    if (!data) return [];
    return data.appointmentTrend.map(item => ({
      label: item.date,
      value: item.value,
      color: '#818cf8',
    }));
  }, [data]);
  
  // ==========================================================
  // RENDER
  // ==========================================================
  
  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
          <p className="text-sm text-slate-500">Loading analytics data...</p>
        </div>
      </div>
    );
  }
  
  if (!data) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-400" />
          <p className="mt-4 text-slate-600">Failed to load analytics data</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      {/* ==========================================================
          PAGE HEADER
          ========================================================== */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-sky-500" />
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time insights and performance metrics for your hospital
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          
          {/* View Mode Selector */}
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            {['overview', 'detailed', 'predictive'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  viewMode === mode
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          
          <button
            onClick={exportReport}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-all hover:bg-sky-600 hover:shadow-lg"
          >
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>
      
      {/* ==========================================================
          OVERVIEW METRICS
          ========================================================== */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Patients"
          value={data.totalPatients.toLocaleString()}
          icon={Users}
          trend={data.patientGrowth}
          color="bg-gradient-to-br from-sky-500 to-sky-600"
          subtitle={`+${data.newPatients} new this period`}
        />
        <MetricCard
          title="Total Doctors"
          value={data.totalDoctors}
          icon={Stethoscope}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          subtitle={`${data.doctorPatientRatio}:${Math.round(data.totalPatients / data.totalDoctors)} patient ratio`}
        />
        <MetricCard
          title="Total Revenue"
          value={`$${(data.totalRevenue / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          trend={8.3}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
        />
        <MetricCard
          title="Patient Satisfaction"
          value={`${data.patientSatisfaction} ★`}
          icon={Star}
          trend={2.1}
          color="bg-gradient-to-br from-rose-500 to-rose-600"
        />
      </div>
      
      {/* ==========================================================
          MAIN CHARTS SECTION
          ========================================================== */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Appointment Trend Chart */}
        <ChartPlaceholder
          title="Appointment Trends"
          onExport={exportReport}
        >
          <div className="h-64">
            <BarChart data={monthlyTrendData} height={200} />
            <div className="mt-4 flex justify-between text-xs text-slate-500">
              <span>Total: {data.totalAppointments.toLocaleString()}</span>
              <span>Completed: {data.completedAppointments.toLocaleString()}</span>
              <span>Cancelled: {data.cancelledAppointments}</span>
              <span>No-shows: {data.noShows}</span>
            </div>
          </div>
        </ChartPlaceholder>
        
        {/* Revenue Distribution */}
        <ChartPlaceholder
          title="Revenue by Specialty"
          onExport={exportReport}
        >
          <div className="flex h-64 items-center justify-center">
            <DonutChart data={revenueData} />
          </div>
        </ChartPlaceholder>
      </div>
      
      {/* ==========================================================
          DETAILED METRICS - PATIENTS SECTION
          ========================================================== */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('patients')}
          className="mb-4 flex w-full items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-slate-200 hover:border-slate-300 transition-all"
        >
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-sky-500" />
            <h2 className="text-lg font-semibold text-slate-800">Patient Analytics</h2>
          </div>
          {expandedSections.patients ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {expandedSections.patients && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 border border-slate-200">
              <h4 className="text-sm font-medium text-slate-500">Gender Distribution</h4>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Male</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {((data.genderDistribution.male / data.totalPatients) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-sky-500"
                    style={{ width: `${(data.genderDistribution.male / data.totalPatients) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Female</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {((data.genderDistribution.female / data.totalPatients) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-pink-500"
                    style={{ width: `${(data.genderDistribution.female / data.totalPatients) * 100}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-500">
                Average Age: {data.averageAge} years
              </div>
            </div>
            
            <div className="rounded-xl bg-white p-6 border border-slate-200">
              <h4 className="text-sm font-medium text-slate-500">Patient Growth</h4>
              <div className="mt-4">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-slate-800">
                    {data.patientGrowth > 0 ? '+' : ''}{data.patientGrowth}%
                  </span>
                  <span className="text-sm text-slate-500">growth rate</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <UserPlus size={16} className="text-emerald-500" />
                  <span className="text-slate-600">
                    {data.newPatients.toLocaleString()} new patients this period
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <TrendingUp size={16} className="text-sky-500" />
                  <span className="text-slate-600">
                    Projected growth: {(data.patientGrowth * 1.15).toFixed(1)}% next period
                  </span>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl bg-white p-6 border border-slate-200">
              <h4 className="text-sm font-medium text-slate-500">Patient Satisfaction</h4>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-3xl font-bold text-slate-800">
                    {data.patientSatisfaction}
                  </span>
                </div>
                <span className="text-sm text-slate-500">/ 5.0</span>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Very Satisfied</span>
                  <span className="font-semibold text-slate-800">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Satisfied</span>
                  <span className="font-semibold text-slate-800">24%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Neutral</span>
                  <span className="font-semibold text-slate-800">6%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Dissatisfied</span>
                  <span className="font-semibold text-slate-800">2%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* ==========================================================
          DETAILED METRICS - DOCTORS SECTION
          ========================================================== */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('doctors')}
          className="mb-4 flex w-full items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-slate-200 hover:border-slate-300 transition-all"
        >
          <div className="flex items-center gap-3">
            <Stethoscope className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-slate-800">Doctor Performance</h2>
          </div>
          {expandedSections.doctors ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {expandedSections.doctors && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Specialty
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Patients
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Revenue
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Satisfaction
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topDoctors.map((doctor, index) => (
                    <tr key={doctor.doctorId} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${
                            index === 0 ? 'bg-amber-500' :
                            index === 1 ? 'bg-slate-400' :
                            index === 2 ? 'bg-amber-700' :
                            'bg-sky-500'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-slate-800">{doctor.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{doctor.specialty}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">{doctor.patientsServed}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-slate-800">{doctor.averageRating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        ${(doctor.revenueGenerated / 1000).toFixed(0)}K
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 rounded-full bg-slate-100">
                            <div
                              className="h-1.5 rounded-full bg-emerald-500"
                              style={{ width: `${doctor.patientSatisfaction}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600">{doctor.patientSatisfaction}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      {/* ==========================================================
          DETAILED METRICS - OPERATIONS SECTION
          ========================================================== */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('operations')}
          className="mb-4 flex w-full items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-slate-200 hover:border-slate-300 transition-all"
        >
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-slate-800">Operational Metrics</h2>
          </div>
          {expandedSections.operations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {expandedSections.operations && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 border border-slate-200">
              <h4 className="text-sm font-medium text-slate-500">Average Wait Time</h4>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-800">{data.averageWaitTime}</span>
                <span className="text-sm text-slate-500">minutes</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <ClockIcon size={16} className="text-amber-500" />
                <span className="text-slate-600">Target: &lt; 10 minutes</span>
              </div>
            </div>
            
            <div className="rounded-xl bg-white p-6 border border-slate-200">
              <h4 className="text-sm font-medium text-slate-500">Occupancy Rate</h4>
              <div className="mt-2">
                <span className="text-3xl font-bold text-slate-800">{data.occupancyRate}%</span>
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
                <div
                  className={`h-2 rounded-full ${
                    data.occupancyRate > 80 ? 'bg-amber-500' :
                    data.occupancyRate > 60 ? 'bg-emerald-500' :
                    'bg-sky-500'
                  }`}
                  style={{ width: `${data.occupancyRate}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {data.occupancyRate > 80 ? 'High occupancy - consider expanding' :
                 data.occupancyRate > 60 ? 'Optimal occupancy' :
                 'Low occupancy - consider marketing'}
              </div>
            </div>
            
            <div className="rounded-xl bg-white p-6 border border-slate-200">
              <h4 className="text-sm font-medium text-slate-500">Peak Hours</h4>
              <div className="mt-4 space-y-2">
                {data.peakHours.slice(0, 3).map((hour) => (
                  <div key={hour.hour} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{hour.label}</span>
                    <span className="font-medium text-slate-800">{hour.appointments} appointments</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Most appointments: {data.peakHours.reduce((max, h) => h.appointments > max.appointments ? h : max).label}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* ==========================================================
          PREDICTIVE ANALYTICS SECTION
          ========================================================== */}
      {viewMode === 'predictive' && (
        <div className="mb-8">
          <div className="rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6" />
              <h2 className="text-xl font-bold">AI-Powered Predictive Analytics</h2>
            </div>
            <p className="mb-6 text-indigo-100">
              Machine learning predictions based on historical data and current trends
            </p>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-indigo-200">Predicted Patient Volume</h3>
                <p className="mt-2 text-3xl font-bold">~1,250</p>
                <p className="mt-1 text-sm text-indigo-200">Next month projection</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-indigo-200">
                  <TrendingUp size={16} />
                  <span>↑ 8.3% from current</span>
                </div>
              </div>
              
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-indigo-200">Revenue Forecast</h3>
                <p className="mt-2 text-3xl font-bold">$5.8M</p>
                <p className="mt-1 text-sm text-indigo-200">Next quarter projection</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-indigo-200">
                  <TrendingUp size={16} />
                  <span>↑ 12.7% growth expected</span>
                </div>
              </div>
              
              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-indigo-200">Staffing Recommendations</h3>
                <p className="mt-2 text-3xl font-bold">+5</p>
                <p className="mt-1 text-sm text-indigo-200">Additional doctors needed</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-indigo-200">
                  <AlertCircle size={16} />
                  <span>Based on patient growth trends</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;