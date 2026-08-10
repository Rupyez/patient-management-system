import SearchBar from "../../../components/table/SearchBar";
import AppButton from "../../../components/ui/AppButton";
import { Filter, Plus, Grid3x3, List } from "lucide-react";
import { useState } from "react";
import { specialtyOptions } from '../components/createDoctor/data/doctor'

interface DoctorToolbarProps {
  search: string;
  specialty: string;
  status: string;
  onSearchChange: (value: string) => void;
  onSpecialtyChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAddDoctor: () => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export default function DoctorToolbar({
  search,
  specialty,
  status,
  onSearchChange,
  onSpecialtyChange,
  onStatusChange,
  onAddDoctor,
  viewMode = 'list',
  onViewModeChange,
}: DoctorToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          <SearchBar
            value={search}
            onChange={onSearchChange}
            placeholder="Search doctors by name, specialty, or ID..."
            className="w-full md:w-80"
          />
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:border-slate-300"
          >
            <Filter size={18} />
            Filters
            {(specialty !== 'ALL' || status !== 'ALL') && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-xs text-white">
                {[specialty !== 'ALL', status !== 'ALL'].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {onViewModeChange && (
            <div className="flex rounded-lg border border-slate-200 bg-white p-1">
              <button
                onClick={() => onViewModeChange('list')}
                className={`rounded-md p-1.5 transition ${
                  viewMode === 'list'
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => onViewModeChange('grid')}
                className={`rounded-md p-1.5 transition ${
                  viewMode === 'grid'
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Grid3x3 size={18} />
              </button>
            </div>
          )}
          
          <AppButton onClick={onAddDoctor} className="shrink-0">
            <Plus size={18} className="mr-2" />
            Add Doctor
          </AppButton>
        </div>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-600">Specialty:</label>
            <select
              value={specialty}
              onChange={(e) => onSpecialtyChange(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="ALL">All Specialties</option>
              {specialtyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-600">Status:</label>
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="ON_LEAVE">On Leave</option>
              <option value="BUSY">Busy</option>
            </select>
          </div>

          <button
            onClick={() => {
              onSpecialtyChange('ALL');
              onStatusChange('ALL');
            }}
            className="text-sm text-sky-600 hover:text-sky-700 font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}