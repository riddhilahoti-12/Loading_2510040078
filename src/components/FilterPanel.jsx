import React from 'react';
import { SlidersHorizontal, RotateCcw, Check, Sparkles, DollarSign, Clock, ShieldCheck, Luggage } from 'lucide-react';

export default function FilterPanel({
  filters,
  setFilters,
  onReset,
  availableAirlines = [],
  maxPriceLimit = 30000,
  activeFilterCount = 0
}) {
  const handleStopsChange = (stopVal) => {
    setFilters(prev => ({ ...prev, stops: stopVal }));
  };

  const handleAirlineToggle = (airlineName) => {
    setFilters(prev => {
      const isSelected = prev.airlines.includes(airlineName);
      const updated = isSelected
        ? prev.airlines.filter(a => a !== airlineName)
        : [...prev.airlines, airlineName];
      return { ...prev, airlines: updated };
    });
  };

  return (
    <div className="glass-panel p-5 border border-sky-500/20 space-y-6">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-bold text-white tracking-wide font-['Inter_Tight']">
            Filter Flights
          </h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-sky-500 text-slate-950 font-bold text-[10px]">
              {activeFilterCount}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Stops Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300">Stops</label>
        <div className="grid grid-cols-4 gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/10">
          {[
            { id: 'all', label: 'Any' },
            { id: '0', label: 'Non-stop' },
            { id: '1', label: '1 Stop' },
            { id: '2+', label: '2+ Stops' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleStopsChange(item.id)}
              className={`py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                filters.stops === item.id
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Maximum Price Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-sky-400" />
            <span>Max Price</span>
          </span>
          <span className="font-mono font-bold text-sky-400">
            ₹{filters.maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="15000"
          max={maxPriceLimit}
          step="500"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-sky-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>₹15,000</span>
          <span>₹{maxPriceLimit.toLocaleString()}</span>
        </div>
      </div>

      {/* 3. Airline Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300">Airlines</label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {availableAirlines.map((airline) => {
            const checked = filters.airlines.includes(airline);
            return (
              <button
                key={airline}
                type="button"
                onClick={() => handleAirlineToggle(airline)}
                className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-all ${
                  checked
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-400/40'
                    : 'bg-slate-950/40 text-slate-400 hover:bg-white/5 border border-white/5'
                }`}
              >
                <span>{airline}</span>
                {checked && <Check className="w-3.5 h-3.5 text-sky-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Departure Window */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>Departure Window</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Times' },
            { id: 'early', label: 'Early (00-06)' },
            { id: 'morning', label: 'Morning (06-12)' },
            { id: 'afternoon', label: 'Afternoon (12-18)' },
            { id: 'night', label: 'Night (18-24)' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, departureTime: item.id }))}
              className={`p-2 rounded-lg text-[11px] font-medium text-left transition-all ${
                filters.departureTime === item.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                  : 'bg-slate-950/40 text-slate-400 hover:bg-white/5 border border-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Refundable Only Toggle */}
      <div className="pt-2 border-t border-white/10">
        <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Refundable Fares Only</span>
          </span>
          <input
            type="checkbox"
            checked={filters.refundableOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, refundableOnly: e.target.checked }))}
            className="w-4 h-4 rounded accent-sky-400 bg-slate-950 border-white/20 cursor-pointer"
          />
        </label>
      </div>

    </div>
  );
}
