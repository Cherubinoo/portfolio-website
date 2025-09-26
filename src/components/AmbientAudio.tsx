import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import wavesAudio from "@/assets/Waves - Short Cinematic Video (1).mp3";

const AmbientAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(wavesAudio);
    audio.loop = true;
    audio.volume = 0.15; // slightly higher volume for better experience
    audio.preload = "auto";
    audioRef.current = audio;

    const tryPlay = () => {
      if (startedRef.current) return;
      audio.play().then(() => {
        startedRef.current = true;
        setIsPlaying(true);
        removeFallbackListeners();
      }).catch(() => {
        // Autoplay blocked; wait for user gesture
      });
    };

    const onUserGesture = () => {
      tryPlay();
    };

    const addFallbackListeners = () => {
      window.addEventListener('click', onUserGesture, { once: true });
      window.addEventListener('keydown', onUserGesture, { once: true });
      window.addEventListener('touchstart', onUserGesture, { once: true });
    };
    
    const removeFallbackListeners = () => {
      window.removeEventListener('click', onUserGesture);
      window.removeEventListener('keydown', onUserGesture);
      window.removeEventListener('touchstart', onUserGesture);
    };

    // Start attempt
    tryPlay();
    addFallbackListeners();

    // Enhanced scroll-based audio control
    const hero = document.getElementById('hero');
    let observer: IntersectionObserver | null = null;
    
    if (hero) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const isHeroVisible = entry.isIntersecting && entry.intersectionRatio > 0.5;
          
          if (isHeroVisible) {
            // Hero section is visible - play audio
            if (startedRef.current) {
              audio.play().then(() => {
                setIsPlaying(true);
              }).catch(() => {});
            } else {
              tryPlay();
            }
          } else {
            // Hero section is not visible - pause audio
            audio.pause();
            setIsPlaying(false);
          }
        },
        { 
          threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
          rootMargin: '-10% 0px -10% 0px' // Add some margin for better detection
        }
      );
      observer.observe(hero);
    }

    // Additional scroll listener for immediate response
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      
      const heroRect = hero.getBoundingClientRect();
      const isHeroInView = heroRect.top < window.innerHeight * 0.8 && heroRect.bottom > window.innerHeight * 0.2;
      
      if (isHeroInView && startedRef.current) {
        if (audio.paused) {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
        }
      } else if (!isHeroInView && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    // Throttled scroll listener
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      removeFallbackListeners();
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
      audio.pause();
      setIsPlaying(false);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/20 backdrop-blur-sm rounded-full p-2 border border-white/20">
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-white animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-white/60" />
        )}
      </div>
    </div>
  );
};

export default AmbientAudio;


