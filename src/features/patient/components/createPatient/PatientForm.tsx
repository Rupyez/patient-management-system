import { Phone, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";

import AppInput from "../../../../components/ui/AppInput";
import AppButton from "../../../../components/ui/AppButton";
import type { Patient } from "../../types/patient";


interface PatientFormProps{
    onCancel: () => void;
    onSubmitPatient:(patient: Patient) => void;
}

export default function PatientForm({onCancel, onSubmitPatient}:PatientFormProps) {
  const [formData, setFormData] = useState({
    medicalRecordNumber: "",
    firstName: "",
    lastName: "",
    gender: "MALE",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    status: "ACTIVE",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newPatient: Patient = {
    id: crypto.randomUUID(),
    medicalRecordNumber: formData.medicalRecordNumber,
    firstName: formData.firstName,
    lastName: formData.lastName,
    gender: formData.gender as Patient["gender"],
    dateOfBirth: formData.dateOfBirth,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    address: formData.address,
    status: formData.status as Patient["status"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  onSubmitPatient(newPatient);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* ================= Header ================= */}

      <div className="border-b border-slate-200 bg-slate-50/50 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100">
            <UserRound className="h-6 w-6 text-sky-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Register New Patient
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new patient to the hospital management system.
            </p>
          </div>
        </div>
      </div>

      {/* ================= Form Body ================= */}

      <div className="space-y-10 p-6 sm:p-8">

        {/* ================= Personal Information ================= */}

        <section>
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100">
              <UserRound className="h-5 w-5 text-sky-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Personal Information
              </h3>

              <p className="text-sm text-slate-500">
                Basic patient identity information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            <AppInput
              label="Medical Record Number"
              name="medicalRecordNumber"
              placeholder="MRN-100004"
              value={formData.medicalRecordNumber}
              onChange={handleChange}
              required
            />

            <AppInput
              label="First Name"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <AppInput
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            {/* Gender */}

            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Gender
                <span className="ml-1 text-red-500">*</span>
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                required
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <AppInput
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        {/* ================= Contact Information ================= */}

        <section className="border-t border-slate-200 pt-10">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
              <Phone className="h-5 w-5 text-emerald-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Contact Information
              </h3>

              <p className="text-sm text-slate-500">
                Contact details for patient communication.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <AppInput
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <AppInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="john.doe@email.com"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <AppInput
                label="Address"
                name="address"
                placeholder="123 Main Street, Virginia"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* ================= Patient Status ================= */}

        <section className="border-t border-slate-200 pt-10">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Patient Status
              </h3>

              <p className="text-sm text-slate-500">
                Set the patient's current registration status.
              </p>
            </div>
          </div>

          <div className="max-w-sm">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              required
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </section>
      </div>

      {/* ================= Footer ================= */}

      <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-5 sm:px-8">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <AppButton
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </AppButton>

          <AppButton type="submit">
            Register Patient
          </AppButton>
        </div>
      </div>
    </form>
  );
}