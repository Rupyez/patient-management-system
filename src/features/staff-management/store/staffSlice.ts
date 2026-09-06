/**
 * Staff Management - Redux Slice
 * Handles local state management for staff module including filters, pagination, UI state
 */

import type { Staff, StaffFilters, StaffStats } from "../types";
import { DEFAULT_VALUES, STAFF_MODULE_CONFIG } from '../constants';
import { createSlice, createSelector, type PayloadAction } from "@reduxjs/toolkit";

export interface StaffState{
    //Data
    staffList:Staff[],
    selectedStaff: Staff | null;
    stats: StaffStats | null;

      // Filters
  filters: StaffFilters;


    // Pagination
  currentPage: number;
  pageSize: number;
  totalItems: number;


    // Sorting
  sortBy: keyof Staff | null;
  sortOrder: 'asc' | 'desc';


    // UI State
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  viewMode: 'grid' | 'list';
  activeTab: string;


    // Selection
  selectedIds: string[];
  isBulkSelectMode: boolean;
}


// ============================================================================
// Initial State
// ============================================================================

const initialState: StaffState = {
    //Data
  staffList: [],
  selectedStaff: null,
  stats: null,

    //filters
    filters: {
    search: '',
    role: undefined,
    department: undefined,
    status: undefined,
  },


    //pagination
  currentPage: 1,
  pageSize: STAFF_MODULE_CONFIG.DEFAULT_PAGE_SIZE,
  totalItems: 0,


    //Sorting
  sortBy: null,
  sortOrder: 'asc',

    //UI State
  isLoading: false,
  isSubmitting: false,
  error: null,
  viewMode: 'grid',
  activeTab: 'directory',


    //Selection
  selectedIds: [],
  isBulkSelectMode: false,

}


// ============================================================================
// Slice Definition
// ============================================================================

const staffStatus = createSlice({
    name:'staff',
    initialState,
    reducers:{
 

        //Set the entire staff list
        setStaffList(state, action: PayloadAction<Staff[]>){
            state.staffList = action.payload;
        },


        // add a single staff member to the list
        addStaff(state, action: PayloadAction<Staff>){
            state.staffList.push(action.payload)
        }
    }
})
