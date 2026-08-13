import React from 'react';
import { Search, Plane, Armchair, UserCheck, ClipboardCheck, CheckCircle2 } from 'lucide-react';

export default function ProgressStepper({ currentStep = 3 }) {
  const steps = [
    { id: 1, label: 'Search', icon: Search },
    { id: 2, label: 'Flight', icon: Plane },
    { id: 3, label: 'Seat Map', icon: Armchair },
    { id: 4, label: 'Passenger', icon: UserCheck },
    { id: 5, label: 'Review', icon: ClipboardCheck },
    { id: 6, label: 'Confirmed', icon: CheckCircle2 }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-2">
      <div className="flex items-center justify-between relative">
        
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-900 -translate-y-1/2 -z-10 rounded-full" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-sky-500 to-blue-600 -translate-y-1/2 -z-10 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center group">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                    : isCurrent
                    ? 'bg-slate-950 border-2 border-sky-400 text-sky-400 shadow-xl shadow-sky-400/20 scale-110'
                    : 'bg-slate-900 border border-white/10 text-slate-500'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5 text-slate-950" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`mt-2 text-[10px] sm:text-xs font-semibold tracking-wide hidden sm:block ${
                  isCurrent ? 'text-sky-300' : isCompleted ? 'text-white' : 'text-slate-500'
                }`}
              >
                0{step.id} {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
