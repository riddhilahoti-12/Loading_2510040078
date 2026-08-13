import React from 'react';
import { X, ArrowRight, ShieldCheck, Check, Layers, Trash2 } from 'lucide-react';

export default function ComparisonDrawer({
  isOpen,
  onClose,
  comparedFlights = [],
  onRemoveCompare,
  onSelectFlight
}) {
  if (!isOpen || comparedFlights.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-6xl max-h-[90vh] bg-[#07111e]/95 border-t border-sky-500/30 rounded-t-3xl shadow-2xl p-6 overflow-y-auto backdrop-blur-2xl animate-in slide-in-from-bottom duration-300 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white font-['Inter_Tight']">
                Flight Fare Comparison
              </h3>
              <p className="text-xs text-slate-400">
                Comparing {comparedFlights.length} selected flight options side-by-side
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-slate-400 font-semibold uppercase text-[11px] w-36">
                  Feature / Flight
                </th>
                {comparedFlights.map((flight) => (
                  <th key={flight.id} className="py-3 px-4 min-w-[200px] max-w-[250px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{flight.airlineLogo}</span>
                        <span className="font-bold text-white text-sm">{flight.airline}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveCompare(flight.id)}
                        className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="font-mono text-[10px] text-sky-400">{flight.flightNumber}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              
              {/* Departure & Arrival */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-400 bg-slate-950/40">
                  Times & Route
                </td>
                {comparedFlights.map((flight) => (
                  <td key={flight.id} className="py-3 px-4">
                    <div className="font-bold text-white text-sm">
                      {flight.departureTime} → {flight.arrivalTime}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {flight.origin} to {flight.destination}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Duration & Stops */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-400 bg-slate-950/40">
                  Duration & Stops
                </td>
                {comparedFlights.map((flight) => (
                  <td key={flight.id} className="py-3 px-4">
                    <div className="font-mono text-sky-300 font-bold">{flight.duration}</div>
                    <div className={flight.stops === 0 ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                      {flight.stops === 0 ? 'Direct Non-stop' : flight.stopDetails}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Aircraft Model */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-400 bg-slate-950/40">
                  Aircraft
                </td>
                {comparedFlights.map((flight) => (
                  <td key={flight.id} className="py-3 px-4 font-medium text-slate-300">
                    {flight.aircraft}
                  </td>
                ))}
              </tr>

              {/* Baggage Allowance */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-400 bg-slate-950/40">
                  Baggage Included
                </td>
                {comparedFlights.map((flight) => (
                  <td key={flight.id} className="py-3 px-4 text-slate-300">
                    {flight.baggage}
                  </td>
                ))}
              </tr>

              {/* Refundability */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-400 bg-slate-950/40">
                  Refundability
                </td>
                {comparedFlights.map((flight) => (
                  <td key={flight.id} className="py-3 px-4">
                    {flight.refundable ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Fully Refundable</span>
                      </span>
                    ) : (
                      <span className="text-slate-400">Non-refundable</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Price Row */}
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-400 bg-slate-950/40">
                  Price
                </td>
                {comparedFlights.map((flight) => (
                  <td key={flight.id} className="py-3 px-4">
                    <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400 font-['Inter_Tight']">
                      {flight.currency}{flight.price.toLocaleString()}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Selection Action Button */}
              <tr>
                <td className="py-4 px-4 bg-slate-950/40"></td>
                {comparedFlights.map((flight) => (
                  <td key={flight.id} className="py-4 px-4">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectFlight(flight);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all"
                    >
                      <span>Choose Flight</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
