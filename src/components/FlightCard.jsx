import React from 'react';
import { Plane, Luggage, ShieldCheck, CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';

export default function FlightCard({
  flight,
  index = 0,
  onSelect,
  isCompared = false,
  onToggleCompare
}) {
  return (
    <div
      style={{ animationDelay: `${index * 90}ms` }}
      className="glass-card p-5 sm:p-6 border border-white/10 hover:border-sky-400/50 bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-xl transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-500/10 group relative animate-in fade-in slide-in-from-bottom-6 fill-mode-backwards"
    >
      {/* Top Bar: Airline, Tags, Refundability */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
        
        {/* Airline Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 group-hover:border-sky-400/40 transition-transform">
            <span>{flight.airlineLogo || '✈️'}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white tracking-wide font-['Inter_Tight']">
                {flight.airline}
              </h4>
              <span className="text-[11px] font-mono text-sky-400/90 font-medium px-2 py-0.5 rounded bg-sky-950/60 border border-sky-400/20">
                {flight.flightNumber}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {flight.aircraft} • {flight.cabin}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {flight.tags?.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-[10px] font-semibold tracking-wider uppercase"
            >
              {tag}
            </span>
          ))}

          {flight.refundable ? (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Refundable</span>
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-medium">
              Non-refundable
            </span>
          )}
        </div>
      </div>

      {/* Flight Schedule Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-5">
        
        {/* Departure */}
        <div className="md:col-span-3 text-left">
          <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Inter_Tight']">
            {flight.departureTime}
          </p>
          <p className="text-sm font-bold text-sky-300 mt-0.5">{flight.origin}</p>
          <p className="text-xs text-slate-400">{flight.originCity}</p>
        </div>

        {/* Flight Duration Visualizer */}
        <div className="md:col-span-6 flex flex-col items-center justify-center px-2 py-2">
          <div className="flex items-center justify-between w-full text-[11px] text-slate-400 mb-1 font-mono">
            <span>{flight.duration}</span>
            <span className={flight.stops === 0 ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
              {flight.stops === 0 ? 'Direct Flight' : `${flight.stops} Stop`}
            </span>
          </div>

          {/* Timeline Bar */}
          <div className="relative w-full flex items-center">
            <div className="w-2 h-2 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
            <div className="flex-grow h-[2px] bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 py-0.5 rounded-full border border-sky-400/40">
                <Plane className="w-3.5 h-3.5 text-sky-400 transform -rotate-45" />
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
          </div>

          <p className="text-[10px] text-slate-400 mt-1.5 text-center truncate max-w-xs">
            {flight.stopDetails}
          </p>
        </div>

        {/* Arrival */}
        <div className="md:col-span-3 text-right">
          <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Inter_Tight']">
            {flight.arrivalTime}
          </p>
          <p className="text-sm font-bold text-sky-300 mt-0.5">{flight.destination}</p>
          <p className="text-xs text-slate-400">{flight.destinationCity}</p>
        </div>
      </div>

      {/* Bottom Row: Baggage, Seats, Price & Action */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Baggage & Seats Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-white/5">
            <Luggage className="w-3.5 h-3.5 text-sky-400" />
            <span>{flight.baggage}</span>
          </div>

          {flight.seatsAvailable <= 10 && (
            <span className="text-[11px] font-medium text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
              <Sparkles className="w-3 h-3" />
              <span>Only {flight.seatsAvailable} seats left</span>
            </span>
          )}
        </div>

        {/* Price & Actions */}
        <div className="flex items-center gap-4 ml-auto">
          
          {/* Compare Toggle Button */}
          {onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(flight)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isCompared
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>
          )}

          {/* Price Display */}
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Per Passenger</p>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-sky-400 font-['Inter_Tight']">
              {flight.currency}{flight.price.toLocaleString()}
            </p>
          </div>

          {/* Select Button */}
          <button
            type="button"
            onClick={() => onSelect(flight)}
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 transition-all cursor-pointer group/btn"
          >
            <span>Select Seat</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
