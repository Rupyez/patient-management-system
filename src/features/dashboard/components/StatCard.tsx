import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardTrend {
  value: number;
  label: string;
  positive: boolean;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  trend?: StatCardTrend;
  subtitle?: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  trend,
  subtitle,
  loading = false,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg">
      <div className="flex items-start justify-between">
        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          {/* Loading State */}
          {loading ? (
            <div className="mt-2 h-8 w-20 animate-pulse rounded bg-slate-200" />
          ) : (
            <h3 className="mt-1 truncate text-2xl font-bold text-slate-800">
              {value}
            </h3>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-1 text-xs text-slate-400">
              {subtitle}
            </p>
          )}

          {/* Trend */}
          {trend && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                  trend.positive
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {trend.positive ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                )}

                {Math.abs(trend.value)}%
              </span>

              <span className="text-xs text-slate-400">
                {trend.label}
              </span>
            </div>
          )}
        </div>

        {/* Icon */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${bgColor}`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;