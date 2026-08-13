import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, Home, BookmarkCheck, Plane, Armchair, ShieldCheck, Printer, Sparkles, Copy, Check } from 'lucide-react';

export default function ConfirmationScreen({
  bookingData,
  onGoHome,
  onViewTrips
}) {
  const [copied, setCopied] = useState(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti failed to trigger:', e);
    }
  }, []);

  const bookingRef = bookingData?.bookingRef || 'AVR' + Math.random().toString(36).substring(2, 6).toUpperCase();
  const flight = bookingData?.flight;
  const pricing = bookingData?.pricing;
  const seats = bookingData?.selectedSeats || [];
  const passengers = bookingData?.passengersDetails || [];

  const handleCopyRef = () => {
    navigator.clipboard.writeText(bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-500 py-6">
      
      {/* Animated Success Badge Header */}
      <div className="text-center space-y-4">
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-300 flex items-center justify-center shadow-xl shadow-emerald-500/30 border-2 border-white/20">
            <CheckCircle2 className="w-12 h-12 text-slate-950 stroke-[2.5]" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official E-Ticket Issued</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Inter_Tight'] tracking-tight">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-slate-300 font-light">
            Your journey is ready to take off. A confirmation receipt has been sent to your email.
          </p>
        </div>
      </div>

      {/* Booking Reference Pill */}
      <div className="glass-panel p-4 flex items-center justify-between border-emerald-500/30 bg-emerald-950/20">
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Booking Reference (PNR)</p>
          <p className="text-2xl font-black text-emerald-400 font-mono tracking-widest">{bookingRef}</p>
        </div>
        <button
          type="button"
          onClick={handleCopyRef}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-400/40 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Boarding Pass E-Ticket Card */}
      {flight && (
        <div className="glass-panel border-sky-500/30 overflow-hidden shadow-2xl">
          
          {/* Top Pass Header */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4 sm:p-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{flight.airlineLogo}</span>
              <div>
                <h3 className="font-extrabold text-lg tracking-wide font-['Inter_Tight']">{flight.airline}</h3>
                <p className="text-xs text-sky-200 font-mono">{flight.flightNumber} • {flight.aircraft}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded-md bg-white/20 text-xs font-bold font-mono">
                {flight.cabin}
              </span>
            </div>
          </div>

          {/* Ticket Body Content */}
          <div className="p-6 space-y-6 bg-slate-950/40">
            
            {/* Route & Times */}
            <div className="grid grid-cols-3 gap-2 items-center text-center pb-6 border-b border-white/10">
              <div className="text-left">
                <p className="text-3xl font-black text-white font-['Inter_Tight']">{flight.departureTime}</p>
                <p className="text-sm font-bold text-sky-300">{flight.origin}</p>
                <p className="text-xs text-slate-400">{flight.originCity}</p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-xs text-slate-400 font-mono mb-1">{flight.duration}</p>
                <div className="w-full flex items-center">
                  <div className="w-2 h-2 rounded-full bg-sky-400" />
                  <div className="flex-grow h-[2px] bg-sky-400 relative">
                    <Plane className="w-3.5 h-3.5 text-sky-400 absolute left-1/2 -top-1.5 -translate-x-1/2 transform -rotate-45" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-sky-400" />
                </div>
                <p className="text-[10px] text-emerald-400 mt-1 font-semibold">
                  {flight.stops === 0 ? 'Non-Stop Direct' : flight.stopDetails}
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-black text-white font-['Inter_Tight']">{flight.arrivalTime}</p>
                <p className="text-sm font-bold text-sky-300">{flight.destination}</p>
                <p className="text-xs text-slate-400">{flight.destinationCity}</p>
              </div>
            </div>

            {/* Passengers & Allocated Seats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Passengers
                </h4>
                <div className="space-y-1 text-xs font-semibold text-white">
                  {passengers.map((p, i) => (
                    <p key={i}>
                      {p.title} {p.firstName} {p.lastName} <span className="font-mono text-slate-400 font-normal">({p.passportNumber})</span>
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Assigned Seats
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {seats.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-mono font-bold">
                      Seat {s.id} ({s.type})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Paid Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Payment Complete & Verified</span>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase">Total Price Paid</p>
                <p className="text-xl font-black text-white font-mono">
                  {pricing?.currency || '₹'}{(pricing?.grandTotal || 0).toLocaleString()}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          type="button"
          onClick={handlePrintTicket}
          className="px-5 py-3 rounded-xl bg-slate-900 border border-white/10 hover:border-sky-400/40 text-white font-semibold text-xs flex items-center gap-2 transition-all"
        >
          <Printer className="w-4 h-4 text-sky-400" />
          <span>Download / Print Ticket</span>
        </button>

        <button
          type="button"
          onClick={onViewTrips}
          className="px-5 py-3 rounded-xl bg-sky-500/15 border border-sky-400/40 text-sky-300 font-semibold text-xs flex items-center gap-2 transition-all hover:bg-sky-500/25"
        >
          <BookmarkCheck className="w-4 h-4 text-sky-400" />
          <span>View My Trips</span>
        </button>

        <button
          type="button"
          onClick={onGoHome}
          className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

    </div>
  );
}
