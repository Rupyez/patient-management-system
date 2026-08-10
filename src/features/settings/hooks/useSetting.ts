/**
 * ============================================================
 * USE SETTINGS HOOK
 * ============================================================
 * Manages all settings state and update logic
 */

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import type {
  UserProfile,
  NotificationPreferences,
  SecuritySettings,
  AppearanceSettings,
  SystemSettings,
} from '../types/settings';
import {
  initialUserProfile,
  initialNotificationPreferences,
  initialSecuritySettings,
  initialAppearanceSettings,
  initialSystemSettings,
} from '../data/SettingData'

export const useSettings = () => {
  // ==========================================================
  // STATE
  // ==========================================================

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);
  const [notifications, setNotifications] = useState<NotificationPreferences>(
    initialNotificationPreferences
  );
  const [security, setSecurity] = useState<SecuritySettings>(initialSecuritySettings);
  const [appearance, setAppearance] = useState<AppearanceSettings>(initialAppearanceSettings);
  const [system, setSystem] = useState<SystemSettings>(initialSystemSettings);

  // ==========================================================
  // LOAD SETTINGS
  // ==========================================================

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        // Simulate API call - replace with actual API
        await new Promise((resolve) => setTimeout(resolve, 600));
        setIsLoading(false);
      } catch {
        toast.error('Failed to load settings');
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  // ==========================================================
  // UPDATE HANDLERS
  // ==========================================================

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...data }));
    toast.success('Profile updated successfully!');
  }, []);

  const updateNotifications = useCallback((data: Partial<NotificationPreferences>) => {
    setNotifications((prev) => ({ ...prev, ...data }));
    toast.success('Notification preferences updated!');
  }, []);

  const updateSecurity = useCallback((data: Partial<SecuritySettings>) => {
    setSecurity((prev) => ({ ...prev, ...data }));
    toast.success('Security settings updated!');
  }, []);

  const updateAppearance = useCallback((data: Partial<AppearanceSettings>) => {
    setAppearance((prev) => ({ ...prev, ...data }));
    // Apply theme changes immediately
    if (data.theme) {
      const isDark =
        data.theme === 'dark' ||
        (data.theme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDark);
    }
    toast.success('Appearance settings updated!');
  }, []);

  const updateSystem = useCallback((data: Partial<SystemSettings>) => {
    setSystem((prev) => ({ ...prev, ...data }));
    toast.success('System settings updated!');
  }, []);

  // ==========================================================
  // RETURN
  // ==========================================================

  return {
    isLoading,
    profile,
    notifications,
    security,
    appearance,
    system,
    updateProfile,
    updateNotifications,
    updateSecurity,
    updateAppearance,
    updateSystem,
  };
};