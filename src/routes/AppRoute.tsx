import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DoctorDetailsPage from "../features/doctors/pages/DoctorDetailsPage";
import DoctorSearchPage from "../features/doctors/pages/DoctorSearchPage";
import HomePage from "../features/public-site/pages/HomePage";
import PublicLayout from "../layouts/PublicLayout";
import BookingPage from "../features/public-site/pages/BookingPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="doctors" element={<DoctorSearchPage />} />
          <Route path="doctors/:doctorId" element={<DoctorDetailsPage />} />
          <Route path="/book/:doctorId" element={<BookingPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
