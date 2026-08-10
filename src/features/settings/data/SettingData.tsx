
import type{
    UserProfile,
    NotificationPreferences,
    SecuritySettings,
    AppearanceSettings,
    SystemSettings
} from "../types/settings";


export const initialUserProfile: UserProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@hospital.com',
  phone: '(555) 123-4567',
  address: '123 Medical Center Dr, Suite 200, New York, NY 10001',
  dateOfBirth: '1985-05-15',
  gender: 'MALE',
  bio: 'Hospital Administrator with 10+ years of experience in healthcare management.',
  avatar: null,
  joinDate: '2020-01-15T10:00:00Z',
  lastActive: '2026-08-09T14:30:00Z',
}

export const initialNotificationPreferences: NotificationPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  appointmentReminders: true,
  systemUpdates: true,
  marketingEmails: false,
  patientUpdates: true,
  doctorUpdates: true,
};

export const initialSecuritySettings: SecuritySettings = {
    twoFactorAuth: false,
    sessionTimeout:30,
    loginAlerts:true,
    deviceManagement: true,
    biometricLogin: false,
    passwordLastChanged: '2026-07-15T10:00:00Z'
}

export const initialAppearanceSettings: AppearanceSettings = {
  theme: 'system',
  fontSize: 'medium',
  sidebarCollapsed: false,
  animations: true,
  compactMode: false,
  primaryColor: '#0EA5E9',

}

export const initialSystemSettings: SystemSettings = {
  language: 'en',
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12',
  weekStart: 'sunday',
  currency: 'USD',
}

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
];

export const timezones = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Dubai',
  'Australia/Sydney',
];

export const dateFormats = [
  'MM/DD/YYYY',
  'DD/MM/YYYY',
  'YYYY-MM-DD',
  'MM-DD-YYYY',
];

export const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar' },
];

export const sectionConfig: Record<string,{title:string; description:string}> = {
  profile: {
    title: 'Profile Settings',
    description: 'Manage your personal information and account details',
  },
  notifications: {
    title: 'Notification Preferences',
    description: 'Control how you receive notifications and alerts',
  },
  security: {
    title: 'Security Settings',
    description: 'Manage your security preferences and password',
  },
  appearance: {
    title: 'Appearance Settings',
    description: 'Customize the look and feel of your dashboard',
  },
  system: {
    title: 'System Settings',
    description: 'Configure language, region, and system preferences',
  },
}


export const colorOptions = [
  { color: '#0EA5E9', name: 'Sky Blue' },
  { color: '#8B5CF6', name: 'Purple' },
  { color: '#EC4899', name: 'Pink' },
  { color: '#14B8A6', name: 'Teal' },
  { color: '#F59E0B', name: 'Amber' },
  { color: '#EF4444', name: 'Red' },
  { color: '#10B981', name: 'Emerald' },
];