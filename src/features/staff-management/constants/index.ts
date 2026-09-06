/**
 * Staff Management - Constants
 * Configuration constants, mappings, and UI configuration objects
 */

import type { LeaveStatus, LeaveType, OnboardingStatus, PerformanceRating, Priority, ReviewStatus, ShiftStatus, ShiftType, StaffDepartment, StaffRole, StaffStatus } from "../types";


export const STAFF_STATUS_COLORS: Record<StaffStatus, string> ={
  ACTIVE: 'green',
  INACTIVE: 'gray',
  ON_LEAVE: 'yellow',
  TERMINATED: 'red',
  PROBATION: 'orange',
}


export const SHIFT_STATUS_COLORS: Record<ShiftStatus, string> ={
  SCHEDULED: 'blue',
  IN_PROGRESS: 'green',
  COMPLETED: 'gray',
  CANCELLED: 'red',
}

export const LEAVE_STATUS_COLORS: Record<LeaveStatus, string> = {
  PENDING: 'yellow',
  APPROVED: 'green',
  REJECTED: 'red',
  CANCELLED: 'gray',
};


export const PERFORMANCE_RATING_COLORS: Record<PerformanceRating, string> = {
  EXCELLENT: 'green',
  GOOD: 'blue',
  SATISFACTORY: 'yellow',
  NEEDS_IMPROVEMENT: 'orange',
  POOR: 'red',
};


export const REVIEW_STATUS_COLORS: Record<ReviewStatus, string> = {
  DRAFT: 'gray',
  SUBMITTED: 'blue',
  COMPLETED: 'green',
};



export const ONBOARDING_STATUS_COLORS: Record<OnboardingStatus, string> = {
  PENDING: 'gray',
  IN_PROGRESS: 'blue',
  COMPLETED: 'green',
  OVERDUE: 'red',
};


export const PRIORITY_COLORS: Record<Priority, string> = {
  LOW: 'gray',
  MEDIUM: 'yellow',
  HIGH: 'red',
};


export const STAFF_STATUS_LABELS: Record<StaffStatus, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  ON_LEAVE: 'On Leave',
  TERMINATED: 'Terminated',
  PROBATION: 'Probation',
};


export const LEAVE_STATUS_LABELS: Record<LeaveStatus, string> = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
};


export const PERFORMANCE_RATING_LABELS: Record<PerformanceRating, string> = {
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
  SATISFACTORY: 'Satisfactory',
  NEEDS_IMPROVEMENT: 'Needs Improvement',
  POOR: 'Poor',
};


export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  COMPLETED: 'Completed',
};


export const ONBOARDING_STATUS_LABELS: Record<OnboardingStatus, string> = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  OVERDUE: 'Overdue',
};


export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};


export const STAFF_MODULE_CONFIG = {
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  
  // Search configuration
  SEARCH_DEBOUNCE_MS: 300,
  MIN_SEARCH_LENGTH: 2,
  
  // File upload
  MAX_PROFILE_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Date formats
  DATE_FORMAT: 'yyyy-MM-dd',
  DATETIME_FORMAT: 'yyyy-MM-dd HH:mm',
  TIME_FORMAT: 'HH:mm',
  
  // Salary
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
} as const;


export const SHIFT_CONFIG = {
  MORNING: {
    label: 'Morning',
    startTime: '06:00',
    endTime: '14:00',
    color: 'blue',
  },
  AFTERNOON: {
    label: 'Afternoon',
    startTime: '14:00',
    endTime: '22:00',
    color: 'green',
  },
  EVENING: {
    label: 'Evening',
    startTime: '18:00',
    endTime: '00:00',
    color: 'purple',
  },
  NIGHT: {
    label: 'Night',
    startTime: '22:00',
    endTime: '06:00',
    color: 'indigo',
  },
  FLEXIBLE: {
    label: 'Flexible',
    startTime: '00:00',
    endTime: '00:00',
    color: 'gray',
  },
} as const;



export const LEAVE_CONFIG = {
  ANNUAL: {
    label: 'Annual Leave',
    maxDays: 30,
    requiresApproval: true,
    color: 'blue',
  },
  SICK: {
    label: 'Sick Leave',
    maxDays: 10,
    requiresApproval: true,
    color: 'red',
  },
  PERSONAL: {
    label: 'Personal Leave',
    maxDays: 5,
    requiresApproval: true,
    color: 'yellow',
  },
  MATERNITY: {
    label: 'Maternity Leave',
    maxDays: 90,
    requiresApproval: true,
    color: 'pink',
  },
  PATERNITY: {
    label: 'Paternity Leave',
    maxDays: 10,
    requiresApproval: true,
    color: 'purple',
  },
  BEREAVEMENT: {
    label: 'Bereavement Leave',
    maxDays: 5,
    requiresApproval: false,
    color: 'gray',
  },
  UNPAID: {
    label: 'Unpaid Leave',
    maxDays: 0,
    requiresApproval: true,
    color: 'orange',
  },
} as const;



export const PERFORMANCE_CONFIG = {
  // Score ranges
  SCORE_MIN: 1,
  SCORE_MAX: 5,
  SCORE_DEFAULT: 3,
  
  // Rating thresholds
  RATING_THRESHOLDS: {
    EXCELLENT: 4.5,
    GOOD: 3.5,
    SATISFACTORY: 2.5,
    NEEDS_IMPROVEMENT: 1.5,
    POOR: 0,
  },
  
  // Review frequency (months)
  REVIEW_INTERVAL: 6,
  PROBATION_REVIEW_INTERVAL: 3,
} as const;


export const ONBOARDING_CONFIG = {
  // Default tasks for new employees
  DEFAULT_TASKS: [
    {
      title: 'Complete Personal Information',
      description: 'Fill in all personal details in the HR system',
      priority: 'HIGH' as Priority,
      department: 'HR' as StaffDepartment,
    },
    {
      title: 'Review Company Handbook',
      description: 'Read and acknowledge the employee handbook',
      priority: 'HIGH' as Priority,
      department: 'HR' as StaffDepartment,
    },
    {
      title: 'IT Setup',
      description: 'Get access to systems and equipment',
      priority: 'HIGH' as Priority,
      department: 'IT' as StaffDepartment,
    },
    {
      title: 'Department Orientation',
      description: 'Meet the team and learn departmental processes',
      priority: 'MEDIUM' as Priority,
      department: 'ADMINISTRATION' as StaffDepartment,
    },
  ],
  
  // Task completion timeframes (days from start)
  TASK_TIMEFRAMES: {
    HIGH: 3,
    MEDIUM: 7,
    LOW: 14,
  },
} as const;



export const VALIDATION_RULES = {
  // Staff
  STAFF: {
    FIRST_NAME: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s\-']+$/,
    },
    LAST_NAME: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s\-']+$/,
    },
    EMAIL: {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    PHONE: {
      pattern: /^\+?[1-9]\d{1,14}$/,
    },
    EMPLOYEE_ID: {
      pattern: /^[A-Z0-9\-]{3,20}$/,
    },
    SALARY: {
      min: 0,
      max: 1000000,
    },
    EXPERIENCE: {
      min: 0,
      max: 50,
    },
  },
  
  // Shift
  SHIFT: {
    START_TIME: {
      pattern: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    END_TIME: {
      pattern: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
  },
  
  // Leave Request
  LEAVE: {
    REASON: {
      minLength: 5,
      maxLength: 500,
    },
    DAYS: {
      min: 0.5,
      max: 30,
    },
  },
  
  // Performance Review
  PERFORMANCE: {
    SCORE: {
      min: 1,
      max: 5,
    },
    COMMENTS: {
      minLength: 10,
      maxLength: 1000,
    },
  },
} as const;



export const API_ENDPOINTS = {
  STAFF: '/api/staff',
  STAFF_BY_ID: (id: string) => `/api/staff/${id}`,
  STAFF_STATS: '/api/staff/stats',
  
  SHIFTS: '/api/shifts',
  SHIFTS_BY_STAFF: (staffId: string) => `/api/shifts/staff/${staffId}`,
  
  LEAVE: '/api/leave',
  LEAVE_BY_STAFF: (staffId: string) => `/api/leave/staff/${staffId}`,
  
  PERFORMANCE: '/api/performance',
  PERFORMANCE_BY_STAFF: (staffId: string) => `/api/performance/staff/${staffId}`,
  
  ONBOARDING: '/api/onboarding',
  ONBOARDING_BY_STAFF: (staffId: string) => `/api/onboarding/staff/${staffId}`,
  
  ROLES: '/api/roles',
  PERMISSIONS: '/api/permissions',
} as const;




export const QUERY_KEYS = {
  STAFF: {
    ALL: ['staff'] as const,
    LIST: () => [...QUERY_KEYS.STAFF.ALL, 'list'] as const,
    DETAILS: (id: string) => [...QUERY_KEYS.STAFF.ALL, 'details', id] as const,
    STATS: () => [...QUERY_KEYS.STAFF.ALL, 'stats'] as const,
  },
  SHIFTS: {
    ALL: ['shifts'] as const,
    LIST: () => [...QUERY_KEYS.SHIFTS.ALL, 'list'] as const,
    BY_STAFF: (staffId: string) => [...QUERY_KEYS.SHIFTS.ALL, 'staff', staffId] as const,
  },
  LEAVE: {
    ALL: ['leave'] as const,
    LIST: () => [...QUERY_KEYS.LEAVE.ALL, 'list'] as const,
    BY_STAFF: (staffId: string) => [...QUERY_KEYS.LEAVE.ALL, 'staff', staffId] as const,
  },
  PERFORMANCE: {
    ALL: ['performance'] as const,
    LIST: () => [...QUERY_KEYS.PERFORMANCE.ALL, 'list'] as const,
    BY_STAFF: (staffId: string) => [...QUERY_KEYS.PERFORMANCE.ALL, 'staff', staffId] as const,
  },
  ONBOARDING: {
    ALL: ['onboarding'] as const,
    LIST: () => [...QUERY_KEYS.ONBOARDING.ALL, 'list'] as const,
    BY_STAFF: (staffId: string) => [...QUERY_KEYS.ONBOARDING.ALL, 'staff', staffId] as const,
  },
} as const;




export const STORAGE_KEYS = {
  STAFF_FILTERS: 'staff_filters',
  STAFF_PAGINATION: 'staff_pagination',
  STAFF_SORT: 'staff_sort',
  STAFF_VIEW: 'staff_view', // 'grid' | 'list'
  STAFF_TAB: 'staff_active_tab',
} as const;



export const ROUTES = {
  STAFF: {
    ROOT: '/staff',
    DIRECTORY: '/staff/directory',
    SHIFTS: '/staff/shifts',
    LEAVE: '/staff/leave',
    PERFORMANCE: '/staff/performance',
    ONBOARDING: '/staff/onboarding',
    ROLES: '/staff/roles',
    PROFILE: (id: string) => `/staff/profile/${id}`,
    EDIT: (id: string) => `/staff/edit/${id}`,
    CREATE: '/staff/create',
  },
} as const;




export const DEFAULT_VALUES = {
  STAFF: {
    status: 'ACTIVE' as StaffStatus,
    role: 'STAFF' as StaffRole,
    experience: 0,
    salary: 0,
    qualifications: [],
    certifications: [],
  },
  SHIFT: {
    status: 'SCHEDULED' as ShiftStatus,
    type: 'MORNING' as ShiftType,
    notes: '',
  },
  LEAVE: {
    status: 'PENDING' as LeaveStatus,
    type: 'ANNUAL' as LeaveType,
    notes: '',
  },
  PERFORMANCE: {
    status: 'DRAFT' as ReviewStatus,
    rating: 'SATISFACTORY' as PerformanceRating,
    scores: {
      qualityOfWork: 3,
      communication: 3,
      teamwork: 3,
      punctuality: 3,
      problemSolving: 3,
    },
    strengths: [],
    improvements: [],
    goals: [],
  },
  ONBOARDING: {
    status: 'PENDING' as OnboardingStatus,
    priority: 'MEDIUM' as Priority,
    attachments: [],
  },
} as const;



export const ERROR_MESSAGES = {
  STAFF: {
    NOT_FOUND: 'Staff member not found',
    DUPLICATE_EMAIL: 'Email already exists',
    DUPLICATE_EMPLOYEE_ID: 'Employee ID already exists',
    INVALID_ROLE: 'Invalid staff role',
    INVALID_DEPARTMENT: 'Invalid department',
    INVALID_STATUS: 'Invalid staff status',
  },
  SHIFT: {
    NOT_FOUND: 'Shift not found',
    OVERLAP: 'Shift overlaps with existing shift',
    INVALID_TIME: 'Invalid shift time',
    STAFF_NOT_AVAILABLE: 'Staff member not available for this shift',
  },
  LEAVE: {
    NOT_FOUND: 'Leave request not found',
    INSUFFICIENT_BALANCE: 'Insufficient leave balance',
    OVERLAP: 'Leave request overlaps with existing leave',
    ALREADY_PROCESSED: 'Leave request already processed',
  },
  PERFORMANCE: {
    NOT_FOUND: 'Performance review not found',
    ALREADY_SUBMITTED: 'Review already submitted',
    INVALID_RATING: 'Invalid performance rating',
  },
  ONBOARDING: {
    NOT_FOUND: 'Onboarding task not found',
    ALREADY_COMPLETED: 'Task already completed',
  },
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Invalid email format',
    INVALID_PHONE: 'Invalid phone number format',
    MIN_LENGTH: (min: number) => `Minimum ${min} characters required`,
    MAX_LENGTH: (max: number) => `Maximum ${max} characters allowed`,
    MIN_VALUE: (min: number) => `Minimum value is ${min}`,
    MAX_VALUE: (max: number) => `Maximum value is ${max}`,
  },
} as const;



export const SUCCESS_MESSAGES = {
  STAFF: {
    CREATED: 'Staff member created successfully',
    UPDATED: 'Staff member updated successfully',
    DELETED: 'Staff member deleted successfully',
    ACTIVATED: 'Staff member activated successfully',
    DEACTIVATED: 'Staff member deactivated successfully',
  },
  SHIFT: {
    CREATED: 'Shift created successfully',
    UPDATED: 'Shift updated successfully',
    DELETED: 'Shift deleted successfully',
  },
  LEAVE: {
    CREATED: 'Leave request submitted successfully',
    UPDATED: 'Leave request updated successfully',
    APPROVED: 'Leave request approved successfully',
    REJECTED: 'Leave request rejected successfully',
    CANCELLED: 'Leave request cancelled successfully',
  },
  PERFORMANCE: {
    CREATED: 'Performance review created successfully',
    UPDATED: 'Performance review updated successfully',
    SUBMITTED: 'Performance review submitted successfully',
    COMPLETED: 'Performance review completed successfully',
  },
  ONBOARDING: {
    CREATED: 'Onboarding task created successfully',
    UPDATED: 'Onboarding task updated successfully',
    COMPLETED: 'Onboarding task completed successfully',
  },
} as const;

// ============================================================================
// Module Information
// ============================================================================

export const MODULE_INFO = {
  name: 'Staff Management',
  version: '1.0.0',
  description: 'Comprehensive staff management module with directory, shifts, leave, performance, and onboarding management',
  author: 'Engineering Team',
  features: [
    'Staff Directory',
    'Shift Management',
    'Leave Management',
    'Performance Reviews',
    'Onboarding Tasks',
    'Role Management',
  ],
} as const;