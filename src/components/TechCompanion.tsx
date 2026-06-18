import { useEffect, useState, useRef } from 'react';

const TechCompanion = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const botRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!botRef.current) return;

      const rect = botRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - botCenterY, e.clientX - botCenterX);

      // MOVEMENT RANGE:
      // Since pupils are smaller, we can let them move more inside the socket.
      const radius = 6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      setEyePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
    window.dispatchEvent(new Event('open-chat'));
  };

  return (
    <div
      ref={botRef}
      className={`fixed bottom-12 right-12 z-50 transition-transform duration-300 ease-in-out cursor-pointer
        ${isHovering ? 'scale-110' : 'scale-100'} 
        ${isClicked ? 'animate-spin-fast' : 'animate-float'}
      `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
      title="I'm watching you!!"
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
      >
        {/* Antenna */}
        <line x1="50" y1="20" x2="50" y2="5" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="5" r="5" fill="#a855f7" className="animate-pulse" />

        {/* Head/Chassis */}
        <rect x="15" y="25" width="70" height="55" rx="14" fill="#0f172a" stroke="#2dd4bf" strokeWidth="3" />

        {/* Face Screen (Darker Background) */}
        <rect x="25" y="38" width="50" height="28" rx="8" fill="#020617" />

        {/* --- STATIC EYE SOCKETS (The "Whites" of the eyes) --- */}
        {/* This creates the reference point so movement is obvious */}
        <circle cx="38" cy="52" r="10" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <circle cx="62" cy="52" r="10" fill="#1e293b" stroke="#334155" strokeWidth="1" />

        {/* --- MOVING PUPILS --- */}
        <g transform={`translate(${eyePosition.x}, ${eyePosition.y})`}>
          {/* Smaller, brighter pupils for contrast */}
          <circle cx="38" cy="52" r="4" fill="#2dd4bf" className="drop-shadow-[0_0_5px_rgba(45,212,191,0.8)]" />
          <circle cx="62" cy="52" r="4" fill="#2dd4bf" className="drop-shadow-[0_0_5px_rgba(45,212,191,0.8)]" />

          {/* Tiny reflection dot for "glossy" look */}
          <circle cx="40" cy="50" r="1.5" fill="white" opacity="0.8" />
          <circle cx="64" cy="50" r="1.5" fill="white" opacity="0.8" />
        </g>

        {/* Mouth */}
        {isHovering ? (
          <path d="M40 78 Q50 88 60 78" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : (
          <line x1="42" y1="82" x2="58" y2="82" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Feet */}
        <path d="M30 85 L30 92" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
        <path d="M70 85 L70 92" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default TechCompanion;