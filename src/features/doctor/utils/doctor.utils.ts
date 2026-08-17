/**
 * ============================================================
 * DOCTOR UTILITIES
 * ============================================================
 * Helper functions for doctor operations
 */

import type { Doctor, DoctorStats, DoctorSpeciality } from '../types/doctor.types';
import { specialitiesMap } from '../data/doctor.data';

/**
 * Calculate doctor statistics from the data
 */
export const getDoctorStats = (doctors: Doctor[]): DoctorStats => {
  const total = doctors.length;
  const active = doctors.filter((d) => d.status === 'ACTIVE').length;
  const onLeave = doctors.filter((d) => d.status === 'ON_LEAVE').length;
  const busy = doctors.filter((d) => d.status === 'BUSY').length;
  const avgRating = doctors.reduce((sum, d) => sum + d.rating, 0) / total || 0;
  const totalPatients = doctors.reduce((sum, d) => sum + d.totalPatients, 0);

  const specialtyCounts: Record<string, number> = {};
  doctors.forEach((d) => {
    specialtyCounts[d.specialty] = (specialtyCounts[d.specialty] || 0) + 1;
  });


  const topSpecialties = Object.entries(specialtyCounts)
    .map(([specialty, count]) => ({ specialty: specialty as DoctorSpeciality, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalDoctors: total,
    activeDoctors: active,
    onLeave,
    busy,
    averageRating: Number(avgRating.toFixed(1)),
    totalPatientsServed: totalPatients,
    topSpecialties,
  };
};

/**
 * Generate a unique doctor ID
 */
export const generateDoctorId = (): string =>{
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
    return `DOC-${random}`
}


/**
 * Get full name from doctor
 */
export const getDoctorFullName = (doctor:Doctor): string =>{
    return `${doctor.firstName} ${doctor.lastName}`
}


/**
 * Get doctor initials
 */
export const getDoctorInitials = (doctor:Doctor): string =>{
    return `${doctor.firstName[0]} ${doctor.lastName[0]}`
}


/**
 * Get display name for specialty
 */

export const getSpecialityDisplay = (speciality: DoctorSpeciality): string =>{
    return specialitiesMap[speciality] || speciality
}

/**
 * Filter doctors based on search and filters
 */
export const filterDoctors =(
    doctors: Doctor[],
    search: string,
    speciality: string,
    status:string
):Doctor[] =>{
    return doctors.filter((doctor) =>{
        const query = search.trim().toLowerCase();
        const matchesSearch = !query || 
        doctor.firstName.toLowerCase().includes(query) ||
        doctor.lastName.toLowerCase().includes(query)  ||
        doctor.doctorId.toLowerCase().includes(query)  ||
        doctor.email.toLowerCase().includes(query)     ||
        doctor.specialty.toLocaleLowerCase().includes(query);

        const matchesSpeciality = speciality === 'ALL' || 
        doctor.specialty === speciality;
        const matchesStatus = status === 'ALL' || doctor.status === status;

        return matchesSearch && matchesSpeciality && matchesStatus;
    })
}


/**
 * Count active filters
 */
export const getActiveFilterCount = (speciality: string, status: string): number =>{
    return [speciality !== 'ALL', status !== 'ALL'].filter(Boolean).length;
}



/**
 * Format experience display
 */
export const formatExperience = (years: number): string =>{
    return `${years} year`
}


/**
 * Format consultation fee
 */
export const formatFee = (fee:number): string =>{
    return `${fee}`
}

/**
 * Format phone number
 */
export const formatPhone = (phone:string): string =>{
    return phone;
}