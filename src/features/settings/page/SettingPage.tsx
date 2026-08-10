

// /**
//  * ============================================================
//  * SETTINGS PAGE - COMPLETE SINGLE FILE COMPONENT
//  * ============================================================
//  * 
//  * This is a fully functional Settings page with:
//  * - Profile settings
//  * - Notification preferences
//  * - Security settings
//  * - Appearance settings
//  * - System preferences
//  * - Responsive design for all screen sizes
//  * - Form validation
//  * - Toast notifications
//  * - Modern UI with animations
//  * 
//  * ============================================================
//  */

import { useState } from "react";
import SettingSidebar from "../components/SettingSidebar";
import type{ SettingsSection } from "../types/settings";
import ProfileSettings from "../components/ProfileSetting";
import { useSettings } from "../hooks/useSetting";
import NotificationSetting from "../components/NotificationSettings";






export default function SettingPage(){

  //STATE
  const[activeSection, setActiveSection] = useState<SettingsSection>('profile')


  const{isLoading, profile, notifications, updateProfile, updateNotifications} = useSettings();


  // ==========================================================
  // RENDER FUNCTIONS
  // ==========================================================


  const renderContent = () =>{
    switch(activeSection){
      case 'profile':
        return<ProfileSettings profile={profile} onUpdate={updateProfile}/>

        case 'notifications':
        return<NotificationSetting preferences={notifications} onUpdate={updateNotifications}/>

        default:
          return<ProfileSettings profile={profile} onUpdate={updateProfile}/>
    }
  }


    // ==========================================================
  // LOADING STATE
  // ==========================================================

  if(isLoading){
    return(
      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="flex h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 borders-slate-200 border-t-sky-500"/>
            <p className="text-sm text-slate-500">Loading settings...</p>
          </div>
        </div>
      </div>
    )
  }

  return(
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your account preferences and system configurations</p>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6 lg:flex-row">

        {/* Sidebar */}
        <SettingSidebar activeSection={activeSection} onSectionChange={setActiveSection}/>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Section Header */}


            {/* Section content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}


