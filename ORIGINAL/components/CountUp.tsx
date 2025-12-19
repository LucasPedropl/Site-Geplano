import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ value, duration = 2000, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Extract numeric value and prefix/suffix
  // Example: "+20.000" -> prefix: "+", number: 20000
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const prefix = value.match(/^[^\d]*/)?.[0] || '';
  const suffix = value.match(/[^\d]*$/)?.[0] || '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      const current = Math.floor(ease * numericValue);
      setDisplayValue(current);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(numericValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, numericValue, duration]);

  // Format the number with locale (points for thousands)
  const formattedNumber = new Intl.NumberFormat('pt-BR').format(displayValue);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};