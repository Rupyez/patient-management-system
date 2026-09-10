import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLayout from '../components/DoctorLayout';
import DoctorDashboard from '../pages/DoctorDashboard';
import ConsultationPage from '../../patient-portal/pages/ConsultationPage';


export const doctorRoutes = (
  <Routes>
    <Route path="/" element={<DoctorLayout />}>
      <Route index element={<DoctorDashboard />} />
      <Route path="dashboard" element={<DoctorDashboard />} />
      <Route path='consultation/:id' element={<ConsultationPage/>}/>
    </Route>
  </Routes>
);