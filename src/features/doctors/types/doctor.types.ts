export interface ClinicLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  department: string;
  profileImage?: string;
  bio: string;
  yearsOfExperience: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  education: string[];
  certifications: string[];
  languages: string[];
  clinicLocation: ClinicLocation;
  nextAvailableSlot?: string;
  acceptingNewPatients: boolean;
}

export interface DoctorSearchParams {
  query?: string;
  specialty?: string;
  location?: string;
  date?: string;
  page?: number;
  size?: number;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
