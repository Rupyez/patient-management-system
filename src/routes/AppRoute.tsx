import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../features/dashboard/page/DashboardPage";
import PatientPage from "../features/patient/page/PatientPage";
import DoctorPage from "../features/doctor/page/DoctorPage";
import SettingPage from "../features/settings/page/SettingPage";
import AppointmentPage from "../features/appointment/page/AppointmentPage";
import AppLayout from "../layouts/AppLayout";
import AnalyticsDashboard from "../pages/AnalyticsDashboard";
import BillingPage from "../features/billing/page/BillingPage";
// import DoctorDashboard from "../features/doctor-portal/page/DoctorDashboard";
import StaffManagement from "../features/staff-management/pages/StaffManagement";
import { patientRoutes } from "../features/patient-portal/route/routes";
import { doctorRoutes } from "../features/doctor-portal/routes/route";



export default function AppRoutes(){
    return(
        <BrowserRouter>

            <Routes>
                <Route element={<AppLayout />}>

                <Route path="/" element = {<Navigate to="/dashboard" replace/>}/>
                <Route path="/dashboard" element = {<DashboardPage/>}/>
                <Route path="/patients" element = {<PatientPage/>}/>
                <Route path="/doctors" element = {<DoctorPage/>}/>
                <Route path="/settings" element = {<SettingPage/>}/>
                <Route path="/appointments" element = {<AppointmentPage/>}/>
                <Route path="/analytics" element={<AnalyticsDashboard/>}/>
                <Route path="/billing" element={<BillingPage/>}/>
                {/* <Route path="/patient-portal" element={<PatientPortal/>}/>
                <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/> */}

                <Route path="/portal/*" element={patientRoutes}/>
                <Route path="/" element={<Navigate to="/portal" replace />} />
                <Route path="*" element={<Navigate to="/portal" replace />} />

                 <Route path="/doctor/*" element={doctorRoutes} />

                 {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
                <Route path="/staff" element={<StaffManagement/>}/>
            </Route>
            </Routes>

          
        </BrowserRouter>
    )
}