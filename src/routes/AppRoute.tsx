import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../features/dashboard/page/DashboardPage";
import PatientPage from "../features/patient/page/PatientPage";
import DoctorPage from "../features/doctor/page/DoctorPage";
import SettingPage from "../features/settings/page/SettingPage";
import AppointmentPage from "../features/appointment/page/AppointmentPage";
import AppLayout from "../layouts/AppLayout";




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

            </Route>
            </Routes>

          
        </BrowserRouter>
    )
}