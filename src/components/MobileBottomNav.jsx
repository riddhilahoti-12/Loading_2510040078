import React from 'react';
import { Home, Search, BookmarkCheck, User, Compass } from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab, savedBookingsCount = 0 }) {
  const items = [
    { id: 'search', label: 'Search', icon: Search },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'trips', label: 'Trips', icon: BookmarkCheck, badge: savedBookingsCount > 0 ? savedBookingsCount : null },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07111e]/90 backdrop-blur-2xl border-t border-white/10 px-3 py-2 flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all relative ${
              isActive
                ? 'text-sky-400 font-bold scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 text-[9px] font-bold bg-sky-400 text-slate-950 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
