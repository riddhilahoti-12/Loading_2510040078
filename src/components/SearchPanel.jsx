import React, { useState } from 'react';
import { ArrowLeftRight, Calendar, Search, AlertCircle, Plus, Trash2, Sparkles } from 'lucide-react';
import AirportSelector from './AirportSelector';
import PassengerSelector from './PassengerSelector';

export default function SearchPanel({ onSearch }) {
  const [tripType, setTripType] = useState('round'); // 'round' | 'oneway' | 'multicity'
  const [fromAirport, setFromAirport] = useState('HYD');
  const [toAirport, setToAirport] = useState('DXB');
  const [departureDate, setDepartureDate] = useState('2026-09-15');
  const [returnDate, setReturnDate] = useState('2026-09-22');
  
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState('Economy');
  
  // Multi-City segments
  const [multiSegments, setMultiSegments] = useState([
    { from: 'HYD', to: 'DXB', date: '2026-09-15' },
    { from: 'DXB', to: 'LHR', date: '2026-09-20' },
    { from: 'LHR', to: 'HYD', date: '2026-09-27' }
  ]);

  const [validationError, setValidationError] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const handleAddMultiSegment = () => {
    if (multiSegments.length >= 5) {
      setValidationError('Maximum 5 segments allowed for multi-city search.');
      return;
    }
    const lastSeg = multiSegments[multiSegments.length - 1];
    setMultiSegments([
      ...multiSegments,
      { from: lastSeg ? lastSeg.to : 'DXB', to: 'JFK', date: '2026-10-01' }
    ]);
  };

  const handleRemoveMultiSegment = (index) => {
    if (multiSegments.length <= 2) {
      setValidationError('Multi-city itinerary requires at least 2 segments.');
      return;
    }
    setMultiSegments(multiSegments.filter((_, i) => i !== index));
  };

  const updateMultiSegment = (index, field, value) => {
    const updated = [...multiSegments];
    updated[index][field] = value;
    setMultiSegments(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (tripType === 'multicity') {
      for (let i = 0; i < multiSegments.length; i++) {
        if (multiSegments[i].from === multiSegments[i].to) {
          setValidationError(`Segment ${i + 1}: Departure and Destination airports cannot be identical.`);
          return;
        }
        if (!multiSegments[i].date) {
          setValidationError(`Segment ${i + 1}: Please select a departure date.`);
          return;
        }
      }
      onSearch({
        tripType: 'multicity',
        segments: multiSegments,
        passengers,
        cabinClass
      });
      return;
    }

    // Standard Round / One Way Validation
    if (fromAirport === toAirport) {
      setValidationError('Origin and destination airports cannot be the same.');
      return;
    }

    if (!departureDate) {
      setValidationError('Please select a departure date.');
      return;
    }

    if (tripType === 'round') {
      if (!returnDate) {
        setValidationError('Please select a return date for round trip flights.');
        return;
      }
      if (new Date(returnDate) < new Date(departureDate)) {
        setValidationError('Return date cannot be earlier than departure date.');
        return;
      }
    }

    onSearch({
      tripType,
      fromAirport,
      toAirport,
      departureDate,
      returnDate: tripType === 'round' ? returnDate : null,
      passengers,
      cabinClass
    });
  };

  return (
    <div className="glass-panel p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl relative border-sky-500/20">
      
      {/* Trip Type Selector Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/10 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setTripType('round')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              tripType === 'round'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Round Trip
          </button>
          <button
            type="button"
            onClick={() => setTripType('oneway')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              tripType === 'oneway'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            One Way
          </button>
          <button
            type="button"
            onClick={() => setTripType('multicity')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              tripType === 'multicity'
                ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 shadow-lg shadow-sky-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-City</span>
          </button>
        </div>

        <div className="text-xs text-sky-400/80 font-mono hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Live Availability Database Active</span>
        </div>
      </div>

      {/* Validation Error Toast */}
      {validationError && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span className="font-medium">{validationError}</span>
        </div>
      )}

      {/* Search Inputs Body */}
      <form onSubmit={handleSubmit}>
        {tripType !== 'multicity' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* Origin */}
            <div className="md:col-span-4 relative">
              <AirportSelector
                label="From"
                value={fromAirport}
                onChange={setFromAirport}
                placeholder="Origin Airport"
                type="from"
              />
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center -my-2 md:my-0">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap Origin and Destination"
                className="w-10 h-10 rounded-full bg-slate-900 border border-sky-400/40 text-sky-400 hover:bg-sky-500 hover:text-slate-950 flex items-center justify-center transition-all duration-300 shadow-md group z-10"
              >
                <ArrowLeftRight className={`w-4 h-4 transition-transform duration-300 ${isSwapping ? 'rotate-180 scale-125' : 'group-hover:rotate-180'}`} />
              </button>
            </div>

            {/* Destination */}
            <div className="md:col-span-4 relative">
              <AirportSelector
                label="To"
                value={toAirport}
                onChange={setToAirport}
                placeholder="Destination Airport"
                type="to"
              />
            </div>

            {/* Departure & Return Dates */}
            <div className="md:col-span-3 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-sky-300/80 uppercase mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>Depart</span>
                </label>
                <input
                  type="date"
                  value={departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-slate-950/40 border border-white/10 hover:border-sky-400/40 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400 transition-all backdrop-blur-md"
                />
              </div>

              {tripType === 'round' ? (
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-sky-300/80 uppercase mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>Return</span>
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    min={departureDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-slate-950/40 border border-white/10 hover:border-sky-400/40 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400 transition-all backdrop-blur-md"
                  />
                </div>
              ) : (
                <div className="opacity-40 pointer-events-none">
                  <label className="block text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-1.5">
                    Return
                  </label>
                  <div className="w-full bg-slate-950/20 border border-white/5 rounded-xl p-3 text-xs text-slate-500">
                    One Way
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Multi-City Form Segments */
          <div className="space-y-4">
            {multiSegments.map((seg, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/40 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-3 items-end relative">
                <span className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-sky-500/20 border border-sky-400/40 text-[10px] font-mono text-sky-300">
                  Flight Leg 0{idx + 1}
                </span>

                <div className="md:col-span-4">
                  <AirportSelector
                    label="From"
                    value={seg.from}
                    onChange={(val) => updateMultiSegment(idx, 'from', val)}
                    type="from"
                  />
                </div>

                <div className="md:col-span-4">
                  <AirportSelector
                    label="To"
                    value={seg.to}
                    onChange={(val) => updateMultiSegment(idx, 'to', val)}
                    type="to"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-[11px] font-semibold tracking-wider text-sky-300/80 uppercase mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>Depart Date</span>
                  </label>
                  <input
                    type="date"
                    value={seg.date}
                    onChange={(e) => updateMultiSegment(idx, 'date', e.target.value)}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="md:col-span-1 flex justify-end">
                  {multiSegments.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMultiSegment(idx)}
                      className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all"
                      title="Remove Flight Leg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-start">
              <button
                type="button"
                onClick={handleAddMultiSegment}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-sky-400/30 text-sky-300 hover:bg-sky-500/10 text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Flight Leg</span>
              </button>
            </div>
          </div>
        )}

        {/* Passengers & Search Action Footer Row */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-72">
            <PassengerSelector
              passengers={passengers}
              setPassengers={setPassengers}
              cabinClass={cabinClass}
              setCabinClass={setCabinClass}
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-sky-500/25 hover:shadow-sky-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Search Flights</span>
            <Search className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
}
