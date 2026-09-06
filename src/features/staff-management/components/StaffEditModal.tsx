import { useState } from "react";
import { X } from "lucide-react";
import type { Staff } from "../types";

interface StaffEditModalProps {
  staff: Staff;
  onClose: () => void;
  onSave: (updatedStaff: Staff) => void;
}

export default function StaffEditModal({
  staff,
  onClose,
  onSave,
}: StaffEditModalProps) {
  // Keeps the editable copy of the selected staff member
  const [formData, setFormData] = useState<Staff>(staff);

  // Updates input/select values inside formData
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  // Sends the updated staff object back to StaffManagement
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave({
      ...formData,
      updatedAt: new Date().toISOString(),
    });
  }

  return (
    // Full-screen modal background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      
      {/* Main modal container */}
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">

        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Edit Staff Member
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update staff information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Edit staff form */}
        <form onSubmit={handleSubmit}>

          {/* Scrollable form content */}
          <div className="max-h-[70vh] overflow-y-auto p-6">

            {/* Two-column form layout */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* First Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                />
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="DOCTOR">Doctor</option>
                  <option value="NURSE">Nurse</option>
                  <option value="RECEPTIONIST">Receptionist</option>
                  <option value="LAB_TECHNICIAN">Lab Technician</option>
                  <option value="PHARMACIST">Pharmacist</option>
                  <option value="MANAGER">Manager</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Department
                </label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                >
                  <option value="CARDIOLOGY">Cardiology</option>
                  <option value="NEUROLOGY">Neurology</option>
                  <option value="PEDIATRICS">Pediatrics</option>
                  <option value="ORTHOPEDICS">Orthopedics</option>
                  <option value="DERMATOLOGY">Dermatology</option>
                  <option value="SURGERY">Surgery</option>
                  <option value="EMERGENCY">Emergency</option>
                  <option value="LABORATORY">Laboratory</option>
                  <option value="PHARMACY">Pharmacy</option>
                  <option value="ADMINISTRATION">Administration</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>

              {/* Position */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Position
                </label>

                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="ON_LEAVE">On Leave</option>
                  <option value="SUSPENDED">Suspended</option>
                  <option value="TERMINATED">Terminated</option>
                </select>
              </div>

              {/* Address spans both columns */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                />
              </div>

            </div>
          </div>

          {/* Modal footer */}
          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              Save Changes
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}