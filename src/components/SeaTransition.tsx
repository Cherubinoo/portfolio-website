import { useEffect, useState, useRef } from 'react';

interface SeaTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
  type?: 'enter' | 'exit';
}

const SeaTransition: React.FC<SeaTransitionProps> = ({ isActive, onComplete, type = 'enter' }) => {
  const [showBubbles, setShowBubbles] = useState(false);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Generate random bubbles
  useEffect(() => {
    const newBubbles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 25 + 15,
      delay: Math.random() * 3,
    }));
    setBubbles(newBubbles);
  }, []);

  useEffect(() => {
    if (isActive) {
      setShowBubbles(true);
      const timer = setTimeout(() => {
        setShowBubbles(false);
        onComplete?.();
      }, type === 'enter' ? 2000 : 1000); // 2 seconds for enter transition
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete, type]);

  // Enhanced wave animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw multiple wave layers with enhanced animation
      for (let layer = 0; layer < 4; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(135, 206, 235, ${0.4 - layer * 0.08})`;
        ctx.lineWidth = 3 + layer * 2;
        
        const amplitude = 40 + layer * 25;
        const frequency = 0.015 + layer * 0.008;
        const yOffset = canvas.height * 0.6 + layer * 35;
        const speed = 0.008 + layer * 0.003;
        
        for (let x = 0; x < canvas.width; x += 1.5) {
          const y = yOffset + 
            Math.sin(x * frequency + time * speed) * amplitude +
            Math.sin(x * frequency * 1.5 + time * speed * 1.2) * (amplitude * 0.3);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      time += 0.6; // Slower animation for smoother effect
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className={`page-transition ${type === 'enter' ? 'enter-transition' : 'exit-transition'} ${isActive ? 'active' : ''}`}>
      {/* Enhanced sea gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-cyan-300 to-blue-500" />
      
      {/* Animated wave canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      
      {/* Enhanced animated waves */}
      <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden" style={{ zIndex: 2 }}>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-blue-600/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-12 bg-blue-500/50 wave-animation" />
        <div className="absolute bottom-3 left-0 w-full h-8 bg-blue-400/40 wave-animation" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-6 left-0 w-full h-6 bg-blue-300/30 wave-animation" style={{ animationDelay: '2.4s' }} />
        <div className="absolute bottom-9 left-0 w-full h-4 bg-blue-200/20 wave-animation" style={{ animationDelay: '3.6s' }} />
      </div>

      {/* Enhanced floating bubbles */}
      {showBubbles && (
        <>
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="bubble-enhanced"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                animationDelay: `${bubble.delay}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Enhanced sea creatures during transition */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 3 }}>
        {/* Fish swimming across */}
        <div className="absolute top-1/4 left-0 w-20 h-15 opacity-70 animate-[swimTransition_6s_linear_infinite]" style={{ animationDelay: '0.5s' }}>
          <svg viewBox="0 0 80 60" className="w-full h-full">
            <path d="M10 30c0-10 10-20 20-20s20 10 20 20-10 20-20 20-20-10-20-20z" fill="#ff6b35" />
            <circle cx="20" cy="25" r="2.5" fill="white" />
            <path d="M50 20l10-5v10l-10 5v-10z" fill="#ff6b35" />
            <path d="M50 40l10 5v-10l-10-5v10z" fill="#ff6b35" />
          </svg>
        </div>

        {/* Jellyfish floating */}
        <div className="absolute top-1/3 right-0 w-16 h-20 opacity-60 animate-[floatTransition_8s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
          <svg viewBox="0 0 64 80" className="w-full h-full">
            <ellipse cx="32" cy="25" rx="25" ry="18" fill="#ff69b4" opacity="0.8" />
            <path d="M10 45c0-10 10-20 20-20s20 10 20 20" stroke="#ff69b4" strokeWidth="3" fill="none" />
            <path d="M15 50c0-8 8-16 16-16s16 8 16 16" stroke="#ff69b4" strokeWidth="3" fill="none" />
            <path d="M20 55c0-6 6-12 12-12s12 6 12 12" stroke="#ff69b4" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Sea turtle */}
        <div className="absolute bottom-1/4 left-1/4 w-18 h-12 opacity-50 animate-[swimTransition_10s_linear_infinite]" style={{ animationDelay: '1.5s' }}>
          <svg viewBox="0 0 72 48" className="w-full h-full">
            <ellipse cx="36" cy="24" rx="30" ry="20" fill="#228b22" />
            <ellipse cx="36" cy="24" rx="25" ry="15" fill="#32cd32" />
            <circle cx="25" cy="20" r="2.5" fill="#228b22" />
            <circle cx="47" cy="20" r="2.5" fill="#228b22" />
            <circle cx="25" cy="28" r="2.5" fill="#228b22" />
            <circle cx="47" cy="28" r="2.5" fill="#228b22" />
            <path d="M6 24l-5-3v6l5-3z" fill="#228b22" />
            <path d="M66 24l5-3v6l-5-3z" fill="#228b22" />
          </svg>
        </div>

        {/* School of small fish */}
        <div className="absolute top-1/2 left-1/3 w-10 h-7 opacity-40 animate-[swimTransition_5s_linear_infinite]">
          <svg viewBox="0 0 40 28" className="w-full h-full">
            <ellipse cx="20" cy="14" rx="15" ry="10" fill="#87ceeb" />
            <circle cx="12" cy="12" r="1.5" fill="white" />
            <path d="M30 10l5-3v6l-5-3v-3z" fill="#87ceeb" />
          </svg>
        </div>
      </div>

      {/* Enhanced loading text */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 4 }}>
        <div className="text-white text-3xl font-bold opacity-90 animate-[fadeInUp_1s_ease-out_infinite_alternate]">
          {type === 'enter' ? 'Diving into the depths...' : 'Surfacing to new horizons...'}
        </div>
      </div>
    </div>
  );
};

export default SeaTransition;
