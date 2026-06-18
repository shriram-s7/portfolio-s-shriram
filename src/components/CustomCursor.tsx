import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON';
      setIsHovering(isClickable);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Main Dot - Always sharp and precise */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-teal-400 rounded-full pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          boxShadow: '0 0 10px rgba(45, 212, 191, 0.8)' // Tiny glow
        }}
      />
      
      {/* Magnetic Ring - Only appears/expands when needed */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-teal-400/30 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isHovering ? 1.5 : 0.5})`,
          opacity: isHovering ? 1 : 0, // Hides when not hovering over links
          backgroundColor: isHovering ? 'rgba(45, 212, 191, 0.05)' : 'transparent'
        }}
      />
    </>
  );
};

export default CustomCursor;