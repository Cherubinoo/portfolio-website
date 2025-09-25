import { useEffect, useRef } from "react";

// Decorative sea parallax layers (bubbles/waves). Sits behind content.
const SeaParallax = () => {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX / innerWidth - 0.5) * 10; // -5..5
      const offsetY = (e.clientY / innerHeight - 0.5) * 10; // -5..5
      layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;

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
    return () => window.removeEventListener('mousemove', handleMove);
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
      `}</style>
    </div>
  );
};

export default SeaParallax;


