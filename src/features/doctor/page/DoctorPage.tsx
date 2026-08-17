

// /**
//  * ============================================================
//  * DOCTOR PAGE - COMPLETE SINGLE FILE COMPONENT
//  * ============================================================
//  * 
//  * This is a fully functional Doctor Management page with:
//  * - Statistics dashboard
//  * - Search and filter functionality
//  * - CRUD operations (Create, Read, Update, Delete)
//  * - Responsive design for all screen sizes
//  * - Modal forms for adding/editing
//  * - Profile view modal
//  * - Toast notifications
//  * - Loading states
//  * - Modern UI with animations
//  * 
//  * ============================================================
//  */



// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // ============================================================
// // ICON IMPORTS
// // ============================================================
// import {
//   Users,
//   Activity,
//   Clock,
//   Star,
//   Stethoscope,
//   TrendingUp,
//   Search,
//   Filter,
//   Plus,
//   X,
//   Eye,
//   Pencil,
//   Trash2,
//   Calendar,
//   MapPin,
//   Phone,
//   Mail,
//   CalendarDays,
//   Award,
//   DollarSign,
//   Loader,
// } from 'lucide-react';
// // ============================================================
// // TYPES & INTERFACES
// // ============================================================

// /** Doctor specialty types */
// type DoctorSpecialty =
//   | 'CARDIOLOGY'
//   | 'DERMATOLOGY'
//   | 'ENDOCRINOLOGY'
//   | 'GASTROENTEROLOGY'
//   | 'NEUROLOGY'
//   | 'OBSTETRICS'
//   | 'ONCOLOGY'
//   | 'OPHTHALMOLOGY'
//   | 'ORTHOPEDICS'
//   | 'PEDIATRICS'
//   | 'PSYCHIATRY'
//   | 'PULMONOLOGY'
//   | 'RADIOLOGY'
//   | 'SURGERY'
//   | 'UROLOGY'
//   | 'INTERNAL_MEDICINE'
//   | 'FAMILY_MEDICINE'
//   | 'EMERGENCY_MEDICINE';

// /** Doctor status types */
// type DoctorStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'BUSY';

// /** Doctor interface */
// interface Doctor {
//   id: string;
//   doctorId: string;
//   firstName: string;
//   lastName: string;
//   gender: 'MALE' | 'FEMALE' | 'OTHER';
//   specialty: DoctorSpecialty;
//   subSpecialties: string[];
//   qualifications: string[];
//   experience: number;
//   licenseNumber: string;
//   phoneNumber: string;
//   email: string;
//   address: string;
//   status: DoctorStatus;
//   workingHours: {
//     start: string;
//     end: string;
//   };
//   daysAvailable: string[];
//   consultationFee: number;
//   rating: number;
//   totalPatients: number;
//   bio: string;
//   imageUrl?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// /** Doctor statistics interface */
// interface DoctorStats {
//   totalDoctors: number;
//   activeDoctors: number;
//   onLeave: number;
//   busy: number;
//   averageRating: number;
//   totalPatientsServed: number;
//   topSpecialties: Array<{ specialty: DoctorSpecialty; count: number }>;
// }

// // ============================================================
// // STATIC DATA
// // ============================================================

// /** Mapping of specialty codes to display names */
// const specialtiesMap: Record<DoctorSpecialty, string> = {
//   CARDIOLOGY: 'Cardiology',
//   DERMATOLOGY: 'Dermatology',
//   ENDOCRINOLOGY: 'Endocrinology',
//   GASTROENTEROLOGY: 'Gastroenterology',
//   NEUROLOGY: 'Neurology',
//   OBSTETRICS: 'Obstetrics & Gynecology',
//   ONCOLOGY: 'Oncology',
//   OPHTHALMOLOGY: 'Ophthalmology',
//   ORTHOPEDICS: 'Orthopedics',
//   PEDIATRICS: 'Pediatrics',
//   PSYCHIATRY: 'Psychiatry',
//   PULMONOLOGY: 'Pulmonology',
//   RADIOLOGY: 'Radiology',
//   SURGERY: 'Surgery',
//   UROLOGY: 'Urology',
//   INTERNAL_MEDICINE: 'Internal Medicine',
//   FAMILY_MEDICINE: 'Family Medicine',
//   EMERGENCY_MEDICINE: 'Emergency Medicine',
// };

// /** Specialty options for dropdowns */
// const specialtyOptions = Object.entries(specialtiesMap).map(([value, label]) => ({
//   value,
//   label,
// }));

// /** Status options for dropdowns */
// const statusOptions = [
//   { value: 'ALL', label: 'All Status' },
//   { value: 'ACTIVE', label: 'Active' },
//   { value: 'INACTIVE', label: 'Inactive' },
//   { value: 'ON_LEAVE', label: 'On Leave' },
//   { value: 'BUSY', label: 'Busy' },
// ];

// /** Initial doctor data */
// const initialDoctors: Doctor[] = [
//   {
//     id: '1',
//     doctorId: 'DOC-001',
//     firstName: 'Sarah',
//     lastName: 'Johnson',
//     gender: 'FEMALE',
//     specialty: 'CARDIOLOGY',
//     subSpecialties: ['Interventional Cardiology', 'Heart Failure'],
//     qualifications: ['MD', 'FACC', 'Board Certified in Cardiology'],
//     experience: 15,
//     licenseNumber: 'LIC-12345',
//     phoneNumber: '(555) 111-2222',
//     email: 'sarah.johnson@hospital.com',
//     address: '123 Medical Center Dr, Suite 200, New York, NY 10001',
//     status: 'ACTIVE',
//     workingHours: { start: '08:00', end: '17:00' },
//     daysAvailable: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
//     consultationFee: 250,
//     rating: 4.8,
//     totalPatients: 1250,
//     bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating complex cardiovascular conditions. She specializes in interventional cardiology and heart failure management.',
//     createdAt: '2026-01-15T10:00:00Z',
//     updatedAt: '2026-08-01T10:00:00Z',
//   },
//   {
//     id: '2',
//     doctorId: 'DOC-002',
//     firstName: 'Michael',
//     lastName: 'Chen',
//     gender: 'MALE',
//     specialty: 'NEUROLOGY',
//     subSpecialties: ['Stroke', 'Movement Disorders', 'Epilepsy'],
//     qualifications: ['MD', 'PhD', 'FAAN'],
//     experience: 20,
//     licenseNumber: 'LIC-12346',
//     phoneNumber: '(555) 222-3333',
//     email: 'michael.chen@hospital.com',
//     address: '456 Neuroscience Building, Suite 310, Los Angeles, CA 90001',
//     status: 'ACTIVE',
//     workingHours: { start: '09:00', end: '18:00' },
//     daysAvailable: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY'],
//     consultationFee: 300,
//     rating: 4.9,
//     totalPatients: 850,
//     bio: 'Dr. Michael Chen is a distinguished neurologist with expertise in stroke management, movement disorders, and epilepsy treatment.',
//     createdAt: '2026-01-20T10:00:00Z',
//     updatedAt: '2026-08-01T10:00:00Z',
//   },
//   {
//     id: '3',
//     doctorId: 'DOC-003',
//     firstName: 'Emily',
//     lastName: 'Rodriguez',
//     gender: 'FEMALE',
//     specialty: 'PEDIATRICS',
//     subSpecialties: ['Neonatology', 'Adolescent Medicine'],
//     qualifications: ['MD', 'FAAP', 'Board Certified in Pediatrics'],
//     experience: 10,
//     licenseNumber: 'LIC-12347',
//     phoneNumber: '(555) 333-4444',
//     email: 'emily.rodriguez@hospital.com',
//     address: '789 Children\'s Health Center, Chicago, IL 60601',
//     status: 'ACTIVE',
//     workingHours: { start: '08:30', end: '16:30' },
//     daysAvailable: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
//     consultationFee: 180,
//     rating: 4.7,
//     totalPatients: 2100,
//     bio: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.',
//     createdAt: '2026-02-01T10:00:00Z',
//     updatedAt: '2026-08-01T10:00:00Z',
//   },
//   {
//     id: '4',
//     doctorId: 'DOC-004',
//     firstName: 'James',
//     lastName: 'Williams',
//     gender: 'MALE',
//     specialty: 'ORTHOPEDICS',
//     subSpecialties: ['Sports Medicine', 'Joint Replacement'],
//     qualifications: ['MD', 'FAAOS', 'Board Certified in Orthopedic Surgery'],
//     experience: 18,
//     licenseNumber: 'LIC-12348',
//     phoneNumber: '(555) 444-5555',
//     email: 'james.williams@hospital.com',
//     address: '321 Orthopedic Institute, Suite 150, Houston, TX 77001',
//     status: 'BUSY',
//     workingHours: { start: '07:00', end: '19:00' },
//     daysAvailable: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
//     consultationFee: 275,
//     rating: 4.6,
//     totalPatients: 980,
//     bio: 'Dr. James Williams is a leading orthopedic surgeon specializing in sports medicine and joint replacement.',
//     createdAt: '2026-02-15T10:00:00Z',
//     updatedAt: '2026-08-01T10:00:00Z',
//   },
//   {
//     id: '5',
//     doctorId: 'DOC-005',
//     firstName: 'Lisa',
//     lastName: 'Park',
//     gender: 'FEMALE',
//     specialty: 'DERMATOLOGY',
//     subSpecialties: ['Cosmetic Dermatology', 'Mohs Surgery'],
//     qualifications: ['MD', 'FAAD', 'Board Certified in Dermatology'],
//     experience: 12,
//     licenseNumber: 'LIC-12349',
//     phoneNumber: '(555) 555-6666',
//     email: 'lisa.park@hospital.com',
//     address: '654 Dermatology Clinic, Suite 200, Miami, FL 33101',
//     status: 'ACTIVE',
//     workingHours: { start: '09:00', end: '17:00' },
//     daysAvailable: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
//     consultationFee: 220,
//     rating: 4.9,
//     totalPatients: 1500,
//     bio: 'Dr. Lisa Park is a board-certified dermatologist with expertise in cosmetic dermatology and Mohs micrographic surgery.',
//     createdAt: '2026-03-01T10:00:00Z',
//     updatedAt: '2026-08-01T10:00:00Z',
//   },
//   {
//     id: '6',
//     doctorId: 'DOC-006',
//     firstName: 'Robert',
//     lastName: 'Taylor',
//     gender: 'MALE',
//     specialty: 'SURGERY',
//     subSpecialties: ['General Surgery', 'Laparoscopic Surgery'],
//     qualifications: ['MD', 'FACS', 'Board Certified in Surgery'],
//     experience: 22,
//     licenseNumber: 'LIC-12350',
//     phoneNumber: '(555) 666-7777',
//     email: 'robert.taylor@hospital.com',
//     address: '987 Surgical Center, Seattle, WA 98101',
//     status: 'ON_LEAVE',
//     workingHours: { start: '08:00', end: '16:00' },
//     daysAvailable: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY'],
//     consultationFee: 350,
//     rating: 4.8,
//     totalPatients: 720,
//     bio: 'Dr. Robert Taylor is a highly experienced general surgeon with expertise in laparoscopic and minimally invasive procedures.',
//     createdAt: '2026-03-15T10:00:00Z',
//     updatedAt: '2026-08-01T10:00:00Z',
//   },
//   {
//     id: '7',
//     doctorId: 'DOC-007',
//     firstName: 'Amanda',
//     lastName: 'White',
//     gender: 'FEMALE',
//     specialty: 'OBSTETRICS',
//     subSpecialties: ['High-Risk Pregnancy', 'Reproductive Endocrinology'],
//     qualifications: ['MD', 'FACOG', 'Board Certified in Obstetrics and Gynecology'],
//     experience: 14,
//     licenseNumber: 'LIC-12351',
//     phoneNumber: '(555) 777-8888',
//     email: 'amanda.white@hospital.com',
//     address: '147 Women\'s Health Center, Boston, MA 02101',
//     status: 'ACTIVE',
//     workingHours: { start: '08:30', end: '18:30' },
//     daysAvailable: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
//     consultationFee: 200,
//     rating: 4.7,
//     totalPatients: 1800,
//     bio: 'Dr. Amanda White is a dedicated OB/GYN specializing in high-risk pregnancy management and reproductive endocrinology.',
//     createdAt: '2026-04-01T10:00:00Z',
//     updatedAt: '2026-08-01T10:00:00Z',
//   },
//   {
//     id: '8',
//     doctorId: 'DOC-008',
//     firstName: 'David',
//     lastName: 'Martinez',
//     gender: 'MALE',
//     specialty: 'PSYCHIATRY',
//     subSpecialties: ['Child Psychiatry', 'Addiction Medicine'],
//     qualifications: ['MD', 'MPH', 'FAPA'],
//     experience: 16,
//     licenseNumber: 'LIC-12352',
//     phoneNumber: '(555) 888-9999',
//     email: 'david.martinez@hospital.com',
//     address: '258 Behavioral Health Center, Denver, CO 80201',
//     status: 'INACTIVE',
//     workingHours: { start: '09:00', end: '17:00' },
//     daysAvailable: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
//     consultationFee: 280,
//     rating: 4.5,
//     totalPatients: 650,
//     bio: 'Dr. David Martinez is a compassionate psychiatrist with special interests in child and adolescent psychiatry, as well as addiction medicine.',
//     createdAt: '2026-04-15T10:00:00Z',
//     updatedAt: '2026-08-01T10:00:00Z',
//   },
// ];

// // ============================================================
// // HELPER FUNCTIONS
// // ============================================================

// /** Calculate doctor statistics from the data */
// const getDoctorStats = (doctors: Doctor[]): DoctorStats => {
//   const total = doctors.length;
//   const active = doctors.filter((d) => d.status === 'ACTIVE').length;
//   const onLeave = doctors.filter((d) => d.status === 'ON_LEAVE').length;
//   const busy = doctors.filter((d) => d.status === 'BUSY').length;
//   const avgRating = doctors.reduce((sum, d) => sum + d.rating, 0) / total || 0;
//   const totalPatients = doctors.reduce((sum, d) => sum + d.totalPatients, 0);

//   const specialtyCounts: Record<string, number> = {};
//   doctors.forEach((d) => {
//     specialtyCounts[d.specialty] = (specialtyCounts[d.specialty] || 0) + 1;
//   });

//   const topSpecialties = Object.entries(specialtyCounts)
//     .map(([specialty, count]) => ({ specialty: specialty as DoctorSpecialty, count }))
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 5);

//   return {
//     totalDoctors: total,
//     activeDoctors: active,
//     onLeave,
//     busy,
//     averageRating: Number(avgRating.toFixed(1)),
//     totalPatientsServed: totalPatients,
//     topSpecialties,
//   };
// };

// // ============================================================
// // SUB-COMPONENTS (Defined within the same file)
// // ============================================================

// /**
//  * STAT CARD COMPONENT
//  * Displays a single statistic with icon
//  */
// const StatCard: React.FC<{
//   title: string;
//   value: string | number;
//   icon: React.ElementType;
//   color: string;
// }> = ({ title, value, icon: Icon, color }) => (
//   <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-slate-300">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-sm font-medium text-slate-500">{title}</p>
//         <h3 className="mt-2 text-2xl font-bold text-slate-800">{value}</h3>
//       </div>
//       <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}>
//         <Icon size={24} />
//       </div>
//     </div>
//   </div>
// );

// /**
//  * DOCTOR AVATAR COMPONENT
//  * Displays doctor initials with status indicator
//  */
// const DoctorAvatar: React.FC<{
//   firstName: string;
//   lastName: string;
//   size?: 'sm' | 'md' | 'lg';
//   status?: DoctorStatus;
// }> = ({ firstName, lastName, size = 'md', status }) => {
//   const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
//   const sizes = {
//     sm: 'h-8 w-8 text-xs',
//     md: 'h-12 w-12 text-sm',
//     lg: 'h-16 w-16 text-lg',
//   };

//   const statusColors = {
//     ACTIVE: 'border-green-500',
//     INACTIVE: 'border-red-500',
//     ON_LEAVE: 'border-amber-500',
//     BUSY: 'border-purple-500',
//   };

//   return (
//     <div className="relative flex-shrink-0">
//       <div
//         className={`flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 font-semibold text-white shadow-md ${sizes[size]}`}
//       >
//         {initials}
//       </div>
//       {status && (
//         <div
//           className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${statusColors[status]}`}
//         />
//       )}
//     </div>
//   );
// };

// /**
//  * DOCTOR STATUS BADGE COMPONENT
//  * Displays status with color coding
//  */
// const DoctorStatusBadge: React.FC<{ status: DoctorStatus }> = ({ status }) => {
//   const styles = {
//     ACTIVE: 'bg-green-100 text-green-700',
//     INACTIVE: 'bg-red-100 text-red-700',
//     ON_LEAVE: 'bg-amber-100 text-amber-700',
//     BUSY: 'bg-purple-100 text-purple-700',
//   };

//   const labels = {
//     ACTIVE: 'Active',
//     INACTIVE: 'Inactive',
//     ON_LEAVE: 'On Leave',
//     BUSY: 'Busy',
//   };

//   return (
//     <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
//       <span className={`mr-1.5 h-1.5 w-1.5 rounded-full bg-${status === 'ACTIVE' ? 'green' : status === 'BUSY' ? 'purple' : status === 'ON_LEAVE' ? 'amber' : 'red'}-500`} />
//       {labels[status]}
//     </span>
//   );
// };

// /**
//  * DOCTOR ACTIONS COMPONENT
//  * Action buttons for each row
//  */
// const DoctorActions: React.FC<{
//   onView?: () => void;
//   onEdit?: () => void;
//   onDelete?: () => void;
// }> = ({ onView, onEdit, onDelete }) => (
//   <div className="flex items-center gap-1">
//     {onView && (
//       <button
//         onClick={(e) => { e.stopPropagation(); onView(); }}
//         className="rounded-lg p-2 transition hover:bg-sky-100"
//         title="View Details"
//       >
//         <Eye size={18} className="text-sky-600" />
//       </button>
//     )}
//     {onEdit && (
//       <button
//         onClick={(e) => { e.stopPropagation(); onEdit(); }}
//         className="rounded-lg p-2 transition hover:bg-amber-100"
//         title="Edit Doctor"
//       >
//         <Pencil size={18} className="text-amber-600" />
//       </button>
//     )}
//     {onDelete && (
//       <button
//         onClick={(e) => { e.stopPropagation(); onDelete(); }}
//         className="rounded-lg p-2 transition hover:bg-red-100"
//         title="Delete Doctor"
//       >
//         <Trash2 size={18} className="text-red-600" />
//       </button>
//     )}
//   </div>
// );

// // ============================================================
// // MAIN DOCTOR PAGE COMPONENT
// // ============================================================

// const DoctorPage: React.FC = () => {
//   // ==========================================================
//   // STATE MANAGEMENT
//   // ==========================================================

//   /** List of doctors */
//   const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  
//   /** Loading state */
//   const [loading, setLoading] = useState(true);
  
//   /** Search query */
//   const [search, setSearch] = useState('');
  
//   /** Selected specialty filter */
//   const [specialty, setSpecialty] = useState('ALL');
  
//   /** Selected status filter */
//   const [status, setStatus] = useState('ALL');
  
//   /** Show add/edit form modal */
//   const [showForm, setShowForm] = useState(false);
  
//   /** Show profile modal */
//   const [showProfile, setShowProfile] = useState(false);
  
//   /** Doctor being edited */
//   const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  
//   /** Selected doctor for profile view */
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
//   /** Show filters on mobile */
//   const [showFilters, setShowFilters] = useState(false);

//   // ==========================================================
//   // DATA LOADING
//   // ==========================================================

//   useEffect(() => {
//     // Simulate API call
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         await new Promise((resolve) => setTimeout(resolve, 600));
//         setDoctorList(initialDoctors);
//       } catch (error) {
//         toast.error('Failed to load doctors');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   // ==========================================================
//   // COMPUTED VALUES
//   // ==========================================================

//   /** Calculate statistics */
//   const stats = useMemo(() => getDoctorStats(doctorList), [doctorList]);

//   /** Filter doctors based on search and filters */
//   const filteredDoctors = useMemo(() => {
//     return doctorList.filter((doctor) => {
//       const query = search.trim().toLowerCase();
//       const matchesSearch =
//         !query ||
//         doctor.firstName.toLowerCase().includes(query) ||
//         doctor.lastName.toLowerCase().includes(query) ||
//         doctor.doctorId.toLowerCase().includes(query) ||
//         doctor.email.toLowerCase().includes(query) ||
//         doctor.specialty.toLowerCase().includes(query);

//       const matchesSpecialty = specialty === 'ALL' || doctor.specialty === specialty;
//       const matchesStatus = status === 'ALL' || doctor.status === status;

//       return matchesSearch && matchesSpecialty && matchesStatus;
//     });
//   }, [doctorList, search, specialty, status]);

//   /** Count active filters */
//   const activeFilterCount = [specialty !== 'ALL', status !== 'ALL'].filter(Boolean)
//     .length;

//   // ==========================================================
//   // EVENT HANDLERS
//   // ==========================================================

//   /** Handle adding or updating a doctor */
//   const handleSubmitDoctor = useCallback(
//     (doctorData: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'totalPatients'>) => {
//       if (editingDoctor) {
//         // Update existing doctor
//         const updatedDoctor: Doctor = {
//           ...editingDoctor,
//           ...doctorData,
//           updatedAt: new Date().toISOString(),
//         };
//         setDoctorList((prev) =>
//           prev.map((d) => (d.id === updatedDoctor.id ? updatedDoctor : d))
//         );
//         toast.success(`Dr. ${updatedDoctor.firstName} ${updatedDoctor.lastName} updated successfully!`);
//       } else {
//         // Add new doctor
//         const newDoctor: Doctor = {
//           id: crypto.randomUUID(),
//           ...doctorData,
//           rating: 4.5,
//           totalPatients: 0,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         };
//         setDoctorList((prev) => [...prev, newDoctor]);
//         toast.success(`Dr. ${newDoctor.firstName} ${newDoctor.lastName} added successfully!`);
//       }
//       setShowForm(false);
//       setEditingDoctor(null);
//     },
//     [editingDoctor]
//   );

//   /** Handle editing a doctor */
//   const handleEdit = useCallback((doctor: Doctor) => {
//     setEditingDoctor(doctor);
//     setShowForm(true);
//   }, []);

//   /** Handle deleting a doctor */
//   const handleDelete = useCallback((doctor: Doctor) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete Dr. ${doctor.firstName} ${doctor.lastName}?\n\nThis action cannot be undone.`
//       )
//     ) {
//       setDoctorList((prev) => prev.filter((d) => d.id !== doctor.id));
//       toast.success(`Dr. ${doctor.firstName} ${doctor.lastName} has been removed.`);
//     }
//   }, []);

//   /** Handle viewing a doctor's profile */
//   const handleView = useCallback((doctor: Doctor) => {
//     setSelectedDoctor(doctor);
//     setShowProfile(true);
//   }, []);

//   /** Close profile modal */
//   const handleCloseProfile = useCallback(() => {
//     setShowProfile(false);
//     setSelectedDoctor(null);
//   }, []);

//   /** Reset filters */
//   const handleClearFilters = useCallback(() => {
//     setSpecialty('ALL');
//     setStatus('ALL');
//     setSearch('');
//   }, []);

//   // ==========================================================
//   // RENDER FUNCTIONS
//   // ==========================================================

//   /** Render loading state */
//   if (loading) {
//     return (
//       <div className="mx-auto w-full max-w-7xl px-4 py-6">
//         <div className="flex h-[60vh] items-center justify-center">
//           <div className="flex flex-col items-center gap-4">
//             <Loader className="h-10 w-10 animate-spin text-sky-500" />
//             <p className="text-sm text-slate-500">Loading doctors...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto w-full max-w-7xl px-4 py-6">
//       {/* ==========================================================
//           PAGE HEADER
//           ========================================================== */}
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800">Doctors</h1>
//           <p className="mt-1 text-sm text-slate-500">
//             Manage all doctors and specialists in the hospital
//           </p>
//         </div>
//       </div>

//       {/* ==========================================================
//           STATISTICS CARDS
//           ========================================================== */}
//       <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         <StatCard
//           title="Total Doctors"
//           value={stats.totalDoctors}
//           icon={Users}
//           color="bg-sky-50 text-sky-600"
//         />
//         <StatCard
//           title="Active Doctors"
//           value={stats.activeDoctors}
//           icon={Activity}
//           color="bg-emerald-50 text-emerald-600"
//         />
//         <StatCard
//           title="On Leave"
//           value={stats.onLeave}
//           icon={Clock}
//           color="bg-amber-50 text-amber-600"
//         />
//         <StatCard
//           title="Busy"
//           value={stats.busy}
//           icon={TrendingUp}
//           color="bg-purple-50 text-purple-600"
//         />
//         <StatCard
//           title="Average Rating"
//           value={`${stats.averageRating} ★`}
//           icon={Star}
//           color="bg-yellow-50 text-yellow-600"
//         />
//         <StatCard
//           title="Patients Served"
//           value={stats.totalPatientsServed.toLocaleString()}
//           icon={Stethoscope}
//           color="bg-rose-50 text-rose-600"
//         />
//       </div>

//       {/* ==========================================================
//           TOOLBAR - Search, Filters, Add Button
//           ========================================================== */}
//       <div className="mb-6 space-y-4">
//         {/* Main toolbar row */}
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           {/* Left - Search and Filter Toggle */}
//           <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
//             {/* Search Input */}
//             <div className="relative flex-1 min-w-[200px]">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search doctors by name, ID, or specialty..."
//                 className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
//               />
//               {search && (
//                 <button
//                   onClick={() => setSearch('')}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                 >
//                   <X size={16} />
//                 </button>
//               )}
//             </div>

//             {/* Filter Toggle Button */}
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
//                 showFilters || activeFilterCount > 0
//                   ? 'border-sky-300 bg-sky-50 text-sky-700'
//                   : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
//               }`}
//             >
//               <Filter size={18} />
//               Filters
//               {activeFilterCount > 0 && (
//                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
//                   {activeFilterCount}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Right - Add Doctor Button */}
//           <button
//             onClick={() => {
//               setEditingDoctor(null);
//               setShowForm(true);
//             }}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-all hover:bg-sky-600 hover:shadow-lg"
//           >
//             <Plus size={18} />
//             Add Doctor
//           </button>
//         </div>

//         {/* Expanded Filters */}
//         {showFilters && (
//           <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm animate-in slide-in-from-top-2 duration-200">
//             <div className="flex flex-wrap items-center gap-4">
//               {/* Specialty Filter */}
//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium text-slate-600 whitespace-nowrap">
//                   Specialty:
//                 </label>
//                 <select
//                   value={specialty}
//                   onChange={(e) => setSpecialty(e.target.value)}
//                   className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
//                 >
//                   {specialtyOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Status Filter */}
//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium text-slate-600 whitespace-nowrap">
//                   Status:
//                 </label>
//                 <select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
//                 >
//                   {statusOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Clear Filters */}
//               {(specialty !== 'ALL' || status !== 'ALL' || search) && (
//                 <button
//                   onClick={handleClearFilters}
//                   className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors"
//                 >
//                   Clear All Filters
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ==========================================================
//           DOCTOR TABLE
//           ========================================================== */}
//       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[640px]">
//             {/* Table Header */}
//             <thead className="bg-slate-50 border-b border-slate-200">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
//                   Doctor
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
//                   Specialty
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
//                   Experience
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
//                   Phone
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
//                   Rating
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             {/* Table Body */}
//             <tbody className="divide-y divide-slate-100">
//               {filteredDoctors.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="py-12 text-center text-slate-500">
//                     <div className="flex flex-col items-center gap-2">
//                       <Stethoscope size={40} className="text-slate-300" />
//                       <p>No doctors found</p>
//                       <p className="text-sm text-slate-400">
//                         {search ? 'Try adjusting your search or filters' : 'Add your first doctor'}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                                filteredDoctors.map((doctor) => (
//                   <tr
//                     key={doctor.id}
//                     className="transition hover:bg-slate-50 cursor-pointer"
//                     onClick={() => handleView(doctor)}
//                   >
//                     {/* Doctor Column - Avatar + Name + ID */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <DoctorAvatar
//                           firstName={doctor.firstName}
//                           lastName={doctor.lastName}
//                           status={doctor.status}
//                         />
//                         <div>
//                           <p className="font-medium text-slate-800">
//                             {doctor.firstName} {doctor.lastName}
//                           </p>
//                           <p className="text-sm text-slate-500">{doctor.doctorId}</p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Specialty Column */}
//                     <td className="px-6 py-4">
//                       <span className="text-sm text-slate-600">
//                         {specialtiesMap[doctor.specialty] || doctor.specialty}
//                       </span>
//                     </td>

//                     {/* Experience Column */}
//                     <td className="px-6 py-4">
//                       <span className="text-sm text-slate-600">{doctor.experience} years</span>
//                     </td>

//                     {/* Phone Column */}
//                     <td className="px-6 py-4">
//                       <span className="text-sm text-slate-600">{doctor.phoneNumber}</span>
//                     </td>

//                     {/* Rating Column */}
//                     <td className="px-6 py-4">
//                       <span className="flex items-center gap-1 text-sm font-medium text-slate-700">
//                         <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                         {doctor.rating}
//                       </span>
//                     </td>

//                     {/* Status Column */}
//                     <td className="px-6 py-4">
//                       <DoctorStatusBadge status={doctor.status} />
//                     </td>

//                     {/* Actions Column */}
//                     <td className="px-6 py-4 text-right">
//                       <DoctorActions
//                         onView={() => handleView(doctor)}
//                         onEdit={(e) => {
//                           e?.stopPropagation();
//                           handleEdit(doctor);
//                         }}
//                         onDelete={(e) => {
//                           e?.stopPropagation();
//                           handleDelete(doctor);
//                         }}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ==========================================================
//           ADD/EDIT DOCTOR FORM MODAL
//           ========================================================== */}
//       {showForm && (
//         <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
//           <div className="w-full max-w-4xl my-8 animate-in fade-in zoom-in duration-200">
//             <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
//               {/* Form Header */}
//               <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50 p-6 sm:p-8">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start gap-4">
//                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 shadow-sm">
//                       <Stethoscope className="h-6 w-6 text-indigo-600" />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold text-slate-800">
//                         {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
//                       </h2>
//                       <p className="mt-1 text-sm text-slate-500">
//                         {editingDoctor
//                           ? 'Update doctor information in the hospital management system'
//                           : 'Add a new doctor to the hospital staff'}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setShowForm(false);
//                       setEditingDoctor(null);
//                     }}
//                     className="rounded-lg p-2 transition hover:bg-slate-100"
//                   >
//                     <X size={20} className="text-slate-500" />
//                   </button>
//                 </div>
//               </div>

//               {/* Form Body */}
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   const formData = new FormData(e.currentTarget);
//                   const doctorData = {
//                     doctorId: formData.get('doctorId') as string,
//                     firstName: formData.get('firstName') as string,
//                     lastName: formData.get('lastName') as string,
//                     gender: formData.get('gender') as 'MALE' | 'FEMALE' | 'OTHER',
//                     specialty: formData.get('specialty') as DoctorSpecialty,
//                     subSpecialties: (formData.get('subSpecialties') as string)
//                       .split(',')
//                       .map((s) => s.trim())
//                       .filter(Boolean),
//                     qualifications: (formData.get('qualifications') as string)
//                       .split(',')
//                       .map((s) => s.trim())
//                       .filter(Boolean),
//                     experience: Number(formData.get('experience')),
//                     licenseNumber: formData.get('licenseNumber') as string,
//                     phoneNumber: formData.get('phoneNumber') as string,
//                     email: formData.get('email') as string,
//                     address: formData.get('address') as string,
//                     status: formData.get('status') as DoctorStatus,
//                     workingHours: {
//                       start: formData.get('workingHoursStart') as string,
//                       end: formData.get('workingHoursEnd') as string,
//                     },
//                     daysAvailable: (formData.get('daysAvailable') as string)
//                       .split(',')
//                       .map((s) => s.trim().toUpperCase())
//                       .filter(Boolean),
//                     consultationFee: Number(formData.get('consultationFee')),
//                     bio: formData.get('bio') as string,
//                   };
//                   handleSubmitDoctor(doctorData);
//                 }}
//                 className="space-y-8 p-6 sm:p-8"
//               >
//                 {/* Personal Information Section */}
//                 <section>
//                   <div className="mb-6 flex items-start gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
//                       <Users className="h-5 w-5 text-indigo-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
//                       <p className="text-sm text-slate-500">Basic doctor identity and professional details.</p>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Doctor ID <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <input
//                         name="doctorId"
//                         defaultValue={editingDoctor?.doctorId || `DOC-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                       />
//                     </div>
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         First Name <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <input
//                         name="firstName"
//                         defaultValue={editingDoctor?.firstName || ''}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                       />
//                     </div>
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Last Name <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <input
//                         name="lastName"
//                         defaultValue={editingDoctor?.lastName || ''}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                       />
//                     </div>
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Gender <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <select
//                         name="gender"
//                         defaultValue={editingDoctor?.gender || 'MALE'}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                       >
//                         <option value="MALE">Male</option>
//                         <option value="FEMALE">Female</option>
//                         <option value="OTHER">Other</option>
//                       </select>
//                     </div>
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Specialty <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <select
//                         name="specialty"
//                         defaultValue={editingDoctor?.specialty || 'INTERNAL_MEDICINE'}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                       >
//                         {specialtyOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Experience (years) <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <input
//                         name="experience"
//                         type="number"
//                         defaultValue={editingDoctor?.experience || 0}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                         min="0"
//                       />
//                     </div>
//                   </div>
//                 </section>

//                 {/* Professional Information Section */}
//                 <section className="border-t border-slate-200 pt-8">
//                   <div className="mb-6 flex items-start gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
//                       <Award className="h-5 w-5 text-amber-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-slate-800">Professional Information</h3>
//                       <p className="text-sm text-slate-500">Licensing, qualifications and sub-specialties.</p>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         License Number <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <input
//                         name="licenseNumber"
//                         defaultValue={editingDoctor?.licenseNumber || ''}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                       />
//                     </div>
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Qualifications (comma separated)
//                       </label>
//                       <input
//                         name="qualifications"
//                         defaultValue={editingDoctor?.qualifications?.join(', ') || ''}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                       />
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Sub-Specialties (comma separated)
//                       </label>
//                       <input
//                         name="subSpecialties"
//                         defaultValue={editingDoctor?.subSpecialties?.join(', ') || ''}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                       />
//                     </div>
//                   </div>
//                 </section>

//                 {/* Contact Information Section */}
//                 <section className="border-t border-slate-200 pt-8">
//                   <div className="mb-6 flex items-start gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
//                       <Phone className="h-5 w-5 text-emerald-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-slate-800">Contact Information</h3>
//                       <p className="text-sm text-slate-500">Contact details for doctor communication.</p>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Phone Number <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <input
//                         name="phoneNumber"
//                         type="tel"
//                         defaultValue={editingDoctor?.phoneNumber || ''}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                       />
//                     </div>
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Email Address <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <input
//                         name="email"
//                         type="email"
//                         defaultValue={editingDoctor?.email || ''}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                       />
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>
//                       <input
//                         name="address"
//                         defaultValue={editingDoctor?.address || ''}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                       />
//                     </div>
//                   </div>
//                 </section>

//                 {/* Working Hours Section */}
//                 <section className="border-t border-slate-200 pt-8">
//                   <div className="mb-6 flex items-start gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
//                       <Clock className="h-5 w-5 text-purple-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-slate-800">Working Hours</h3>
//                       <p className="text-sm text-slate-500">Schedule and availability settings.</p>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">Start Time</label>
//                       <input
//                         name="workingHoursStart"
//                         type="time"
//                         defaultValue={editingDoctor?.workingHours?.start || '09:00'}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                       />
//                     </div>
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">End Time</label>
//                       <input
//                         name="workingHoursEnd"
//                         type="time"
//                         defaultValue={editingDoctor?.workingHours?.end || '17:00'}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                       />
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Days Available (comma separated)
//                       </label>
//                       <input
//                         name="daysAvailable"
//                         defaultValue={editingDoctor?.daysAvailable?.join(', ') || 'MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY'}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                       />
//                     </div>
//                   </div>
//                 </section>

//                 {/* Additional Information Section */}
//                 <section className="border-t border-slate-200 pt-8">
//                   <div className="mb-6 flex items-start gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100">
//                       <DollarSign className="h-5 w-5 text-rose-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-slate-800">Additional Information</h3>
//                       <p className="text-sm text-slate-500">Consultation fee, status, and bio.</p>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Consultation Fee ($) <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <input
//                         name="consultationFee"
//                         type="number"
//                         defaultValue={editingDoctor?.consultationFee || 200}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                         min="0"
//                       />
//                     </div>
//                     <div className="w-full">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">
//                         Status <span className="ml-1 text-red-500">*</span>
//                       </label>
//                       <select
//                         name="status"
//                         defaultValue={editingDoctor?.status || 'ACTIVE'}
//                         className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         required
//                       >
//                         <option value="ACTIVE">Active</option>
//                         <option value="INACTIVE">Inactive</option>
//                         <option value="ON_LEAVE">On Leave</option>
//                         <option value="BUSY">Busy</option>
//                       </select>
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="mb-2 block text-sm font-medium text-slate-700">Bio</label>
//                       <textarea
//                         name="bio"
//                         rows={4}
//                         defaultValue={editingDoctor?.bio || ''}
//                         className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//                         placeholder="Brief biography of the doctor..."
//                       />
//                     </div>
//                   </div>
//                 </section>

//                 {/* Form Footer */}
//                 <div className="border-t border-slate-200 pt-6">
//                   <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setShowForm(false);
//                         setEditingDoctor(null);
//                       }}
//                       className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition hover:bg-sky-600"
//                     >
//                       {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==========================================================
//           DOCTOR PROFILE MODAL
//           ========================================================== */}
//       {showProfile && selectedDoctor && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
//             <div className="rounded-2xl bg-white p-6 shadow-xl border border-slate-200 relative">
//               {/* Close Button */}
//               <button
//                 onClick={handleCloseProfile}
//                 className="absolute right-4 top-4 rounded-lg p-2 transition-all hover:bg-slate-100 hover:scale-110"
//               >
//                 <X size={20} className="text-slate-500" />
//               </button>

//               <div className="space-y-6">
//                 {/* Profile Header */}
//                 <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
//                   <div className="flex items-start gap-4">
//                     <DoctorAvatar
//                       firstName={selectedDoctor.firstName}
//                       lastName={selectedDoctor.lastName}
//                       size="lg"
//                       status={selectedDoctor.status}
//                     />
//                     <div>
//                       <h2 className="text-2xl font-bold text-slate-800">
//                         Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
//                       </h2>
//                       <p className="text-lg text-slate-600">
//                         {specialtiesMap[selectedDoctor.specialty]}
//                       </p>
//                       <div className="mt-2 flex flex-wrap items-center gap-3">
//                         <DoctorStatusBadge status={selectedDoctor.status} />
//                         <span className="flex items-center gap-1 text-sm text-slate-600">
//                           <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                           {selectedDoctor.rating} ★
//                         </span>
//                         <span className="text-sm text-slate-500">
//                           {selectedDoctor.totalPatients.toLocaleString()} patients
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     <button
//                       onClick={() => {
//                         handleCloseProfile();
//                         handleEdit(selectedDoctor);
//                       }}
//                       className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50"
//                     >
//                       <Pencil size={18} />
//                       Edit
//                     </button>
//                     <button className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-sky-600 hover:shadow-lg">
//                       <Calendar size={18} />
//                       Schedule
//                     </button>
//                   </div>
//                 </div>

//                 {/* Contact & Professional Info Grid */}
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                   {/* Contact Information */}
//                   <div className="space-y-4">
//                     <h3 className="font-semibold text-slate-800 flex items-center gap-2">
//                       <Phone size={18} className="text-slate-400" />
//                       Contact Information
//                     </h3>
//                     <div className="space-y-3 text-sm">
//                       <div className="flex items-center gap-3 text-slate-600">
//                         <Phone size={16} className="text-slate-400" />
//                         <span>{selectedDoctor.phoneNumber}</span>
//                       </div>
//                       <div className="flex items-center gap-3 text-slate-600">
//                         <Mail size={16} className="text-slate-400" />
//                         <span>{selectedDoctor.email}</span>
//                       </div>
//                       <div className="flex items-start gap-3 text-slate-600">
//                         <MapPin size={16} className="mt-0.5 text-slate-400" />
//                         <span>{selectedDoctor.address}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Professional Information */}
//                   <div className="space-y-4">
//                     <h3 className="font-semibold text-slate-800 flex items-center gap-2">
//                       <Award size={18} className="text-slate-400" />
//                       Professional Info
//                     </h3>
//                     <div className="space-y-3 text-sm">
//                       <div className="flex items-center gap-3 text-slate-600">
//                         <span className="text-slate-400 w-24">Experience:</span>
//                         <span>{selectedDoctor.experience} years</span>
//                       </div>
//                       <div className="flex items-center gap-3 text-slate-600">
//                         <span className="text-slate-400 w-24">License:</span>
//                         <span className="font-mono">{selectedDoctor.licenseNumber}</span>
//                       </div>
//                       <div className="flex items-center gap-3 text-slate-600">
//                         <span className="text-slate-400 w-24">Fee:</span>
//                         <span className="font-bold text-slate-800">${selectedDoctor.consultationFee}</span>
//                       </div>
//                       <div className="flex items-center gap-3 text-slate-600">
//                         <span className="text-slate-400 w-24">Qualified:</span>
//                         <span>{selectedDoctor.qualifications.join(', ')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Sub-Specialties */}
//                 {selectedDoctor.subSpecialties.length > 0 && (
//                   <div>
//                     <h3 className="mb-2 font-semibold text-slate-800">Sub-Specialties</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedDoctor.subSpecialties.map((sub) => (
//                         <span
//                           key={sub}
//                           className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 border border-indigo-100"
//                         >
//                           {sub}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Working Hours */}
//                 <div>
//                   <h3 className="mb-2 font-semibold text-slate-800 flex items-center gap-2">
//                     <Clock size={18} className="text-slate-400" />
//                     Working Hours
//                   </h3>
//                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                     <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
//                       <Clock size={18} className="text-slate-400" />
//                       <div>
//                         <p className="text-xs text-slate-500">Schedule</p>
//                         <p className="text-sm font-medium text-slate-700">
//                           {selectedDoctor.workingHours.start} - {selectedDoctor.workingHours.end}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
//                       <CalendarDays size={18} className="text-slate-400" />
//                       <div>
//                         <p className="text-xs text-slate-500">Days Available</p>
//                         <p className="text-sm font-medium text-slate-700">
//                           {selectedDoctor.daysAvailable.map((d) => d.slice(0, 3)).join(' • ')}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bio */}
//                 <div>
//                   <h3 className="mb-2 font-semibold text-slate-800">About</h3>
//                   <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
//                     {selectedDoctor.bio}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorPage;

import { useDoctors } from "../hooks/useDoctor";
import DoctorStats from "../components/doctors/DoctorStats";
import DoctorTable from "../components/doctors/DoctorTable";
import DoctorToolbar from "../components/doctors/DoctorToolbar";
import DoctorFormModal from "../components/modals/DoctorFormModal";
import DoctorProfileModal from "../components/modals/DoctorProfileModal";

export default function DoctorPage() {
  const {
    stats,
    openProfile,
    deleteDoctor,
    openEditForm,
    filteredDoctors,
    filters,
    showForm,
    toggleFilter,
    updateFilter,
    clearFilters,
    openAddForm,
    activeFilterCount,
    editingDoctor,
    addDoctor,
    updateDoctor,
    closeForm,
    selectedDoctor,
    closeProfile


  } = useDoctors();

      // ==========================================================
      // HANDLERS
      // ==========================================================

      const handleSubmit = (data:any) =>{
        if(editingDoctor){
          updateDoctor(data);
        }else{
          addDoctor(data);
        }
        closeForm();
      }


      


  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Doctors
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage all the doctors in the hospital
          </p>
        </div>
      </div>

      <DoctorStats stats={stats} />

      <DoctorToolbar
        search={filters.search}
        speciality={filters.speciality}
        status={filters.status}
        showFilter={showForm}
        activeFilterCount={activeFilterCount}
        onSearchChange={(value) =>
          updateFilter("search", value)
        }
        onSpecialtyChange={(value) =>
          updateFilter("speciality", value)
        }
        onStatusChange={(value) =>
          updateFilter("status", value)
        }
        onToggleFilters={toggleFilter}
        onClearFilters={clearFilters}
        onAddDoctor={openAddForm}
      />

      <DoctorTable
        doctors={filteredDoctors}
        onView={openProfile}
        onEdit={openEditForm}
        onDelete={deleteDoctor}
      />


      {/* Add/Edit Doctor */}
      <DoctorFormModal
        isOpen={showForm}
        editingDoctor={editingDoctor}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />

      <DoctorProfileModal
        doctor={selectedDoctor}
        onClose={closeProfile}
        onEdit={openEditForm}
      />

    </div>

    
  );
}