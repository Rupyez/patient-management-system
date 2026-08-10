import { useState } from "react";
import type { NotificationPreferences } from "../types/settings";

import { Mail, Bell, Smartphone, Calendar, RefreshCw, Gift, Users, Stethoscope} from "lucide-react";

interface NotificationSettingProps{
    preferences:NotificationPreferences;
    onUpdate:(data: Partial<NotificationPreferences>) => void;
}

const notificationGroups = [
  {
    title: 'Channels',
    items: [
      { key: 'emailNotifications', label: 'Email Notifications', icon: Mail },
      { key: 'pushNotifications', label: 'Push Notifications', icon: Bell },
      { key: 'smsNotifications', label: 'SMS Notifications', icon: Smartphone },
    ],
  },
  {
    title: 'Events',
    items: [
      { key: 'appointmentReminders', label: 'Appointment Reminders', icon: Calendar },
      { key: 'systemUpdates', label: 'System Updates', icon: RefreshCw },
      { key: 'marketingEmails', label: 'Marketing Emails', icon: Gift },
      { key: 'patientUpdates', label: 'Patient Updates', icon: Users },
      { key: 'doctorUpdates', label: 'Doctor Updates', icon: Stethoscope },
    ],
  },
];

export default function NotificationSetting({preferences, onUpdate}:NotificationSettingProps){

    const [localPrefs, setLocalPrefs] = useState(preferences);

    const handleToggle = (key: keyof NotificationPreferences) =>{
        const newValue = !localPrefs[key];
        setLocalPrefs({...localPrefs, [key]: newValue});
        onUpdate({[key]: newValue})
    }

    return(
        <div className="space-y-8">
            {notificationGroups.map((group) =>(
                <div key={group.title}>
                    <h3 className="mb-4 text-lg font-semibold text-slate-800">{group.title}</h3>
                    <div>
                        {group.items.map((item) =>{
                            const Icon = item.icon;
                            const isEnabled = localPrefs[item.key as keyof NotificationPreferences];

                            return(
                                <ToggleItem 
                                key={item.key} 
                                icon={<Icon size={18} className="text-slate-400"/>}
                                label={item.label}
                                isEnabled={isEnabled}
                                onToggle={() => handleToggle(item.key as keyof NotificationPreferences)}
                                />
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}



const ToggleItem =({
    icon, label, isEnabled, onToggle
}:{
    icon:React.ReactNode
    label:string;
    isEnabled:boolean;
    onToggle: () => void;
}) =>(
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
        <div className="flex items-center gap-3">{icon}
            <p className="text-sm font-medium text-slate-700">{label}</p>
        </div>

       <button onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition ${isEnabled ? 'bg-sky-500':'bg-slate-300'}`}
       >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${isEnabled ? 'right-0.5':'left-0.5'}`}/>
       </button>
    </div>
)