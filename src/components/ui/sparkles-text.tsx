import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SparklesTextProps {
  children: React.ReactNode;
  className?: string;
}

export const SparklesText = ({ children, className }: SparklesTextProps) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const createSparkles = () => {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2
      }));
      setSparkles(newSparkles);
    };

    createSparkles();
    const interval = setInterval(createSparkles, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={cn('relative inline-block', className)}>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute pointer-events-none animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <svg
            className="text-emerald-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </span>
      ))}
      {children}
    </span>
  );
};
