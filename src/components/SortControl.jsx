import React from 'react';
import { ArrowUpDown, DollarSign, Zap, Clock, ThumbsUp } from 'lucide-react';

export default function SortControl({ activeSort, onSortChange }) {
  const options = [
    { id: 'recommended', label: 'Recommended', icon: ThumbsUp },
    { id: 'cheapest', label: 'Cheapest', icon: DollarSign },
    { id: 'fastest', label: 'Fastest', icon: Zap },
    { id: 'earliest', label: 'Earliest', icon: Clock },
    { id: 'latest', label: 'Latest', icon: Clock }
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
      <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mr-1 flex-shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5 text-sky-400" />
        <span>Sort by:</span>
      </span>

      <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/10 backdrop-blur-md flex-shrink-0">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = activeSort === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSortChange(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
