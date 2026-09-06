import { Route, Routes } from "react-router-dom";
import PatientDashboard from "../pages/PatientDashboard";
import SearchPage from "../pages/SeachPage";
import DoctorListPage from "../pages/DoctorListPage";
import DoctorProfilePage from "../pages/DoctorProfilePage";
import BookingPage from "../pages/BookingPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import CheckInPage from "../pages/CheckInPage";
import ConsultationPage from "../pages/ConsultationPage";
import PrescriptionPage from "../pages/PrescriptionPage";
import TestResultPage from "../pages/TestResultPage";
import FollowUpPage from "../pages/FollowUpPage";


export const patientRoutes = (
    <Routes>
        <Route path="/" element={<PatientDashboard/>}/>
           <Route path="/dashboard" element={<PatientDashboard />} />
           <Route path="/search" element={<SearchPage/>}/>
           <Route path="/doctors" element={<DoctorListPage/>}/>
            <Route path="/doctor/:id" element={<DoctorProfilePage/>} />
            <Route path="/book/:id" element={<BookingPage/>} />
            <Route path="/confirmation" element={<ConfirmationPage/>} />
            

            <Route path="/check-in" element={<CheckInPage/>}/>
            <Route path="/consultation" element={<ConsultationPage/>}/>
            <Route path="/prescriptions" element={<PrescriptionPage/>}/>
            <Route path="/test" element={<TestResultPage/>}/>
            <Route path="/follow-up" element={<FollowUpPage/>}/>
    </Routes>
)