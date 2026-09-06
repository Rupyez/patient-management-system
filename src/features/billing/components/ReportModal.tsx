// src/components/billing/ReportModal.tsx
// ============================================================
// PURPOSE: Generate reports with custom filters and export options
// Complex form with conditional rendering and validation
// ============================================================

import { Download, FileText, X } from "lucide-react";
import type { ReportConfig } from "../types/billing.type";

interface ReportModalProps{
  isOpen: boolean;
  onClose: () => void;
  config: ReportConfig;
  onConfigChange: (config: ReportConfig) => void;
  onGenerate: () => void;
  onExport: () => void;
}

export default function ReportModal({isOpen, onClose, config, onConfigChange, onGenerate, onExport}:ReportModalProps){
  
    if(!isOpen) return null;


    return(
        //overlay div - fixed positions with blur effect
        <div>

            {/* modal container - max modal with animation */}
            <div>

                {/* modal card - gradient header */}
                <div>

                    {/* Header section - gradient background */}
                    <div>
                        <div>
                            <div>
                                <h2><FileText/>Generate Report</h2>
                                <p>Create custom reports with filters and export options</p>
                            </div>

                            <button><X/></button>
                        </div>
                    </div>


                    {/* Body section - form controls */}
                    <div>
                        <div>

                            {/* Report Types */}
                            <div>
                                <label>Report Type</label>
                                <select>
                                    <option value="INVOICE">Invoice Report</option>
                                    <option value="PAYMENT">Payment Report</option>
                                    <option value="REVENUE">Revenue Report</option>
                                    <option value="PATIENT">Patient Report</option>
                                    <option value="DOCTOR">Doctor Report</option>
                                    <option value="CUSTOM">Custom Report</option>
                                    
                                </select>
                            </div>


                            {/* Export Format */}
                            <div>
                                <label>Export Format</label>
                                <select>
                                    <option value="PDF">PDF Document</option>
                                    <option value="Excel">Excel Spreadsheet</option>
                                    <option value="CSV">CSV File</option>
                                    <option value="HTML">HTML Report</option>

                                </select>
                            </div>


                            {/* Date Range - start */}
                            <div>
                                <label>Start Date</label>
                                <input/>
                            </div>


                            {/* Date Range - End */}
                            <div>
                                <label>End Date</label>
                                <input/>
                            </div>


                            {/* Report options - checkboxes */}
                            <div>
                                <label>Report Options</label>
                                <div>
                                    <label>
                                        <input/>Include Summary
                                    </label>
                                    <label>
                                        <input/>Include Charts
                                    </label>
                                    <label>
                                        <input/>Include Details
                                    </label>
                                </div>
                            </div>


                            {/* Status Filter */}
                            <div>
                                <label>Status Filter</label>
                                <select>
                                    <option value="ALL">All Status</option>
                                    <option value="PAID">Paid</option>
                                    <option value="UNPAID">Unpaid</option>
                                    <option value="OVERDUE">Overdue</option>
                                    <option value="PARTIAL">Partial</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Footer section - action buttons */}
                    <div>
                        <div>
                            <button>Cancel</button>
                            <button><FileText/>Generate Report</button>
                            <button><Download/>Export Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}