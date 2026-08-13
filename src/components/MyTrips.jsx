import React, { useState, useEffect } from 'react';
import { BookmarkCheck, Plane, Armchair, Trash2, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';

export default function MyTrips({ onSelectBookFlight }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aerovaBookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.log('Failed to parse aerovaBookings:', e);
    }
  }, []);

  const handleCancelBooking = (refCode) => {
    if (confirm(`Are you sure you want to cancel booking ${refCode}?`)) {
      const updated = bookings.filter(b => b.bookingRef !== refCode);
      setBookings(updated);
      localStorage.setItem('aerovaBookings', JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 py-4">
      
      {/* Header Bar */}
      <div className="glass-panel p-5 border-sky-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center">
            <BookmarkCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white font-['Inter_Tight']">
              My Saved Trips
            </h2>
            <p className="text-xs text-slate-400">
              Manage your active flight reservations and past ticket history
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSelectBookFlight}
          className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20"
        >
          <Plane className="w-4 h-4 transform -rotate-45" />
          <span>Book New Flight</span>
        </button>
      </div>

      {/* Trips Cards Grid */}
      {bookings.length === 0 ? (
        <div className="glass-panel p-12 text-center space-y-4 max-w-lg mx-auto border-sky-500/20">
          <Ticket className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Upcoming Trips Found</h3>
          <p className="text-xs text-slate-400">
            You haven't booked any flights yet. Start a search to discover destinations around the world.
          </p>
          <button
            type="button"
            onClick={onSelectBookFlight}
            className="px-6 py-3 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs hover:bg-sky-400 transition-all inline-flex items-center gap-2"
          >
            <span>Search Flights Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((item) => {
            const flight = item.flight;
            const seats = item.selectedSeats || [];
            const passengers = item.passengersDetails || [];
            return (
              <div key={item.bookingRef} className="glass-card p-6 border border-white/10 hover:border-sky-400/40 space-y-4">
                
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{flight?.airlineLogo || '✈️'}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-base font-['Inter_Tight']">{flight?.airline}</span>
                        <span className="font-mono text-xs text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-400/20">{flight?.flightNumber}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{flight?.aircraft} • {flight?.cabin}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase">Booking Ref</p>
                      <p className="text-base font-mono font-bold text-emerald-400">{item.bookingRef}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCancelBooking(item.bookingRef)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Schedule */}
                <div className="grid grid-cols-3 gap-2 items-center text-center py-1">
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white font-['Inter_Tight']">{flight?.departureTime}</p>
                    <p className="text-xs font-bold text-sky-300">{flight?.origin}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-mono mb-1">{flight?.duration}</p>
                    <div className="h-[2px] bg-gradient-to-r from-sky-400 to-blue-600 w-full" />
                    <p className="text-[10px] text-emerald-400 mt-1 font-semibold">Confirmed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white font-['Inter_Tight']">{flight?.arrivalTime}</p>
                    <p className="text-xs font-bold text-sky-300">{flight?.destination}</p>
                  </div>
                </div>

                {/* Footer Details */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                  <div className="flex items-center gap-4">
                    <span>
                      Passengers: <strong className="text-white">{passengers.length}</strong>
                    </span>
                    <span>
                      Seats: <strong className="font-mono text-sky-300">{seats.map(s => s.id).join(', ') || 'Auto'}</strong>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Price</span>
                    <strong className="text-base font-mono text-white">{item.pricing?.currency || '₹'}{(item.pricing?.grandTotal || 0).toLocaleString()}</strong>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
