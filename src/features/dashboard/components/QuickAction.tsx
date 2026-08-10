import React from "react";
import { quickActions } from "../data/dashboardData"

const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {quickActions.map((action) =>{
        const Icon = action.icon;

        return(
            <button key={action.id} className="group flex flex-col items-center gap-2 rounded-2xl border-slate-200 bg-white p-4 transition-all hover:translate-y-0.5 hover:border-slate-300 hover:shadow-md">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.bgColor}`}>
                    <Icon className={`h-6 w-6 ${action.color}`}/>
                </div>

                <span className="text-center font-medium text-sm text-slate-700">{action.title}</span>

                <span className="text-center text-sm text-slate-400">{action.description}</span>
            </button>
        )
      })}
    </div>
  );
};

export default QuickActions;