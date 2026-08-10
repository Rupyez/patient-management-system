import React from "react";
import { Bell } from "lucide-react";

import type{ ActivityItem } from "../types/dashboard";

interface ActivityFeedProps {
  activities: ActivityItem[];
  onMarkAllRead: () => void;
  onItemClick: (id: string) => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  onMarkAllRead,
  onItemClick,
}) => {
  const unreadCount = activities.filter(
    (activity) => !activity.read
  ).length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-800">
            Activity Feed
          </h2>

          {unreadCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-500 px-1.5 text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="text-xs font-medium text-sky-600 transition-colors hover:text-sky-700"
            >
              Mark all read
            </button>
          )}

          <button className="text-xs text-slate-400 transition-colors hover:text-slate-600">
            View all
          </button>
        </div>
      </div>

      {/* Activity List */}
      <div className="max-h-120 space-y-3 overflow-y-auto pr-2">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell size={32} className="text-slate-300" />

            <p className="mt-2 text-sm text-slate-500">
              No recent activity
            </p>
          </div>
        ) : (
          activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                onClick={() => onItemClick(activity.id)}
                className={`group flex cursor-pointer items-start gap-3 rounded-xl p-3 transition hover:bg-slate-50 ${
                  !activity.read ? "bg-sky-50/50" : ""
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    !activity.read
                      ? "bg-sky-100"
                      : "bg-slate-100"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${activity.color}`}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {activity.title}
                    </p>

                    <span className="whitespace-nowrap text-xs text-slate-400">
                      {new Date(
                        activity.timestamp
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="truncate text-sm text-slate-600">
                    {activity.description}
                  </p>

                  {activity.user && (
                    <p className="mt-0.5 text-xs text-slate-400">
                      by {activity.user}
                    </p>
                  )}

                  {!activity.read && (
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;