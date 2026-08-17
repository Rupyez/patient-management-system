/**
 * ============================================================
 * BILLING TYPES
 * ============================================================
 */

export interface InvoiceItem {
  description: string;
  code: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
  category: 'CONSULTATION' | 'PROCEDURE' | 'LAB' | 'PHARMACY' | 'RADIOLOGY' | 'OTHER';
}

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'CANCELLED';
export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'BANK_TRANSFER' | 'INSURANCE';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  appointmentId?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paidAmount: number;
  balance: number;
  status: InvoiceStatus;
  dueDate: string;
  issueDate: string;
  paidAt?: string;
  paymentMethod?: PaymentMethod;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface InsuranceClaim {
  id: string;
  patientId: string;
  providerId: string;
  providerName: string;
  policyNumber: string;
  groupNumber: string;
  claimNumber: string;
  submittedAmount: number;
  approvedAmount: number;
  deniedAmount: number;
  status: 'DRAFT' | 'SUBMITTED' | 'IN_REVIEW' | 'APPROVED' | 'PARTIALLY_APPROVED' | 'DENIED' | 'PAID';
  submissionDate: string;
  approvalDate?: string;
  paymentDate?: string;
  denials: Array<{
    code: string;
    reason: string;
    amount: number;
  }>;
  notes: string;
}

export interface BillingStats {
  totalRevenue: number;
  pendingPayments: number;
  overduePayments: number;
  collected: number;
  thisMonth: number;
  thisWeek: number;
  today: number;
  averagePerPatient: number;
}