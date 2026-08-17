/**
 * ============================================================
 * DOCTOR TOOLBAR COMPONENT
 * ============================================================
 * Search, filters, and add button
 */

import { Filter, Plus, Search, X } from "lucide-react";
import { specialityOptions, statusOptions } from "../../data/doctor.data";


interface DoctorToolbarProps{
    search:string,
    speciality:string,
    status:string,
    showFilter:boolean,
    activeFilterCount:number
    onSearchChange: (value: string) => void;
    onSpecialtyChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onToggleFilters: () => void;
    onClearFilters: () => void;
    onAddDoctor: () => void;
}


export default function DoctorToolbar({search, speciality, showFilter, status, activeFilterCount, onSearchChange, onSpecialtyChange, onStatusChange, onToggleFilters, onClearFilters, onAddDoctor}:DoctorToolbarProps){
    return(
       <div className="mb-6 space-y-4">
      {/* Main toolbar row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left - Search and Filter Toggle */}
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 min-w-50">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search doctors by name, ID, or specialty..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {search && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={onToggleFilters}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
              showFilter || activeFilterCount > 0
                ? 'border-sky-300 bg-sky-50 text-sky-700'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Filter size={18} />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Right - Add Doctor Button */}
        <button
          onClick={onAddDoctor}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-all hover:bg-sky-600 hover:shadow-lg"
        >
          <Plus size={18} />
          Add Doctor
        </button>
      </div>


            {/* Expanded Filter */}
            {showFilter && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-slate-600 whitespace-nowrap">Speciality</label>
                            <select value={speciality} onChange={(e) => onSpecialtyChange(e.target.value)} 
                            className="rounded-lg border border-salte-200 bg-white px-3 py-1.5 text-sm outline-none transition-all focus:bordr-sky-500 focus:ring-2 focus:ring-sky-100">
                                {specialityOptions.map((option) =>(
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-slate-600 whitespace-nowrap">Status: </label>
                            <select value={status} onChange={(e) => onStatusChange(e.target.value)}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                >
                                {statusOptions.map((option) =>(
                                    <option>{option.label}</option>
                                ))}
                            </select>
                        </div>


                        {/* clear filter */}
                        {(speciality !== 'ALL' || status !== 'ALL' || search) &&(
                            <button
                            onClick={onClearFilters}
                            className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors"
                            >Clear All Filters</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}