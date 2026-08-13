import React, { useState, useMemo } from 'react';
import FlightCard from './FlightCard';
import FilterPanel from './FilterPanel';
import SortControl from './SortControl';
import { ArrowLeft, FilterX, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function FlightResults({
  searchParams,
  flights = [],
  onSelectFlight,
  onModifySearch,
  comparedFlights = [],
  onToggleCompare,
  onOpenComparison
}) {
  const [activeSort, setActiveSort] = useState('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available unique airlines
  const availableAirlines = useMemo(() => {
    return Array.from(new Set(flights.map(f => f.airline)));
  }, [flights]);

  // Max price limit
  const maxPriceLimit = useMemo(() => {
    return Math.max(...flights.map(f => f.price), 30000);
  }, [flights]);

  const initialFilterState = {
    stops: 'all',
    maxPrice: maxPriceLimit,
    airlines: [],
    departureTime: 'all',
    refundableOnly: false
  };

  const [filters, setFilters] = useState(initialFilterState);

  // Filter count calculation
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.stops !== 'all') count++;
    if (filters.maxPrice < maxPriceLimit) count++;
    if (filters.airlines.length > 0) count++;
    if (filters.departureTime !== 'all') count++;
    if (filters.refundableOnly) count++;
    return count;
  }, [filters, maxPriceLimit]);

  // Filtered & Sorted Flights
  const processedFlights = useMemo(() => {
    let result = flights.filter((flight) => {
      // 1. Stops filter
      if (filters.stops !== 'all') {
        if (filters.stops === '0' && flight.stops !== 0) return false;
        if (filters.stops === '1' && flight.stops !== 1) return false;
        if (filters.stops === '2+' && flight.stops < 2) return false;
      }

      // 2. Max price filter
      if (flight.price > filters.maxPrice) return false;

      // 3. Airlines filter
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) {
        return false;
      }

      // 4. Departure time window
      if (filters.departureTime !== 'all') {
        const hour = parseInt(flight.departureTime.split(':')[0], 10);
        if (filters.departureTime === 'early' && (hour < 0 || hour >= 6)) return false;
        if (filters.departureTime === 'morning' && (hour < 6 || hour >= 12)) return false;
        if (filters.departureTime === 'afternoon' && (hour < 12 || hour >= 18)) return false;
        if (filters.departureTime === 'night' && (hour < 18 || hour >= 24)) return false;
      }

      // 5. Refundable only
      if (filters.refundableOnly && !flight.refundable) return false;

      return true;
    });

    // Sort processing
    if (activeSort === 'cheapest') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'fastest') {
      const parseDuration = (d) => {
        const parts = d.match(/(\d+)h\s*(\d+)?/);
        if (!parts) return 999;
        const h = parseInt(parts[1], 10) || 0;
        const m = parseInt(parts[2], 10) || 0;
        return h * 60 + m;
      };
      result.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
    } else if (activeSort === 'earliest') {
      result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    } else if (activeSort === 'latest') {
      result.sort((a, b) => b.departureTime.localeCompare(a.departureTime));
    }

    return result;
  }, [flights, filters, activeSort]);

  const originCode = searchParams?.fromAirport || 'HYD';
  const destCode = searchParams?.toAirport || 'DXB';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Toolbar Bar */}
      <div className="glass-panel p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-sky-500/20">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onModifySearch}
            className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modify Search</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Inter_Tight'] flex items-center gap-2">
                <span>{originCode}</span>
                <span className="text-sky-400">→</span>
                <span>{destCode}</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-[11px] font-mono font-bold">
                {processedFlights.length} of {flights.length} flights
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle & Comparison Launcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-sky-300 flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({activeFilterCount})</span>
          </button>

          {comparedFlights?.length > 0 && (
            <button
              type="button"
              onClick={onOpenComparison}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20"
            >
              <span>Compare ({comparedFlights.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onReset={() => setFilters(initialFilterState)}
            availableAirlines={availableAirlines}
            maxPriceLimit={maxPriceLimit}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-1 border-b border-white/10 pb-4">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              onReset={() => setFilters(initialFilterState)}
              availableAirlines={availableAirlines}
              maxPriceLimit={maxPriceLimit}
              activeFilterCount={activeFilterCount}
            />
          </div>
        )}

        {/* Flight Cards Column */}
        <div className="col-span-1 lg:col-span-8 space-y-4">
          
          {/* Sorting Bar */}
          <div className="glass-panel p-3 flex items-center justify-between">
            <SortControl
              activeSort={activeSort}
              onSortChange={setActiveSort}
            />
          </div>

          {/* Results List */}
          {processedFlights.length === 0 ? (
            <div className="glass-panel p-12 text-center space-y-4">
              <FilterX className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Flights Match Your Filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your price range, clearing airline selections, or choosing any flight stops.
              </p>
              <button
                type="button"
                onClick={() => setFilters(initialFilterState)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs hover:bg-sky-400 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            processedFlights.map((flight, idx) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                index={idx}
                onSelect={onSelectFlight}
                isCompared={comparedFlights?.some(f => f.id === flight.id)}
                onToggleCompare={onToggleCompare}
              />
            ))
          )}

        </div>
      </div>
    </div>
  );
}
