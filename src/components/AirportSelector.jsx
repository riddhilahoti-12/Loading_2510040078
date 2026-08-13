import React, { useState, useRef, useEffect } from 'react';
import { MapPin, PlaneTakeoff, PlaneLanding, Search, Check } from 'lucide-react';
import { searchAirports } from '../data/airports';

export default function AirportSelector({ label, value, onChange, placeholder = 'Select airport', type = 'from' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  const filtered = searchAirports(query);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedAirport = searchAirports('').find(a => a.code === value) || {
    code: value,
    city: value,
    name: ''
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-[11px] font-semibold tracking-wider text-sky-300/80 uppercase mb-1.5 flex items-center gap-1.5">
        {type === 'from' ? <PlaneTakeoff className="w-3.5 h-3.5 text-sky-400" /> : <PlaneLanding className="w-3.5 h-3.5 text-sky-400" />}
        <span>{label}</span>
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-slate-950/40 hover:bg-slate-900/60 border border-white/10 hover:border-sky-400/40 rounded-xl p-3 flex items-center justify-between transition-all group backdrop-blur-md"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <span className="font-mono font-bold text-xs text-sky-400">{selectedAirport.code || '---'}</span>
          </div>
          <div className="truncate">
            <p className="text-sm font-semibold text-white truncate">
              {selectedAirport.city || placeholder}
            </p>
            {selectedAirport.name && (
              <p className="text-[11px] text-slate-400 truncate">
                {selectedAirport.name}
              </p>
            )}
          </div>
        </div>
        <MapPin className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors flex-shrink-0 ml-2" />
      </button>

      {/* Autocomplete Modal Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#0a1222]/95 border border-sky-500/30 rounded-xl shadow-2xl backdrop-blur-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="relative mb-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type city or airport code (e.g. DXB, Dubai)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950/80 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1">
            {filtered.length === 0 ? (
              <div className="py-4 text-center text-xs text-slate-500">
                No matching airports found
              </div>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    onChange(item.code);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between text-xs transition-all ${
                    value === item.code
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'hover:bg-white/5 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sky-400 bg-sky-950/80 border border-sky-400/30 px-1.5 py-0.5 rounded text-[11px]">
                      {item.code}
                    </span>
                    <div>
                      <span className="font-medium text-white">{item.city}</span>
                      <span className="text-slate-400 text-[10px] block">{item.name}, {item.country}</span>
                    </div>
                  </div>
                  {value === item.code && <Check className="w-4 h-4 text-sky-400" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
