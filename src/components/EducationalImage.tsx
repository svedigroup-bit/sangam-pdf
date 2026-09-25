import React, { useState, useEffect, useRef } from 'react';
import { Compass } from 'lucide-react';

interface EducationalImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  title?: string;
  className?: string;
  containerClassName?: string;
  loading?: 'eager' | 'lazy';
  objectPosition?: string;
  caption?: React.ReactNode;
}

export const EducationalImage: React.FC<EducationalImageProps> = ({
  src,
  fallbackSrc,
  alt,
  title,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative aspect-4/3 w-full overflow-hidden bg-[#EFE9DF]',
  loading = 'lazy',
  objectPosition,
  caption,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [failed, setFailed] = useState<boolean>(false);
  const [hasTriedFallback, setHasTriedFallback] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(loading === 'eager');

  // Sync state if prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setFailed(false);
    setHasTriedFallback(false);
  }, [src]);

  // Viewport intersection observer for masked reveal (Requirement 6)
  useEffect(() => {
    if (loading === 'eager' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  const handleError = () => {
    if (!hasTriedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setHasTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className="w-full">
        <div
          ref={containerRef}
          className={`${containerClassName} flex flex-col items-center justify-center p-6 text-center bg-[#F3EFE7] border border-[#DDD3C2] select-none`}
          role="img"
          aria-label={alt}
        >
          <div className="w-10 h-10 rounded-full bg-[#EAE3D6] flex items-center justify-center mb-3 text-[#A44A29]">
            <Compass className="w-5 h-5" />
          </div>
          <div className="font-serif text-sm font-bold text-[#1B1715] tracking-tight uppercase">
            {title || 'Geological Field Specimen'}
          </div>
          <p className="mt-1 text-xs text-[#786D62] font-mono">
            Field photograph offline · Refer to scientific diagram
          </p>
        </div>
        {caption && (
          <div className="mt-2.5 text-xs font-mono text-[#6E6357]">
            {caption}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Masked Image Container with Desktop Hover Interaction (Requirement 6 & 7) */}
      <div
        ref={containerRef}
        className={`${containerClassName} overflow-hidden group transition-shadow duration-500`}
      >
        <div
          className="w-full h-full transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? 'scale(1)' : 'scale(1.08)',
          }}
        >
          <img
            src={currentSrc}
            alt={alt}
            loading={loading}
            onError={handleError}
            style={objectPosition ? { objectPosition } : undefined}
            className={`${className} transition-transform duration-600 ease-out lg:group-hover:scale-[1.035] lg:group-hover:-translate-y-0.5`}
          />
        </div>
      </div>

      {/* Staggered Caption Reveal (Requirement 8) */}
      {caption && (
        <div
          className="mt-2.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? 'translateY(0)' : 'translateY(8px)',
            transitionDelay: '180ms',
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
};

