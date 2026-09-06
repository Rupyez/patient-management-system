import { Receipt, X } from "lucide-react";
import type { Invoice, PaymentMethod } from "../types/billing.type";


interface PaymentModalProps{
  isOpen: boolean;
  onClose: () => void;
  invoices: Invoice[];
  onProcessPayment: (invoiceId: string, amount: number, method: PaymentMethod) => void;  
}

export default function PaymentModal({isOpen,onClose,invoices,onProcessPayment}:PaymentModalProps){
    if(!isOpen) return null;


    //Filter only unpaid invoices
    const unpaidInvoices = invoices.filter(i => i.status !== "PAID");

    return(
        //overlay div - fixed postions with blur
        <div>

            {/* Modal container - max width with animation */}
            <div>

                {/* Modal card - Graident header */}
                <div>

                    {/* Header section - Emerald gradient */}
                    <div>
                        <div>
                            <div>
                                <h2><Receipt/>Process Payment</h2>
                                <p>Record a new payment against an invoice</p>
                            </div>

                            <button><X/></button>
                        </div>
                    </div>


                    {/* Body Section - form fileds */}
                    <div>
                        <label>Select Invoice</label>
                        <select></select>
                    </div>


                    {/* Payment amount */}
                    <div>
                        <label>Payment Amount</label>
                    </div>
                </div>
            </div>
        </div>
    )
  

}