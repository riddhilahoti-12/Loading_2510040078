import React, { useState } from 'react';
import { Plane, Armchair, User, ShieldCheck, CheckSquare, Square, ArrowLeft, ArrowRight, Sparkles, FileText, Check } from 'lucide-react';

export default function BookingSummary({
  flight,
  searchParams,
  selectedSeats = [],
  passengersDetails = [],
  onBack,
  onConfirmBooking
}) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const passengerCount = passengersDetails.length || 1;
  const baseFareTotal = flight.price * passengerCount;
  const taxesAndFees = Math.round(baseFareTotal * 0.12);
  const seatFeesTotal = selectedSeats.reduce((sum, s) => sum + s.fee, 0);
  const grandTotal = baseFareTotal + taxesAndFees + seatFeesTotal;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isConfirmed) {
      onConfirmBooking({
        flight,
        searchParams,
        selectedSeats,
        passengersDetails,
        pricing: {
          baseFareTotal,
          taxesAndFees,
          seatFeesTotal,
          grandTotal,
          currency: flight.currency
        }
      });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Bar */}
      <div className="glass-panel p-5 border-sky-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Passenger Details</span>
          </button>

          <div>
            <h2 className="text-xl font-extrabold text-white font-['Inter_Tight']">
              Review & Booking Summary
            </h2>
            <p className="text-xs text-slate-400">
              Double-check flight itinerary, passenger details, and price breakdown before confirming
            </p>
          </div>
        </div>
      </div>

      {/* Main Review Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Details */}
        <div className="md:col-span-8 space-y-6">
          
          {/* 1. Flight Itinerary */}
          <div className="glass-panel p-6 border-sky-500/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-sky-400 transform -rotate-45" />
                <h3 className="text-base font-bold text-white font-['Inter_Tight']">
                  Flight Itinerary
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                {flight.airline} • {flight.flightNumber}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center text-center py-2">
              <div className="text-left">
                <p className="text-2xl font-extrabold text-white font-['Inter_Tight']">{flight.departureTime}</p>
                <p className="text-xs font-bold text-sky-300">{flight.origin}</p>
                <p className="text-[11px] text-slate-400">{flight.originCity}</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-mono mb-1">{flight.duration}</p>
                <div className="h-[2px] bg-gradient-to-r from-sky-400 to-blue-600 w-full relative">
                  <div className="w-2 h-2 rounded-full bg-sky-400 absolute left-0 top-1/2 -translate-y-1/2" />
                  <div className="w-2 h-2 rounded-full bg-blue-500 absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[10px] text-emerald-400 mt-1 font-semibold">
                  {flight.stops === 0 ? 'Direct Flight' : flight.stopDetails}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-white font-['Inter_Tight']">{flight.arrivalTime}</p>
                <p className="text-xs font-bold text-sky-300">{flight.destination}</p>
                <p className="text-[11px] text-slate-400">{flight.destinationCity}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Aircraft Model</span>
                <span>{flight.aircraft}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Baggage Allowance</span>
                <span>{flight.baggage}</span>
              </div>
            </div>
          </div>

          {/* 2. Passengers & Selected Seats */}
          <div className="glass-panel p-6 border-sky-500/20 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <User className="w-5 h-5 text-sky-400" />
              <h3 className="text-base font-bold text-white font-['Inter_Tight']">
                Passenger & Seat Allocations
              </h3>
            </div>

            <div className="space-y-3">
              {passengersDetails.map((p, idx) => {
                const seat = selectedSeats[idx];
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <p className="font-bold text-white text-sm">
                        {p.title} {p.firstName} {p.lastName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Passport: <span className="font-mono text-sky-300">{p.passportNumber}</span> • DOB: {p.dob}
                      </p>
                      {idx === 0 && p.email && (
                        <p className="text-[10px] text-slate-500">
                          Email: {p.email} • Phone: {p.phone}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      {seat ? (
                        <span className="px-3 py-1.5 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 font-mono font-bold text-xs flex items-center gap-1.5">
                          <Armchair className="w-3.5 h-3.5" />
                          <span>Seat {seat.id}</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 italic text-[11px]">Unassigned</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Price Summary Card */}
        <div className="md:col-span-4 space-y-6">
          <div className="glass-panel p-6 border-sky-500/30 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-white font-['Inter_Tight'] border-b border-white/10 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Fare Breakdown</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base Fare ({passengerCount} Passenger{passengerCount > 1 ? 's' : ''})</span>
                <span className="font-mono">{flight.currency}{baseFareTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Taxes & Aviation Fees (12%)</span>
                <span className="font-mono">{flight.currency}{taxesAndFees.toLocaleString()}</span>
              </div>

              {seatFeesTotal > 0 && (
                <div className="flex justify-between text-sky-300">
                  <span>Selected Seat Fees</span>
                  <span className="font-mono">+ {flight.currency}{seatFeesTotal.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Baggage & Airport Services</span>
                <span className="text-emerald-400 font-semibold">Included</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium">Total Amount</p>
                <p className="text-[10px] text-slate-500">Includes all taxes & fees</p>
              </div>
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400 font-['Inter_Tight']">
                {flight.currency}{grandTotal.toLocaleString()}
              </p>
            </div>

            {/* Confirmation Checkbox Guard */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded accent-sky-400 bg-slate-950 border-white/20 cursor-pointer"
                />
                <span className="leading-snug">
                  I confirm that the passenger information and flight itinerary details above are correct.
                </span>
              </label>

              <button
                type="button"
                disabled={!isConfirmed}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25 transition-all cursor-pointer"
              >
                <span>Confirm & Book Flight</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
