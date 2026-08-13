import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

export default function DestinationGallery({ onSelectDestination }) {
  const destinations = [
    {
      city: 'Dubai',
      code: 'DXB',
      country: 'United Arab Emirates',
      image: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹18,500',
      tag: 'Most Popular'
    },
    {
      city: 'London',
      code: 'LHR',
      country: 'United Kingdom',
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹42,100',
      tag: 'Trending Destination'
    },
    {
      city: 'Tokyo',
      code: 'HND',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹38,900',
      tag: 'High Demand'
    },
    {
      city: 'New York',
      code: 'JFK',
      country: 'United States',
      image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹54,000',
      tag: 'Direct Flights Available'
    },
    {
      city: 'Singapore',
      code: 'SIN',
      country: 'Singapore',
      image: 'https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹22,400',
      tag: 'Changi Hub'
    },
    {
      city: 'Paris',
      code: 'CDG',
      country: 'France',
      image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹46,800',
      tag: 'Romantic Gateway'
    }
  ];

  return (
    <div className="space-y-6 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Featured Destinations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Inter'] tracking-tight">
            Explore Global Flight Hubs
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((d, idx) => (
          <div
            key={d.code}
            onClick={() => onSelectDestination && onSelectDestination(d.code)}
            className="group relative h-80 rounded-2xl overflow-hidden border border-white/15 cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-sky-400/50"
          >
            {/* Pexels Background Image */}
            <img
              src={d.image}
              alt={d.city}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Top Tag Pill */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-sky-300 font-semibold text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>{d.tag}</span>
              </span>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 space-y-2">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-mono text-sky-400 font-bold">{d.code} Airport</p>
                  <h3 className="text-2xl font-bold text-white font-['Inter']">{d.city}</h3>
                  <p className="text-xs text-gray-300 font-light">{d.country}</p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase">From</p>
                  <p className="text-xl font-bold text-white font-mono">{d.price}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Direct Flights</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
