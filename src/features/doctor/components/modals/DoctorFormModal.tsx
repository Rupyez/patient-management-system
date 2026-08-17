import { Stethoscope, X } from "lucide-react";
import type { Doctor, DoctorFormData } from "../../types/doctor.types";
import DoctorForm from "../forms/DoctorForm";

interface DoctorFormModalProps {
  isOpen: boolean;
  editingDoctor: Doctor | null;
  onClose: () => void;
  onSubmit: (data: DoctorFormData) => void;
}

export default function DoctorFormModal({
  isOpen,
  editingDoctor,
  onClose,
  onSubmit,
}: DoctorFormModalProps) {
  if (!isOpen) return null;

  return (
     <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-4xl my-8 animate-in fade-in zoom-in duration-200">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="border-b border-slate-200 bg-linear-to-r from-slate-50 to-indigo-50 p-6 sm:p-8"> 
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 shadow-sm">
                  <Stethoscope className="h-6 w-6 text-indigo-600"/>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {editingDoctor ? "Edit Doctor" : "Add Doctor"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {editingDoctor
                      ? "Update doctor information"
                      : "Add a new doctor"}
                  </p>
                </div>
              </div>

              <button type="button" onClick={onClose} className="rounded-lg p-2 transition hover:bg-slate-100">
                <X size={20} className="text-slate-500"/>
              </button>
            </div>
          </div>

          {/* Form Body */}
          <DoctorForm
            editingDoctor={editingDoctor}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}