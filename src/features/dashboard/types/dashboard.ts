

export interface PatientDemographics{
  total: number;
  male: number;
  female: number;
  other: number;
  active: number;
  inactive: number;
  pending: number;
  newPatients: number;
  returningPatients: number;
  byAgeGroup: {
    "0-18": number;
    "19-35": number;
    "36-50": number;
    "51-65": number;
    "65+": number;
  };
}

export interface AppointmentStats{
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  noShow: number;
  inProgress: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  byType: {
    checkup: number;
    followup: number;
    consultation: number;
    emergency: number;
  };

}

export interface DoctorStats{
    total:number;
    active:number;
    onLeave:number;
    busy:number;
    available:number;
    departments: Record<string, number>

}

export interface RevenueStats{
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
  pending: number;
  collected: number;
  byDepartment: Record<string, number>;
}

export interface ActivityItem{
    id:string;
    type:
    | "PATIENT_ADDED"
    | "APPOINTMENT_SCHEDULED"
    | "APPOINTMENT_COMPLETED"
    | "DOCTOR_ADDED"
    | "PAYMENT_RECEIVED"
    | "PRESCRIPTION_ISSUED"
    | "LAB_RESULT"
    | "SYSTEM_ALERT";

    title:string;
    description:string;
    timestamp:string;
    read:boolean;
    icon:React.ElementType;
    color:string;
    action?:string;
    user:string;
}

export interface QuickAction{
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  path: string;
  description: string;
}

