import type React from "react";
import type {
  Doctor,
  DoctorFormData,
  DoctorSpeciality,
  DoctorStatus,
} from "../../types/doctor.types";
import { Award, Clock, DollarSign, Phone, Users } from "lucide-react";
import { generateDoctorId } from "../../utils/doctor.utils";
import { specialityOptions } from "../../data/doctor.data";

interface DoctorFormProps {
  editingDoctor: Doctor | null;
  onSubmit: (data: DoctorFormData) => void;
  onCancel: () => void;
}

export default function DoctorForm({
  editingDoctor,
  onSubmit,
  onCancel,
}: DoctorFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const doctorData: DoctorFormData = {
      doctorId: formData.get("doctorId") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      gender: formData.get("gender") as "MALE" | "FEMALE" | "OTHER",

      specialty: formData.get("specialty") as DoctorSpeciality,

      subSpecialties: ((formData.get("subSpecialties") as string) || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),

      qualifications: ((formData.get("qualifications") as string) || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),

      experience: Number(formData.get("experience")),
      licenseNumber: formData.get("licenseNumber") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      status: formData.get("status") as DoctorStatus,

      workingHours: {
        start: formData.get("workingHoursStart") as string,
        end: formData.get("workingHoursEnd") as string,
      },

      daysAvailable: ((formData.get("daysAvailable") as string) || "")
        .split(",")
        .map((s) => s.trim().toUpperCase())
        .filter(Boolean),

      consultationFee: Number(formData.get("consultationFee")),
      bio: formData.get("bio") as string,
      updatedAt: new Date().toISOString(),
    };

    onSubmit(doctorData);
  };

  return (
   <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-8">
      {/* Personal Information Section */}
      <FormSection
        icon={Users}
        iconColor="bg-indigo-100 text-indigo-600"
        title="Personal Information"
        description="Basic doctor identity and professional details."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <FormInput
            name="doctorId"
            label="Doctor ID"
            defaultValue={editingDoctor?.doctorId || generateDoctorId()}
            required
          />
          <FormInput
            name="firstName"
            label="First Name"
            defaultValue={editingDoctor?.firstName || ''}
            required
          />
          <FormInput
            name="lastName"
            label="Last Name"
            defaultValue={editingDoctor?.lastName || ''}
            required
          />
          <FormSelect
            name="gender"
            label="Gender"
            defaultValue={editingDoctor?.gender || 'MALE'}
            options={[
              { value: 'MALE', label: 'Male' },
              { value: 'FEMALE', label: 'Female' },
              { value: 'OTHER', label: 'Other' },
            ]}
            required
          />
          <FormSelect
            name="specialty"
            label="Specialty"
            defaultValue={editingDoctor?.specialty || 'INTERNAL_MEDICINE'}
            options={specialityOptions}
            required
          />
          <FormInput
            name="experience"
            label="Experience (years)"
            type="number"
            defaultValue={editingDoctor?.experience || 0}
            required
            min="0"
          />
        </div>
      </FormSection>

      {/* Professional Information Section */}
      <FormSection
        icon={Award}
        iconColor="bg-amber-100 text-amber-600"
        title="Professional Information"
        description="Licensing, qualifications and sub-specialties."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            name="licenseNumber"
            label="License Number"
            defaultValue={editingDoctor?.licenseNumber || ''}
            required
          />
          <FormInput
            name="qualifications"
            label="Qualifications (comma separated)"
            defaultValue={editingDoctor?.qualifications?.join(', ') || ''}
          />
          <div className="md:col-span-2">
            <FormInput
              name="subSpecialties"
              label="Sub-Specialties (comma separated)"
              defaultValue={editingDoctor?.subSpecialties?.join(', ') || ''}
            />
          </div>
        </div>
      </FormSection>

      {/* Contact Information Section */}
      <FormSection
        icon={Phone}
        iconColor="bg-emerald-100 text-emerald-600"
        title="Contact Information"
        description="Contact details for doctor communication."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            defaultValue={editingDoctor?.phoneNumber || ''}
            required
          />
          <FormInput
            name="email"
            label="Email Address"
            type="email"
            defaultValue={editingDoctor?.email || ''}
            required
          />
          <div className="md:col-span-2">
            <FormInput
              name="address"
              label="Address"
              defaultValue={editingDoctor?.address || ''}
            />
          </div>
        </div>
      </FormSection>

      {/* Working Hours Section */}
      <FormSection
        icon={Clock}
        iconColor="bg-purple-100 text-purple-600"
        title="Working Hours"
        description="Schedule and availability settings."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            name="workingHoursStart"
            label="Start Time"
            type="time"
            defaultValue={editingDoctor?.workingHours?.start || '09:00'}
          />
          <FormInput
            name="workingHoursEnd"
            label="End Time"
            type="time"
            defaultValue={editingDoctor?.workingHours?.end || '17:00'}
          />
          <div className="md:col-span-2">
            <FormInput
              name="daysAvailable"
              label="Days Available (comma separated)"
              defaultValue={editingDoctor?.daysAvailable?.join(', ') || 'MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY'}
            />
          </div>
        </div>
      </FormSection>

      {/* Additional Information Section */}
      <FormSection
        icon={DollarSign}
        iconColor="bg-rose-100 text-rose-600"
        title="Additional Information"
        description="Consultation fee, status, and bio."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            name="consultationFee"
            label="Consultation Fee ($)"
            type="number"
            defaultValue={editingDoctor?.consultationFee || 200}
            required
            min="0"
          />
          <FormSelect
            name="status"
            label="Status"
            defaultValue={editingDoctor?.status || 'ACTIVE'}
            options={[
              { value: 'ACTIVE', label: 'Active' },
              { value: 'INACTIVE', label: 'Inactive' },
              { value: 'ON_LEAVE', label: 'On Leave' },
              { value: 'BUSY', label: 'Busy' },
            ]}
            required
          />
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Bio</label>
            <textarea
              name="bio"
              rows={4}
              defaultValue={editingDoctor?.bio || ''}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Brief biography of the doctor..."
            />
          </div>
        </div>
      </FormSection>

      {/* Form Footer */}
      <div className="border-t border-slate-200 pt-6">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition hover:bg-sky-600"
          >
            {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
          </button>
        </div>
      </div>
    </form>
  );
}

interface FormSectionProps {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

function FormSection({
  icon: Icon,
  iconColor,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="border-t border-slate-200 pt-8 first:border-t-0 first:pt-0">
      <div className="mb-6 flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconColor}`}>
            <Icon className="h-5 w-5"/>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  min?: string | number;
  className?: string;
}

function FormInput({
  name,
  label,
  type = "text",
  defaultValue,
  required = false,
  min,
  className = "",
}: FormInputProps) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}{required && <span className="ml-1 text-red-500">*</span>}</label>

      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        min={min}
        className="h-12 w-full bg-white rounded-xl border border-slate-300 px-4 text-sm text-slate-800 outline-none transtion focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}

interface FormSelectionProps {
  name: string;
  label: string;
  defaultValue?: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}

function FormSelect({
  name,
  label,
  defaultValue,
  options,
  required = false,
}: FormSelectionProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}{required && <span className="ml-1 text-red-500">*</span>}</label>

      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition foucs:border-indigo-500 focus:ring-2 focus:ring-inigo-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}


