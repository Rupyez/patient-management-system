/**
 * ============================================================
 * PROFILE SETTINGS
 * ============================================================
 * Manage user profile information
 */

import { useState } from "react";
import {
  Camera,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";
import type { UserProfile } from "../types/settings";

interface ProfileSettingsProps {
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
}

export const ProfileSettings = ({
  profile,
  onUpdate,
}: ProfileSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  // View Mode
  if (!isEditing) {
    return (
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-sky-600 text-2xl font-bold text-white shadow-lg">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </div>
              <button className="absolute -bottom-1 -right-1 rounded-full bg-white p-1.5 shadow-md transition hover:bg-slate-50">
                <Camera size={16} className="text-slate-600" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-sm text-slate-500">{profile.email}</p>
              <p className="text-sm text-slate-400">
                Joined {new Date(profile.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <InfoItem icon={Mail} label="Email" value={profile.email} />
            <InfoItem icon={Phone} label="Phone" value={profile.phone} />
            <InfoItem icon={MapPin} label="Address" value={profile.address} />
          </div>
          <div className="space-y-4">
            <InfoItem
              icon={Calendar}
              label="Date of Birth"
              value={new Date(profile.dateOfBirth).toLocaleDateString()}
            />
            <InfoItem icon={Users} label="Gender" value={profile.gender} />
            <InfoItem
              icon={Calendar}
              label="Last Active"
              value={new Date(profile.lastActive).toLocaleString()}
            />
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-600">{profile.bio}</p>
          </div>
        )}
      </div>
    );
  }

  // Edit Mode
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          label="First Name"
          value={formData.firstName}
          onChange={(value) => setFormData({ ...formData, firstName: value })}
          required
        />
        <FormInput
          label="Last Name"
          value={formData.lastName}
          onChange={(value) => setFormData({ ...formData, lastName: value })}
          required
        />
        <FormInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          required
        />
        <FormInput
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(value) => setFormData({ ...formData, phone: value })}
          required
        />
        <FormInput
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(value) => setFormData({ ...formData, dateOfBirth: value })}
        />
        <FormSelect
          label="Gender"
          value={formData.gender}
          onChange={(value) =>
            setFormData({
              ...formData,
              gender: value as "MALE" | "FEMALE" | "OTHER",
            })
          }
          options={[
            { value: "MALE", label: "Male" },
            { value: "FEMALE", label: "Female" },
            { value: "OTHER", label: "Other" },
          ]}
        />
        <div className="md:col-span-2">
          <FormInput
            label="Address"
            value={formData.address}
            onChange={(value) => setFormData({ ...formData, address: value })}
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Bio
          </label>
          <textarea
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>
      <FormActions
        onCancel={() => {
          setFormData(profile);
          setIsEditing(false);
        }}
      />
    </form>
  );
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 text-sm">
    <Icon size={16} className="text-slate-400" />
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-slate-700">{value}</p>
    </div>
  </div>
);

const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      required={required}
    />
  </div>
);

const FormSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const FormActions = ({ onCancel }: { onCancel: () => void }) => (
  <div className="flex gap-3">
    <button
      type="submit"
      className="rounded-xl bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition hover:bg-sky-600"
    >
      Save Changes
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
    >
      Cancel
    </button>
  </div>
);

export default ProfileSettings;
