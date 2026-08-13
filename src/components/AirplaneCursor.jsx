import React, { useEffect, useState, useRef } from 'react';
import { Plane } from 'lucide-react';

export default function AirplaneCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(45); // default 45deg
  const [isVisible, setIsVisible] = useState(false);

  const prevPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 'ontouchstart' in window) {
      return;
    }

    const handleMouseMove = (e) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        // Compute angle in degrees: atan2(dy, dx)
        const rad = Math.atan2(dy, dx);
        const deg = rad * (180 / Math.PI);
        setAngle(deg + 45); // +45deg offset for Lucide Plane icon default orientation
      }

      prevPos.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="airplane-cursor hidden md:block"
      style={{
        transform: `translate3d(${pos.x - 14}px, ${pos.y - 14}px, 0)`
      }}
    >
      {/* Supersonic Aerodynamic Trail Glow */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-10 h-10 rounded-full bg-sky-400/20 blur-md absolute -z-10 animate-pulse"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        
        {/* Animated Supersonic Jet Icon */}
        <div
          className="text-sky-300 transition-transform duration-150 ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <Plane className="w-7 h-7 drop-shadow-[0_0_12px_rgba(56,189,248,0.9)] stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
}
