interface StaffTab {
  id: string;
  label: string;
}

interface StaffTabsProps {
  tabs: StaffTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function StaffTabs({
  tabs,
  activeTab,
  onTabChange,
}: StaffTabsProps) {
  return (
    <nav className="mt-8 flex gap-6 overflow-x-auto border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}