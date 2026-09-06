import type { InvoiceStatus } from "../types/billing.type"
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  X, 
  Clock as ClockIcon 
} from 'lucide-react';

interface StatusBadgeProps{
    status:InvoiceStatus;
}

export default function StatusBadge({status}:StatusBadgeProps){

    //Define styles for each status
    const styles={
        PAID: 'bg-green-100 text-green-700',
        UNPAID: 'bg-yellow-100 text-yellow-700',
        OVERDUE: 'bg-red-100 text-red-700',
        CANCELLED: 'bg-gray-100 text-gray-700',
        PARTIAL: 'bg-blue-100 text-blue-700',
    }


    //Define labels for each status
    const labels={
        PAID: 'Paid',
        UNPAID: 'Unpaid',
        OVERDUE: 'Overdue',
        CANCELLED: 'Cancelled',
        PARTIAL: 'Partial',
    }


    //Define icons for each status
    const icons = {
        PAID: <CheckCircle size={14} className="text-green-600" />,
        UNPAID: <AlertCircle size={14} className="text-yellow-600" />,
        OVERDUE: <XCircle size={14} className="text-red-600" />,
        CANCELLED: <X size={14} className="text-gray-600" />,
        PARTIAL: <ClockIcon size={14} className="text-blue-600" />,
    }


    // conatiner div - creates a pill-shaped badge with flex alignment
    return(
        <span>
            
        </span>
    )
}