export interface Patient {

    id:string;
    medicalRecordNumber:string;
    firstName:string;
    lastName:string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    dateOfBirth:string;
    phoneNumber:string;
    email:string;
    address:string;
    status:'ACTIVE' | 'INACTIVE' | 'PENDING';
    createdAt: string;
    updatedAt: string;

}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type PatientStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';