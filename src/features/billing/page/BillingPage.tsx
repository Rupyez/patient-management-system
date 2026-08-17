// ============================================================
// FILE: src/features/billing/page/BillingPage.tsx
// ============================================================
// COMPLETE BILLING & REPORTING SYSTEM WITH ALL FEATURES
// Import this in AppRoutes.tsx
// ============================================================

import React, { useState, useEffect, useMemo} from 'react';
import {
  DollarSign,
  FileText,
  Download,
  Printer,
  Eye,
  Search,
  Filter,
  Plus,
  X,
  User,
  Stethoscope,
  Clock,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Receipt,
  Loader,
  DollarSign as DollarIcon,
  Check,
} from 'lucide-react';

// ============================================================
// TYPES & INTERFACES
// ============================================================

export type InvoiceStatus = 'PAID' | 'UNPAID' | 'OVERDUE' | 'CANCELLED' | 'PARTIAL';
export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'INSURANCE' | 'BANK_TRANSFER' | 'ONLINE';
export type ReportType = 'INVOICE' | 'PAYMENT' | 'REVENUE' | 'PATIENT' | 'DOCTOR' | 'CUSTOM';
export type ReportFormat = 'PDF' | 'EXCEL' | 'CSV' | 'HTML';

interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  appointmentId?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  status: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: string;
  dueDate: string;
  issueDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'CONSULTATION' | 'PROCEDURE' | 'MEDICATION' | 'LAB_TEST' | 'SURGERY' | 'OTHER';
}

interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  reference: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'REFUNDED';
}

interface BillingStats {
  totalRevenue: number;
  paidInvoices: number;
  unpaidInvoices: number;
  overdueInvoices: number;
  averagePaymentTime: number;
  revenueByMonth: { month: string; revenue: number }[];
  revenueByCategory: { category: string; amount: number; percentage: number }[];
  topPayers: { name: string; amount: number }[];
  paymentMethods: { method: PaymentMethod; count: number; total: number }[];
}

interface ReportConfig {
  type: ReportType;
  format: ReportFormat;
  dateRange: { start: string; end: string };
  filters: {
    patientId?: string;
    doctorId?: string;
    status?: InvoiceStatus;
    paymentMethod?: PaymentMethod;
  };
  includeCharts: boolean;
  includeSummary: boolean;
  includeDetails: boolean;
}

// ============================================================
// MOCK DATA
// ============================================================

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2026-001',
    patientId: 'PAT-001',
    patientName: 'John Doe',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Sarah Johnson',
    appointmentId: 'APT-001',
    items: [
      { id: '1', description: 'Consultation - Cardiology', quantity: 1, unitPrice: 250, total: 250, category: 'CONSULTATION' },
      { id: '2', description: 'ECG Test', quantity: 1, unitPrice: 150, total: 150, category: 'LAB_TEST' },
      { id: '3', description: 'Medication - Beta Blockers', quantity: 30, unitPrice: 2.50, total: 75, category: 'MEDICATION' },
    ],
    subtotal: 475,
    tax: 47.50,
    discount: 0,
    total: 522.50,
    paidAmount: 522.50,
    dueAmount: 0,
    status: 'PAID',
    paymentMethod: 'CREDIT_CARD',
    paymentDate: '2026-01-15T10:00:00Z',
    dueDate: '2026-02-15T10:00:00Z',
    issueDate: '2026-01-15T10:00:00Z',
    notes: 'Regular checkup completed',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2026-002',
    patientId: 'PAT-002',
    patientName: 'Jane Smith',
    doctorId: 'DOC-002',
    doctorName: 'Dr. Michael Chen',
    appointmentId: 'APT-002',
    items: [
      { id: '1', description: 'Consultation - Neurology', quantity: 1, unitPrice: 300, total: 300, category: 'CONSULTATION' },
      { id: '2', description: 'MRI Scan', quantity: 1, unitPrice: 850, total: 850, category: 'PROCEDURE' },
    ],
    subtotal: 1150,
    tax: 115,
    discount: 50,
    total: 1215,
    paidAmount: 0,
    dueAmount: 1215,
    status: 'UNPAID',
    dueDate: '2026-02-20T10:00:00Z',
    issueDate: '2026-01-20T10:00:00Z',
    notes: 'Pending insurance approval',
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2026-003',
    patientId: 'PAT-003',
    patientName: 'Robert Johnson',
    doctorId: 'DOC-004',
    doctorName: 'Dr. James Williams',
    appointmentId: 'APT-003',
    items: [
      { id: '1', description: 'Surgery - Orthopedic', quantity: 1, unitPrice: 2500, total: 2500, category: 'SURGERY' },
      { id: '2', description: 'Physical Therapy Session', quantity: 5, unitPrice: 100, total: 500, category: 'PROCEDURE' },
    ],
    subtotal: 3000,
    tax: 300,
    discount: 200,
    total: 3100,
    paidAmount: 1500,
    dueAmount: 1600,
    status: 'PARTIAL',
    paymentMethod: 'INSURANCE',
    paymentDate: '2026-01-10T10:00:00Z',
    dueDate: '2026-03-10T10:00:00Z',
    issueDate: '2026-01-10T10:00:00Z',
    notes: 'Insurance covering 50%',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2026-004',
    patientId: 'PAT-004',
    patientName: 'Maria Garcia',
    doctorId: 'DOC-003',
    doctorName: 'Dr. Emily Rodriguez',
    appointmentId: 'APT-004',
    items: [
      { id: '1', description: 'Consultation - Pediatrics', quantity: 1, unitPrice: 180, total: 180, category: 'CONSULTATION' },
      { id: '2', description: 'Blood Test', quantity: 1, unitPrice: 75, total: 75, category: 'LAB_TEST' },
      { id: '3', description: 'Vaccination', quantity: 2, unitPrice: 45, total: 90, category: 'PROCEDURE' },
    ],
    subtotal: 345,
    tax: 34.50,
    discount: 0,
    total: 379.50,
    paidAmount: 0,
    dueAmount: 379.50,
    status: 'OVERDUE',
    dueDate: '2025-12-20T10:00:00Z',
    issueDate: '2025-12-10T10:00:00Z',
    notes: 'Overdue payment reminder sent',
    createdAt: '2025-12-10T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2026-005',
    patientId: 'PAT-005',
    patientName: 'David Lee',
    doctorId: 'DOC-005',
    doctorName: 'Dr. Lisa Park',
    appointmentId: 'APT-005',
    items: [
      { id: '1', description: 'Consultation - Dermatology', quantity: 1, unitPrice: 220, total: 220, category: 'CONSULTATION' },
      { id: '2', description: 'Skin Biopsy', quantity: 1, unitPrice: 350, total: 350, category: 'PROCEDURE' },
    ],
    subtotal: 570,
    tax: 57,
    discount: 0,
    total: 627,
    paidAmount: 627,
    dueAmount: 0,
    status: 'PAID',
    paymentMethod: 'ONLINE',
    paymentDate: '2026-01-08T10:00:00Z',
    dueDate: '2026-02-08T10:00:00Z',
    issueDate: '2026-01-08T10:00:00Z',
    notes: 'Payment via online portal',
    createdAt: '2026-01-08T10:00:00Z',
    updatedAt: '2026-01-08T10:00:00Z',
  },
  {
    id: '6',
    invoiceNumber: 'INV-2026-006',
    patientId: 'PAT-001',
    patientName: 'John Doe',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Sarah Johnson',
    items: [
      { id: '1', description: 'Follow-up Consultation', quantity: 1, unitPrice: 200, total: 200, category: 'CONSULTATION' },
    ],
    subtotal: 200,
    tax: 20,
    discount: 0,
    total: 220,
    paidAmount: 0,
    dueAmount: 220,
    status: 'UNPAID',
    dueDate: '2026-02-25T10:00:00Z',
    issueDate: '2026-01-25T10:00:00Z',
    notes: 'Follow-up visit',
    createdAt: '2026-01-25T10:00:00Z',
    updatedAt: '2026-01-25T10:00:00Z',
  },
];

const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceId: '1',
    amount: 522.50,
    method: 'CREDIT_CARD',
    date: '2026-01-15T10:00:00Z',
    reference: 'CC-2026-001',
    status: 'COMPLETED',
  },
  {
    id: '2',
    invoiceId: '3',
    amount: 1500,
    method: 'INSURANCE',
    date: '2026-01-10T10:00:00Z',
    reference: 'INS-2026-001',
    status: 'COMPLETED',
  },
  {
    id: '3',
    invoiceId: '5',
    amount: 627,
    method: 'ONLINE',
    date: '2026-01-08T10:00:00Z',
    reference: 'ON-2026-001',
    status: 'COMPLETED',
  },
];

// Calculate Billing Stats
const calculateBillingStats = (invoices: Invoice[]): BillingStats => {
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'PAID').length;
  const unpaidInvoices = invoices.filter(inv => inv.status === 'UNPAID').length;
  const overdueInvoices = invoices.filter(inv => inv.status === 'OVERDUE').length;
  
  // Revenue by month
  const revenueByMonth: { month: string; revenue: number }[] = [];
  const monthMap = new Map<string, number>();
  invoices.forEach(inv => {
    const month = new Date(inv.issueDate).toLocaleString('default', { month: 'short', year: 'numeric' });
    monthMap.set(month, (monthMap.get(month) || 0) + inv.paidAmount);
  });
  monthMap.forEach((revenue, month) => revenueByMonth.push({ month, revenue }));
  revenueByMonth.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  // Revenue by category
  const categoryMap = new Map<string, number>();
  invoices.forEach(inv => {
    inv.items.forEach(item => {
      categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + item.total);
    });
  });
  const totalItemsAmount = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);
  const revenueByCategory = Array.from(categoryMap.entries()).map(([category, amount]) => ({
    category,
    amount,
    percentage: totalItemsAmount > 0 ? (amount / totalItemsAmount) * 100 : 0,
  }));

  // Top payers
  const payerMap = new Map<string, number>();
  invoices.forEach(inv => {
    if (inv.paidAmount > 0) {
      payerMap.set(inv.patientName, (payerMap.get(inv.patientName) || 0) + inv.paidAmount);
    }
  });
  const topPayers = Array.from(payerMap.entries())
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // Payment methods
  const methodMap = new Map<PaymentMethod, { count: number; total: number }>();
  invoices.forEach(inv => {
    if (inv.paymentMethod) {
      const current = methodMap.get(inv.paymentMethod) || { count: 0, total: 0 };
      methodMap.set(inv.paymentMethod, {
        count: current.count + 1,
        total: current.total + inv.paidAmount,
      });
    }
  });
  const paymentMethods = Array.from(methodMap.entries()).map(([method, data]) => ({
    method,
    count: data.count,
    total: data.total,
  }));

  return {
    totalRevenue,
    paidInvoices,
    unpaidInvoices,
    overdueInvoices,
    averagePaymentTime: 12.5,
    revenueByMonth,
    revenueByCategory,
    topPayers,
    paymentMethods,
  };
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

// Stat Card Component
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  trend?: { value: number; isPositive: boolean };
  subtitle?: string;
}> = ({ title, value, icon: Icon, color, trend, subtitle }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:shadow-lg">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-800">{value}</h3>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
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

// Status Badge
const StatusBadge: React.FC<{ status: InvoiceStatus }> = ({ status }) => {
  const styles = {
    PAID: 'bg-green-100 text-green-700',
    UNPAID: 'bg-yellow-100 text-yellow-700',
    OVERDUE: 'bg-red-100 text-red-700',
    CANCELLED: 'bg-gray-100 text-gray-700',
    PARTIAL: 'bg-blue-100 text-blue-700',
  };
  const labels = {
    PAID: 'Paid',
    UNPAID: 'Unpaid',
    OVERDUE: 'Overdue',
    CANCELLED: 'Cancelled',
    PARTIAL: 'Partial',
  };
  const icons = {
    PAID: <CheckCircle size={14} className="text-green-600" />,
    UNPAID: <AlertCircle size={14} className="text-yellow-600" />,
    OVERDUE: <XCircle size={14} className="text-red-600" />,
    CANCELLED: <X size={14} className="text-gray-600" />,
    PARTIAL: <ClockIcon size={14} className="text-blue-600" />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {icons[status]}
      {labels[status]}
    </span>
  );
};

// Chart Placeholder
const ChartPlaceholder: React.FC<{
  title: string;
  children: React.ReactNode;
  onExport?: () => void;
}> = ({ title, children, onExport }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      {onExport && (
        <button
          onClick={onExport}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
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

// Bar Chart
const SimpleBarChart: React.FC<{
  data: { label: string; value: number; color?: string }[];
  height?: number;
}> = ({ data, height = 200 }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="flex h-full w-full items-end justify-between gap-2" style={{ height }}>
      {data.map((item, index) => (
        <div key={index} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="w-full rounded-lg transition-all hover:opacity-80"
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

// Donut Chart
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
                className="transition-opacity hover:opacity-80"
              />
            );
          })}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800">${total}</p>
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

const BillingPage: React.FC = () => {
  // State
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<BillingStats | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    type: 'INVOICE',
    format: 'PDF',
    dateRange: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    filters: {},
    includeCharts: true,
    includeSummary: true,
    includeDetails: true,
  });

  // Load Data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setInvoices(mockInvoices);
        setPayments(mockPayments);
        setStats(calculateBillingStats(mockInvoices));
      } catch (error) {
        console.error('Failed to load billing data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filtered Invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const searchMatch = search === '' ||
        inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        inv.patientName.toLowerCase().includes(search.toLowerCase()) ||
        inv.doctorName.toLowerCase().includes(search.toLowerCase());
      
      const statusMatch = statusFilter === 'ALL' || inv.status === statusFilter;
      
      return searchMatch && statusMatch;
    });
  }, [invoices, search, statusFilter]);

  // Invoice Summary
  const invoiceSummary = useMemo(() => {
    const total = filteredInvoices.length;
    const paid = filteredInvoices.filter(i => i.status === 'PAID').length;
    const unpaid = filteredInvoices.filter(i => i.status === 'UNPAID').length;
    const overdue = filteredInvoices.filter(i => i.status === 'OVERDUE').length;
    const partial = filteredInvoices.filter(i => i.status === 'PARTIAL').length;
    return { total, paid, unpaid, overdue, partial };
  }, [filteredInvoices]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-10 w-10 animate-spin text-blue-500" />
          <p className="text-sm text-slate-500">Loading billing data...</p>
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
            <DollarSign className="h-6 w-6 text-blue-500" />
            Billing & Reports
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage invoices, payments, and generate reports
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-600"
          >
            <Receipt size={18} />
            New Payment
          </button>
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-600"
          >
            <Plus size={18} />
            New Invoice
          </button>
          <button
            onClick={() => setShowReportModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-600"
          >
            <FileText size={18} />
            Reports
          </button>
        </div>
      </div>

      {/* ==========================================================
          STATISTICS CARDS
          ========================================================== */}
      {stats && (
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            icon={DollarIcon}
            color="bg-gradient-to-br from-green-500 to-green-600"
            trend={{ value: 12.5, isPositive: true }}
            subtitle="Last 30 days"
          />
          <StatCard
            title="Paid Invoices"
            value={stats.paidInvoices}
            icon={CheckCircle}
            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
            subtitle="Successfully paid"
          />
          <StatCard
            title="Unpaid / Overdue"
            value={`${stats.unpaidInvoices} / ${stats.overdueInvoices}`}
            icon={AlertCircle}
            color="bg-gradient-to-br from-red-500 to-red-600"
            subtitle={`${stats.overdueInvoices} invoices overdue`}
          />
          <StatCard
            title="Avg Payment Time"
            value={`${stats.averagePaymentTime} days`}
            icon={Clock}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            subtitle="Average time to pay"
          />
        </div>
      )}

      {/* ==========================================================
          FILTERS & SEARCH
          ========================================================== */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 min-w-50">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoices by number, patient, or doctor..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                showFilters || statusFilter !== 'ALL'
                  ? 'border-blue-300 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Filter size={18} />
              Filters
              {statusFilter !== 'ALL' && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                  1
                </span>
              )}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm animate-in">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-slate-600">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ALL">All Status</option>
                  <option value="PAID">Paid</option>
                  <option value="UNPAID">Unpaid</option>
                  <option value="OVERDUE">Overdue</option>
                  <option value="PARTIAL">Partial</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              {statusFilter !== 'ALL' && (
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ==========================================================
          INVOICE TABLE
          ========================================================== */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Invoice
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Doctor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={40} className="text-slate-300" />
                      <p>No invoices found</p>
                      <p className="text-sm text-slate-400">Create your first invoice</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-800">{invoice.invoiceNumber}</p>
                        <p className="text-xs text-slate-500">Created: {new Date(invoice.createdAt).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{invoice.patientName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Stethoscope size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{invoice.doctorName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">${invoice.total.toFixed(2)}</p>
                        <p className="text-xs text-slate-500">Paid: ${invoice.paidAmount.toFixed(2)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">
                        <p>Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                        {invoice.paymentDate && (
                          <p className="text-xs text-slate-500">Paid: {new Date(invoice.paymentDate).toLocaleDateString()}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="rounded-lg p-2 transition hover:bg-blue-100"
                          title="View Invoice"
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setShowInvoiceModal(true);
                          }}
                        >
                          <Eye size={18} className="text-blue-600" />
                        </button>
                        <button className="rounded-lg p-2 transition hover:bg-emerald-100" title="Download PDF">
                          <Download size={18} className="text-emerald-600" />
                        </button>
                        <button className="rounded-lg p-2 transition hover:bg-purple-100" title="Print">
                          <Printer size={18} className="text-purple-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================================
          CHARTS SECTION
          ========================================================== */}
      {stats && (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartPlaceholder title="Revenue by Month" onExport={() => console.log('Export')}>
            <div className="h-64">
              <SimpleBarChart
                data={stats.revenueByMonth.map(item => ({
                  label: item.month,
                  value: item.revenue,
                  color: '#818cf8',
                }))}
                height={200}
              />
            </div>
          </ChartPlaceholder>

          <ChartPlaceholder title="Revenue by Category" onExport={() => console.log('Export')}>
            <div className="flex h-64 items-center justify-center">
              <DonutChart
                data={stats.revenueByCategory.map((item, i) => ({
                  label: item.category,
                  value: item.amount,
                  color: ['#818cf8', '#34d399', '#fbbf24', '#f472b6', '#60a5fa', '#a78bfa'][i % 6],
                }))}
              />
            </div>
          </ChartPlaceholder>
        </div>
      )}

      {/* ==========================================================
          INVOICE MODAL
          ========================================================== */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl my-8 animate-in fade-in zoom-in duration-200">
            <div className="rounded-2xl bg-white shadow-xl border border-slate-200">
              {/* Modal Header */}
              <div className="border-b border-slate-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Invoice Details</h2>
                    <p className="text-sm text-slate-500">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowInvoiceModal(false);
                      setSelectedInvoice(null);
                    }}
                    className="rounded-lg p-2 transition hover:bg-slate-100"
                  >
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Patient</h4>
                    <p className="text-lg font-semibold text-slate-800">{selectedInvoice.patientName}</p>
                    <p className="text-sm text-slate-500">ID: {selectedInvoice.patientId}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Doctor</h4>
                    <p className="text-lg font-semibold text-slate-800">{selectedInvoice.doctorName}</p>
                    <p className="text-sm text-slate-500">ID: {selectedInvoice.doctorId}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Issue Date</h4>
                    <p className="text-slate-800">{new Date(selectedInvoice.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Due Date</h4>
                    <p className={`${new Date(selectedInvoice.dueDate) < new Date() && selectedInvoice.status !== 'PAID' ? 'text-red-600' : 'text-slate-800'}`}>
                      {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Invoice Items */}
                <div>
                  <h4 className="mb-3 text-sm font-medium text-slate-500">Items</h4>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Description</th>
                          <th className="px-4 py-2 text-right text-xs font-semibold text-slate-600">Qty</th>
                          <th className="px-4 py-2 text-right text-xs font-semibold text-slate-600">Price</th>
                          <th className="px-4 py-2 text-right text-xs font-semibold text-slate-600">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedInvoice.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-2 text-sm text-slate-600">{item.description}</td>
                            <td className="px-4 py-2 text-right text-sm text-slate-600">{item.quantity}</td>
                            <td className="px-4 py-2 text-right text-sm text-slate-600">${item.unitPrice.toFixed(2)}</td>
                            <td className="px-4 py-2 text-right text-sm font-medium text-slate-800">${item.total.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary */}
                <div className="flex flex-col items-end gap-2 border-t border-slate-200 pt-4">
                  <div className="flex justify-between w-64">
                    <span className="text-sm text-slate-500">Subtotal:</span>
                    <span className="text-sm text-slate-600">${selectedInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-64">
                    <span className="text-sm text-slate-500">Tax:</span>
                    <span className="text-sm text-slate-600">${selectedInvoice.tax.toFixed(2)}</span>
                  </div>
                  {selectedInvoice.discount > 0 && (
                    <div className="flex justify-between w-64">
                      <span className="text-sm text-slate-500">Discount:</span>
                      <span className="text-sm text-green-600">-${selectedInvoice.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between w-64 border-t border-slate-200 pt-2">
                    <span className="text-lg font-bold text-slate-800">Total:</span>
                    <span className="text-lg font-bold text-slate-800">${selectedInvoice.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-64">
                    <span className="text-sm text-slate-500">Paid:</span>
                    <span className="text-sm text-emerald-600">${selectedInvoice.paidAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-64">
                    <span className="text-sm font-medium text-slate-700">Balance:</span>
                    <span className={`text-sm font-medium ${selectedInvoice.dueAmount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      ${selectedInvoice.dueAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {selectedInvoice.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Notes</h4>
                    <p className="text-sm text-slate-600 mt-1 p-3 bg-slate-50 rounded-lg">{selectedInvoice.notes}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-200 p-6">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => {
                      setShowInvoiceModal(false);
                      setSelectedInvoice(null);
                    }}
                    className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Close
                  </button>
                  <button className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-600">
                    <Download size={18} className="inline mr-2" />
                    Download PDF
                  </button>
                  <button className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-600">
                    <Printer size={18} className="inline mr-2" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          REPORTS MODAL
          ========================================================== */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-4xl my-8 animate-in fade-in zoom-in duration-200">
            <div className="rounded-2xl bg-white shadow-xl border border-slate-200">
              {/* Modal Header */}
              <div className="border-b border-slate-200 p-6 bg-linear-to-r from-purple-50 to-blue-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                      <FileText className="h-6 w-6 text-purple-600" />
                      Generate Report
                    </h2>
                    <p className="text-sm text-slate-500">Create custom reports with filters and export options</p>
                  </div>
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="rounded-lg p-2 transition hover:bg-white/50"
                  >
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Report Type */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Report Type</label>
                    <select
                      value={reportConfig.type}
                      onChange={(e) => setReportConfig({ ...reportConfig, type: e.target.value as ReportType })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    >
                      <option value="INVOICE">Invoice Report</option>
                      <option value="PAYMENT">Payment Report</option>
                      <option value="REVENUE">Revenue Report</option>
                      <option value="PATIENT">Patient Report</option>
                      <option value="DOCTOR">Doctor Report</option>
                      <option value="CUSTOM">Custom Report</option>
                    </select>
                  </div>

                  {/* Format */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Export Format</label>
                    <select
                      value={reportConfig.format}
                      onChange={(e) => setReportConfig({ ...reportConfig, format: e.target.value as ReportFormat })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="EXCEL">Excel Spreadsheet</option>
                      <option value="CSV">CSV File</option>
                      <option value="HTML">HTML Report</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Start Date</label>
                    <input
                      type="date"
                      value={reportConfig.dateRange.start}
                      onChange={(e) => setReportConfig({
                        ...reportConfig,
                        dateRange: { ...reportConfig.dateRange, start: e.target.value }
                      })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">End Date</label>
                    <input
                      type="date"
                      value={reportConfig.dateRange.end}
                      onChange={(e) => setReportConfig({
                        ...reportConfig,
                        dateRange: { ...reportConfig.dateRange, end: e.target.value }
                      })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  {/* Report Options */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Report Options</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          checked={reportConfig.includeSummary}
                          onChange={(e) => setReportConfig({ ...reportConfig, includeSummary: e.target.checked })}
                          className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                        />
                        Include Summary
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          checked={reportConfig.includeCharts}
                          onChange={(e) => setReportConfig({ ...reportConfig, includeCharts: e.target.checked })}
                          className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                        />
                        Include Charts
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          checked={reportConfig.includeDetails}
                          onChange={(e) => setReportConfig({ ...reportConfig, includeDetails: e.target.checked })}
                          className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                        />
                        Include Details
                      </label>
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Status Filter</label>
                    <select
                      value={reportConfig.filters.status || 'ALL'}
                      onChange={(e) => setReportConfig({
                        ...reportConfig,
                        filters: { ...reportConfig.filters, status: e.target.value as InvoiceStatus }
                      })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    >
                      <option value="ALL">All Status</option>
                      <option value="PAID">Paid</option>
                      <option value="UNPAID">Unpaid</option>
                      <option value="OVERDUE">Overdue</option>
                      <option value="PARTIAL">Partial</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-200 p-6">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button className="rounded-xl bg-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-600">
                    <FileText size={18} className="inline mr-2" />
                    Generate Report
                  </button>
                  <button className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-600">
                    <Download size={18} className="inline mr-2" />
                    Export Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          PAYMENT MODAL
          ========================================================== */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg animate-in fade-in zoom-in duration-200">
            <div className="rounded-2xl bg-white shadow-xl border border-slate-200">
              {/* Modal Header */}
              <div className="border-b border-slate-200 p-6 bg-linear-to-r from-emerald-50 to-teal-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                      <Receipt className="h-6 w-6 text-emerald-600" />
                      Process Payment
                    </h2>
                    <p className="text-sm text-slate-500">Record a new payment against an invoice</p>
                  </div>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="rounded-lg p-2 transition hover:bg-white/50"
                  >
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Select Invoice</label>
                  <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                    <option value="">Select an invoice...</option>
                    {mockInvoices.filter(i => i.status !== 'PAID').map(inv => (
                      <option key={inv.id} value={inv.id}>
                        {inv.invoiceNumber} - {inv.patientName} (${inv.dueAmount.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Payment Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Payment Method</label>
                  <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="CASH">Cash</option>
                    <option value="ONLINE">Online Payment</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="INSURANCE">Insurance</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Reference / Transaction ID</label>
                  <input
                    type="text"
                    placeholder="e.g., TXN-123456"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Additional notes..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-200 p-6">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-600">
                    <Check size={18} className="inline mr-2" />
                    Process Payment
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

export default BillingPage;