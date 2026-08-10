import type{ Patient } from "../types/patient";

export const patients: Patient[] = [

{
id:1,
mrn:"MRN001",
fullName:"John Doe",
gender:"Male",
phone:"555-1234",
status:"Active"
},

{
id:2,
mrn:"MRN002",
fullName:"Jane Smith", 
gender:"Female",
phone:"555-4567",
status:"Active"
},

{
id:3,
mrn:"MRN003",
fullName:"Alex Johnson",
gender:"Male",
phone:"555-8910",
status:"Inactive"
}

];