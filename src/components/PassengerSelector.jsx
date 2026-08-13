import React, { useState, useRef, useEffect } from 'react';
import { Users, User, ChevronDown, Check } from 'lucide-react';

export default function PassengerSelector({ passengers, setPassengers, cabinClass, setCabinClass }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const cabins = [
    'Economy',
    'Premium Economy',
    'Business',
    'First Class'
  ];

  const updateCount = (type, delta) => {
    setPassengers(prev => {
      const nextVal = Math.max(type === 'adults' ? 1 : 0, prev[type] + delta);
      return { ...prev, [type]: nextVal };
    });
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-[11px] font-semibold tracking-wider text-sky-300/80 uppercase mb-1.5 flex items-center gap-1.5">
        <Users className="w-3.5 h-3.5 text-sky-400" />
        <span>Passengers & Cabin</span>
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-slate-950/40 hover:bg-slate-900/60 border border-white/10 hover:border-sky-400/40 rounded-xl p-3 flex items-center justify-between transition-all group backdrop-blur-md"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-sky-400" />
          </div>
          <div className="truncate">
            <p className="text-sm font-semibold text-white truncate">
              {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
            </p>
            <p className="text-[11px] text-sky-400/90 truncate">
              {cabinClass}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 z-50 w-72 sm:w-80 bg-[#0a1222]/95 border border-sky-500/30 rounded-xl shadow-2xl backdrop-blur-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Passenger Count
          </h4>

          <div className="space-y-3 mb-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Adults</p>
                <p className="text-[10px] text-slate-400">12+ years</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateCount('adults', -1)}
                  disabled={passengers.adults <= 1}
                  className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 text-white font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700"
                >
                  -
                </button>
                <span className="w-5 text-center text-xs font-semibold text-white">{passengers.adults}</span>
                <button
                  type="button"
                  onClick={() => updateCount('adults', 1)}
                  className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 text-white font-bold text-sm hover:bg-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Children</p>
                <p className="text-[10px] text-slate-400">2-11 years</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateCount('children', -1)}
                  disabled={passengers.children <= 0}
                  className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 text-white font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700"
                >
                  -
                </button>
                <span className="w-5 text-center text-xs font-semibold text-white">{passengers.children}</span>
                <button
                  type="button"
                  onClick={() => updateCount('children', 1)}
                  className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 text-white font-bold text-sm hover:bg-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Infants</p>
                <p className="text-[10px] text-slate-400">Under 2 years</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateCount('infants', -1)}
                  disabled={passengers.infants <= 0}
                  className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 text-white font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700"
                >
                  -
                </button>
                <span className="w-5 text-center text-xs font-semibold text-white">{passengers.infants}</span>
                <button
                  type="button"
                  onClick={() => updateCount('infants', 1)}
                  className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 text-white font-bold text-sm hover:bg-slate-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 border-t border-white/10 pt-3">
            Cabin Class
          </h4>

          <div className="grid grid-cols-2 gap-1.5">
            {cabins.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCabinClass(item)}
                className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium flex items-center justify-between transition-all ${
                  cabinClass === item
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-white/5 border border-white/5'
                }`}
              >
                <span>{item}</span>
                {cabinClass === item && <Check className="w-3 h-3 text-sky-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
