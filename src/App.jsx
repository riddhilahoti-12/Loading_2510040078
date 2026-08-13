import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [savedBookings, setSavedBookings] = useState([]);

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100 bg-[#040811] relative selection:bg-sky-500 selection:text-white">
      {/* Background Atmosphere Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-sky-600/15 via-blue-900/10 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/5 blur-[150px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 flex-grow flex flex-col">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          savedBookingsCount={savedBookings.length}
        />

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Shell Placeholder for Phase 01 */}
          <div className="text-center my-12 space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              AEROVA Design System Initialized
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-sky-400 font-['Inter_Tight']">
              Your journey, beautifully planned.
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg font-light leading-relaxed">
              Search thousands of flights and find the journey that fits you with real-time aircraft seat reservation and liquid-glass aesthetic.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
