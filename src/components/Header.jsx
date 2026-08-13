import React, { useState } from 'react';
import { Plane, Compass, BookmarkCheck, HelpCircle, User, Menu, X } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, savedBookingsCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'search', label: 'Flights', icon: Plane },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'trips', label: 'My Trips', icon: BookmarkCheck, badge: savedBookingsCount > 0 ? savedBookingsCount : null },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#060b13]/70 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveTab('search'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 p-[1px] shadow-lg shadow-sky-500/20 group-hover:shadow-sky-400/40 transition-all">
            <div className="w-full h-full bg-[#07111e] rounded-[11px] flex items-center justify-center">
              <Plane className="w-5 h-5 text-sky-400 transform -rotate-45 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400 font-['Inter_Tight']">
              AEROVA
            </span>
            <span className="text-[10px] tracking-widest text-sky-400/80 font-mono -mt-1 uppercase">
              Aviation Experience
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-250 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-sky-500/80 to-blue-600/80 shadow-md shadow-sky-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-sky-400 text-slate-950 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('trips')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 rounded-xl transition-all"
          >
            <span>Express Booking</span>
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-slate-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-[#07111e]/95 border-b border-white/10 backdrop-blur-2xl transition-all">
          <div className="flex flex-col space-y-2 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-sky-400 text-slate-950 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
