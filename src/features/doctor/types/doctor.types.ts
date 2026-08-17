/**
 * ============================================================
 * DOCTOR TYPES
 * ============================================================
 * All TypeScript interfaces for the doctor module
 */

// Doctor speciality types

export type DoctorSpeciality = 

  | 'CARDIOLOGY'
  | 'DERMATOLOGY'
  | 'ENDOCRINOLOGY'
  | 'GASTROENTEROLOGY'
  | 'NEUROLOGY'
  | 'OBSTETRICS'
  | 'ONCOLOGY'
  | 'OPHTHALMOLOGY'
  | 'ORTHOPEDICS'
  | 'PEDIATRICS'
  | 'PSYCHIATRY'
  | 'PULMONOLOGY'
  | 'RADIOLOGY'
  | 'SURGERY'
  | 'UROLOGY'
  | 'INTERNAL_MEDICINE'
  | 'FAMILY_MEDICINE'
  | 'EMERGENCY_MEDICINE';


//   Doctor Status
export type DoctorStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'BUSY';


// Working hour interface
export interface WorkingHours {
    start:string;
    end:string;
}

// Doctor interface
export interface Doctor{
    id: string;
  doctorId: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  specialty: DoctorSpeciality;
  subSpecialties: string[];
  qualifications: string[];
  experience: number;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  status: DoctorStatus;
  workingHours: WorkingHours;
  daysAvailable: string[];
  consultationFee: number;
  rating: number;
  totalPatients: number;
  bio: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;

}


// Doctor statistics interface
export interface DoctorStats{
  totalDoctors: number;
  activeDoctors: number;
  onLeave: number;
  busy: number;
  averageRating: number;
  totalPatientsServed: number;
  topSpecialties: Array<{ specialty: DoctorSpeciality; count: number }>;
}

// Doctor form data (for creating/updating)
//when you're creating a new doctor through a form, you don't want the user to enter:
export type DoctorFormData = Omit<Doctor, 'id' | 'createdAt' | 'updateAt' | 'rating' | 'totalPatients'>


// Filter state interface
export interface DoctorFilters{
    search: string;
    speciality:string;
    status:string;
}


// Doctor Form errors

export interface DoctorFormErrors{
  doctorId?: string;
  firstName?: string;
  lastName?: string;
  licenseNumber?: string;
  phoneNumber?: string;
  email?: string;
  experience?: string;
  consultationFee?: string;
}