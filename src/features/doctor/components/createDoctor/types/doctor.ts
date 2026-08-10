export type DoctorSpecialty = 
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

export type DoctorStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'BUSY';

export interface Doctor {
  id: string;
  doctorId: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  specialty: DoctorSpecialty;
  subSpecialties: string[];
  qualifications: string[];
  experience: number; // years
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  status: DoctorStatus;
  workingHours: {
    start: string; // "09:00"
    end: string;   // "17:00"
  };
  daysAvailable: string[]; // ['MONDAY', 'TUESDAY', ...]
  consultationFee: number;
  rating: number;
  totalPatients: number;
  bio: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorStats {
  totalDoctors: number;
  activeDoctors: number;
  onLeave: number;
  busy: number;
  averageRating: number;
  totalPatientsServed: number;
  topSpecialties: Array<{ specialty: DoctorSpecialty; count: number }>;
}