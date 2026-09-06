import type { PaymentMethod } from "../page/BillingPage";
import type { BillingStats, Invoice } from "../types/billing.type";


/**
 * calculateBillingStats
 *
 * PURPOSE:
 * This function receives all invoices and converts them into
 * useful statistics that we can show on the Billing Dashboard.
 *
 * Example:
 *
 * invoices
 *    ↓
 * calculateBillingStats()
 *    ↓
 * total revenue
 * paid invoices
 * unpaid invoices
 * overdue invoices
 * monthly revenue
 * category revenue
 * top payers
 * payment methods
 *
 *
 * We keep this logic outside React components because:
 *
 * 1. Components should mainly display UI.
 * 2. Business/calculation logic becomes easier to understand.
 * 3. The same function can be reused in multiple components.
 * 4. It becomes easier to test later.
 */

export const calculateBillingStats = (
  invoices: Invoice[]
): BillingStats => {

  // ============================================================
  // 1. TOTAL REVENUE
  // ============================================================
  // Add together all amounts that patients have already paid.
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.paidAmount,0);

  // ============================================================
  // 2. INVOICE STATUS COUNTS
  // ============================================================

  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "PAID"
  ).length;

  const unpaidInvoices = invoices.filter(
    (invoice) => invoice.status === "UNPAID"
  ).length;

  const overdueInvoices = invoices.filter(
    (invoice) => invoice.status === "OVERDUE"
  ).length;

  // ============================================================
  // 3. REVENUE BY MONTH
  // ============================================================

  const monthMap = new Map<string, number>();

  invoices.forEach((invoice) => {
    const month = new Date(invoice.issueDate).toLocaleDateString(
      "default",
      {
        month: "short",
        year: "numeric",
      }
    );

    const existingRevenue = monthMap.get(month) || 0;

    monthMap.set(
      month,
      existingRevenue + invoice.paidAmount
    );
  });

  const revenueByMonth: {
    month: string;
    revenue: number;
  }[] = Array.from(monthMap.entries()).map(
    ([month, revenue]) => ({
      month,
      revenue,
    })
  );

  revenueByMonth.sort(
    (a, b) =>
      new Date(a.month).getTime() -
      new Date(b.month).getTime()
  );

  // ============================================================
  // 4. REVENUE BY CATEGORY
  // ============================================================

  const categoryMap = new Map<string, number>();

  invoices.forEach((invoice) => {
    invoice.items.forEach((item) => {
      const existingAmount =
        categoryMap.get(item.category) || 0;

      categoryMap.set(
        item.category,
        existingAmount + item.total
      );
    });
  });

  // Calculate total amount of every invoice item.
  // We need this to calculate category percentage.
  const totalItemsAmount = Array.from(
    categoryMap.values()
  ).reduce(
    (sum, amount) => sum + amount,
    0
  );

  const revenueByCategory = Array.from(
    categoryMap.entries()
  ).map(([category, amount]) => ({
    category,
    amount,

    // Example:
    // Consultation = $500
    // Total = $1000
    // Percentage = 50%
    percentage:
      totalItemsAmount > 0
        ? (amount / totalItemsAmount) * 100
        : 0,
  }));

  // ============================================================
  // 5. TOP PAYERS
  // ============================================================

  const payerMap = new Map<string, number>();

  invoices.forEach((invoice) => {
    // We only consider patients who have actually paid something.
    if (invoice.paidAmount > 0) {
      const existingAmount =
        payerMap.get(invoice.patientName) || 0;

      payerMap.set(
        invoice.patientName,
        existingAmount + invoice.paidAmount
      );
    }
  });

  const topPayers = Array.from(
    payerMap.entries()
  )
    .map(([name, amount]) => ({
      name,
      amount,
    }))
    // Highest payer should appear first.
    .sort(
      (a, b) => b.amount - a.amount
    )
    // Only return top 5 patients.
    .slice(0, 5);

  // ============================================================
  // 6. PAYMENT METHOD ANALYSIS
  // ============================================================

  const methodMap = new Map<
    PaymentMethod,
    {
      count: number;
      total: number;
    }
  >();

  invoices.forEach((invoice) => {
    // paymentMethod may be undefined,
    // so check it before using it.
    if (invoice.paymentMethod) {
      const current =
        methodMap.get(invoice.paymentMethod) || {
          count: 0,
          total: 0,
        };

      methodMap.set(invoice.paymentMethod, {
        count: current.count + 1,
        total: current.total + invoice.paidAmount,
      });
    }
  });

  const paymentMethods = Array.from(
    methodMap.entries()
  ).map(([method, stats]) => ({
    method,
    count: stats.count,
    total: stats.total,
  }));

  // ============================================================
  // 7. RETURN ALL BILLING STATISTICS
  // ============================================================

  return {
    totalRevenue,
    paidInvoices,
    unpaidInvoices,
    overdueInvoices,

    // Temporary hard-coded value.
    // Later we can calculate this from paymentDate - issueDate.
    averagePaymentTime: 12.5,

    revenueByMonth,
    revenueByCategory,
    topPayers,
    paymentMethods,
  };
};

export const formatCurrency =(amount:number):string => {
  return `${amount.toFixed(2)}`
}


export const formatDate = (dateString:string):string =>{
  return new Date(dateString).toLocaleDateString();
}

export const getStatusColor = (status:string):string =>{
  const colors = {
    PAID: 'bg-green-100 text-green-700',
    UNPAID: 'bg-yellow-100 text-yellow-700',
    OVERDUE: 'bg-red-100 text-red-700',
    CANCELLED: 'bg-gray-100 text-gray-700',
    PARTIAL: 'bg-blue-100 text-blue-700',
  }

  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
}