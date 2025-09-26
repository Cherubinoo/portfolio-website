import { useEffect, useRef, useState } from 'react';

interface ScrollEffectsProps {
  children: React.ReactNode;
  className?: string;
  effect?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const ScrollEffects: React.FC<ScrollEffectsProps> = ({
  children,
  className = '',
  effect = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, isVisible]);

  const getAnimationClass = () => {
    const baseClass = 'transition-all ease-out';
    const durationClass = `duration-${duration}`;
    
    if (!isVisible) {
      switch (effect) {
        case 'fadeIn':
          return `${baseClass} ${durationClass} opacity-0`;
        case 'slideUp':
          return `${baseClass} ${durationClass} opacity-0 translate-y-8`;
        case 'slideLeft':
          return `${baseClass} ${durationClass} opacity-0 translate-x-8`;
        case 'slideRight':
          return `${baseClass} ${durationClass} opacity-0 -translate-x-8`;
        case 'scale':
          return `${baseClass} ${durationClass} opacity-0 scale-95`;
        case 'rotate':
          return `${baseClass} ${durationClass} opacity-0 rotate-12`;
        default:
          return `${baseClass} ${durationClass} opacity-0`;
      }
    } else {
      switch (effect) {
        case 'fadeIn':
          return `${baseClass} ${durationClass} opacity-100`;
        case 'slideUp':
          return `${baseClass} ${durationClass} opacity-100 translate-y-0`;
        case 'slideLeft':
          return `${baseClass} ${durationClass} opacity-100 translate-x-0`;
        case 'slideRight':
          return `${baseClass} ${durationClass} opacity-100 translate-x-0`;
        case 'scale':
          return `${baseClass} ${durationClass} opacity-100 scale-100`;
        case 'rotate':
          return `${baseClass} ${durationClass} opacity-100 rotate-0`;
        default:
          return `${baseClass} ${durationClass} opacity-100`;
      }
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollEffects;
