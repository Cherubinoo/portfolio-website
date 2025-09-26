import { useEffect, useRef, useState } from "react";

// Interactive sea creatures that follow cursor
const SeaParallax = () => {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let mouseTimeout: NodeJS.Timeout;

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX / innerWidth - 0.5) * 10; // -5..5
      const offsetY = (e.clientY / innerHeight - 0.5) * 10; // -5..5
      layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;

      // Update mouse position for sea creatures
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);

      // Clear previous timeout
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => setIsMouseMoving(false), 100);

      // bubble trail dots
      const trail = document.getElementById('bubble-trail');
      if (trail) {
        const dot = document.createElement('div');
        dot.className = 'bubble-dot';
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        trail.appendChild(dot);
        window.setTimeout(() => dot.remove(), 900);
      }
    };

    window.addEventListener('mousemove', handleMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      clearTimeout(mouseTimeout);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* soft radial light */}
      <div
        ref={layerRef}
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(800px 800px at 70% 20%, rgba(56, 189, 248, 0.25), transparent 60%)," +
            "radial-gradient(600px 600px at 20% 80%, rgba(6, 182, 212, 0.2), transparent 60%)",
          transition: "transform 150ms ease-out",
        }}
      />

      {/* Interactive Sea Creatures */}
      <div className="absolute inset-0">
        {/* Fish 1 - Orange Clownfish */}
        <div 
          className="absolute w-8 h-6 opacity-70 transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 60,
            top: mousePosition.y - 20,
            transform: isMouseMoving ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <svg viewBox="0 0 32 24" className="w-full h-full">
            <path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z" fill="#ff6b35" />
            <circle cx="8" cy="10" r="2" fill="white" />
            <path d="M20 8l4-2v4l-4 2v-4z" fill="#ff6b35" />
            <path d="M20 16l4 2v-4l-4-2v4z" fill="#ff6b35" />
          </svg>
        </div>

        {/* Fish 2 - Blue Tang */}
        <div 
          className="absolute w-10 h-7 opacity-60 transition-all duration-700 ease-out"
          style={{
            left: mousePosition.x + 40,
            top: mousePosition.y + 30,
            transform: isMouseMoving ? 'scale(1.05) rotate(5deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <svg viewBox="0 0 40 28" className="w-full h-full">
            <ellipse cx="20" cy="14" rx="18" ry="12" fill="#0066cc" />
            <path d="M2 14c0-6 6-12 12-12s12 6 12 12-6 12-12 12-12-6-12-12z" fill="#004499" />
            <circle cx="16" cy="12" r="1.5" fill="white" />
            <path d="M32 10l6-3v6l-6 3v-6z" fill="#0066cc" />
            <path d="M32 18l6 3v-6l-6-3v6z" fill="#0066cc" />
          </svg>
        </div>

        {/* Jellyfish */}
        <div 
          className="absolute w-12 h-16 opacity-50 transition-all duration-600 ease-out"
          style={{
            left: mousePosition.x - 30,
            top: mousePosition.y + 50,
            transform: isMouseMoving ? 'scale(1.08) translateY(-5px)' : 'scale(1) translateY(0)',
          }}
        >
          <svg viewBox="0 0 48 64" className="w-full h-full">
            <ellipse cx="24" cy="20" rx="20" ry="15" fill="#ff69b4" opacity="0.7" />
            <path d="M8 35c0-8 8-16 16-16s16 8 16 16" stroke="#ff69b4" strokeWidth="2" fill="none" />
            <path d="M12 40c0-6 6-12 12-12s12 6 12 12" stroke="#ff69b4" strokeWidth="2" fill="none" />
            <path d="M16 45c0-4 4-8 8-8s8 4 8 8" stroke="#ff69b4" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Sea Turtle */}
        <div 
          className="absolute w-14 h-10 opacity-40 transition-all duration-800 ease-out"
          style={{
            left: mousePosition.x + 80,
            top: mousePosition.y - 40,
            transform: isMouseMoving ? 'scale(1.03) rotate(-3deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <svg viewBox="0 0 56 40" className="w-full h-full">
            <ellipse cx="28" cy="20" rx="24" ry="16" fill="#228b22" />
            <ellipse cx="28" cy="20" rx="20" ry="12" fill="#32cd32" />
            <circle cx="20" cy="16" r="2" fill="#228b22" />
            <circle cx="36" cy="16" r="2" fill="#228b22" />
            <circle cx="20" cy="24" r="2" fill="#228b22" />
            <circle cx="36" cy="24" r="2" fill="#228b22" />
            <path d="M4 20l-4-2v4l4-2z" fill="#228b22" />
            <path d="M52 20l4-2v4l-4-2z" fill="#228b22" />
          </svg>
        </div>

        {/* Small Fish School */}
        <div 
          className="absolute w-6 h-4 opacity-30 transition-all duration-400 ease-out"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y + 10,
            transform: isMouseMoving ? 'scale(1.2) translateX(10px)' : 'scale(1) translateX(0)',
          }}
        >
          <svg viewBox="0 0 24 16" className="w-full h-full">
            <ellipse cx="12" cy="8" rx="10" ry="6" fill="#87ceeb" />
            <circle cx="8" cy="6" r="1" fill="white" />
            <path d="M20 6l3-2v4l-3-2v-2z" fill="#87ceeb" />
          </svg>
        </div>

        {/* Another Small Fish */}
        <div 
          className="absolute w-5 h-4 opacity-35 transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x + 120,
            top: mousePosition.y - 20,
            transform: isMouseMoving ? 'scale(1.15) translateX(-15px)' : 'scale(1) translateX(0)',
          }}
        >
          <svg viewBox="0 0 20 16" className="w-full h-full">
            <ellipse cx="10" cy="8" rx="8" ry="6" fill="#ffa500" />
            <circle cx="6" cy="6" r="1" fill="white" />
            <path d="M16 6l3-2v4l-3-2v-2z" fill="#ffa500" />
          </svg>
        </div>

        {/* Seahorse */}
        <div 
          className="absolute w-8 h-12 opacity-45 transition-all duration-600 ease-out"
          style={{
            left: mousePosition.x - 80,
            top: mousePosition.y - 60,
            transform: isMouseMoving ? 'scale(1.1) rotate(10deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <svg viewBox="0 0 32 48" className="w-full h-full">
            <path d="M16 4c-4 0-8 4-8 8s4 8 8 8 8-4 8-8-4-8-8-8z" fill="#ff6347" />
            <path d="M12 20c0-2 2-4 4-4s4 2 4 4v20c0 2-2 4-4 4s-4-2-4-4V20z" fill="#ff6347" />
            <path d="M8 24l-2-1v2l2-1z" fill="#ff6347" />
            <path d="M24 24l2-1v2l-2-1z" fill="#ff6347" />
          </svg>
        </div>
      </div>

      {/* drifting bubbles */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
        <div className="absolute bottom-[-10%] left-[10%] w-24 h-24 rounded-full bg-sky-300/20 blur-2xl animate-[floatUp_14s_linear_infinite]" />
        <div className="absolute bottom-[-15%] left-[40%] w-16 h-16 rounded-full bg-cyan-300/20 blur-xl animate-[floatUp_18s_linear_infinite]" />
        <div className="absolute bottom-[-12%] left-[70%] w-28 h-28 rounded-full bg-sky-200/20 blur-2xl animate-[floatUp_20s_linear_infinite]" />
      </div>

      {/* bubble trail container */}
      <div id="bubble-trail" className="absolute inset-0"></div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-40vh) translateX(10px); }
          100% { transform: translateY(-80vh) translateX(-10px); }
        }
        @keyframes bubbleFade {
          0% { opacity: 0; transform: translateY(0) scale(0.7); }
          20% { opacity: .9; }
          100% { opacity: 0; transform: translateY(-40px) scale(1); }
        }
        .bubble-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(135, 206, 235, 0.6);
          border-radius: 50%;
          animation: bubbleFade 0.9s ease-out forwards;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default SeaParallax;


