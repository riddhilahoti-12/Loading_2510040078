import React, { useState, useEffect } from 'react';
import FlightCard from './FlightCard';
import { ArrowLeft, SlidersHorizontal, ArrowUpDown, Loader2, Sparkles, FilterX } from 'lucide-react';

export default function FlightResults({
  searchParams,
  flights,
  onSelectFlight,
  onModifySearch,
  comparedFlights,
  onToggleCompare,
  onOpenComparison
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900); // Realistic liquid loading transition
    return () => clearTimeout(timer);
  }, [searchParams]);

  const originCode = searchParams?.fromAirport || 'HYD';
  const destCode = searchParams?.toAirport || 'DXB';
  const departureDate = searchParams?.departureDate || '15 Sep 2026';
  const returnDate = searchParams?.returnDate || '22 Sep 2026';
  const passengerCount = (searchParams?.passengers?.adults || 1) + (searchParams?.passengers?.children || 0);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-6 max-w-md mx-auto animate-in fade-in duration-300">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-sky-400/20 border-t-sky-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-indigo-500/20 border-b-indigo-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute inset-0 flex items-center justify-center text-sky-400">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-white font-['Inter_Tight']">
            Finding the best flights for you...
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing live airline pricing, seat maps, and optimal routes for {originCode} → {destCode}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Search Summary Header Bar */}
      <div className="glass-panel p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-sky-500/20">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onModifySearch}
            className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Modify Search</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Inter_Tight'] flex items-center gap-2">
                <span>{originCode}</span>
                <span className="text-sky-400">→</span>
                <span>{destCode}</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-[11px] font-mono font-bold">
                {flights.length} flights found
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {departureDate} {returnDate ? `– ${returnDate}` : ''} • {passengerCount} Passenger{passengerCount > 1 ? 's' : ''} • {searchParams?.cabinClass || 'Economy'}
            </p>
          </div>
        </div>

        {/* Comparison Drawer Launcher Button if items added */}
        {comparedFlights?.length > 0 && (
          <button
            type="button"
            onClick={onOpenComparison}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 animate-bounce"
          >
            <span>Compare Selected ({comparedFlights.length})</span>
          </button>
        )}
      </div>

      {/* Flight Cards Grid */}
      {flights.length === 0 ? (
        <div className="glass-panel p-12 text-center space-y-4 max-w-lg mx-auto">
          <FilterX className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Flights Match Your Criteria</h3>
          <p className="text-xs text-slate-400">
            Try resetting your filters or modifying your departure dates to see available flight options.
          </p>
          <button
            type="button"
            onClick={onModifySearch}
            className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {flights.map((flight, idx) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              index={idx}
              onSelect={onSelectFlight}
              isCompared={comparedFlights?.some(f => f.id === flight.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
}
