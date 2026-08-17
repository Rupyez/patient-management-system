import { Stethoscope, Star } from "lucide-react";
import type { Doctor } from "../../types/doctor.types"
import DoctorAvatar from "../common/DoctorAvatar";
import { getSpecialityDisplay } from "../../utils/doctor.utils";
import DoctorActions from "./DoctorActions";
import DoctorStatusBadge from "../common/DoctorStatusBadge";



interface DoctorTableProps{
    doctors: Doctor[];
    onView: (doctor:Doctor) => void;
    onEdit: (doctor:Doctor) => void;
    onDelete: (doctor:Doctor) => void;

}

export default function DoctorTable({doctors, onView, onEdit, onDelete}:DoctorTableProps){
    return(
       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-160">
          {/* Table Header */}
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Doctor
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Specialty
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Experience
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {doctors.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <Stethoscope size={40} className="text-slate-300" />
                    <p>No doctors found</p>
                    <p className="text-sm text-slate-400">Add your first doctor</p>
                  </div>
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="transition hover:bg-slate-50 cursor-pointer"
                  onClick={() => onView(doctor)}
                >
                  {/* Doctor Column - Avatar + Name + ID */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <DoctorAvatar
                        firstName={doctor.firstName}
                        lastName={doctor.lastName}
                        status={doctor.status}
                      />
                      <div>
                        <p className="font-medium text-slate-800">
                          {doctor.firstName} {doctor.lastName}
                        </p>
                        <p className="text-sm text-slate-500">{doctor.doctorId}</p>
                      </div>
                    </div>
                  </td>

                  {/* Specialty Column */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {getSpecialityDisplay(doctor.specialty)}
                    </span>
                  </td>

                  {/* Experience Column */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{doctor.experience} years</span>
                  </td>

                  {/* Phone Column */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{doctor.phoneNumber}</span>
                  </td>

                  {/* Rating Column */}
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-sm font-medium text-slate-700">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {doctor.rating}
                    </span>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4">
                    <DoctorStatusBadge status={doctor.status}/>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    <DoctorActions
                      onView={() => onView(doctor)}
                      onEdit={() => onEdit(doctor)}
                      onDelete={() => onDelete(doctor)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    )
}