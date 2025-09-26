import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorChar?: string;
  cursorBlinkSpeed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete,
  showCursor = true,
  cursorChar = '|',
  cursorBlinkSpeed = 500
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);

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
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    };

    const timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor || isComplete) return;

    const blinkInterval = setInterval(() => {
      setShowCursorState(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(blinkInterval);
  }, [showCursor, isComplete, cursorBlinkSpeed]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className={`${showCursorState ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypewriterText;
