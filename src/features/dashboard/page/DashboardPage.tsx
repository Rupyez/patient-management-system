import WelcomeBanner from "../components/WelcomeBanner";
import StatCard from "../components/StatCard";
import QuickActions from "../components/QuickAction";
import ActivityFeed from "../components/ActivityFeed";

import type{ActivityItem} from "../types/dashboard";
import { dashboardStats } from "../data/dashboardData";

export default function DashboardPage() {
  const userName = "Rupesh";
  const isLoading = false;

    const activities: ActivityItem[] = [];

  const handleRefresh = () => {
    console.log("Dashboard refreshed");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner
        userName={userName}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat) => (
            <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
            trend={stat.trend}
            subtitle={stat.subtitle}
            />
          ))}
      </div>

      {/* Quick Actions */}
      <QuickActions/>

      <ActivityFeed activities={activities} onMarkAllRead={() => {console.log("Mark all read")}} onItemClick={(id) => {console.log("Activity clicked", id)}}/>
    </div>
  );
}