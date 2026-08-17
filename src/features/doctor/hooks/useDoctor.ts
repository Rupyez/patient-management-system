/**
 * ============================================================
 * USE DOCTORS HOOK
 * ============================================================
 * Manages all doctor-related state and operations
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import type{ DoctorFilters, Doctor, DoctorFormData } from "../types/doctor.types";
import { toast } from "react-toastify";
import { initialDoctor } from "../data/doctor.data";
import { filterDoctors, getDoctorStats } from "../utils/doctor.utils";


export const useDoctors = () => {
  // ==========================================================
  // STATE
  // ==========================================================
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DoctorFilters>({search:'', speciality:'ALL', status:'ALL'});
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // ==========================================================
  // DATA LOADING
  // ==========================================================
    useEffect(() =>{
        const loadData = async() =>{
            try{
                setLoading(true);

                await new Promise((resolve) => setTimeout(resolve, 600));
                setDoctorList(initialDoctor);

            }catch(error){
                toast.error('Failed to load doctors');
            }finally{
                setLoading(false);
            }
        }
    })


  // ==========================================================
  // COMPUTED VALUES
  // ==========================================================
const stats = useMemo(() => getDoctorStats(doctorList), [doctorList]);

const filteredDoctors = useMemo(() => {
    return filterDoctors(
        doctorList,
        filters.search,
        filters.speciality,
        filters.status
    )
},[doctorList, filters])

const activeFilterCount = useMemo(() =>{
    return [filters.speciality !== 'ALL', filters.status !== 'ALL'].filter(Boolean).length;
},[filters.speciality, filters.status]);


  // ==========================================================
  // CRUD OPERATIONS
  // ==========================================================
const addDoctor = useCallback((doctorData: DoctorFormData) =>{
    const newDoctor: Doctor = {
      id: crypto.randomUUID(),
      ...doctorData,
      rating: 4.5,
      totalPatients: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDoctorList((prev) => [...prev, newDoctor]);
    toast.success(`Dr. ${newDoctor.firstName} ${newDoctor.lastName} added successfully`);
    return newDoctor;
},[])


const updateDoctor = useCallback((doctorData: DoctorFormData) => {
    if (!editingDoctor) return null;
    
    const updatedDoctor: Doctor = {
      ...editingDoctor,
      ...doctorData,
      updatedAt: new Date().toISOString(),
    };
    setDoctorList((prev) =>
      prev.map((d) => (d.id === updatedDoctor.id ? updatedDoctor : d))
    );
    toast.success(`Dr. ${updatedDoctor.firstName} ${updatedDoctor.lastName} updated successfully!`);
    return updatedDoctor;
  }, [editingDoctor]);


const deleteDoctor = useCallback((doctor: Doctor) =>{
    if(window.confirm(
                `Are you sure you want to delete Dr. ${doctor.firstName} ${doctor.lastName}?\n\nThis action cannot be undone.`
    )){
        setDoctorList((prev) =>
            prev.filter((d) => d.id !== doctor.id)
        );
        toast.success(`Dr. ${doctor.firstName} ${doctor.lastName} has been removed.`);
        return true;
    }
    return false;
},[])

  // ==========================================================
  // UI HANDLERS
  // ==========================================================

  const openAddForm = useCallback(() =>{
    setEditingDoctor(null);
    setShowForm(true);
  },[])


  const openEditForm = useCallback((doctor: Doctor) =>{
    setEditingDoctor(doctor);
    setShowForm(true);
  },[])


const closeForm = useCallback(() =>{
    setShowForm(false);
    setEditingDoctor(null);
},[])
 

const openProfile = useCallback((doctor: Doctor) =>{
    setSelectedDoctor(doctor);
    setShowProfile(true);
},[])

const closeProfile = useCallback(() =>{
    setShowForm(false);
    setSelectedDoctor(null);
},[])


const updateFilter = useCallback((key: keyof DoctorFilters, value:string) =>{
    setFilters((prev) => ({...prev, [key]:value}))
},[]);

const clearFilters = useCallback(() =>{
    setFilters({
        search:'',
        speciality:'ALL',
        status:'ALL'
    })
},[])


const toggleFilter = useCallback(() =>{
    setShowFilters((prev) => !prev);
})

  // ==========================================================
  // RETURN
  // ==========================================================
return {
    // State
    doctorList,
    loading,
    filters,
    showForm,
    showProfile,
    editingDoctor,
    selectedDoctor,
    showFilters,
    
    // Computed
    stats,
    filteredDoctors,
    activeFilterCount,
    
    // CRUD
    addDoctor,
    updateDoctor,
    deleteDoctor,
    
    // UI Handlers
    openAddForm,
    openEditForm,
    closeForm,
    openProfile,
    closeProfile,
    updateFilter,
    clearFilters,
    toggleFilter,
    
    // Getters
    getDoctorList: () => doctorList,
    getFilteredDoctors: () => filteredDoctors,
  };
  
};