// ============================================================
// FILE: src/features/billing/types/billing.types.ts
// PURPOSE: Centralized type definitions for the billing system
// ============================================================

export type InvoiceStatus = 'PAID' | 'UNPAID' | 'OVERDUE' | 'CANCELLED' | 'PARTIAL';

export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'INSURANCE' | 'BANK_TRANSFER' | 'ONLINE';

export type ReportType = 'INVOICE' | 'PAYMENT' | 'REVENUE' | 'PATIENT' | 'DOCTOR' | 'CUSTOM';

export type ReportFormat = 'PDF' | 'EXCEL' | 'CSV' | 'HTML';

export interface InvoiceItem{
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'CONSULTATION' | 'PROCEDURE' | 'MEDICATION' | 'LAB_TEST' | 'SURGERY' | 'OTHER';
}

export interface Invoice{
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

export interface Payment{
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  reference: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'REFUNDED';
}


export interface BillingStats{
  totalRevenue:number;
  paidInvoices:number;
  unpaidInvoices:number;
  overdueInvoices:number;
  averagePaymentTime:number;
  revenueByMonth:{month: string, revenue:number}[];
  revenueByCategory:{category:string; amount:number; percentage:number}[];
  topPayers:{name:string; amount:number}[];
  paymentMethods:{method:PaymentMethod; count:number; total:number}[]
}

export interface ReportConfig{
  type:ReportType
  format:ReportFormat;
  dateRange:{start:string; end:string};
  filters:{
    patientId?:string;
    doctorId?:string;
    status?:InvoiceStatus;
    paymentMethod?:PaymentMethod;
  };
  includeCharts:boolean;
  includeSummary:boolean;
  includeDetails:boolean
}