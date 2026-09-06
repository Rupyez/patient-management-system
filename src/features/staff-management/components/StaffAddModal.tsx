import React, { useState } from "react";
import type { Staff } from "../types";
import { UserPlus, X } from "lucide-react";

interface StaffAddModalProps {
  onClose: () => void;
  onSave: (newStaff: Staff) => void;
}

export default function StaffAddModal({onClose, onSave}:StaffAddModalProps){
    const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          role: "NURSE",
          department: "EMERGENCY",
          position: "",
          status: "ACTIVE",
          address: "",  
    })


function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

// Creates the complete Staff object and sends it to the parent.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const now = new Date().toISOString();

    const newStaff: Staff = {
      id: crypto.randomUUID(),

      employeeId: `EMP-${Date.now()}`,

      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,

      role: formData.role as Staff["role"],

      department: formData.department as Staff["department"],

      position: formData.position,

      joinDate: now.split("T")[0],

      status: formData.status as Staff["status"],

      address: formData.address,

      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },

      qualifications: [],
      certifications: [],

      experience: 0,
      salary: 0,

      shiftPreference: "MORNING",

      createdAt: now,
      updatedAt: now,
    };

    onSave(newStaff);
  }


  return(

    // full-screen modal background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

        {/* main modal */}
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-sky-100 p-2 text-sky-600">
                        <UserPlus size={20}/>
                    </div>

                    <div className="text-xl font-semibold text-slate-900">
                        <h2>Add Staff Member</h2>
                        <p className="text-sm text-slate-500">Create a new Staff Member</p>
                    </div>
                </div>

                <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={20}/></button>
            </div>


            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="max-h-[70vh] overflow-y-auto p-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* FirstName */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">First Name</label>
                            <input
                             required
                             type="text"
                             name="firstName"
                             value={formData.firstName}
                             onChange={handleChange}
                             placeholder="Enter first name"
                             className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                            />
                        </div>

                        {/* LastName */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Last Name</label>
                            <input
                            required
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                            <input   
                              required
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="staff@hospital.com"
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
            
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
                            <input
                              required
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Enter phone number"
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500">
                                <option value="ADMIN">Admin</option>
                                <option value="DOCTOR">Doctor</option>
                                <option value="NURSE">Nurse</option>
                                <option value="RECEPTIONIST">Receptionist</option>
                                <option value="LAB_TECHNICIAN">
                                  Lab Technician
                                </option>
                                <option value="PHARMACIST">Pharmacist</option>
                                <option value="MANAGER">Manager</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Department</label>
                            <select name="department"
                              value={formData.department}
                              onChange={handleChange}
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500">
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

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Position</label>
                            <input
                                required
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                placeholder="Example: Senior Nurse"
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
                            <select name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500">
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="ON_LEAVE">On Leave</option>
                                <option value="SUSPENDED">Suspended</option>
                            </select>
                        </div>


                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Address
                            </label>

                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              placeholder="Enter address"
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                            />
                        </div>
                    </div>
                </div>


                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
                    <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
                    <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Add Staff</button>
                </div>
            </form>
        </div>
    </div>
  )
}