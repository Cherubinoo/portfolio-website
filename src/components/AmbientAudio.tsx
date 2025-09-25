import { useEffect, useRef } from "react";
import wavesAudio from "@/assets/Waves - Short Cinematic Video (1).mp3";

const AmbientAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(wavesAudio);
    audio.loop = true;
    audio.volume = 0.12; // mild volume
    audio.preload = "auto";
    audioRef.current = audio;

    const tryPlay = () => {
      if (startedRef.current) return;
      audio.play().then(() => {
        startedRef.current = true;
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

    // Pause/play based on Hero visibility
    const hero = document.getElementById('hero');
    let observer: IntersectionObserver | null = null;
    if (hero) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const mostlyVisible = entry.isIntersecting && entry.intersectionRatio > 0.3;
          if (mostlyVisible) {
            if (startedRef.current) {
              audio.play().catch(() => {});
            } else {
              tryPlay();
            }
          } else {
            audio.pause();
          }
        },
        { threshold: [0, 0.3, 0.6, 1] }
      );
      observer.observe(hero);
    }

    return () => {
      removeFallbackListeners();
      if (observer) observer.disconnect();
      audio.pause();
    };
  }, []);

  return null;
};

export default AmbientAudio;


