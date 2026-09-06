import {
  Star,
  TrendingUp,
  Award,
  CalendarDays,
} from "lucide-react";

interface PerformanceReview {
  id: string;
  employeeName: string;
  employeeId: string;
  position: string;
  department: string;
  rating: number;
  attendance: number;
  taskCompletion: number;
  patientSatisfaction: number;
  reviewDate: string;
  performance:
    | "EXCELLENT"
    | "GOOD"
    | "SATISFACTORY"
    | "NEEDS_IMPROVEMENT";
}

const performanceReviews: PerformanceReview[] = [
  {
    id: "1",
    employeeName: "Sarah Johnson",
    employeeId: "EMP-002",
    position: "Cardiologist",
    department: "Cardiology",
    rating: 4.8,
    attendance: 98,
    taskCompletion: 96,
    patientSatisfaction: 95,
    reviewDate: "2026-08-15",
    performance: "EXCELLENT",
  },
  {
    id: "2",
    employeeName: "Emily Rodriguez",
    employeeId: "EMP-003",
    position: "Registered Nurse",
    department: "Emergency",
    rating: 4.5,
    attendance: 96,
    taskCompletion: 92,
    patientSatisfaction: 93,
    reviewDate: "2026-08-10",
    performance: "GOOD",
  },
  {
    id: "3",
    employeeName: "Michael Chen",
    employeeId: "EMP-004",
    position: "Lab Technician",
    department: "Laboratory",
    rating: 4.2,
    attendance: 94,
    taskCompletion: 90,
    patientSatisfaction: 88,
    reviewDate: "2026-08-05",
    performance: "GOOD",
  },
];

const PERFORMANCE_STYLES = {
  EXCELLENT: "bg-emerald-50 text-emerald-700",
  GOOD: "bg-blue-50 text-blue-700",
  SATISFACTORY: "bg-amber-50 text-amber-700",
  NEEDS_IMPROVEMENT: "bg-red-50 text-red-700",
};

export default function StaffPerformanceSection() {
  return (
    <div className="mt-6">

      {/* Section Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Staff Performance
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Review staff performance and key metrics
        </p>
      </div>

      {/* Performance Cards */}
      <div className="space-y-4">

        {performanceReviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >

            {/* Employee Header */}
            <div className="flex items-start justify-between">

              <div>
                <h4 className="font-semibold text-slate-900">
                  {review.employeeName}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  {review.position} · {review.department}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {review.employeeId}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  PERFORMANCE_STYLES[review.performance]
                }`}
              >
                {review.performance.replace("_", " ")}
              </span>

            </div>

            {/* Performance Metrics */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Rating */}
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />

                  <p className="text-xs font-medium text-slate-500">
                    Rating
                  </p>
                </div>

                <p className="mt-2 text-xl font-semibold text-slate-900">
                  {review.rating}/5
                </p>
              </div>

              {/* Attendance */}
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-500" />

                  <p className="text-xs font-medium text-slate-500">
                    Attendance
                  </p>
                </div>

                <p className="mt-2 text-xl font-semibold text-slate-900">
                  {review.attendance}%
                </p>
              </div>

              {/* Task Completion */}
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />

                  <p className="text-xs font-medium text-slate-500">
                    Task Completion
                  </p>
                </div>

                <p className="mt-2 text-xl font-semibold text-slate-900">
                  {review.taskCompletion}%
                </p>
              </div>

              {/* Patient Satisfaction */}
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-violet-500" />

                  <p className="text-xs font-medium text-slate-500">
                    Satisfaction
                  </p>
                </div>

                <p className="mt-2 text-xl font-semibold text-slate-900">
                  {review.patientSatisfaction}%
                </p>
              </div>

            </div>

            {/* Review Date */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

              <p className="text-sm text-slate-500">
                Last Review: {review.reviewDate}
              </p>

              <button
                type="button"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                View Review
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}