import React from 'react';
import { Plane, ShieldCheck, Heart, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#040811]/90 backdrop-blur-xl text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Col */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center">
              <Plane className="w-4 h-4 text-sky-400 transform -rotate-45" />
            </div>
            <span className="font-extrabold text-xl text-white font-['Inter_Tight'] tracking-wider">AEROVA</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your journey, beautifully planned. Experience next-generation liquid-glass flight discovery and seamless aircraft seat booking.
          </p>
          <div className="flex items-center gap-2 text-xs text-sky-400/90 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hackathon Special Edition 2026</span>
          </div>
        </div>

        {/* Links Col 1 */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3 tracking-wide">Flight Experience</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#search" className="hover:text-sky-400 transition-colors">Round Trip Flights</a></li>
            <li><a href="#search" className="hover:text-sky-400 transition-colors">One Way Departures</a></li>
            <li><a href="#search" className="hover:text-sky-400 transition-colors">Multi-City Search</a></li>
            <li><a href="#seats" className="hover:text-sky-400 transition-colors">Interactive Seat Map</a></li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3 tracking-wide">Airlines & Routes</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#airports" className="hover:text-sky-400 transition-colors">Hyderabad to Dubai</a></li>
            <li><a href="#airports" className="hover:text-sky-400 transition-colors">London to New York</a></li>
            <li><a href="#airports" className="hover:text-sky-400 transition-colors">Singapore Changi Hub</a></li>
            <li><a href="#airports" className="hover:text-sky-400 transition-colors">Global Airline Partners</a></li>
          </ul>
        </div>

        {/* Links Col 3 */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3 tracking-wide">Trust & Security</h4>
          <div className="flex items-center gap-2 text-xs text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Encrypted Booking</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Instant booking confirmation with localStorage state persistence and real-time aircraft seat reservation.
          </p>
          <div className="flex items-center gap-3 text-slate-400 text-xs">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Worldwide Coverage</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 AEROVA Aviation Systems Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Hackathon Demo
        </p>
      </div>
    </footer>
  );
}
