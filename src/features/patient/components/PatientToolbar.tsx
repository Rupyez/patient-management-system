import SearchBar from "../../../components/table/SearchBar";
import AppButton from "../../../components/ui/AppButton";

interface PatientToolbarProps {
  search: string;
  gender: string;
  status: string;

  onSearchChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onStatusChange: (value: string) => void;

  onAddPatient: () => void;
}

export default function PatientToolbar({
  search,
  gender,
  status,
  onSearchChange,
  onGenderChange,
  onStatusChange,
  onAddPatient,
}: PatientToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        <SearchBar
          value={search}
          onChange={onSearchChange}
        />

        <select
          value={gender}
          onChange={(e) => onGenderChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-sky-400"
        >
          <option value="ALL">All Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-sky-400"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      <AppButton onClick={onAddPatient}>
        + Add Patient
      </AppButton>
    </div>
  );
}