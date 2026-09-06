import { useNavigate } from "react-router-dom";
import PatientHeader from "../components/layout/PatientHeader";

export default function PatientDashboard() {
    const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/70 dark:from-gray-900 dark:to-gray-800">
      <PatientHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            Welcome back, <span className="text-blue-600 dark:text-blue-400">Patient</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Here’s a quick overview of your health activity
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Appointment card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-gray-100/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-500 dark:text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Appointments</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">2 scheduled</p>
              </div>
            </div>
          </div>

          {/* Prescription card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-gray-100/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-500 dark:text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Prescriptions</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">3 active</p>
              </div>
            </div>
          </div>

          {/* Test Results card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-gray-100/50 dark:border-gray-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-500 dark:text-purple-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Test Results</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">2 new</p>
              </div>
            </div>
          </div>
        </div>

          {/* Quick Links */}
      
{/* Quick Links */}

{/* Quick Links */}
<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

  {/* Test Results Card */}
  <button
    type="button"
    onClick={() => navigate('/portal/test')}
    className="w-full rounded-xl border border-gray-100/50 bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/80"
  >
    <div className="flex items-center gap-3">

      {/* Icon */}
      <div className="rounded-lg bg-purple-50 p-2.5 text-purple-500 dark:bg-purple-900/30 dark:text-purple-400">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>

      {/* Content */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Test Results
        </p>

        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          View Results
        </p>
      </div>

    </div>
  </button>


  {/* Prescriptions Card */}
  <button
    type="button"
    onClick={() => navigate('/portal/prescriptions')}
    className="w-full rounded-xl border border-gray-100/50 bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/80"
  >
    <div className="flex items-center gap-3">

      {/* Icon */}
      <div className="rounded-lg bg-green-50 p-2.5 text-green-500 dark:bg-green-900/30 dark:text-green-400">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Content */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Prescriptions
        </p>

        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          View Medicines
        </p>
      </div>

    </div>
  </button>


  {/*Follow up*/}
  <button
    type="button"
    onClick={() => navigate('/portal/follow-up')}
    className="w-full rounded-xl border border-gray-100/50 bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/80"
  >
    <div className="flex items-center gap-3">

      {/* Icon */}
      <div className="rounded-lg bg-blue-50 p-2.5 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Content */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Follow-ups
        </p>

        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          View Schedule
        </p>
      </div>

    </div>
  </button>


{/* Check -in */}

<button
  type="button"
  onClick={() => navigate('/portal/check-in')}
  className="w-full rounded-xl border border-gray-100/50 bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/80"
>
  <div className="flex items-center gap-3">

    {/* Check-In Icon */}
    <div className="rounded-lg bg-blue-50 p-2.5 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400">
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12.75l2 2 4-4m6-1.75a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    {/* Check-In Information */}
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
        Check In
      </p>

      <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Check In Now
      </p>
    </div>

  </div>
</button>



  
</div>





        {/* Action banner */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-100/50 dark:border-blue-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-600 dark:text-blue-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-100">Need to see a doctor?</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Find specialists and book appointments easily</p>
            </div>
          </div>
          <button onClick={() => navigate('/portal/search')} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
            Search Doctors
          </button>
        </div>

        {/* Optional: recent activity or placeholder */}
        <div className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          <p>Your health summary is up to date.</p>
        </div>
      </main>
    </div>
  );
}