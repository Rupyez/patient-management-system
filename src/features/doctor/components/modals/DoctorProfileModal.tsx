import { Award, Calendar, CalendarDays, Clock, Mail, MapPin, Pencil, Phone, Star, X } from "lucide-react";
import type { Doctor } from "../../types/doctor.types";
import DoctorAvatar from "../common/DoctorAvatar";
import { getSpecialityDisplay } from "../../utils/doctor.utils";
import DoctorStatusBadge from "../common/DoctorStatusBadge";




interface DoctorProfileModalProps{
    doctor:Doctor | null;
    onClose: () => void;
    onEdit: (doctor:Doctor) => void;
}

export default function DoctorProfileModal({doctor, onClose, onEdit}:DoctorProfileModalProps){

    if(!doctor) return null;

    return(
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <div className="rounded-2xl bg-white p-6 shadow-xl border border-slate-200 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 transition-all hover:bg-slate-100 hover:scale-110"
          >
            <X size={20} className="text-slate-500" />
          </button>

          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <DoctorAvatar
                  firstName={doctor.firstName}
                  lastName={doctor.lastName}
                  size="lg"
                  status={doctor.status}
                />
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h2>
                  <p className="text-lg text-slate-600">
                    {getSpecialityDisplay(doctor.specialty)}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <DoctorStatusBadge status={doctor.status} />
                    <span className="flex items-center gap-1 text-sm text-slate-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {doctor.rating} ★
                    </span>
                    <span className="text-sm text-slate-500">
                      {doctor.totalPatients.toLocaleString()} patients
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onEdit(doctor);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50"
                >
                  <Pencil size={18} />
                  Edit
                </button>
                <button className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-sky-600 hover:shadow-lg">
                  <Calendar size={18} />
                  Schedule
                </button>
              </div>
            </div>

            {/* Contact & Professional Info Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Phone size={18} className="text-slate-400" />
                  Contact Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone size={16} className="text-slate-400" />
                    <span>{doctor.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail size={16} className="text-slate-400" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-600">
                    <MapPin size={16} className="mt-0.5 text-slate-400" />
                    <span>{doctor.address}</span>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Award size={18} className="text-slate-400" />
                  Professional Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="text-slate-400 w-24">Experience:</span>
                    <span>{doctor.experience} years</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="text-slate-400 w-24">License:</span>
                    <span className="font-mono">{doctor.licenseNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="text-slate-400 w-24">Fee:</span>
                    <span className="font-bold text-slate-800">${doctor.consultationFee}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="text-slate-400 w-24">Qualified:</span>
                    <span>{doctor.qualifications.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Specialties */}
            {doctor.subSpecialties.length > 0 && (
              <div>
                <h3 className="mb-2 font-semibold text-slate-800">Sub-Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.subSpecialties.map((sub) => (
                    <span
                      key={sub}
                      className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 border border-indigo-100"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Working Hours */}
            <div>
              <h3 className="mb-2 font-semibold text-slate-800 flex items-center gap-2">
                <Clock size={18} className="text-slate-400" />
                Working Hours
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <Clock size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Schedule</p>
                    <p className="text-sm font-medium text-slate-700">
                      {doctor.workingHours.start} - {doctor.workingHours.end}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <CalendarDays size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Days Available</p>
                    <p className="text-sm font-medium text-slate-700">
                      {doctor.daysAvailable.map((d) => d.slice(0, 3)).join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="mb-2 font-semibold text-slate-800">About</h3>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {doctor.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )

}