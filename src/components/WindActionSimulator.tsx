import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Layers,
  TreePine,
  Wind,
  Compass,
  Play,
  Pause,
  RotateCcw,
  Info,
  ShieldAlert
} from 'lucide-react';
import {
  NECESSARY_CONDITIONS,
  EROSIONAL_PROCESSES,
  TRANSPORTATION_MODES,
} from '../data/geographyData';
import { EducationalImage } from './EducationalImage';

export const WindActionSimulator: React.FC = () => {
  // Simulator Controls
  const [windSpeed, setWindSpeed] = useState<number>(50); // 10 to 100 km/h
  const [selectedTransport, setSelectedTransport] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeCycleStep, setActiveCycleStep] = useState<number>(0);

  // Requirement 12: Erosion -> Transport -> Deposition Pipeline Stage State
  const [pipelineStage, setPipelineStage] = useState<1 | 2 | 3>(1);
  const [pipelineAutoPlay, setPipelineAutoPlay] = useState<boolean>(true);
  const [pipelineInView, setPipelineInView] = useState<boolean>(false);
  const pipelineRef = useRef<HTMLDivElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger Stage 1 when the pipeline section scrolls into view
  useEffect(() => {
    const node = pipelineRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPipelineInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle pipeline when in view (slow, educational: ~4.5s per stage)
  useEffect(() => {
    if (!pipelineAutoPlay || !pipelineInView) return;

    const timer = setInterval(() => {
      setPipelineStage((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)));
    }, 4500);

    return () => clearInterval(timer);
  }, [pipelineAutoPlay, pipelineInView]);

  // Cycle Steps from syllabus
  const cycleSteps = [
    {
      step: '01',
      title: 'Strong Arid Wind',
      desc: 'High velocity winds sweep over arid, uncompacted desert surfaces devoid of vegetation.',
      category: 'Meteorological Trigger'
    },
    {
      step: '02',
      title: 'Deflation Entrainment',
      desc: 'Deflation lifts and blows away loose sand and dust, lowering regional ground level.',
      category: 'Particle Pick-up'
    },
    {
      step: '03',
      title: 'Sediment Transport',
      desc: 'Particles move via Traction (rolling), Saltation (hopping 2–3 ft), or Suspension (floating).',
      category: 'Sediment Motion'
    },
    {
      step: '04',
      title: 'Bedrock Abrasion',
      desc: 'Sand-laden wind blasts rocks like sandpaper (Abrasion) and airborne grains collide (Attrition).',
      category: 'Rock Erosion'
    },
    {
      step: '05',
      title: 'Sediment Settlement',
      desc: 'When wind velocity drops or hits obstacles, sediments settle into dunes, barchans, or loess.',
      category: 'Deposition'
    }
  ];

  // Simulation Canvas Engine (Natural desert earth tones)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 340);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 340;
    };
    window.addEventListener('resize', handleResize);

    const groundY = height - 50;
    const saltationCeilingY = groundY - 75; // 2–3 feet scale

    interface SimParticle {
      type: 'traction' | 'saltation' | 'suspension';
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseColor: string;
      hopProgress?: number;
      hopWidth?: number;
      hopHeight?: number;
    }

    const simParticles: SimParticle[] = [];

    // Natural desert sand mineral colors (quartz sand, dark feldspar, fine dust)
    const initParticles = () => {
      simParticles.length = 0;
      // Traction (heavy pebbles sliding along bed)
      for (let i = 0; i < 18; i++) {
        simParticles.push({
          type: 'traction',
          x: Math.random() * width,
          y: groundY - (Math.random() * 3 + 2),
          vx: Math.random() * 1.2 + 0.6,
          vy: 0,
          size: Math.random() * 3 + 3,
          baseColor: '#5C4A3A',
        });
      }
      // Saltation (medium sand grains bouncing in parabolic arcs 2-3 ft)
      for (let i = 0; i < 70; i++) {
        simParticles.push({
          type: 'saltation',
          x: Math.random() * width,
          y: groundY,
          vx: Math.random() * 2.8 + 2.0,
          vy: 0,
          size: Math.random() * 1.8 + 1.6,
          baseColor: '#A4582E',
          hopProgress: Math.random() * Math.PI,
          hopWidth: Math.random() * 75 + 45,
          hopHeight: Math.random() * 60 + 22,
        });
      }
      // Suspension (fine dust powder swept into upper atmosphere)
      for (let i = 0; i < 55; i++) {
        simParticles.push({
          type: 'suspension',
          x: Math.random() * width,
          y: Math.random() * (saltationCeilingY - 25) + 15,
          vx: Math.random() * 3.6 + 3.0,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.4 + 0.8,
          baseColor: '#C4B49E',
        });
      }
    };

    initParticles();

    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Background: Natural parchment / dusty sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#F5EFE6');
      skyGrad.addColorStop(0.7, '#EFE7DA');
      skyGrad.addColorStop(1, '#E6DAC8');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Ground Stratum
      ctx.fillStyle = '#C2B199';
      ctx.fillRect(0, groundY, width, height - groundY);

      // Ground Surface Line
      ctx.strokeStyle = '#8E7D67';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Desert Pavement Gravel Stones
      ctx.fillStyle = '#786854';
      for (let x = 12; x < width; x += 40) {
        ctx.fillRect(x, groundY + 6, 7, 3);
        ctx.fillRect(x + 18, groundY + 16, 5, 2.5);
      }

      // 2–3 Feet Critical Sand-Blast Zone Boundary
      ctx.fillStyle = 'rgba(164, 74, 41, 0.06)';
      ctx.fillRect(0, saltationCeilingY, width, groundY - saltationCeilingY);

      // Dotted Ceiling Line
      ctx.strokeStyle = '#A44A29';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(0, saltationCeilingY);
      ctx.lineTo(width, saltationCeilingY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Technical Annotations
      ctx.fillStyle = '#8E3D20';
      ctx.font = '600 10.5px JetBrains Mono, monospace';
      ctx.fillText('CRITICAL 2–3 FEET (0.6–0.9 M) HIGH-ENERGY ABRASION ZONE', 18, saltationCeilingY + 16);

      ctx.fillStyle = '#786D62';
      ctx.font = '500 10px Plus Jakarta Sans, sans-serif';
      ctx.fillText('Upper Atmospheric Suspension (Fine Silt Carried Hundreds of km Beyond Deserts)', 18, 24);
      ctx.fillText('Desert Surface / Bedrock Datum (0 ft)', 18, groundY - 6);

      // Subtle Aerodynamic Flow Streamlines
      const speedScale = windSpeed / 50;
      const arrowSpacing = 160;
      ctx.strokeStyle = 'rgba(142, 61, 32, 0.25)';
      ctx.fillStyle = 'rgba(142, 61, 32, 0.25)';
      ctx.lineWidth = 1.2;

      for (let ax = (t * 70 * speedScale) % arrowSpacing; ax < width; ax += arrowSpacing) {
        ctx.beginPath();
        ctx.moveTo(ax, 44);
        ctx.lineTo(ax + 30, 44);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ax + 30, 44);
        ctx.lineTo(ax + 24, 41);
        ctx.lineTo(ax + 24, 47);
        ctx.closePath();
        ctx.fill();
      }

      // Draw Particles
      if (isPlaying) {
        for (let i = 0; i < simParticles.length; i++) {
          const p = simParticles[i];

          if (selectedTransport !== 'all' && selectedTransport !== p.type) {
            continue;
          }

          if (p.type === 'traction') {
            p.x += p.vx * speedScale * 0.7;
            if (p.x > width + 10) p.x = -10;

            ctx.fillStyle = p.baseColor;
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.size, p.size * 0.8, t, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === 'saltation') {
            if (p.hopProgress === undefined) p.hopProgress = 0;
            if (p.hopWidth === undefined) p.hopWidth = 60;
            if (p.hopHeight === undefined) p.hopHeight = 50;

            p.hopProgress += 0.05 * speedScale;
            if (p.hopProgress >= Math.PI) {
              p.hopProgress = 0;
              p.hopHeight = Math.random() * 52 + 18;
            }

            p.x += (p.vx + 1.2) * speedScale;
            if (p.x > width + 10) p.x = -10;

            const arcOffset = Math.sin(p.hopProgress) * p.hopHeight;
            const currentY = groundY - arcOffset;

            ctx.fillStyle = p.baseColor;
            ctx.beginPath();
            ctx.arc(p.x, currentY, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === 'suspension') {
            p.x += p.vx * speedScale * 1.2;
            p.y += p.vy + Math.sin(t * 2 + p.x * 0.02) * 0.35;

            if (p.x > width + 10) {
              p.x = -10;
              p.y = Math.random() * (saltationCeilingY - 30) + 15;
            }

            ctx.fillStyle = p.baseColor;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [windSpeed, selectedTransport, isPlaying]);

  return (
    <section id="wind-action" className="py-16 md:py-24 bg-[#F8F5EE] border-b border-[#E3DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono tracking-widest text-[#A44A29] uppercase font-semibold mb-2">
            CHAPTER 3 · GENERAL PRINCIPLES
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1715] font-bold tracking-tight">
            Wind Action: Conditions &amp; Processes
          </h2>
          <div className="h-0.5 w-16 bg-[#A44A29] my-4" />
          <p className="text-base sm:text-lg text-[#5C5147] leading-relaxed font-normal">
            Unlike water, wind is unconfined by riverbanks and moves freely across vast plains. However, it requires four specific environmental criteria to become geologically effective.
          </p>
        </div>

        {/* 1. Necessary Conditions (PDF Slide 2) */}
        <div className="mb-20">
          <div className="flex flex-wrap items-center justify-between border-b border-[#E3DBD0] pb-3 mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B1715] flex items-center gap-2">
              <Sun className="w-5 h-5 text-[#8E3D20]" />
              <span>Four Necessary Environmental Criteria</span>
            </h3>
            <span className="text-xs font-mono text-[#8C7F72]">SYLLABUS SLIDE 02 CITATION</span>
          </div>

          {/* Integrated Editorial Conditions Matrix (Section 1 & 7) */}
          <div className="border border-[#DDD3C2] bg-white divide-y lg:divide-y-0 lg:divide-x divide-[#DDD3C2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {NECESSARY_CONDITIONS.map((cond, idx) => (
              <div
                key={cond.id}
                className="p-5 sm:p-6 space-y-3 flex flex-col justify-between hover:bg-[#FAF8F5] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#8C7F72]">
                    <span className="text-[#8E3D20] font-bold tracking-wider">COND. 0{idx + 1}</span>
                    {idx === 0 && <Sun className="w-4 h-4 text-[#8E3D20]" />}
                    {idx === 1 && <Layers className="w-4 h-4 text-[#8E3D20]" />}
                    {idx === 2 && <TreePine className="w-4 h-4 text-[#8E3D20]" />}
                    {idx === 3 && <Wind className="w-4 h-4 text-[#8E3D20]" />}
                  </div>

                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1B1715] leading-snug">
                    {cond.name}
                  </h4>
                  <div className="text-xs font-serif italic text-[#8E3D20] mt-0.5 mb-2.5">
                    {cond.subtitle}
                  </div>
                  <p className="text-xs text-[#443B34] leading-relaxed">
                    {cond.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EDE5D8] text-[11px] text-[#786D62] leading-tight">
                  <span className="font-semibold text-[#1B1715] font-mono text-[10px] uppercase block mb-0.5">GEOLOGICAL ROLE</span>
                  {cond.mechanism}
                </div>
              </div>
            ))}
          </div>

          {/* Documentary Field Record: Real Wind Action & Sand Surface Transport */}
          <div className="mt-8 bg-white border border-[#DDD3C2] p-4 sm:p-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 border border-[#DDD3C2] p-1.5 bg-[#FAF8F5]">
                <EducationalImage
                  src="/images/wind_action_sand.jpg"
                  fallbackSrc="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1600&q=85"
                  alt="Active aeolian transport and wind-shaped sand ripples across arid desert terrain"
                  title="Wind Moving Sand Particles"
                  containerClassName="relative aspect-16/9 w-full overflow-hidden bg-[#EFE9DF]"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-5 space-y-3">
                <div className="text-[10px] font-mono text-[#8E3D20] uppercase tracking-wider font-bold">
                  DOCUMENTARY FIELD RECORD · AEOLIAN DYNAMICS
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1B1715]">
                  Wind Moving Sand Particles
                </h4>
                <p className="text-xs sm:text-sm text-[#443B34] leading-relaxed">
                  In arid regions where dry soil lacks vegetative cover, strong winds sweep unobstructed across the ground. Loose sand grains are dislodged and propelled into motion, generating characteristic wind ripples perpendicular to the dominant wind direction.
                </p>
                <div className="pt-2 border-t border-[#EDE5D8] flex items-center justify-between text-xs font-mono text-[#6E6357]">
                  <span><strong className="text-[#1B1715]">FIG. 1.2</strong> · Aeolian transport &amp; ripple formation</span>
                  <span className="text-[#8E3D20]">Slide 1 &amp; 2 Context</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Laboratory Simulation Box */}
        <div className="bg-[#FFFFFF] border border-[#DDD3C2] p-6 sm:p-8 shadow-xs mb-16">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[#E3DBD0] pb-4 mb-6">
            <div>
              <div className="text-xs font-mono tracking-widest text-[#A44A29] uppercase font-semibold">
                LABORATORY OBSERVATION CHAMBER
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B1715] mt-1">
                Sediment Transport Mechanics: Traction, Saltation &amp; Suspension
              </h3>
            </div>

            {/* Transport Filter Controls (Responsive wrap on mobile, min 40px touch targets, zero overflow) */}
            <div className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap items-center gap-1 bg-[#F3EFE7] p-1 border border-[#D5C9B7]">
              {[
                { id: 'all', label: 'All Modes' },
                { id: 'traction', label: 'Traction' },
                { id: 'saltation', label: 'Saltation (2–3 ft)' },
                { id: 'suspension', label: 'Suspension' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTransport(tab.id)}
                  className={`flex-1 sm:flex-initial min-h-[40px] px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer text-center flex items-center justify-center whitespace-nowrap ${
                    selectedTransport === tab.id
                      ? 'bg-[#1B1715] text-white shadow-2xs font-semibold'
                      : 'text-[#5C5147] hover:text-[#1B1715] hover:bg-[#EAE3D6]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Box */}
          <div className="relative border border-[#D5C9B7] overflow-hidden bg-[#E6DAC8]">
            <canvas ref={canvasRef} className="w-full block" />

            {/* Play/Pause Button - min 44px touch targets on mobile */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#FFFFFF]/90 p-1 border border-[#D5C9B7]">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 text-[#2C2622] hover:text-[#A44A29] cursor-pointer"
                title={isPlaying ? 'Pause' : 'Resume'}
                aria-label={isPlaying ? 'Pause' : 'Resume'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setWindSpeed(50);
                  setSelectedTransport('all');
                }}
                className="min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 text-[#2C2622] hover:text-[#A44A29] cursor-pointer"
                title="Reset Chamber"
                aria-label="Reset Chamber"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Velocity Control Strip */}
          <div className="mt-6 pt-4 border-t border-[#EDE5D8] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#443B34] mb-2 gap-1">
                <span className="font-semibold text-[#1B1715] flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-[#A44A29]" />
                  <span>Velocity Controller:</span>
                </span>
                <span className="text-[#8E3D20] font-bold tabular-nums">
                  {windSpeed} km/h · {windSpeed < 30 ? 'Gentle Breeze' : windSpeed < 70 ? 'Strong Gale' : 'Desert Sandstorm'}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
                className="w-full accent-[#8E3D20] cursor-pointer h-2 bg-[#EAE3D6] touch-pan-x"
                aria-label="Wind speed controller"
              />
            </div>

            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#EDE5D8] md:pl-5 text-xs text-[#5C5147]">
              <div className="font-serif font-bold text-[#1B1715] mb-1">
                Field Observation:
              </div>
              <p className="leading-relaxed">
                Saltation accounts for <strong>70% to 80%</strong> of transported sand volume. Because sand grains are dense, they bounce strictly within <strong>2 to 3 feet</strong>, producing maximum base undercut.
              </p>
            </div>
          </div>

          {/* Three Transport Modes: Unified Comparative Register (Section 7) */}
          <div className="mt-8 border-t border-[#EDE5D8] pt-6">
            <div className="text-[11px] font-mono tracking-widest text-[#8C7F72] uppercase font-bold mb-3">
              SEDIMENT AERODYNAMICS COMPARATIVE REGISTER
            </div>
            <div className="border border-[#DDD3C2] bg-white divide-y md:divide-y-0 md:divide-x divide-[#DDD3C2] grid grid-cols-1 md:grid-cols-3">
              {TRANSPORTATION_MODES.map((mode) => (
                <div
                  key={mode.id}
                  onClick={() => setSelectedTransport(mode.id)}
                  className={`p-5 transition-colors cursor-pointer ${
                    selectedTransport === mode.id
                      ? 'bg-[#FAF8F5] border-l-3 md:border-l-0 md:border-t-3 border-[#8E3D20]'
                      : 'hover:bg-[#FAF9F6]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                    <span className="font-bold text-[#1B1715] text-sm">{mode.name}</span>
                    <span className="text-[#8E3D20] uppercase font-semibold text-[11px]">{mode.movementType}</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#8C7F72] mb-2.5">
                    Operating Height: <strong className="text-[#1B1715]">{mode.heightRange}</strong>
                  </div>
                  <p className="text-xs text-[#443B34] leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. The Core Aeolian Pipeline: EROSION → TRANSPORT → DEPOSITION (Requirement 12) */}
        <div ref={pipelineRef} className="mb-16 bg-[#FFFFFF] border border-[#DDD3C2] p-6 sm:p-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="text-xs font-mono tracking-widest text-[#A44A29] uppercase font-bold">
              CHAPTER 3 · THE GEOMORPHIC PIPELINE
            </div>
            {/* Interactive Stage Controls */}
            <div className="flex flex-wrap items-center gap-1 bg-[#FAF8F5] p-1 border border-[#DDD3C2] text-xs font-mono">
              <span className="text-[10px] text-[#8C7F72] px-1.5 uppercase font-semibold">Phase:</span>
              {([1, 2, 3] as const).map((stageNum) => (
                <button
                  key={stageNum}
                  onClick={() => {
                    setPipelineStage(stageNum);
                    setPipelineAutoPlay(false);
                  }}
                  className={`min-h-[38px] px-2.5 py-1.5 transition-all duration-300 cursor-pointer text-xs font-semibold ${
                    pipelineStage === stageNum
                      ? 'bg-[#1B1715] text-white font-bold'
                      : 'text-[#5C5147] hover:text-[#1B1715] hover:bg-[#EAE3D6]'
                  }`}
                >
                  Stage 0{stageNum}
                </button>
              ))}
              <button
                onClick={() => setPipelineAutoPlay(!pipelineAutoPlay)}
                className="min-h-[38px] min-w-[38px] flex items-center justify-center px-2 py-1 text-[11px] text-[#8E3D20] hover:text-[#1B1715] cursor-pointer"
                title={pipelineAutoPlay ? 'Pause auto-cycle' : 'Resume auto-cycle'}
                aria-label={pipelineAutoPlay ? 'Pause auto-cycle' : 'Resume auto-cycle'}
              >
                {pipelineAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1715] mb-2">
            The Three Stages of Aeolian Action
          </h3>
          <p className="text-sm text-[#5C5147] mb-6 font-normal">
            Wind works across arid landscapes through three sequential geological stages: dislodging material, moving sediment according to grain mass, and accumulating features when kinetic energy drops.
          </p>

          {/* Animated Physical Process Strip (Requirement 12 Visual Visualization) */}
          <div className="mb-8 p-3 sm:p-4 bg-gradient-to-r from-[#F6F1E9] via-[#EFE7DA] to-[#F6F1E9] border border-[#DDD3C2] overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono mb-2 gap-1">
              <span className="text-[#8E3D20] font-bold uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A44A29] animate-ping" />
                Live Geological Sequence: {pipelineStage === 1 ? 'Stage 1 — Erosion' : pipelineStage === 2 ? 'Stage 2 — Transport Flux' : 'Stage 3 — Deposition'}
              </span>
              <span className="text-[#8C7F72]">
                {pipelineAutoPlay ? 'Auto-cycling (4.5s)' : 'Manual Inspection'}
              </span>
            </div>

            {/* Educational SVG Stage Motion Graphic (legible aspect ratio on mobile) */}
            <div className="relative aspect-16/7 sm:aspect-21/4 w-full bg-white/70 border border-[#DDD3C2] overflow-hidden">
              <svg viewBox="0 0 700 120" className="w-full h-full select-none" preserveAspectRatio="none">
                {/* Ground Datum */}
                <line x1="0" y1="95" x2="700" y2="95" stroke="#8E7D67" strokeWidth="1.5" />
                <rect x="0" y="95" width="700" height="25" fill="#E2D6C3" />

                {/* STAGE 1: Bedrock Block on the Left Detaching Particles */}
                <rect
                  x="30"
                  y="45"
                  width="70"
                  height="50"
                  fill="#9C826C"
                  stroke="#594433"
                  strokeWidth="1.5"
                  className={pipelineStage === 1 ? 'transition-all duration-500' : 'opacity-60'}
                />
                <text x="65" y="75" fill="#FFF" fontSize="9.5" textAnchor="middle" fontWeight="bold">
                  Bedrock
                </text>

                {/* Particles Detaching (Stage 1 Active) */}
                {pipelineStage === 1 && (
                  <g className="animate-wind-flow">
                    <circle cx="108" cy="55" r="2.2" fill="#A44A29" className="animate-saltation-1" />
                    <circle cx="116" cy="68" r="2.5" fill="#884318" className="animate-saltation-2" />
                    <circle cx="112" cy="85" r="3" fill="#6B3314" className="animate-saltation-3" />
                    <text x="125" y="42" fill="#A44A29" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      Particles Detach ➔
                    </text>
                  </g>
                )}

                {/* STAGE 2: Transport Mid-Zone Streamlines & Layers */}
                <g className={pipelineStage === 2 ? 'opacity-100' : 'opacity-35'}>
                  {/* Atmospheric wind streamlines */}
                  <line x1="160" y1="25" x2="480" y2="25" stroke="#365D73" strokeWidth="1.4" strokeDasharray="8 6" className={pipelineStage === 2 ? 'animate-wind-flow-fast' : ''} />
                  <text x="320" y="20" fill="#365D73" fontSize="8.5" textAnchor="middle" fontFamily="monospace">
                    Suspension Level (High Velocity)
                  </text>

                  {/* 2-3 ft Saltation zone */}
                  <line x1="160" y1="65" x2="480" y2="65" stroke="#A44A29" strokeWidth="1.4" strokeDasharray="6 4" className={pipelineStage === 2 ? 'animate-wind-flow' : ''} />
                  <text x="320" y="60" fill="#A44A29" fontSize="8.5" textAnchor="middle" fontFamily="monospace">
                    Saltation Zone (2–3 ft Bouncing Sand)
                  </text>

                  {/* Traction Ground line */}
                  <text x="320" y="90" fill="#786854" fontSize="8" textAnchor="middle" fontFamily="monospace">
                    Traction (Rolling Coarse Grains)
                  </text>
                </g>

                {/* STAGE 3: Deposition Mound on the Right */}
                <g className={pipelineStage === 3 ? 'opacity-100' : 'opacity-40'}>
                  {/* Obstacle Rock */}
                  <polygon points="520,95 535,65 550,95" fill="#786854" stroke="#443B34" strokeWidth="1.2" />
                  <text x="535" y="60" fill="#786854" fontSize="8" textAnchor="middle">
                    Obstacle
                  </text>

                  {/* Deposited Dune Ridge */}
                  <path
                    d="M 545 95 Q 585 70, 620 68 Q 635 85, 660 95 Z"
                    fill="#D98A53"
                    stroke="#8A4A22"
                    strokeWidth="1.5"
                    className={pipelineStage === 3 ? 'transition-all duration-700' : ''}
                  />
                  <text x="605" y="86" fill="#FFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Dune Accumulation
                  </text>
                </g>

                {/* Direction Arrows */}
                <g className="animate-arrow-drift">
                  <line x1="20" y1="18" x2="100" y2="18" stroke="#A44A29" strokeWidth="2" />
                  <polygon points="100,18 92,14 92,22" fill="#A44A29" />
                  <text x="110" y="21" fill="#884318" fontSize="9" fontWeight="bold">
                    WIND VELOCITY ➔
                  </text>
                </g>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Stage 1: EROSION */}
            <div
              onClick={() => {
                setPipelineStage(1);
                setPipelineAutoPlay(false);
              }}
              className={`p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                pipelineStage === 1
                  ? 'bg-white border-[#8E3D20] border-t-4 border-t-[#8E3D20]'
                  : 'bg-[#FAF8F5] border-[#DDD3C2] hover:border-[#8E3D20]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#EDE5D8]">
                  <span className={`text-xs font-mono font-bold ${pipelineStage === 1 ? 'text-[#8E3D20]' : 'text-[#786D62]'}`}>
                    STAGE 01
                  </span>
                  <span className="text-[10px] font-mono text-[#8C7F72] uppercase">
                    {pipelineStage === 1 ? '● ACTIVE: DETACHMENT' : 'EXOGENIC WEAKENING'}
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#1B1715] mb-2">
                  EROSION
                </h4>
                <p className="text-xs text-[#5C5147] leading-relaxed mb-4">
                  High-velocity arid winds attack bedrock through three simultaneous physical processes:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#EDE5D8]">
                    <span className="font-serif font-bold text-[#1B1715]">Deflation:</span>
                    <span className="text-[#443B34] ml-1">Lifting and blowing away loose sand particles, lowering ground level.</span>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#EDE5D8]">
                    <span className="font-serif font-bold text-[#1B1715]">Abrasion:</span>
                    <span className="text-[#443B34] ml-1">Sand-laden winds blast rock surfaces like natural sandpaper.</span>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#EDE5D8]">
                    <span className="font-serif font-bold text-[#1B1715]">Attrition:</span>
                    <span className="text-[#443B34] ml-1">Airborne grains collide with each other, pulverizing into finer sand.</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EDE5D8] text-[11px] font-mono text-[#8E3D20] text-center font-medium">
                ↓ Kinetic Energy Propels Material
              </div>
            </div>

            {/* Stage 2: TRANSPORT */}
            <div
              onClick={() => {
                setPipelineStage(2);
                setPipelineAutoPlay(false);
              }}
              className={`p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                pipelineStage === 2
                  ? 'bg-white border-[#8E3D20] border-t-4 border-t-[#8E3D20]'
                  : 'bg-[#FAF8F5] border-[#DDD3C2] hover:border-[#8E3D20]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#EDE5D8]">
                  <span className={`text-xs font-mono font-bold ${pipelineStage === 2 ? 'text-[#8E3D20]' : 'text-[#786D62]'}`}>
                    STAGE 02
                  </span>
                  <span className="text-[10px] font-mono text-[#8C7F72] uppercase">
                    {pipelineStage === 2 ? '● ACTIVE: MOTION' : 'AEOLIAN FLUX'}
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#1B1715] mb-2">
                  TRANSPORT
                </h4>
                <p className="text-xs text-[#5C5147] leading-relaxed mb-4">
                  Sediment is segregated by particle mass into three distinct aerodynamic zones:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#EDE5D8]">
                    <span className="font-serif font-bold text-[#1B1715]">Traction:</span>
                    <span className="text-[#443B34] ml-1">Heavier coarse particles roll and slide along the surface (0 ft).</span>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#EDE5D8]">
                    <span className="font-serif font-bold text-[#1B1715]">Saltation:</span>
                    <span className="text-[#443B34] ml-1">Medium grains bounce in low parabolic hops within 2 to 3 feet.</span>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#EDE5D8]">
                    <span className="font-serif font-bold text-[#1B1715]">Suspension:</span>
                    <span className="text-[#443B34] ml-1">Microscopic silt floats high in turbulent air currents across continents.</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EDE5D8] text-[11px] font-mono text-[#8E3D20] text-center font-medium">
                ↓ Velocity Deceleration / Obstacle Encounter
              </div>
            </div>

            {/* Stage 3: DEPOSITION */}
            <div
              onClick={() => {
                setPipelineStage(3);
                setPipelineAutoPlay(false);
              }}
              className={`p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                pipelineStage === 3
                  ? 'bg-white border-[#8E3D20] border-t-4 border-t-[#8E3D20]'
                  : 'bg-[#FAF8F5] border-[#DDD3C2] hover:border-[#8E3D20]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#EDE5D8]">
                  <span className={`text-xs font-mono font-bold ${pipelineStage === 3 ? 'text-[#8E3D20]' : 'text-[#786D62]'}`}>
                    STAGE 03
                  </span>
                  <span className="text-[10px] font-mono text-[#8C7F72] uppercase">
                    {pipelineStage === 3 ? '● ACTIVE: SETTLING' : 'SEDIMENT ACCUMULATION'}
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#1B1715] mb-2">
                  DEPOSITION
                </h4>
                <p className="text-xs text-[#5C5147] leading-relaxed mb-4">
                  Deposition takes place whenever aerodynamic carrying power drops below transport threshold:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#EDE5D8]">
                    <span className="font-serif font-bold text-[#1B1715]">Velocity Decrease:</span>
                    <span className="text-[#443B34] ml-1">When wind slows down, it can no longer carry its sediment load.</span>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#EDE5D8]">
                    <span className="font-serif font-bold text-[#1B1715]">Terrain Obstacles:</span>
                    <span className="text-[#443B34] ml-1">Boulders, shrubs, or ridges cause sand to drop into sheltered eddies.</span>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#EDE5D8]">
                    <span className="font-serif font-bold text-[#1B1715]">Resulting Features:</span>
                    <span className="text-[#443B34] ml-1">Produces sand dunes, crescent barchans, and extensive loess plains.</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EDE5D8] text-[11px] font-mono text-[#2E5C38] text-center font-bold">
                ✓ Landforms Formed in Arid Regions
              </div>
            </div>
          </div>
        </div>

        {/* 4. Complete Cycle: Architectural Sequential Strip */}
        <div className="pt-10 border-t border-[#E3DBD0]">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl font-bold text-[#1B1715]">
              Geomorphic Cycle of Aeolian Action
            </h3>
            <p className="text-xs font-mono text-[#786D62] mt-1">
              Wind → Picks Up Particles → Transports Sediment → Erodes Rock → Deposits Sediment
            </p>
          </div>

          <div className="border border-[#DDD3C2] bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#DDD3C2] grid grid-cols-1 sm:grid-cols-5">
            {cycleSteps.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setActiveCycleStep(idx)}
                className={`text-left p-4.5 transition-colors cursor-pointer ${
                  activeCycleStep === idx
                    ? 'bg-[#FAF8F5] border-l-4 sm:border-l-0 sm:border-t-4 border-[#8E3D20]'
                    : 'hover:bg-[#FAF9F6] border-l-4 sm:border-l-0 sm:border-t-4 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-2 text-xs font-mono">
                  <span className={activeCycleStep === idx ? 'text-[#8E3D20] font-bold' : 'text-[#8C7F72]'}>
                    {step.step}
                  </span>
                  <span className="text-[10px] text-[#8C7F72]">
                    {step.category}
                  </span>
                </div>
                <div className="font-serif font-bold text-sm mb-1 text-[#1B1715]">{step.title}</div>
                <p className="text-[11px] leading-relaxed text-[#5C5147]">
                  {step.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
