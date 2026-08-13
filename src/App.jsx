import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchPanel from './components/SearchPanel';
import { Plane, Sparkles, ShieldCheck, Clock, Award, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState(null);
  const [savedBookings, setSavedBookings] = useState([]);

  const handleSearch = (params) => {
    console.log('Search initiated:', params);
    setSearchQuery(params);
    // Transition state will be handled in Phase 03
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100 bg-[#040811] relative selection:bg-sky-500 selection:text-white">
      {/* Cinematic Background Atmosphere */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-sky-600/15 via-blue-900/10 to-transparent blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-1/3 left-[-100px] w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[700px] h-[700px] bg-blue-600/5 blur-[160px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 flex-grow flex flex-col">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          savedBookingsCount={savedBookings.length}
        />

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
          
          {/* LANDING & HERO SEARCH SECTION */}
          {activeTab === 'search' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Hero Banner */}
              <div className="text-center pt-8 pb-4 max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-lg shadow-sky-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Next-Gen Liquid-Glass Flight Booking</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Inter_Tight'] leading-[1.08]">
                  Fly farther.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-200 to-blue-400">
                    Experience more.
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                  Search thousands of flights and find the journey that fits you with interactive seat selection, real-time comparison, and dynamic pricing.
                </p>
              </div>

              {/* Glass Search Panel */}
              <SearchPanel onSearch={handleSearch} />

              {/* Feature Highlights Grid */}
              <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:border-sky-400/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">Transparent Pricing</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Zero hidden baggage fees or surprise surcharges. What you see is exactly what you pay.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:border-sky-400/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">Interactive Seat Selector</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Choose your exact seat in real-time with our 3D-styled interactive aircraft cabin layout.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:border-sky-400/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">Live Fare Comparison</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Compare up to 4 flights side-by-side on layovers, baggage limits, aircraft model, and refundability.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* Placeholder for Explore / Other Tabs */}
          {activeTab !== 'search' && (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center mx-auto text-sky-400">
                <Plane className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white capitalize">{activeTab} View</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                This section is currently integrated into the AEROVA flight booking workflow. Use the Flights tab to search and select flights.
              </p>
              <button
                onClick={() => setActiveTab('search')}
                className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs inline-flex items-center gap-2 hover:bg-sky-400 transition-all"
              >
                <span>Go to Flight Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </main>

        <Footer />
      </div>
    </div>
  );
}
