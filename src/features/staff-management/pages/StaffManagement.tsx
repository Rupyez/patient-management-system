import {
  Users,
  UserCheck,
  CalendarClock,
  Building2
} from "lucide-react";

import { useState } from "react";

import StaffHeader from "../components/StaffHeader";
import StaffStatCard from "../components/StaffStatCard";

import { mockStaff } from "../data/mockData";
import type { Staff } from "../types";
import StaffProfileModal from "../components/StaffProfileModal";
import StaffTable from "../components/StaffTable";
import StaffToolbar from "../components/StaffToolbar";
import StaffFilters from "../components/StaffFilter";
import StaffTabs from "../components/staffTabs";
import StaffEditModal from "../components/StaffEditModal";
import StaffAddModal from "../components/StaffAddModal";
import StaffDeleteModal from "../components/StaffDeleteModal";
import StaffShiftSection from "../components/StaffShiftSection";
import StaffLeaveSection from "../components/StaffLeaveSection";
import StaffOnboardingSection from "../components/StaffOnboardingSection";
import StaffPerformanceSection from "../components/StaffPerformance";

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  ON_LEAVE: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
  INACTIVE: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20",
  SUSPENDED: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
};

const AVATAR_PALETTE = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
];

function getAvatarClass(id: string) {
  const index = id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_PALETTE[index % AVATAR_PALETTE.length];
}

export default function StaffManagement() {
  const [activeTab, setActiveTab] = useState("directory");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRole, setSelectedRole] = useState("ALL");
  const [selectedDepartment, setSelectedDepartment] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const [showFilters, setShowFilters] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [staffList, setStaffList] = useState<Staff[]>(mockStaff);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deletingStaff, setDeletingStaff] = useState<Staff | null>(null);

  // ==================== STATISTICS ====================
  const totalStaff = staffList.length;
  const activeStaff = staffList.filter((staff) => staff.status === 'ACTIVE')
  const onLeaveStaff = staffList.filter((staff) => staff.status === 'ON_LEAVE')
  const departmentCount = new Set(staffList.map((staff) => staff.department)).size;

  const staffStats = [
    {
      title: "Total Staff",
      value: 6,
      icon: Users,
      iconContainerClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Staff",
      value: 5,
      icon: UserCheck,
      iconContainerClass: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "On Leave",
      value: 1,
      icon: CalendarClock,
      iconContainerClass: "bg-amber-50 text-amber-600",
    },
    {
      title: "Departments",
      value: 5,
      icon: Building2,
      iconContainerClass: "bg-violet-50 text-violet-600",
    },
  ];

  // ==================== NAVIGATION ====================
  const staffTabs = [
    { id: "directory", label: "Staff Directory" },
    { id: "shifts", label: "Shifts" },
    { id: "leave", label: "Leave Request" },
    { id: "performance", label: "Performance" },
    { id: "onboarding", label: "Onboarding" },
  ];

  // ==================== FILTER STAFF ====================
  const filteredStaff = staffList.filter((staff) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      staff.firstName.toLowerCase().includes(query) ||
      staff.lastName.toLowerCase().includes(query) ||
      staff.email.toLowerCase().includes(query) ||
      staff.employeeId.toLowerCase().includes(query);

    const matchesRole = selectedRole === "ALL" || staff.role === selectedRole;
    const matchesDepartment =
      selectedDepartment === "ALL" || staff.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === "ALL" || staff.status === selectedStatus;

    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });

  const activeFilterCount = [selectedRole, selectedDepartment, selectedStatus].filter(
    (value) => value !== "ALL"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      {/* ==================== PAGE CONTAINER ==================== */}
      <section className="mx-auto max-w-7xl">
        {/* ==================== HEADER ==================== */}
        <StaffHeader onAddStaff={() => setShowAddModal(true)} />

        {/* ==================== STATISTICS ==================== */}
        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {staffStats.map((stat) => (
            <StaffStatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconContainerClass={stat.iconContainerClass}
            />
          ))}
        </section>

        {/* ==================== NAVIGATION ==================== */}
         <StaffTabs tabs={staffTabs} activeTab={activeTab} onTabChange={setActiveTab}/>

        {/* ==================== MAIN CONTENT ==================== */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6">
            {/* Page title based on active tab */}
            <h2 className="text-xl font-semibold text-slate-900">
              {activeTab === "directory" && "Staff Directory"}
              {activeTab === "shifts" && "Shift Management"}
              {activeTab === "leave" && "Leave Requests"}
              {activeTab === "performance" && "Performance Reviews"}
              {activeTab === "onboarding" && "Staff Onboarding"}
            </h2>

            {/* ==================== DIRECTORY CONTENT ==================== */}
            {activeTab === "directory" && (
              <>
                {/* ==================== TOOLBAR ==================== */}
                <StaffToolbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    showFilters={showFilters}
                    onToggleFilters={() =>
                      setShowFilters((previous) => !previous)
                    }
                    activeFilterCount={activeFilterCount}
                />

                {/* ==================== FILTER PANEL ==================== */}
                {showFilters && (
                  <StaffFilters
                        selectedRole={selectedRole}
                        selectedDepartment={selectedDepartment}
                        selectedStatus={selectedStatus}

                        onRoleChange={setSelectedRole}
                        onDepartmentChange={setSelectedDepartment}
                        onStatusChange={setSelectedStatus}

                        activeFilterCount={activeFilterCount}

                        onClearFilters={() => {
                          setSelectedRole("ALL");
                          setSelectedDepartment("ALL");
                          setSelectedStatus("ALL");
                        }}
                   />
                )}
              </>
            )}
          </div>

          {/* ==================== STAFF TABLE ==================== */}
          {activeTab === "directory" && (
            <StaffTable
                 staff={filteredStaff}
                onView={(staff) => {
                  setSelectedStaff(staff);
                  setShowProfileModal(true);
                }}
                onEdit={(staff) => {
                  setEditingStaff(staff);
                }}
                onDelete={(staff) => {
                  setDeletingStaff(staff)
                }}
            />
          )}


        </section>
      </section>

      {/* ==================== STAFF PROFILE MODAL ==================== */}
      {showProfileModal && selectedStaff && (
            <StaffProfileModal
                staff={selectedStaff}
                onClose={() => {
                setShowProfileModal(false);
                setSelectedStaff(null);
                }}
            />
      )}


        {editingStaff && (
          <StaffEditModal
            staff={editingStaff}
            onClose={() => setEditingStaff(null)}
            onSave={(updatedStaff) => {
              setStaffList((previousStaff) =>
                previousStaff.map((staff) =>
                  staff.id === updatedStaff.id
                    ? updatedStaff
                    : staff
                )
              );
            
              setEditingStaff(null);
            }}
          />
        )}


        {
          showAddModal &&(
            <StaffAddModal
              onClose={() => setShowAddModal(false)}
              onSave={(newStaff) => {
                setStaffList((previousStaff) =>[...previousStaff, newStaff]);

                setShowAddModal(false);
              }}
            />
          )
        }


        {deletingStaff &&(
          <StaffDeleteModal
           staff={deletingStaff}
           onClose={() => setDeletingStaff(null)}
           onDelete={(staffId) => {
            setStaffList((previousStaff) =>
            previousStaff.filter((staff) => staff.id !== staffId));
            setDeletingStaff(null)
           }}
          />
        )}



        {activeTab === 'shifts' &&(
          <StaffShiftSection staff={staffList}/>
        )}


        {activeTab === "leave" && (
          <StaffLeaveSection/>
        )}


        {
          activeTab === "onboarding" &&(
            <StaffOnboardingSection/>
          )
        }


        {activeTab === "performance" && (
           <StaffPerformanceSection/>
          )}
    </main>
  );
}