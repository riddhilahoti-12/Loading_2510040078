import React from 'react';
import AnimatedHeading from './AnimatedHeading';
import FadeIn from './FadeIn';

export default function HeroVideo({ onStartChat, onExploreNow, onNavigateTab }) {
  const videoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden text-white bg-black">
      
      {/* 1. Full-screen Raw Video Background (NO dark overlay, NO semi-transparent dimming) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* 2. Top Navbar */}
      <header className="relative z-10 w-full px-6 md:px-12 lg:px-16 pt-6">
        <div className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
          
          {/* Left Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigateTab && onNavigateTab('search')}>
            <span className="text-2xl font-semibold tracking-tight text-white font-['Inter']">
              AEROVA
            </span>
          </div>

          {/* Center Navigation Links (Hidden on mobile, visible md+) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
            <button onClick={() => onNavigateTab && onNavigateTab('search')} className="hover:text-gray-300 transition-colors">
              Story
            </button>
            <button onClick={() => onNavigateTab && onNavigateTab('search')} className="hover:text-gray-300 transition-colors">
              Investing
            </button>
            <button onClick={() => onNavigateTab && onNavigateTab('search')} className="hover:text-gray-300 transition-colors">
              Building
            </button>
            <button onClick={() => onNavigateTab && onNavigateTab('search')} className="hover:text-gray-300 transition-colors">
              Advisory
            </button>
          </nav>

          {/* Right Action Button */}
          <div>
            <button
              type="button"
              onClick={onStartChat}
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Start a Chat
            </button>
          </div>

        </div>
      </header>

      {/* 3. Hero Content (Pushed to bottom of viewport) */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 flex-1 flex flex-col justify-end">
        <div className="w-full lg:grid lg:grid-cols-2 lg:items-end gap-8">
          
          {/* Left Column - Main Heading, Subheading & Action Buttons */}
          <div className="space-y-5">
            
            {/* Staggered Animated Heading */}
            <AnimatedHeading
              text={"Shaping tomorrow\nwith vision and action."}
              initialDelay={200}
              charDelay={30}
              duration={500}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white"
            />

            {/* FadeIn Subheading */}
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 max-w-xl font-light">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            {/* FadeIn Buttons Row */}
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={onStartChat}
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Start a Chat
                </button>

                <button
                  type="button"
                  onClick={onExploreNow}
                  className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all text-sm"
                >
                  Explore Now
                </button>
              </div>
            </FadeIn>

          </div>

          {/* Right Column - Liquid Glass Tag Card */}
          <div className="mt-8 lg:mt-0 flex items-end justify-start lg:justify-end">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white tracking-wide">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>

    </div>
  );
}
