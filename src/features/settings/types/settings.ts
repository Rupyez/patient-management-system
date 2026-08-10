export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bio: string;
  avatar: string | null;
  joinDate: string;
  lastActive: string;
}


export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  systemUpdates: boolean;
  marketingEmails: boolean;
  patientUpdates: boolean;
  doctorUpdates: boolean;
}


export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  loginAlerts: boolean;
  deviceManagement: boolean;
  biometricLogin: boolean;
  passwordLastChanged: string;
}


export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  sidebarCollapsed: boolean;
  animations: boolean;
  compactMode: boolean;
  primaryColor: string;
}


export interface SystemSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12' | '24';
  weekStart: 'monday' | 'sunday';
  currency: string;
}

export type SettingsSection = 'profile' | 'notifications' | 'security' | 'appearance' | 'system';

export interface SectionInfo{
    title:String,
    description:String;
}