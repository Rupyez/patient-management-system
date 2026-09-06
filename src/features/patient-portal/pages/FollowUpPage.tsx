import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientHeader from '../components/layout/PatientHeader';

// Mock follow-up data
const MOCK_FOLLOW_UPS = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Chen',
    date: '2025-02-15',
    reason: 'Migraine follow-up',
    status: 'SCHEDULED',
    notes: 'Review response to treatment',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Torres',
    date: '2025-02-20',
    reason: 'Cholesterol recheck',
    status: 'SCHEDULED',
    notes: 'Fasting blood test required',
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Park',
    date: '2025-01-10',
    reason: 'Post-surgery check',
    status: 'COMPLETED',
    notes: 'Healing well',
  },
];

const FollowUpPage: React.FC = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const colors = {
      SCHEDULED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return `px-2 py-0.5 text-xs rounded-full ${colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <PatientHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-flex items-center gap-1"
        >
          ← Back
        </button>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 dark:border-gray-700/30 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Follow-up Appointments</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your follow-up visits</p>
            </div>
            <button
              onClick={() => navigate('/portal/search')}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              + Schedule New
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {MOCK_FOLLOW_UPS.map((fu) => (
              <div
                key={fu.id}
                className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/30 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{fu.doctorName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{fu.reason}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: {fu.date}</p>
                    {fu.notes && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">📝 {fu.notes}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={getStatusBadge(fu.status)}>{fu.status}</span>
                    {fu.status === 'SCHEDULED' && (
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FollowUpPage;