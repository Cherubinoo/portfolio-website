import { useEffect, useRef, useState } from 'react';

// Enhanced scroll reveal hook
export const useScrollReveal = (threshold = 0.1, delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true);
            if (elementRef.current) {
              elementRef.current.classList.add('revealed');
            }
          }, delay);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      elementRef.current.classList.add('scroll-reveal');
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, delay, isVisible]);

  return { elementRef, isVisible };
};

// Progressive text reveal hook
export const useProgressiveTextReveal = (delay = 100) => {
  const [isVisible, setIsVisible] = useState(false);
  const [revealedText, setRevealedText] = useState('');
  const elementRef = useRef<HTMLElement>(null);
  const textRef = useRef('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          const fullText = elementRef.current?.textContent || '';
          textRef.current = fullText;
          elementRef.current!.textContent = '';
          
          let index = 0;
          const interval = setInterval(() => {
            if (index < fullText.length) {
              setRevealedText(fullText.slice(0, index + 1));
              index++;
            } else {
              clearInterval(interval);
            }
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, isVisible]);

  return { elementRef, revealedText, isVisible };
};

// Parallax scrolling hook
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { elementRef, offset };
};

// Sticky elements hook
export const useSticky = (threshold = 0) => {
  const [isSticky, setIsSticky] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= threshold);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { elementRef, isSticky };
};

// Scroll-triggered animations hook
export const useScrollAnimation = (animationClass: string, threshold = 0.1) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true);
          elementRef.current?.classList.add(animationClass);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [animationClass, threshold, isAnimated]);

  return { elementRef, isAnimated };
};

// Typewriter effect hook
export const useTypewriter = (text: string, speed = 50, delay = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    const startTyping = () => {
      setIsTyping(true);
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    };

    const timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayedText, isTyping, isComplete };
};

// Scroll-triggered typing hook
export const useScrollTyping = (text: string, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTyping && !isComplete) {
          setIsTyping(true);
          let index = 0;
          
          const typeInterval = setInterval(() => {
            if (index < text.length) {
              setDisplayedText(text.slice(0, index + 1));
              index++;
            } else {
              clearInterval(typeInterval);
              setIsTyping(false);
              setIsComplete(true);
            }
          }, speed);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [text, speed, isTyping, isComplete]);

  return { elementRef, displayedText, isTyping, isComplete };
};
