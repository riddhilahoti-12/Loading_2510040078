import React, { useState, useEffect } from 'react';

export default function AnimatedHeading({
  text = "Shaping tomorrow\nwith vision and action.",
  initialDelay = 200,
  charDelay = 30,
  duration = 500,
  className = ''
}) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  const lines = text.split('\n');

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        // Compute total character count of preceding lines for cumulative stagger calculation
        const prevChars = lines.slice(0, lineIndex).reduce((sum, l) => sum + l.length, 0);

        return (
          <React.Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {line.split('').map((char, charIndex) => {
              const globalCharIdx = prevChars + charIndex;
              const delayMs = globalCharIdx * charDelay;

              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all ease-out"
                  style={{
                    opacity: animated ? 1 : 0,
                    transform: animated ? 'translateX(0)' : 'translateX(-18px)',
                    transitionDuration: `${duration}ms`,
                    transitionDelay: animated ? `${delayMs}ms` : '0ms'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </React.Fragment>
        );
      })}
    </h1>
  );
}
