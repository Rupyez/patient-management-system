export type Gender = "MALE" | "FEMALE" | "OTHER";

export type PatientStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING";

export interface Patient {
  id: string;

  medicalRecordNumber: string;

  firstName: string;

  lastName: string;

  gender: Gender;

  dateOfBirth: string;

  phoneNumber: string;

  email: string;

  address: string;

  status: PatientStatus;

  createdAt: string;

  updatedAt: string;
}