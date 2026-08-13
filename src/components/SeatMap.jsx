import React, { useState, useMemo } from 'react';
import { Armchair, ArrowLeft, ArrowRight, Sparkles, AlertCircle, Check, Info, Lock } from 'lucide-react';

export default function SeatMap({
  flight,
  passengerCount = 1,
  selectedSeats = [],
  setSelectedSeats,
  onBack,
  onContinue
}) {
  const [hoveredSeat, setHoveredSeat] = useState(null);

  // Generate 20 rows of seats (A B C | Aisle | D E F)
  const rowsCount = 20;
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];

  // Seed occupied seats deterministically for mock realism
  const occupiedSet = useMemo(() => {
    const occupied = new Set([
      '1B', '2E', '3C', '4A', '5D', '6F', '8B', '9C', '11A', '12E', '14D', '15F', '17B', '18C', '19A'
    ]);
    return occupied;
  }, []);

  const getSeatInfo = (row, col) => {
    const seatId = `${row}${col}`;
    const isOccupied = occupiedSet.has(seatId);
    const isSelected = selectedSeats.some(s => s.id === seatId);
    
    // Premium Rows 1-3 ($1800) & Exit Row 10 ($1200)
    let isPremium = row <= 3 || row === 10;
    let fee = 0;
    if (row <= 3) fee = 1800;
    else if (row === 10) fee = 1200;

    let type = 'Standard';
    if (col === 'A' || col === 'F') type = 'Window';
    else if (col === 'C' || col === 'D') type = 'Aisle';
    else type = 'Middle';

    return {
      id: seatId,
      row,
      col,
      isOccupied,
      isSelected,
      isPremium,
      fee,
      type
    };
  };

  const handleSeatClick = (seat) => {
    if (seat.isOccupied) return;

    if (seat.isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= passengerCount) {
        // If max passengers reached, replace first seat or alert
        if (passengerCount === 1) {
          setSelectedSeats([seat]);
        } else {
          alert(`You can select up to ${passengerCount} seat(s) for your booking.`);
        }
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const totalSeatFee = selectedSeats.reduce((acc, curr) => acc + curr.fee, 0);

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Header Card */}
      <div className="glass-panel p-5 border-sky-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Flights</span>
          </button>

          <div>
            <h2 className="text-xl font-extrabold text-white font-['Inter_Tight'] flex items-center gap-2">
              <span>Select Seat(s) for {flight.airline}</span>
              <span className="font-mono text-xs text-sky-400 font-normal">({flight.flightNumber})</span>
            </h2>
            <p className="text-xs text-slate-400">
              {flight.aircraft} • {passengerCount} Passenger{passengerCount > 1 ? 's' : ''} • Select {passengerCount - selectedSeats.length} more seat(s)
            </p>
          </div>
        </div>

        {/* Selected Seats Summary */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Extra Seat Fee</p>
            <p className="text-lg font-bold text-sky-400 font-mono">
              +₹{totalSeatFee.toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            disabled={selectedSeats.length !== passengerCount}
            onClick={onContinue}
            className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all"
          >
            <span>Continue to Passenger Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Legend & Seat Info Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Seat Legend */}
        <div className="md:col-span-4 glass-panel p-5 space-y-4 h-fit sticky top-24">
          <h3 className="text-sm font-bold text-white font-['Inter_Tight'] border-b border-white/10 pb-2">
            Seat Map Legend
          </h3>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-white/20 flex items-center justify-center font-bold text-[10px] text-white">
                12A
              </div>
              <span>Available (Standard ₹0)</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-sky-500 text-slate-950 border border-sky-300 flex items-center justify-center font-bold text-[10px]">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-sky-300 font-semibold">Selected Seat</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/50 text-amber-300 flex items-center justify-center font-bold text-[10px]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span>Premium / Legroom (+₹1,500+)</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-slate-950 border border-white/5 opacity-40 text-slate-500 flex items-center justify-center font-bold text-[10px] cursor-not-allowed">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <span className="text-slate-500">Occupied Seat</span>
            </div>
          </div>

          {/* Live Hover Tooltip Card */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>Seat Inspection</span>
            </h4>
            {hoveredSeat ? (
              <div className="p-3 rounded-xl bg-slate-950/80 border border-sky-400/30 space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-sm font-bold text-white">Seat {hoveredSeat.id}</span>
                  <span className="text-xs font-semibold text-sky-400">{hoveredSeat.type}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Row {hoveredSeat.row} • {hoveredSeat.isPremium ? 'Extra Legroom Premium' : 'Standard Comfort'}
                </p>
                <p className="text-xs font-bold text-emerald-400 pt-1">
                  {hoveredSeat.fee > 0 ? `+₹${hoveredSeat.fee.toLocaleString()} Seat Fee` : 'Included at ₹0'}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Hover over any seat on the aircraft map to view legroom, position, and pricing details.
              </p>
            )}
          </div>

          {/* Currently Selected Seats List */}
          {selectedSeats.length > 0 && (
            <div className="pt-3 border-t border-white/10">
              <label className="text-xs font-semibold text-sky-300 block mb-2">
                Your Selected Seat(s):
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map(s => (
                  <span
                    key={s.id}
                    className="px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-mono font-bold flex items-center gap-1.5"
                  >
                    <span>{s.id} ({s.type})</span>
                    <button
                      type="button"
                      onClick={() => handleSeatClick(s)}
                      className="text-slate-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Aircraft Cabin Fuselage Layout */}
        <div className="md:col-span-8 glass-panel p-6 border-sky-500/20 flex flex-col items-center">
          
          {/* Cockpit Nose Graphic */}
          <div className="w-48 h-14 rounded-t-full bg-gradient-to-b from-sky-500/20 to-slate-900 border-t border-x border-sky-400/30 flex items-center justify-center text-xs font-mono text-sky-300 font-bold mb-6 tracking-widest uppercase">
            <span>✈️ Cockpit Front</span>
          </div>

          {/* Column Headers */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3 w-full max-w-sm mb-4 text-center font-mono font-bold text-xs text-slate-400">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span className="text-sky-400 font-normal text-[10px] flex items-center justify-center">AISLE</span>
            <span>D</span>
            <span>E</span>
            <span>F</span>
          </div>

          {/* Seat Grid Rows */}
          <div className="space-y-2.5 w-full max-w-sm">
            {Array.from({ length: rowsCount }, (_, rIdx) => {
              const rowNum = rIdx + 1;
              return (
                <div key={rowNum} className="grid grid-cols-7 gap-2 sm:gap-3 items-center text-center">
                  
                  {/* Columns A, B, C */}
                  {['A', 'B', 'C'].map((col) => {
                    const seat = getSeatInfo(rowNum, col);
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={seat.isOccupied}
                        onMouseEnter={() => setHoveredSeat(seat)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        onClick={() => handleSeatClick(seat)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-mono text-xs font-bold transition-all duration-200 flex items-center justify-center relative ${
                          seat.isSelected
                            ? 'bg-sky-500 text-slate-950 border-2 border-sky-300 shadow-lg shadow-sky-400/30 scale-105 z-10'
                            : seat.isOccupied
                            ? 'bg-slate-950/60 border border-white/5 text-slate-700 cursor-not-allowed'
                            : seat.isPremium
                            ? 'bg-amber-500/10 border border-amber-400/50 text-amber-300 hover:bg-amber-500/20 hover:scale-105'
                            : 'bg-slate-900/80 border border-white/10 text-slate-300 hover:bg-slate-800 hover:border-sky-400/40 hover:scale-105'
                        }`}
                      >
                        {seat.isSelected ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : seat.isOccupied ? (
                          <Lock className="w-3 h-3 opacity-50" />
                        ) : (
                          <span>{seat.id}</span>
                        )}
                      </button>
                    );
                  })}

                  {/* Aisle Row Number Marker */}
                  <div className="text-[10px] font-mono text-slate-500 font-bold">
                    {rowNum}
                  </div>

                  {/* Columns D, E, F */}
                  {['D', 'E', 'F'].map((col) => {
                    const seat = getSeatInfo(rowNum, col);
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={seat.isOccupied}
                        onMouseEnter={() => setHoveredSeat(seat)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        onClick={() => handleSeatClick(seat)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-mono text-xs font-bold transition-all duration-200 flex items-center justify-center relative ${
                          seat.isSelected
                            ? 'bg-sky-500 text-slate-950 border-2 border-sky-300 shadow-lg shadow-sky-400/30 scale-105 z-10'
                            : seat.isOccupied
                            ? 'bg-slate-950/60 border border-white/5 text-slate-700 cursor-not-allowed'
                            : seat.isPremium
                            ? 'bg-amber-500/10 border border-amber-400/50 text-amber-300 hover:bg-amber-500/20 hover:scale-105'
                            : 'bg-slate-900/80 border border-white/10 text-slate-300 hover:bg-slate-800 hover:border-sky-400/40 hover:scale-105'
                        }`}
                      >
                        {seat.isSelected ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : seat.isOccupied ? (
                          <Lock className="w-3 h-3 opacity-50" />
                        ) : (
                          <span>{seat.id}</span>
                        )}
                      </button>
                    );
                  })}

                </div>
              );
            })}
          </div>

          {/* Aircraft Tail */}
          <div className="w-36 h-10 rounded-b-2xl bg-slate-900 border-b border-x border-white/10 flex items-center justify-center text-[10px] font-mono text-slate-500 mt-6">
            <span>AFT Exit & Galley</span>
          </div>

        </div>

      </div>
    </div>
  );
}
