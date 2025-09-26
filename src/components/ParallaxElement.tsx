import { useEffect, useRef, useState } from 'react';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = 0
}) => {
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        
        let x = 0;
        let y = 0;
        
        switch (direction) {
          case 'up':
            y = rate + offset;
            break;
          case 'down':
            y = -rate + offset;
            break;
          case 'left':
            x = rate + offset;
            break;
          case 'right':
            x = -rate + offset;
            break;
        }
        
        setTransform(`translate3d(${x}px, ${y}px, 0)`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, offset]);

  return (
    <div
      ref={elementRef}
      className={`parallax-element ${className}`}
      style={{
        transform,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxElement;
