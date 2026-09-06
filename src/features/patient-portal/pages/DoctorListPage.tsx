import { useLocation, useNavigate } from "react-router-dom";
import PatientHeader from "../components/layout/PatientHeader";

// Mock doctor data
const MOCK_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Neurology',
    department: 'Neurology',
    experience: 12,
    rating: 4.9,
    reviewCount: 87,
    consultationFee: 180,
    profileImage: '',
    bio: 'Specializes in treating migraines, epilepsy, and stroke rehabilitation.',
    education: ['MD, Stanford University', 'Residency in Neurology'],
    availability: ['Mon 9am-5pm', 'Wed 9am-5pm', 'Fri 9am-1pm'],
  },
  {
    id: '2',
    name: 'Dr. Michael Torres',
    specialty: 'Neurology',
    department: 'Neurology',
    experience: 8,
    rating: 4.7,
    reviewCount: 56,
    consultationFee: 150,
    profileImage: '',
    bio: 'Focused on headache disorders, nerve pain, and movement disorders.',
    education: ['MD, Johns Hopkins', 'Fellowship in Headache Medicine'],
    availability: ['Tue 10am-6pm', 'Thu 10am-6pm', 'Sat 9am-1pm'],
  },
  {
    id: '3',
    name: 'Dr. Emily Park',
    specialty: 'Cardiology',
    department: 'Cardiology',
    experience: 15,
    rating: 4.8,
    reviewCount: 112,
    consultationFee: 200,
    profileImage: '',
    bio: 'Expert in heart failure, arrhythmias, and preventive cardiology.',
    education: ['MD, Harvard Medical School', 'Fellowship in Cardiology'],
    availability: ['Mon 8am-4pm', 'Wed 8am-4pm', 'Fri 8am-12pm'],
  },
  {
    id: '4',
    name: 'Dr. James Okafor',
    specialty: 'Orthopedics',
    department: 'Orthopedics',
    experience: 10,
    rating: 4.6,
    reviewCount: 43,
    consultationFee: 170,
    profileImage: '',
    bio: 'Specializes in sports injuries, joint replacements, and spine surgery.',
    education: ['MD, University of Chicago', 'Residency in Orthopedics'],
    availability: ['Mon 9am-5pm', 'Tue 9am-5pm', 'Thu 9am-5pm'],
  },
];



export default function DoctorListPage(){
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const speciality = params.get('specialty') || '';

    const filtered = MOCK_DOCTORS.filter((doc) =>{
        const matchName = doc.name.toLowerCase().includes(query.toLowerCase());
        const matchSpecialty = doc.specialty.toLowerCase().includes(query.toLowerCase());
        const matchSpecialtyFilter = speciality ? doc.specialty === speciality : true;
        return (matchName || matchSpecialty && matchSpecialtyFilter);
    })

    const handleBook = (doctorId: string) =>{
        navigate(`/portal/books/${doctorId}`)
    }

    const handleProfile = (doctorId:string) =>{
        navigate(`/portal/doctor/${doctorId}`);
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <PatientHeader/>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-light text-gray-800 dark:text-gray-100">
                            <span className="font-medium">Search Results</span>
                            {query && (
                                <span className="ml-2 text-blue-600 dark:text-blue-400">{query}</span>
                            )}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Found {filtered.length} doctor{filtered.length !== 1 ? 's': ''}</p>
                    </div>
                    <button onClick={() => navigate('/portal/search')} className="text-sm text-blue-600 dark:text-blue-400 hover:underline"> ← New Search</button>
                </div>


                {/* Doctor Cards */}
                {filtered.length > 0 ? (
                    <div className="space-y-4">
                        {filtered.map((doctor) => (
                            <div key={doctor.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/20 dark:border-gray-700/30 hover:shadow-lg transition-all duration-300 hover:border-blue-200/50 dark:hover:border-blue-500/30">
                                <div className="flex flex-col sm:flex-row gap-4">

                                    <div className="flex-shrink-0">
                                        {doctor.profileImage ? (
                                            <img src={doctor.profileImage} alt={doctor.name} className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xl font-medium shadow-sm"/>
                                        ):(
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xl font-medium shadow-sm">{doctor.name.charAt(0)}</div>
                                        )}
                                    </div>


                                    {/* Details */}
                                    <div className="flex-1 minw-0">
                                        <div className="flex flex-wrap items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 darl:text-gray-100 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => handleProfile(doctor.id)}>{doctor.name}</h3>
                                                <p className="text-sm text-gray-500 dark:Text-gray-400">{doctor.specialty} . {doctor.experience} years experience</p>
                                            </div>

                                            <div className="flex items-center gap-2 mt-1 sm:mt-0">
                                                <span className="text-yellow-500">★</span>
                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{doctor.rating}</span>
                                                <span className="text-xs text-gray-400 dark:text-gray-50">({doctor.reviewCount} reviews)</span>
                                            </div>
                                        </div>

                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{doctor.bio}</p>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {doctor.availability.slice(0,3).map((slot, idx) =>(
                                                <span key={idx} className="text-xs bg-gray-100/70 dark:bg-gray-700/70 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-400">{slot}</span>
                                            ))}
                                            {doctor.availability.length > 3 && (
                                                <span className="text-xs text-gray-400 dark:text-gray-500">+more</span>
                                            )}
                                        </div>


                                        <div className="mt-3 flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">${doctor.consultationFee}</span>
                                            <button onClick={() => handleBook(doctor.id)} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">Book Appointment</button>
                                            <button onClick={() => handleProfile(doctor.id)} className="text-sm text-blue-600 dark:Text-blue-400 hover:underline">View Profile</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ):(
                    <div className="text center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No Doctors found matching your search.</p>
                        <button onClick={() => navigate('/portal/search')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Search Again</button>
                    </div>
                )}

            </main>
        </div>
    )
}