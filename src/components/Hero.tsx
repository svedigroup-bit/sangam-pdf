import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { EducationalImage } from './EducationalImage';

interface HeroProps {
  onStartLearning: () => void;
  onExploreLandforms: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartLearning, onExploreLandforms }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const photoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  // Subtle desktop parallax (Item 14: very small vertical shift, disabled on mobile/reduced-motion)
  useEffect(() => {
    if (window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          if (sy < 800) {
            setParallaxY(Math.min(sy * 0.035, 18));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger sequence on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Background ambient wind drift canvas (overall section)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Fine, low-opacity natural sand particles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.random() * 0.7 + 0.3,
      vy: Math.sin(Math.random() * Math.PI) * 0.12,
      size: Math.random() * 1.1 + 0.5,
      opacity: Math.random() * 0.12 + 0.04,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#9C7A5B';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > width + 10) {
          p.x = -10;
          p.y = Math.random() * height;
        }

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Point 4: Specific subtle atmospheric wind effect directly over hero photograph
  useEffect(() => {
    const canvas = photoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 375);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Sparse, ultra-fine horizontal sand dust (non-glowing, natural)
    const dustParticles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.random() * 1.2 + 0.5, // varying horizontal speeds
      vy: (Math.random() - 0.45) * 0.15,
      size: Math.random() * 0.9 + 0.5,
      opacity: Math.random() * 0.12 + 0.03, // strictly subconscious
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#DFD4C2'; // natural warm sand dust hue
      for (let i = 0; i < dustParticles.length; i++) {
        const p = dustParticles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > width + 8) {
          p.x = -8;
          p.y = Math.random() * height;
          p.opacity = Math.random() * 0.12 + 0.03;
        }

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="hero" className="relative bg-[#F8F5EE] border-b border-[#E3DBD0] overflow-hidden">
      {/* Subtle Natural Wind Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
        aria-hidden="true"
      />

      {/* Editorial Field Study Header Band */}
      <div className="relative z-10 border-b border-[#E8E1D5] bg-[#F3EFE7]/90 px-4 sm:px-8 py-2 text-xs font-mono text-[#786D62] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A44A29]" />
          <span className="font-semibold tracking-wider text-[#1B1715]">GEOMORPHOLOGY FIELD GUIDE</span>
          <span className="text-[#C4B7A5]">·</span>
          <span>CHAPTER 3</span>
        </div>
        <div className="hidden sm:block text-[11px] text-[#8C7F72]">
          MAHARASHTRA STATE SCIENCE SYLLABUS · CLASS 11
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Academic Text Composition (~45%) with Cinematic Entrance */}
          <div className="lg:col-span-5 space-y-5">
            {/* STEP 1: Small Eyebrow */}
            <div
              className="text-xs font-mono tracking-widest text-[#8E3D20] uppercase font-bold transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: '100ms',
              }}
            >
              CLASS 11 • GEOGRAPHY • CHAPTER 3
            </div>

            {/* STEP 2 & 3: Title & Second Line with Stagger */}
            <div className="space-y-1 overflow-hidden">
              <h1 className="font-serif text-[clamp(2.1rem,7.5vw,3.75rem)] text-[#1B1715] leading-[1.06] font-bold tracking-tight">
                <span
                  className="inline-block transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] mr-2.5 sm:mr-3"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(25px)',
                    transitionDelay: '280ms',
                  }}
                >
                  WORK
                </span>
                <span
                  className="inline-block transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(25px)',
                    transitionDelay: '420ms',
                  }}
                >
                  OF WIND
                </span>
              </h1>
              {/* STEP 3: LANDFORMS appears slightly after */}
              <div
                className="font-serif text-[clamp(1.75rem,6vw,3rem)] text-[#8E3D20] font-normal italic leading-none transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] pt-0.5"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '620ms',
                }}
              >
                LANDFORMS
              </div>
            </div>

            {/* STEP 4: Subtitle & Supporting Sentence */}
            <div
              className="space-y-3 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '800ms',
              }}
            >
              <div className="text-base sm:text-lg font-serif text-[#443B34] border-l-2 border-[#A44A29] pl-3 py-0.5">
                Erosional &amp; Depositional Features in Arid Regions
              </div>
              <p className="text-sm sm:text-base text-[#5C5147] leading-relaxed font-normal">
                Discover how wind shapes, transports and deposits material across arid landscapes.
              </p>
            </div>

            {/* STEP 5: Buttons with Micro-Interactions (Stacked on narrow screens, min 44px touch target) */}
            <div
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '1000ms',
              }}
            >
              {/* Primary button with subtle arrow shift on hover */}
              <button
                onClick={onStartLearning}
                className="group w-full sm:w-auto min-h-[44px] px-5 py-3 text-xs font-semibold tracking-wide text-white bg-[#1B1715] hover:bg-[#8E3D20] transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs border border-[#1B1715] hover:border-[#8E3D20]"
              >
                <span>EXPLORE CHAPTER</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              </button>

              {/* Secondary button with subtle tactile border transition */}
              <button
                onClick={onExploreLandforms}
                className="w-full sm:w-auto min-h-[44px] px-5 py-3 text-xs font-medium text-[#443B34] hover:text-[#1B1715] bg-[#FAF8F5] hover:bg-[#EAE3D6] hover:border-[#A44A29] transition-all duration-300 border border-[#D5C9B7] cursor-pointer flex items-center justify-center"
              >
                FIELD ATLAS
              </button>
            </div>

            {/* Chapter Metadata Elements - Desktop display in column */}
            <div
              className="hidden lg:grid pt-5 border-t border-[#E3DBD0] grid-cols-2 gap-4 text-xs font-mono text-[#786D62] transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: '1150ms',
              }}
            >
              <div>
                <span className="block text-[10px] uppercase text-[#8C7F72] font-semibold">Erosional Features</span>
                <span className="text-[#1B1715] font-medium">4 major landforms</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-[#8C7F72] font-semibold">Depositional Features</span>
                <span className="text-[#1B1715] font-medium">3 major landforms</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-[#8C7F72] font-semibold">Wind Processes</span>
                <span className="text-[#8E3D20] font-medium">Deflation · Abrasion · Attrition</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-[#8C7F72] font-semibold">Transport</span>
                <span className="text-[#8E3D20] font-medium">Traction · Saltation · Suspension</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Photograph with Cinematic Entrance & Subconscious Wind (~55%) */}
          <div className="lg:col-span-7">
            <div
              className="bg-white p-3 sm:p-4 border border-[#DDD3C2] shadow-2xs transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded
                  ? `translateY(${parallaxY}px) scale(1)`
                  : 'translateY(0) scale(1.03)',
                transitionDelay: '350ms',
              }}
            >
              {/* Archival Mat & Realistic Desert Landform Photograph */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EFE9DF] group">
                <div
                  className="w-full h-full transition-all duration-1400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: isLoaded ? 'scale(1)' : 'scale(1.06)',
                    opacity: isLoaded ? 1 : 0.6,
                    clipPath: isLoaded ? 'inset(0% 0% 0% 0%)' : 'inset(0% 8% 0% 0%)',
                  }}
                >
                  <img
                    src="/images/hero_desert_dunes.jpg"
                    alt="Wind-shaped desert sand dunes showing aeolian landforms in an arid landscape"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out lg:group-hover:scale-[1.035] animate-ambient-breathe"
                    loading="eager"
                  />
                </div>

                {/* Point 4: Atmospheric sparse sand particle breeze overlay on the photograph */}
                <canvas
                  ref={photoCanvasRef}
                  className="absolute inset-0 pointer-events-none z-10"
                  aria-hidden="true"
                />

                {/* Subtle natural film-like edge vignette */}
                <div
                  className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(44,38,34,0.12)] z-10"
                  aria-hidden="true"
                />
              </div>

              {/* Documentary Caption underneath photograph */}
              <div
                className="mt-3 px-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[11px] text-[#6E6357] transition-all duration-700"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(8px)',
                  transitionDelay: '800ms',
                }}
              >
                <div>
                  <span className="font-semibold text-[#1B1715] font-serif">Figure 1.0</span> · Wind-shaped desert sand dunes showing aeolian landforms in an arid landscape.
                </div>
                <div className="font-mono text-[10px] text-[#8C7F72] shrink-0">
                  Slide 1 &amp; 8 Context
                </div>
              </div>
            </div>

            {/* Mobile Chapter Metadata Elements (Appears right under image on mobile, as per spec) */}
            <div
              className="lg:hidden mt-6 bg-[#FAF8F5] border border-[#DDD3C2] p-4 grid grid-cols-2 gap-3 text-xs font-mono text-[#786D62]"
            >
              <div>
                <span className="block text-[10px] uppercase text-[#8C7F72] font-semibold">Erosional Features</span>
                <span className="text-[#1B1715] font-medium">4 major landforms</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-[#8C7F72] font-semibold">Depositional Features</span>
                <span className="text-[#1B1715] font-medium">3 major landforms</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-[#EDE5D8] flex flex-col gap-1">
                <div>
                  <span className="text-[10px] uppercase text-[#8C7F72] font-semibold mr-1.5">Processes:</span>
                  <span className="text-[#8E3D20] font-medium">Deflation · Abrasion · Attrition</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#8C7F72] font-semibold mr-1.5">Transport:</span>
                  <span className="text-[#8E3D20] font-medium">Traction · Saltation · Suspension</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

