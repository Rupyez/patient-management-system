import React from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for today's appointments
const MOCK_APPOINTMENTS = [
  {
    id: '1',
    patientName: 'John Doe',
    time: '09:00 AM',
    status: 'SCHEDULED',
    reason: 'Severe headache',
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    time: '10:30 AM',
    status: 'CHECKED_IN',
    reason: 'Follow-up on blood pressure',
  },
  {
    id: '3',
    patientName: 'Robert Johnson',
    time: '01:00 PM',
    status: 'SCHEDULED',
    reason: 'Chest pain',
  },
  {
    id: '4',
    patientName: 'Emily Davis',
    time: '02:30 PM',
    status: 'SCHEDULED',
    reason: 'Annual physical',
  },
];

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCheckIn = (appointmentId: string) => {
    // Navigate to check-in or update status
    alert(`Check-in patient for appointment ${appointmentId}`);
  };

  const handleStartConsultation = (appointmentId: string) => {
    navigate(`/doctor/consultation/${appointmentId}`);
  };

  // Stats
  const totalToday = MOCK_APPOINTMENTS.length;
  const checkedIn = MOCK_APPOINTMENTS.filter(a => a.status === 'CHECKED_IN').length;
  const completed = MOCK_APPOINTMENTS.filter(a => a.status === 'COMPLETED').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, Dr. Sarah Chen</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/30">
          <p className="text-sm text-gray-500 dark:text-gray-400">Today's Appointments</p>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{totalToday}</p>
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/30">
          <p className="text-sm text-gray-500 dark:text-gray-400">Checked In</p>
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{checkedIn}</p>
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/30">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{completed}</p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">Today's Appointments</h3>
        <div className="space-y-3">
          {MOCK_APPOINTMENTS.map((appt) => (
            <div
              key={appt.id}
              className="flex flex-wrap items-center justify-between p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200/50 dark:border-gray-700/30"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 dark:text-gray-100">{appt.patientName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{appt.time} • {appt.reason}</p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  appt.status === 'CHECKED_IN'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300'
                }`}>
                  {appt.status}
                </span>
                {appt.status === 'SCHEDULED' && (
                  <button
                    onClick={() => handleCheckIn(appt.id)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Check In
                  </button>
                )}
                <button
                  onClick={() => handleStartConsultation(appt.id)}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;