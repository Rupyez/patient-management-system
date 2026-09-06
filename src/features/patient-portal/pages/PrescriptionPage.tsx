import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientHeader from "../components/layout/PatientHeader";


// Mock prescription data
const MOCK_PRESCRIPTIONS = [
  {
    id: '1',
    medicationName: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Once daily',
    duration: '30 days',
    notes: 'Take with food',
    doctorName: 'Dr. Sarah Chen',
    date: '2025-01-20',
    status: 'ACTIVE',
    refillsRemaining: 2,
  },
  {
    id: '2',
    medicationName: 'Metformin',
    dosage: '500 mg',
    frequency: 'Twice daily',
    duration: '90 days',
    notes: 'Take after meals',
    doctorName: 'Dr. Michael Torres',
    date: '2025-02-01',
    status: 'ACTIVE',
    refillsRemaining: 1,
  },
  {
    id: '3',
    medicationName: 'Amoxicillin',
    dosage: '500 mg',
    frequency: 'Three times daily',
    duration: '10 days',
    notes: 'Complete full course',
    doctorName: 'Dr. Emily Park',
    date: '2024-12-15',
    status: 'COMPLETED',
    refillsRemaining: 0,
  },
];


export default function PrescriptionPage(){
    const navigate = useNavigate()
    const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

      const getStatusBadge = (status: string) => {
        const colors = {
          ACTIVE: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
          COMPLETED: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300',
          EXPIRED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        };
        return `px-2 py-0.5 text-xs rounded-full ${colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`;
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <PatientHeader/>
            <main className="max-w-4xl mx-auto px-4 py-8">
                <button onClick={() => navigate(-1)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-flex items-center gap-1">← Back</button>

                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 dark:border-gray-700/30 p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Prescription & Treatment Plan</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your active and past medications</p>

                    <div className="mt-6 space-y-4">
                        {MOCK_PRESCRIPTIONS.map((rx) =>(
                            <div key={rx.id} className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/30 hover:shadow-md transition-shadow">
                                <div className="flex flex-wrap items-start justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-800 dark:text-gray-100">{rx.medicationName}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{rx.dosage} • {rx.frequency} • {rx.duration}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Prescribed by {rx.doctorName} on {rx.date}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400"> Refills remaining: {rx.refillsRemaining}</p>
                                        {rx.notes && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{rx.notes}</p>
                                        )}
                                    </div>

                                    <div>
                                        <span className={getStatusBadge(rx.status)}>{rx.status}</span>
                                    </div>
                                </div>

                                {rx.status === 'ACTIVE' && rx.refillsRemaining > 0 && (
                                    <div className="mt-3">
                                        <button className="text-sm bg-blue-600 text-white px-4 py-1.5 rouned-lg hover:bg-blue-700 transition-colors">Request Refill</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}