/**
 * Staff Management Type Definitions
 * Core types, interfaces, and utilities for the staff management module
 */

// ============================================================================
// Enums & Value Objects
// ============================================================================

export type StaffRole = 
  | 'ADMIN'
  | 'DOCTOR'
  | 'NURSE'
  | 'RECEPTIONIST'
  | 'LAB_TECHNICIAN'
  | 'PHARMACIST'
  | 'MANAGER'
  | 'HR';

export type StaffDepartment = 
  | 'CARDIOLOGY'
  | 'NEUROLOGY'
  | 'PEDIATRICS'
  | 'ORTHOPEDICS'
  | 'DERMATOLOGY'
  | 'SURGERY'
  | 'EMERGENCY'
  | 'LABORATORY'
  | 'PHARMACY'
  | 'ADMINISTRATION'
  | 'HR'
  | 'IT'
  | 'MAINTENANCE';

export type StaffStatus = 
  | 'ACTIVE'
  | 'INACTIVE'
  | 'ON_LEAVE'
  | 'TERMINATED'
  | 'PROBATION';

export type ShiftStatus = 
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type ShiftType = 
  | 'MORNING'
  | 'AFTERNOON'
  | 'EVENING'
  | 'NIGHT'
  | 'FLEXIBLE';

export type LeaveType =
  | 'ANNUAL'
  | 'SICK'
  | 'PERSONAL'
  | 'MATERNITY'
  | 'PATERNITY'
  | 'BEREAVEMENT'
  | 'UNPAID';

export type LeaveStatus = 
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED';

export type PerformanceRating = 
  | 'EXCELLENT'
  | 'GOOD'
  | 'SATISFACTORY'
  | 'NEEDS_IMPROVEMENT'
  | 'POOR';

export type ReviewStatus = 
  | 'DRAFT'
  | 'SUBMITTED'
  | 'COMPLETED';

export type OnboardingStatus = 
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'OVERDUE';

export type Priority = 
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH';

export type PermissionAction = 
  | 'CREATE'
  | 'READ'
  | 'UPDATE'
  | 'DELETE'
  | 'MANAGE';

// ============================================================================
// Core Entities
// ============================================================================

export interface Staff {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: StaffRole;
  department: StaffDepartment;
  position: string;
  joinDate: string;
  status: StaffStatus;
  profileImage?: string;
  address: string;
  emergencyContact: EmergencyContact;
  qualifications: string[];
  certifications: string[];
  experience: number;
  salary: number;
  shiftPreference: ShiftType;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Shift {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: ShiftType;
  department: StaffDepartment;
  status: ShiftStatus;
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  days: number;
  approvedBy?: string;
  approvedDate?: string;
  notes?: string;
  createdAt: string;
}

export interface PerformanceScores {
  qualityOfWork: number;
  communication: number;
  teamwork: number;
  punctuality: number;
  problemSolving: number;
}

export interface PerformanceReview {
  id: string;
  staffId: string;
  staffName: string;
  reviewer: string;
  reviewDate: string;
  rating: PerformanceRating;
  scores: PerformanceScores;
  strengths: string[];
  improvements: string[];
  goals: string[];
  comments: string;
  status: ReviewStatus;
}

export interface OnboardingTask {
  id: string;
  staffId: string;
  staffName: string;
  title: string;
  description: string;
  department: StaffDepartment;
  assignedTo: string;
  dueDate: string;
  status: OnboardingStatus;
  priority: Priority;
  attachments?: string[];
  createdAt: string;
}

export interface Permission {
  id: string;
  role: StaffRole;
  module: string;
  actions: PermissionAction[];
}

// ============================================================================
// UI & Filtering Types
// ============================================================================

export interface StaffFilters {
  search?: string;
  role?: StaffRole;
  department?: StaffDepartment;
  status?: StaffStatus;
}

export interface StaffStats {
  total: number;
  active: number;
  onLeave: number;
  newThisMonth: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface OptionType<T = string> {
  label: string;
  value: T;
}

// ============================================================================
// DTOs - Input Types
// ============================================================================

export type CreateStaffInput = Omit<Staff, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateStaffInput = Partial<CreateStaffInput> & { id: string };

export type CreateShiftInput = Omit<Shift, 'id' | 'staffName'>;

export type CreateLeaveRequestInput = Omit<
  LeaveRequest,
  'id' | 'staffName' | 'status' | 'days' | 'approvedBy' | 'approvedDate' | 'createdAt'
>;

export type CreatePerformanceReviewInput = Omit<
  PerformanceReview,
  'id' | 'staffName' | 'status'
>;

export type CreateOnboardingTaskInput = Omit<
  OnboardingTask,
  'id' | 'staffName' | 'status' | 'createdAt'
>;

// ============================================================================
// Constants & Helpers
// ============================================================================

export const STAFF_ROLES = [
  'ADMIN',
  'DOCTOR',
  'NURSE',
  'RECEPTIONIST',
  'LAB_TECHNICIAN',
  'PHARMACIST',
  'MANAGER',
  'HR'
] as const;

export const STAFF_DEPARTMENTS = [
  'CARDIOLOGY',
  'NEUROLOGY',
  'PEDIATRICS',
  'ORTHOPEDICS',
  'DERMATOLOGY',
  'SURGERY',
  'EMERGENCY',
  'LABORATORY',
  'PHARMACY',
  'ADMINISTRATION',
  'HR',
  'IT',
  'MAINTENANCE'
] as const;

export const STAFF_STATUSES = [
  'ACTIVE',
  'INACTIVE',
  'ON_LEAVE',
  'TERMINATED',
  'PROBATION'
] as const;

export const SHIFT_TYPES = [
  'MORNING',
  'AFTERNOON',
  'EVENING',
  'NIGHT',
  'FLEXIBLE'
] as const;

export const LEAVE_TYPES = [
  'ANNUAL',
  'SICK',
  'PERSONAL',
  'MATERNITY',
  'PATERNITY',
  'BEREAVEMENT',
  'UNPAID'
] as const;

export const SHIFT_STATUSES = [
  'SCHEDULED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED'
] as const;

export const LEAVE_STATUSES = [
  'PENDING',
  'APPROVED',
  'REJECTED',
  'CANCELLED'
] as const;

export const PERFORMANCE_RATINGS = [
  'EXCELLENT',
  'GOOD',
  'SATISFACTORY',
  'NEEDS_IMPROVEMENT',
  'POOR'
] as const;

export const REVIEW_STATUSES = [
  'DRAFT',
  'SUBMITTED',
  'COMPLETED'
] as const;

export const ONBOARDING_STATUSES = [
  'PENDING',
  'IN_PROGRESS',
  'COMPLETED',
  'OVERDUE'
] as const;

export const PRIORITIES = [
  'LOW',
  'MEDIUM',
  'HIGH'
] as const;

// ============================================================================
// Display Options
// ============================================================================

export const ROLE_OPTIONS: OptionType<StaffRole>[] = STAFF_ROLES.map(role => ({
  label: role.charAt(0) + role.slice(1).toLowerCase().replace('_', ' '),
  value: role
}));

export const DEPARTMENT_OPTIONS: OptionType<StaffDepartment>[] = STAFF_DEPARTMENTS.map(dept => ({
  label: dept.charAt(0) + dept.slice(1).toLowerCase().replace('_', ' '),
  value: dept
}));

export const STATUS_OPTIONS: OptionType<StaffStatus>[] = STAFF_STATUSES.map(status => ({
  label: status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' '),
  value: status
}));

export const SHIFT_TYPE_OPTIONS: OptionType<ShiftType>[] = SHIFT_TYPES.map(type => ({
  label: type.charAt(0) + type.slice(1).toLowerCase(),
  value: type
}));

export const LEAVE_TYPE_OPTIONS: OptionType<LeaveType>[] = LEAVE_TYPES.map(type => ({
  label: type.charAt(0) + type.slice(1).toLowerCase(),
  value: type
}));

export const PERFORMANCE_RATING_OPTIONS: OptionType<PerformanceRating>[] = PERFORMANCE_RATINGS.map(rating => ({
  label: rating.charAt(0) + rating.slice(1).toLowerCase().replace('_', ' '),
  value: rating
}));

export const PRIORITY_OPTIONS: OptionType<Priority>[] = PRIORITIES.map(priority => ({
  label: priority.charAt(0) + priority.slice(1).toLowerCase(),
  value: priority
}));

// ============================================================================
// Type Guards
// ============================================================================

export function isStaffRole(value: unknown): value is StaffRole {
  return typeof value === 'string' && STAFF_ROLES.includes(value as StaffRole);
}

export function isStaffDepartment(value: unknown): value is StaffDepartment {
  return typeof value === 'string' && STAFF_DEPARTMENTS.includes(value as StaffDepartment);
}

export function isStaffStatus(value: unknown): value is StaffStatus {
  return typeof value === 'string' && STAFF_STATUSES.includes(value as StaffStatus);
}

export function isShiftType(value: unknown): value is ShiftType {
  return typeof value === 'string' && SHIFT_TYPES.includes(value as ShiftType);
}

export function isLeaveType(value: unknown): value is LeaveType {
  return typeof value === 'string' && LEAVE_TYPES.includes(value as LeaveType);
}

export function isPerformanceRating(value: unknown): value is PerformanceRating {
  return typeof value === 'string' && PERFORMANCE_RATINGS.includes(value as PerformanceRating);
}

export function isPriority(value: unknown): value is Priority {
  return typeof value === 'string' && PRIORITIES.includes(value as Priority);
}