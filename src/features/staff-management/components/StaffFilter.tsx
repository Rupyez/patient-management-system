interface StaffFiltersProps {
  selectedRole: string;
  selectedDepartment: string;
  selectedStatus: string;

  onRoleChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;

  activeFilterCount: number;
  onClearFilters: () => void;
}

export default function StaffFilters({
  selectedRole,
  selectedDepartment,
  selectedStatus,
  onRoleChange,
  onDepartmentChange,
  onStatusChange,
  activeFilterCount,
  onClearFilters,
}: StaffFiltersProps) {
  return (
    <div className="mt-4 grid gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:grid-cols-3">

      {/* Role */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Role
        </label>

        <select
          value={selectedRole}
          onChange={(event) => onRoleChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="DOCTOR">Doctor</option>
          <option value="NURSE">Nurse</option>
          <option value="RECEPTIONIST">Receptionist</option>
          <option value="LAB_TECHNICIAN">Lab Technician</option>
          <option value="PHARMACIST">Pharmacist</option>
        </select>
      </div>

      {/* Department */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Department
        </label>

        <select
          value={selectedDepartment}
          onChange={(event) =>
            onDepartmentChange(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="ALL">All Departments</option>
          <option value="ADMINISTRATION">Administration</option>
          <option value="CARDIOLOGY">Cardiology</option>
          <option value="EMERGENCY">Emergency</option>
          <option value="LABORATORY">Laboratory</option>
          <option value="PHARMACY">Pharmacy</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Status
        </label>

        <select
          value={selectedStatus}
          onChange={(event) => onStatusChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="ON_LEAVE">On Leave</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      {/* Clear filters */}
      {activeFilterCount > 0 && (
        <div className="sm:col-span-3">
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}