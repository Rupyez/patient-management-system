import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PatientHeader from '../components/layout/PatientHeader';

const CheckInPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { appointmentId?: string } | null;

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, we'd fetch appointment details by ID.
  // Mock data for now.
  const appointment = {
    id: state?.appointmentId || '1',
    doctorName: 'Dr. Sarah Chen',
    date: '2025-01-20',
    time: '10:00 AM',
    location: '123 Medical Plaza, Suite 400, New York, NY',
  };

  const handleCheckIn = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsCheckedIn(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <PatientHeader />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/30 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Check‑in</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Confirm your arrival at the clinic.
          </p>

          {isCheckedIn ? (
            <div className="mt-6 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-100 mt-2">Checked In Successfully!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">You're all set. The doctor will see you shortly.</p>
              <button
                onClick={() => navigate('/portal/dashboard')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <>
              <div className="mt-4 p-4 bg-gray-50/70 dark:bg-gray-700/50 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Appointment</h3>
                <p className="mt-1 text-gray-800 dark:text-gray-100"><span className="font-medium">Doctor:</span> {appointment.doctorName}</p>
                <p className="text-gray-800 dark:text-gray-100"><span className="font-medium">Date:</span> {new Date(appointment.date).toLocaleDateString()}</p>
                <p className="text-gray-800 dark:text-gray-100"><span className="font-medium">Time:</span> {appointment.time}</p>
                <p className="text-gray-800 dark:text-gray-100"><span className="font-medium">Location:</span> {appointment.location}</p>
              </div>

              <div className="mt-6 p-4 bg-yellow-50/70 dark:bg-yellow-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-800/30 flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Please arrive 15 minutes early. Bring your ID and insurance card.
                </p>
              </div>

              <button
                onClick={handleCheckIn}
                disabled={isLoading}
                className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isLoading ? 'Checking in...' : 'Check In Now'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckInPage;