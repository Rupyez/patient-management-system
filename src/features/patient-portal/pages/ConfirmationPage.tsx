import { useLocation, useNavigate } from "react-router-dom";
import PatientHeader from "../components/layout/PatientHeader";



export default function ConfirmationPage(){
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state as {
        doctorName?: string;
        date?: string;
        time?: string;
        fee?: number;
    } | null;


    //if no state (e.g., direct acess), redirect to dashbaord
    if(!state || !state.doctorName){
        navigate('/portal/dashboard');
        return null;
    }


      const { doctorName, date, time, fee } = state;

     // Format date for display
     const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
       weekday: 'long',
       year: 'numeric',
       month: 'long',
       day: 'numeric',
     }) : '';


    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <PatientHeader/>

            <main className="max-w-2xl mx-auto px-4 py-12">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/30 p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>

                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Appointment Confirmed</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Your appointment has successfully booked.</p>


                    {/* appointment details card */}
                    <div className="mt-6 bg-gray-50/70 dark:bg-gray-700/50 rounded-xl p-6 text-left">
                        <h3  className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Appointment Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Doctor</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">{doctorName}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Date</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">{formattedDate}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Time</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">{time}</span>
                            </div>


                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Fee</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">${fee}</span>
                            </div>
                        </div>
                    </div>


                    {/* Reminder */}
                    <div className="mt-6 p-4 bg-blue-50/70 dark:bg-blue-900/20 rounded-xl border border-blue-100/30 dark:border-blue-800/30">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            <span className="text-sm font-medium">Reminder</span>
                        </div>
                        <p  className="text-sm text-blue-700 dark:text-blue-300 mt-1">You will receive a confirmation email and a reminder 24 hours before your appointment</p>
                    </div>


                    {/* Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate('/portal/dashboard')}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
                        >Go to Dashboard</button>
                        <button  onClick={() => navigate('/portal/search')} className="px-6 py-2.5 bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Book Another</button>
                    </div>
                </div>
            </main>
        </div>
    )
}