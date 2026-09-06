// src/components/billing/InvoiceTable.tsx
// ============================================================
// PURPOSE: Display invoices in a sortable, filterable table
// Centralizes table rendering logic for consistency
// ============================================================

import { Download, Eye, FileText, Printer, Stethoscope, User } from "lucide-react";
import type { Invoice } from "../types/billing.type";
import {formatCurrency, formatDate} from '../utils/billingUtils'
import StatusBadge from "./StatusBadge";



interface InvoiceTableProps{
    invoices: Invoice[];
    onViewInvoice:(invoice: Invoice) => void;
    onDownloadPDF: (invoice: Invoice) => void;
    onPrintInvoice: (invoice: Invoice) => void;
}


export default function InvoiceTable({invoices, onViewInvoice, onDownloadPDF, onPrintInvoice}:InvoiceTableProps){

    // Container div - Rounded borders and shadow
    <div>
        {/* Scroll wrapper - Enables horizontal scrolling for wide tables */}
        <div>
            <table>

                {/* Table head - sticky header with light background */}
                <thead>
                    <tr>
                        <th>Invoice</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>


                {/* Table body - Data rows */}
                <tbody>
                    {invoices.length === 0 ? (
                        //empty state row
                        <tr>
                            <td>
                                <div>
                                    <FileText/>
                                    <p>No Invoices found</p>
                                    <p>Create your first invoices</p>
                                </div>
                            </td>
                        </tr>
                    ):(
                        //invoice rows
                        invoices.map((invoice) =>(
                            <tr>

                                {/* Invoice number cell */}
                                <td>
                                    <div>
                                        <p>{invoice.invoiceNumber}</p>
                                        <p>Created: {formatDate(invoice.createdAt)}</p>
                                    </div>
                                </td>

                                {/* Patient name cell */}
                                <td>
                                    <div>
                                        <User/>
                                        <span>{invoice.patientName}</span>
                                    </div>
                                </td>


                                {/* Doctor name cell */}
                                <td>
                                    <div>
                                        <Stethoscope/>
                                        <span>{invoice.doctorName}</span>
                                    </div>
                                </td>




                                {/* Amount cell */}
                                <td>
                                    <div>
                                        <p>{formatCurrency(invoice.total)}</p>
                                        <p>Paid: {formatCurrency(invoice.paidAmount)}</p>
                                    </div>
                                </td>




                                {/* Patient name cell */}
                                <td>
                                  <StatusBadge status={invoice.status}/>
                                </td>




                                 {/* Date cell */}
                                <td>
                                    <div>
                                        <p>{formatDate(invoice.dueDate)}</p>
                                        {invoice.paymentDate && (
                                            <p>Paid: {formatDate(invoice.paymentDate)}</p>
                                        )}
                                    </div>
                                </td>



                                {/* Action cell */}
                                <td>
                                   <div>
                                    <button>
                                        <Eye/>
                                    </button>

                                    <button>
                                        <Download/>
                                    </button>

                                    <button>
                                        <Printer/>
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

}