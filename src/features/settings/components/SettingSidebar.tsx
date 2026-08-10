
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  LogOut,
} from 'lucide-react';
import type { SettingsSection } from '../types/settings';



interface SettingsSidebarProps{
    activeSection: SettingsSection;
    onSectionChange: (section: SettingsSection) => void;
}


const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'system', label: 'System', icon: Globe },

] as const;


export default function SettingSidebar({activeSection, onSectionChange}:SettingsSidebarProps){

    return (
       <div className='w-64 shrink-0'>
            <div className='sticky top-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
                {/* Header */}
                <p className='mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400'>Settings</p>

                {/* Navigations */}
                <nav className='space-y-1'>
                    {menuItems.map((item) =>{
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return(
                            <button key={item.id} onClick={() => onSectionChange(item.id)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-sky-50 text-sky-700 shadow-sm':'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}
                            >
                                <Icon size={18} className={isActive ?'text-sky-600':'text-slate-400'}/>
                                <span>{item.label}</span>
                                {isActive && <span className='ml-auto h-1.5 w-1.5 rounded-full bg-sky-500'/>}
                            </button>
                        )
                    })}
                </nav>

                {/* Logout Button */}
                <div className='mt-6 border-t border-slate-200 pt-4'>
                    <button className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50'>
                        <LogOut size={18}/>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
       </div>
    )
}