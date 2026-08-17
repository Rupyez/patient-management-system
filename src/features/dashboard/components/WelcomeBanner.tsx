// WelcomeBanner.tsx
import { Calendar, ClockIcon, Download, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface WelcomeBannerProps {
  userName: string;
  onRefresh?: () => void;  // Made optional
  isLoading?: boolean;      // Made optional
}

export default function WelcomeBanner({ 
  userName, 
  onRefresh, 
  isLoading = false 
}: WelcomeBannerProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("Good Morning");
  const [localLoading, setLocalLoading] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      setGreeting("Good Morning ☀️");
    } else if (hour < 17) {
      setGreeting("Good Afternoon 🌤️");
    } else if (hour < 21) {
      setGreeting("Good Evening 🌅");
    } else {
      setGreeting("Good Night 🌙");
    }
  }, [currentTime]);

  const handleRefresh = async () => {
    // If there's an external refresh handler, use it
    if (onRefresh) {
      onRefresh();
      return;
    }

    // Otherwise, handle refresh locally
    setLocalLoading(true);
    setRefreshMessage("Refreshing...");
    
    try {
      // Simulate refresh with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRefreshMessage("✅ Refreshed successfully!");
      
      // You can add actual refresh logic here
      // For example, re-fetch data, reload page data, etc.
      
      setTimeout(() => {
        setRefreshMessage("");
      }, 3000);
    } catch (error) {
      setRefreshMessage("❌ Refresh failed");
      setTimeout(() => {
        setRefreshMessage("");
      }, 3000);
    } finally {
      setLocalLoading(false);
    }
  };

  const isRefreshing = isLoading || localLoading;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-sky-500 via-sky-600 to-indigo-600 p-6 md:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white" />
        <div className="absolute right-1/2 top-1/2 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-white" />
      </div>

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Left: Greeting */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              {greeting}
            </h1>
            <span className="text-2xl md:text-3xl">👋</span>
          </div>
          <p className="mt-1 text-base text-sky-100 md:text-lg">
            Welcome back, <span className="font-semibold text-white">{userName}</span>
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-sky-100">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <ClockIcon size={16} />
              {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          </div>
          {/* Refresh status message */}
          {refreshMessage && (
            <div className="mt-2 text-sm text-white/90 animate-pulse">
              {refreshMessage}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="mt-4 flex items-center gap-3 md:mt-0">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/30 disabled:opacity-50"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/30">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}