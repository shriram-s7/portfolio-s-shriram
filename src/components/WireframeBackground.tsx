import { useEffect, useRef } from 'react';

const WireframeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Track mouse position
    const mouse = { x: -1000, y: -1000 }; // Start off-screen

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    
    // Update mouse coordinates on move
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.003; // Calm drift speed

      // 40 lines covering the screen
      const lines = 40; 
      const stepY = canvas.height / lines; 

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        // Colors: Alternate Teal / Purple
        const isTeal = i % 2 === 0; 
        const opacity = 0.1 + (Math.sin((i / lines) * Math.PI) * 0.25);
        
        ctx.strokeStyle = isTeal 
          ? `rgba(45, 212, 191, ${opacity})` 
          : `rgba(168, 85, 247, ${opacity})`;
        
        ctx.lineWidth = 1; 

        const baseY = i * stepY;

        // Draw the line point by point
        for (let x = 0; x <= canvas.width; x += 15) { 
          // 1. Base Wave Motion (Automatic)
          const waveOffset = 
            Math.sin(x * 0.002 + time + i * 0.2) * 20 + 
            Math.cos(x * 0.005 - time) * 10;

          // 2. Mouse Interaction (Interactive)
          // Calculate distance from this point to the mouse
          const dx = x - mouse.x;
          const dy = (baseY + waveOffset) - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          let interactionOffset = 0;
          const radius = 200; // Interaction radius

          if (distance < radius) {
            // Calculate force: closer = stronger push
            const force = (radius - distance) / radius;
            // Push the line away vertically (smooth sine curve)
            const direction = dy > 0 ? 1 : -1;
            interactionOffset = direction * force * 80; // Push strength (80px)
          }

          ctx.lineTo(x, baseY + waveOffset + interactionOffset);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-[#020617]" />;
};

export default WireframeBackground;