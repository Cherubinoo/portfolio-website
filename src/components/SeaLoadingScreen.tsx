import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Waves, Loader2 } from 'lucide-react';

interface SeaLoadingScreenProps {
  onStart: () => void;
  isLoading?: boolean;
}

const SeaLoadingScreen = ({ onStart, isLoading = false }: SeaLoadingScreenProps) => {
  const [showStartButton, setShowStartButton] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Generate random bubbles
  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setBubbles(newBubbles);
  }, []);

  // Fallback to show start button after 5 seconds regardless
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowStartButton(true);
    }, 5000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  // Simulate loading progress with slower, more realistic progression
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Slower, more realistic loading progression
          const increment = prev < 30 ? Math.random() * 8 + 2 : // Slow start
                           prev < 70 ? Math.random() * 6 + 3 : // Medium pace
                           Math.random() * 4 + 1; // Slow finish
          return Math.min(prev + increment, 100);
        });
      }, 300); // Slower update interval
      return () => clearInterval(interval);
    } else {
      // When external loading is complete, show start button
      setShowStartButton(true);
    }
  }, [isLoading]);

  // Enhanced 3D wave canvas with depth and perspective
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
      
      // Create 3D perspective effect
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw multiple wave layers with 3D depth
      for (let layer = 0; layer < 5; layer++) {
        ctx.beginPath();
        
        // 3D color gradient based on depth
        const depth = layer / 4;
        const alpha = 0.6 - depth * 0.4;
        const hue = 200 + depth * 30; // Blue to cyan gradient
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
        ctx.lineWidth = 3 + layer * 1.5;
        
        // 3D wave parameters
        const amplitude = 40 + layer * 25;
        const frequency = 0.015 + layer * 0.008;
        const yOffset = canvas.height * 0.6 + layer * 30;
        const speed = 0.008 + layer * 0.003;
        
        // Perspective transformation
        const perspective = 1 - depth * 0.3;
        const scaleX = perspective;
        const scaleY = perspective;
        
        for (let x = 0; x < canvas.width; x += 1.5) {
          // 3D wave calculation with multiple harmonics
          const wave1 = Math.sin(x * frequency + time * speed) * amplitude;
          const wave2 = Math.sin(x * frequency * 1.5 + time * speed * 1.2) * (amplitude * 0.3);
          const wave3 = Math.sin(x * frequency * 0.7 + time * speed * 0.8) * (amplitude * 0.2);
          
          const y = yOffset + (wave1 + wave2 + wave3) * scaleY;
          const transformedX = centerX + (x - centerX) * scaleX;
          
          if (x === 0) {
            ctx.moveTo(transformedX, y);
          } else {
            ctx.lineTo(transformedX, y);
          }
        }
        ctx.stroke();
        
        // Add 3D highlights
        if (layer < 3) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${hue}, 80%, 80%, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          
          for (let x = 0; x < canvas.width; x += 3) {
            const wave1 = Math.sin(x * frequency + time * speed) * amplitude;
            const wave2 = Math.sin(x * frequency * 1.5 + time * speed * 1.2) * (amplitude * 0.3);
            const wave3 = Math.sin(x * frequency * 0.7 + time * speed * 0.8) * (amplitude * 0.2);
            
            const y = yOffset + (wave1 + wave2 + wave3) * scaleY - 2;
            const transformedX = centerX + (x - centerX) * scaleX;
            
            if (x === 0) {
              ctx.moveTo(transformedX, y);
            } else {
              ctx.lineTo(transformedX, y);
            }
          }
          ctx.stroke();
        }
      }
      
      time += 0.8; // Slower animation
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

  const handleStart = () => {
    onStart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-sky-400 via-cyan-300 to-blue-500 overflow-hidden" style={{ perspective: '1000px' }}>
      {/* 3D Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400/80 via-cyan-300/60 to-blue-500/80" style={{ transform: 'translateZ(-100px)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-200/40 via-blue-300/30 to-indigo-400/40" style={{ transform: 'translateZ(-50px)' }} />
      
      {/* Animated wave canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, transform: 'translateZ(0px)' }}
      />

      {/* Floating sea creatures with 3D effects */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {/* Fish swimming across */}
        <div className="absolute top-1/4 left-0 w-16 h-12 opacity-60 animate-[swim_10s_linear_infinite] depth-float" style={{ transform: 'translateZ(30px)' }}>
          <svg viewBox="0 0 64 48" className="w-full h-full">
            <path d="M8 24c0-8 8-16 16-16s16 8 16 16-8 16-16 16-16-8-16-16z" fill="#ff6b35" />
            <circle cx="16" cy="20" r="2" fill="white" />
            <path d="M40 16l8-4v8l-8 4v-8z" fill="#ff6b35" />
            <path d="M40 32l8 4v-8l-8-4v8z" fill="#ff6b35" />
          </svg>
        </div>

        {/* Jellyfish floating */}
        <div className="absolute top-1/3 right-0 w-12 h-16 opacity-50 animate-[float_8s_ease-in-out_infinite] depth-float" style={{ transform: 'translateZ(60px)' }}>
          <svg viewBox="0 0 48 64" className="w-full h-full">
            <ellipse cx="24" cy="20" rx="20" ry="15" fill="#ff69b4" opacity="0.7" />
            <path d="M8 35c0-8 8-16 16-16s16 8 16 16" stroke="#ff69b4" strokeWidth="2" fill="none" />
            <path d="M12 40c0-6 6-12 12-12s12 6 12 12" stroke="#ff69b4" strokeWidth="2" fill="none" />
            <path d="M16 45c0-4 4-8 8-8s8 4 8 8" stroke="#ff69b4" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Sea turtle */}
        <div className="absolute bottom-1/4 left-1/4 w-14 h-10 opacity-40 animate-[swim_12s_linear_infinite] depth-float" style={{ transform: 'translateZ(40px)' }}>
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

        {/* School of small fish */}
        <div className="absolute top-1/2 left-1/3 w-8 h-6 opacity-30 animate-[swim_7s_linear_infinite] depth-float" style={{ transform: 'translateZ(20px)' }}>
          <svg viewBox="0 0 32 24" className="w-full h-full">
            <ellipse cx="16" cy="12" rx="12" ry="8" fill="#87ceeb" />
            <circle cx="10" cy="10" r="1" fill="white" />
            <path d="M24 8l4-2v4l-4-2v-2z" fill="#87ceeb" />
          </svg>
        </div>

        {/* Additional Sea Creatures */}
        
        {/* Stingray */}
        <div className="absolute top-1/5 right-1/4 w-16 h-10 opacity-45 animate-[swim_9s_linear_infinite] depth-float" style={{ transform: 'translateZ(35px)', animationDelay: '2s' }}>
          <svg viewBox="0 0 64 40" className="w-full h-full">
            <ellipse cx="32" cy="20" rx="28" ry="15" fill="#ff6b6b" />
            <ellipse cx="32" cy="20" rx="20" ry="10" fill="#ff8e8e" />
            <circle cx="24" cy="16" r="2" fill="white" />
            <path d="M8 20l-6-3v6l6-3z" fill="#ff6b6b" />
            <path d="M56 20l6-3v6l-6-3z" fill="#ff6b6b" />
          </svg>
        </div>

        {/* Octopus */}
        <div className="absolute bottom-1/3 right-1/3 w-12 h-14 opacity-50 animate-[float_10s_ease-in-out_infinite] depth-float" style={{ transform: 'translateZ(45px)', animationDelay: '1s' }}>
          <svg viewBox="0 0 48 56" className="w-full h-full">
            <circle cx="24" cy="20" r="18" fill="#8b4513" />
            <circle cx="20" cy="16" r="2" fill="white" />
            <circle cx="28" cy="16" r="2" fill="white" />
            <path d="M8 30c0-4 4-8 8-8s8 4 8 8" stroke="#8b4513" strokeWidth="3" fill="none" />
            <path d="M12 35c0-3 3-6 6-6s6 3 6 6" stroke="#8b4513" strokeWidth="3" fill="none" />
            <path d="M16 40c0-2 2-4 4-4s4 2 4 4" stroke="#8b4513" strokeWidth="3" fill="none" />
            <path d="M20 45c0-1 1-2 2-2s2 1 2 2" stroke="#8b4513" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Angelfish */}
        <div className="absolute top-2/3 left-1/5 w-10 h-8 opacity-55 animate-[swim_6s_linear_infinite] depth-float" style={{ transform: 'translateZ(25px)', animationDelay: '3s' }}>
          <svg viewBox="0 0 40 32" className="w-full h-full">
            <path d="M8 16c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z" fill="#ffd700" />
            <path d="M12 12c0-2 2-4 4-4s4 2 4 4" fill="#ffed4e" />
            <circle cx="14" cy="14" r="1" fill="white" />
            <path d="M28 12l6-3v6l-6-3v-3z" fill="#ffd700" />
            <path d="M28 20l6 3v-6l-6-3v6z" fill="#ffd700" />
          </svg>
        </div>

        {/* Pufferfish */}
        <div className="absolute bottom-1/5 left-2/3 w-8 h-8 opacity-40 animate-[float_8s_ease-in-out_infinite] depth-float" style={{ transform: 'translateZ(30px)', animationDelay: '4s' }}>
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <circle cx="16" cy="16" r="12" fill="#ffa500" />
            <circle cx="16" cy="16" r="8" fill="#ffb84d" />
            <circle cx="12" cy="12" r="1" fill="white" />
            <circle cx="20" cy="12" r="1" fill="white" />
            <circle cx="16" cy="18" r="1" fill="white" />
            <path d="M4 16l-3-2v4l3-2z" fill="#ffa500" />
            <path d="M28 16l3-2v4l-3-2z" fill="#ffa500" />
          </svg>
        </div>

        {/* Manta Ray */}
        <div className="absolute top-1/2 right-1/5 w-20 h-12 opacity-35 animate-[swim_11s_linear_infinite] depth-float" style={{ transform: 'translateZ(15px)', animationDelay: '5s' }}>
          <svg viewBox="0 0 80 48" className="w-full h-full">
            <ellipse cx="40" cy="24" rx="35" ry="20" fill="#4169e1" />
            <ellipse cx="40" cy="24" rx="25" ry="15" fill="#6495ed" />
            <circle cx="30" cy="20" r="2" fill="white" />
            <circle cx="50" cy="20" r="2" fill="white" />
            <path d="M8 24l-6-4v8l6-4z" fill="#4169e1" />
            <path d="M72 24l6-4v8l-6-4z" fill="#4169e1" />
          </svg>
        </div>

        {/* Clownfish School */}
        <div className="absolute top-3/4 right-1/3 w-6 h-5 opacity-25 animate-[swim_5s_linear_infinite] depth-float" style={{ transform: 'translateZ(10px)', animationDelay: '1.5s' }}>
          <svg viewBox="0 0 24 20" className="w-full h-full">
            <ellipse cx="12" cy="10" rx="10" ry="6" fill="#ff6b35" />
            <circle cx="8" cy="8" r="1" fill="white" />
            <path d="M18 6l3-2v4l-3-2v-2z" fill="#ff6b35" />
          </svg>
        </div>

        {/* Another Clownfish */}
        <div className="absolute top-1/6 left-1/2 w-5 h-4 opacity-30 animate-[swim_6s_linear_infinite] depth-float" style={{ transform: 'translateZ(15px)', animationDelay: '2.5s' }}>
          <svg viewBox="0 0 20 16" className="w-full h-full">
            <ellipse cx="10" cy="8" rx="8" ry="5" fill="#ff6b35" />
            <circle cx="7" cy="6" r="0.8" fill="white" />
            <path d="M15 5l2-1v2l-2-1v-1z" fill="#ff6b35" />
          </svg>
        </div>

        {/* Seahorse */}
        <div className="absolute bottom-1/2 right-1/6 w-6 h-10 opacity-40 animate-[float_7s_ease-in-out_infinite] depth-float" style={{ transform: 'translateZ(40px)', animationDelay: '3.5s' }}>
          <svg viewBox="0 0 24 40" className="w-full h-full">
            <path d="M12 4c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z" fill="#ff6347" />
            <path d="M8 12c0-1 1-2 2-2s2 1 2 2v16c0 1-1 2-2 2s-2-1-2-2V12z" fill="#ff6347" />
            <path d="M6 16l-1-1v2l1-1z" fill="#ff6347" />
            <path d="M18 16l1-1v2l-1-1z" fill="#ff6347" />
          </svg>
        </div>
      </div>

      {/* Floating bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-sky-300/30 animate-[bubbleRise_8s_linear_infinite]"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 3 }}>
        {/* Logo/Title */}
        <div className="text-center mb-12 px-6">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-4 animate-[fadeInUp_1s_ease-out]" style={{ fontFamily: 'Pacifico, cursive, serif' }}>
            <Waves className="inline-block mr-2 sm:mr-4 w-12 h-12 sm:w-16 sm:h-16" />
            Welcome to my Sea Ecology
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 animate-[fadeInUp_1s_ease-out_0.3s_both]" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            Diving into creativity
          </p>
        </div>

        {/* 3D Loading progress */}
        {isLoading && !showStartButton && (
          <div className="w-80 max-w-full mx-auto mb-8 animate-[fadeInUp_1s_ease-out_0.6s_both]" style={{ transform: 'translateZ(50px)' }}>
            <div className="flex items-center justify-between text-white/80 mb-4 text-lg">
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Diving into the depths...</span>
              </div>
              <span className="font-mono text-xl">{Math.round(loadingProgress)}%</span>
            </div>
            
            {/* 3D Progress bar container */}
            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-4 shadow-inner" style={{ transform: 'translateZ(20px)' }}>
                <div
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                  style={{ width: `${loadingProgress}%` }}
                >
                  {/* 3D shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
                </div>
              </div>
              
              {/* 3D Progress bar highlight */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" 
                   style={{ transform: 'translateZ(10px)' }} />
            </div>
            
            {/* Loading stages */}
            <div className="mt-4 text-center text-white/60 text-sm">
              {loadingProgress < 30 && "Initializing ocean currents..."}
              {loadingProgress >= 30 && loadingProgress < 60 && "Summoning sea creatures..."}
              {loadingProgress >= 60 && loadingProgress < 90 && "Calibrating wave frequencies..."}
              {loadingProgress >= 90 && "Almost ready to dive..."}
            </div>
          </div>
        )}

        {/* 3D Start button */}
        {showStartButton && (
          <div className="animate-[fadeInUp_1s_ease-out_0.8s_both] px-6" style={{ transform: 'translateZ(100px)' }}>
            <div className="relative group">
              {/* 3D Button shadow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-full blur-lg transform translate-y-2 group-hover:translate-y-4 transition-transform duration-300" />
              
              <Button
                onClick={handleStart}
                size="lg"
                className="relative bg-gradient-to-r from-white/20 via-white/25 to-white/20 hover:from-white/30 hover:via-white/35 hover:to-white/30 text-white border-2 border-white/50 hover:border-white/70 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden"
                style={{ transform: 'translateZ(50px)' }}
              >
                {/* 3D Button highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full" />
                
                <div className="relative flex items-center">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Start Journey
                </div>
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-[shimmer_3s_ease-in-out_infinite]" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes swim {
          0% { transform: translateX(-100px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(25vw) translateY(-20px) rotate(5deg); }
          50% { transform: translateX(50vw) translateY(10px) rotate(-3deg); }
          75% { transform: translateX(75vw) translateY(-15px) rotate(2deg); }
          100% { transform: translateX(100vw) translateY(0px) rotate(0deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-15px) rotate(2deg) scale(1.05); }
          66% { transform: translateY(-8px) rotate(-1deg) scale(0.95); }
        }

        @keyframes bubbleRise {
          0% {
            transform: translateY(100vh) scale(0) translateZ(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
            transform: translateY(90vh) scale(0.5) translateZ(20px);
          }
          50% {
            transform: translateY(50vh) scale(0.8) translateZ(50px);
          }
          90% {
            opacity: 0.7;
            transform: translateY(10vh) scale(1) translateZ(80px);
          }
          100% {
            transform: translateY(-100px) scale(1.2) translateZ(100px);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px) translateZ(-50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(0px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateZ(0px);
          }
          100% {
            transform: translateX(100%) translateZ(0px);
          }
        }

        @keyframes depthFloat {
          0%, 100% { 
            transform: translateY(0px) translateZ(0px) rotateX(0deg); 
          }
          50% { 
            transform: translateY(-20px) translateZ(30px) rotateX(5deg); 
          }
        }

        .depth-float {
          animation: depthFloat 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SeaLoadingScreen;
