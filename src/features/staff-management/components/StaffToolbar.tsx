import { Search, SlidersHorizontal } from "lucide-react";

interface StaffToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;

  showFilters: boolean;
  onToggleFilters: () => void;

  activeFilterCount: number;
}

export default function StaffToolbar({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  activeFilterCount,
}: StaffToolbarProps) {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row">

      {/* Search */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search by name, email, or ID..."
          value={searchQuery}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Filters button */}
      <button
        type="button"
        onClick={onToggleFilters}
        className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
          showFilters || activeFilterCount > 0
            ? "border-blue-600 bg-blue-50 text-blue-600"
            : "border-slate-300 text-slate-700 hover:bg-slate-50"
        }`}
      >
        <SlidersHorizontal className="h-4 w-4" />

        Filters

        {activeFilterCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
            {activeFilterCount}
          </span>
        )}
      </button>
    </div>
  );
}