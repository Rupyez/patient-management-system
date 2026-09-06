import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientHeader from '../components/layout/PatientHeader';

const SPECIALTIES = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Surgery',
  'Emergency Medicine',
  'Internal Medicine',
  'Obstetrics and Gynecology',
  'Ophthalmology',
  'Otolaryngology',
  'Psychiatry',
  'Radiology',
  'Urology',
];

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  // Filter specialties based on search query
  const filteredSpecialties = SPECIALTIES.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // On search submit or specialty click, navigate to doctor list (we'll build later)
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // For now, just navigate to a results page (placeholder)
  //   // We'll build the results page next.
  //   navigate('/portal/doctors', { state: { query: searchQuery, specialty: selectedSpecialty } });
  // };


  //updated handle search
  const handleSearch = (e:React.FormEvent) =>{
    e.preventDefault();
    if(searchQuery.trim()){
      navigate(`/portal/doctors?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSpecialtyClick = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSearchQuery(specialty);
    // Optionally auto‑search
    navigate(`/portal/doctors?specialty=${encodeURIComponent(specialty)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <PatientHeader />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-800 dark:text-gray-100">
            Find a <span className="font-medium text-blue-600 dark:text-blue-400">Doctor</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Search by symptom, specialty, or doctor name
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., headache, cardiologist, Dr. Smith"
              className="w-full pl-10 pr-4 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:focus:ring-blue-500 transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Search
          </button>
        </form>

        {/* Quick Specialty Chips */}
        <div className="mt-8">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
            Popular Specialties
          </p>
          <div className="flex flex-wrap gap-2">
            {filteredSpecialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => handleSpecialtyClick(specialty)}
                className={`
                  px-4 py-1.5 text-sm rounded-full border transition-all duration-200
                  ${
                    selectedSpecialty === specialty
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }
                `}
              >
                {specialty}
              </button>
            ))}
          </div>
          {filteredSpecialties.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">No specialties found</p>
          )}
        </div>

        {/* Quick Tip */}
        <div className="mt-8 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100/30 dark:border-blue-800/20 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium text-blue-600 dark:text-blue-400">💡 Tip:</span> Enter your symptoms (e.g., "severe headache") and we'll suggest the right specialist.
        </div>
      </main>
    </div>
  );
};

export default SearchPage;