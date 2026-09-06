import { Download, Printer, X } from "lucide-react";
import type{ Invoice } from "../types/billing.type";
import { formatCurrency, formatDate } from "../utils/billingUtils";

interface InvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onDownloadPDF: (invoice: Invoice) => void;
  onPrint: (invoice: Invoice) => void;
}



export default function InvoiceModal({invoice, onClose, onDownloadPDF, onPrint}:InvoiceModalProps){
    if(!invoice) return null;

    return(
        //overlay div - fixed position covers entire screen with blur
        <div>

            {/* Modal container - center content with animation */}
            <div>

                {/* Modal card - white card with shadow */}
                <div>

                    {/* Header section - border bottom with close button */}
                    <div>
                        <div>
                            <div>
                                <h2>Invoice Details</h2>
                                <p>{invoice.invoiceNumber}</p>
                            </div>

                            <button>
                                <X/>
                            </button>
                        </div>
                    </div>


                    {/* Body section - main content */}
                    <div>

                        {/* info grid - patient and doctor details */}
                        <div>
                            <div>
                                <h4>Patient</h4>
                                <p>{invoice.patientName}</p>
                                <p>{invoice.patientId}</p>
                            </div>


                            <div>
                                <h4>Doctor</h4>
                                <p>{invoice.doctorName}</p>
                                <p>{invoice.doctorId}</p>
                            </div>


                            <div>
                                <h4>Issue Date</h4>
                                <p>{formatDate(invoice.issueDate)}</p>
                            </div>



                             <div>
                                <h4>Due Date</h4>
                                <p>{formatDate(invoice.issueDate)}</p>
                            </div>
                        </div>


                        {/* Items table - List of invoice items */}
                        <div>
                            <h4>Items</h4>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th>Total</th>

                                        </tr>
                                    </thead>


                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>



                        {/* Summary section - total calculations */}
                        <div>
                            <div>
                                <span>Subtotal:</span>
                                <span>{formatCurrency(invoice.subtotal)}</span>
                            </div>


                            <div>
                                <span>Tax:</span>
                                <span>{formatCurrency(invoice.tax)}</span>
                            </div>
                            {invoice.discount > 0 && (
                                <div>
                                    <span>Discount:</span>
                                    <span>-{formatCurrency(invoice.discount)}</span>
                                </div>
                            )}
                            <div>
                                <span>Total:</span>
                                <span>{formatCurrency(invoice.total)}</span>
                            </div>

                            <div>
                                <span>Paid:</span>
                                <span>{formatCurrency(invoice.paidAmount)}</span>
                            </div>

                            <div>
                                <span>Balance:</span>
                                <span>{formatCurrency(invoice.dueAmount)}</span>
                            </div>
                        </div>


                        {/* Notes section */}
                        {invoice.notes && (
                            <div>
                                <h4>Notes</h4>
                                <p>{invoice.notes}</p>
                            </div>
                        )}
                    </div>


                    {/* Footer section - Action buttons */}
                    <div>
                        <div>
                            <button>Close</button>
                            <button><Download/>Download PDF</button>
                            <button><Printer/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}