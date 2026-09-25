import React, { useState } from 'react';
import { Layers, Wind, Eye, Compass, Droplet } from 'lucide-react';

interface GeologicalDiagramProps {
  type: 'mushroom' | 'yardang' | 'ventifact' | 'deflation' | 'barchan' | 'dune-types' | 'loess';
  interactive?: boolean;
}

export const GeologicalDiagram: React.FC<GeologicalDiagramProps> = ({ type, interactive = true }) => {
  // State for interactive diagram views
  const [mushroomHeightMode, setMushroomHeightMode] = useState<'blast-zone' | 'structure' | 'airflow'>('blast-zone');
  const [ventifactStage, setVentifactStage] = useState<number>(2); // 0: Raw pebble, 1: Single facet, 2: Dreikanter (3 facets)
  const [yardangCut, setYardangCut] = useState<'3d' | 'strata'>('3d');
  const [deflationStage, setDeflationStage] = useState<'normal' | 'depressed' | 'water-table'>('water-table');
  const [duneType, setDuneType] = useState<'transverse' | 'longitudinal'>('transverse');

  switch (type) {
    // ----------------------------------------------------
    // 1. MUSHROOM ROCKS: 2-3 Feet Low-Height Blast Zone
    // ----------------------------------------------------
    case 'mushroom':
      return (
        <div className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-3.5 sm:p-4">
          {/* Scientific Illustration Figure Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#EDE5D8] text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#8E3D20]">
              <Compass className="w-3.5 h-3.5" />
              <span className="font-bold tracking-tight uppercase">FIG. 2.3 · DIFFERENTIAL SAND-BLAST CROSS SECTION</span>
            </div>
            {interactive && (
              <div className="flex items-center gap-1 bg-[#EDE5D8] p-0.5 border border-[#DDD3C2]">
                {(['blast-zone', 'structure', 'airflow'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setMushroomHeightMode(mode)}
                    className={`px-2 py-0.5 text-[10px] font-mono transition-colors cursor-pointer ${
                      mushroomHeightMode === mode
                        ? 'bg-[#1B1715] text-white font-semibold'
                        : 'text-[#594F46] hover:text-[#1B1715]'
                    }`}
                  >
                    {mode === 'blast-zone' ? '2–3 ft Zone' : mode === 'structure' ? 'Anatomy' : 'Airflow'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Technical Drawing Canvas Frame */}
          <div className="relative aspect-4/3 w-full bg-gradient-to-b from-[#F2ECE3] to-[#E5D7C5] overflow-hidden border border-[#D8C7B5]">
            <svg viewBox="0 0 400 300" className="w-full h-full select-none">
              <defs>
                <linearGradient id="rockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C88E62" />
                  <stop offset="60%" stopColor="#AD6C3E" />
                  <stop offset="100%" stopColor="#8A4A22" />
                </linearGradient>
                <pattern id="sandHatch" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#C2723A" opacity="0.3" />
                  <circle cx="8" cy="8" r="1" fill="#C2723A" opacity="0.2" />
                </pattern>
              </defs>

              {/* Sky and Horizon */}
              <line x1="0" y1="240" x2="400" y2="240" stroke="#8F7862" strokeWidth="2" />
              <rect x="0" y="240" width="400" height="60" fill="#D2BEA8" />

              {/* Critical 2-3 Feet Sand Blast Zone Highlight (approx height 180 to 240) */}
              <rect
                x="0"
                y="180"
                width="400"
                height="60"
                fill="rgba(194, 114, 58, 0.18)"
                stroke="#C2723A"
                strokeDasharray="4 4"
                strokeWidth="1.2"
                className="animate-pulse"
                style={{ animationDuration: '3.5s' }}
              />

              {/* Height Scale Line (Left) */}
              <line x1="45" y1="240" x2="45" y2="60" stroke="#7A6B5D" strokeWidth="1.5" />
              <line x1="40" y1="240" x2="50" y2="240" stroke="#7A6B5D" strokeWidth="1.5" />
              <line x1="40" y1="180" x2="50" y2="180" stroke="#C2723A" strokeWidth="2" />
              <line x1="40" y1="60" x2="50" y2="60" stroke="#7A6B5D" strokeWidth="1.5" />

              <text x="32" y="244" fill="#7A6B5D" fontSize="10" fontFamily="sans-serif" textAnchor="end">0 ft</text>
              <text x="32" y="184" fill="#A85A26" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">2–3 ft</text>
              <text x="32" y="64" fill="#7A6B5D" fontSize="10" fontFamily="sans-serif" textAnchor="end">10 ft</text>

              {/* Mushroom Rock Contour: Narrow Base (Stem) & Broad Top (Head) */}
              <path
                d="M 175 240 
                   C 175 210, 185 190, 185 150 
                   C 185 130, 120 120, 120 90 
                   C 120 60, 280 60, 280 90 
                   C 280 120, 215 130, 215 150 
                   C 215 190, 225 210, 225 240 
                   Z"
                fill="url(#rockGradient)"
                stroke="#6B3314"
                strokeWidth="2.5"
              />

              {/* Texture shading on rock */}
              <path
                d="M 130 90 C 140 70, 260 70, 270 90 C 250 110, 150 110, 130 90 Z"
                fill="#DEAA82"
                opacity="0.5"
              />

              {/* Concentrated Abrasion Glow on Undercut Stem (Requirement 11) */}
              <path
                d="M 175 235 C 178 215, 185 195, 185 170"
                stroke="#FFD5A5"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
                className="animate-pulse"
                style={{ animationDuration: '2.5s' }}
              />

              {/* Low-Altitude High-Energy Sand Blast Arrows with Bouncing Particles (within 2-3 ft) */}
              <g opacity={mushroomHeightMode === 'blast-zone' ? 1 : 0.6}>
                {[190, 205, 220, 232].map((y, idx) => (
                  <g key={y} className="animate-arrow-drift" style={{ animationDelay: `${idx * 250}ms` }}>
                    <line
                      x1="60"
                      y1={y}
                      x2="175"
                      y2={y}
                      stroke="#A85A26"
                      strokeWidth="2.2"
                      strokeDasharray="6 3"
                      className="animate-wind-flow-fast"
                    />
                    <polygon
                      points={`175,${y} 165,${y - 3} 165,${y + 3}`}
                      fill="#A85A26"
                    />
                    {/* Bouncing saltating sand dots */}
                    <circle
                      cx={85 + idx * 18}
                      cy={y - 2}
                      r="2.2"
                      fill="#884318"
                      className={idx % 2 === 0 ? 'animate-saltation-1' : 'animate-saltation-2'}
                    />
                    <circle
                      cx={125 + idx * 12}
                      cy={y + 1}
                      r="2.4"
                      fill="#884318"
                      className={idx % 2 === 0 ? 'animate-saltation-3' : 'animate-saltation-1'}
                    />
                  </g>
                ))}
              </g>

              {/* Gentle upper wind (minimal abrasion) */}
              <g opacity={mushroomHeightMode === 'blast-zone' ? 0.4 : 0.8}>
                <line x1="60" y1="100" x2="115" y2="100" stroke="#7A6B5D" strokeWidth="1.2" strokeDasharray="4 4" className="animate-wind-flow" />
                <line x1="60" y1="130" x2="155" y2="130" stroke="#7A6B5D" strokeWidth="1.2" strokeDasharray="4 4" className="animate-wind-flow" />
              </g>

              {/* Annotations */}
              <g>
                {/* Upper head callout */}
                <text x="290" y="85" fill="#1F1B18" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  Broad Top Head
                </text>
                <text x="290" y="100" fill="#594F46" fontSize="9.5" fontFamily="sans-serif">
                  Protected from heavy grains
                </text>
                <line x1="260" y1="90" x2="285" y2="90" stroke="#594F46" strokeWidth="1" />

                {/* Base stem callout */}
                <text x="250" y="200" fill="#884318" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  Narrow Stem (Severe Undercutting)
                </text>
                <text x="250" y="215" fill="#884318" fontSize="9.5" fontFamily="sans-serif">
                  Heavy sand blast within 2–3 ft
                </text>
                <line x1="210" y1="205" x2="245" y2="205" stroke="#884318" strokeWidth="1.2" />

                {/* Wind Label */}
                <text x="65" y="170" fill="#A85A26" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  Dominant Wind Direction ➔
                </text>
              </g>
            </svg>
          </div>

          <div className="mt-2.5 text-xs text-[#594F46] leading-relaxed">
            <strong className="text-[#1F1B18]">Core Rule:</strong> Because sand grains are heavy, they bounce via saltation primarily within <strong>2 to 3 feet</strong> above the ground. Hence, bedrock is rapidly carved into a slender stalk while the cap remains broad.
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 2. YARDANGS: Parallel Hard & Soft Rock Ridges
    // ----------------------------------------------------
    case 'yardang':
      return (
        <div className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-3.5 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#EDE5D8] text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#8E3D20]">
              <Layers className="w-3.5 h-3.5" />
              <span className="font-bold tracking-tight uppercase">FIG. 2.4 · PARALLEL STRATA EXCAVATION PROFILE</span>
            </div>
            {interactive && (
              <div className="flex items-center gap-1 bg-[#EDE5D8] p-0.5 border border-[#DDD3C2]">
                <button
                  onClick={() => setYardangCut('3d')}
                  className={`px-2 py-0.5 text-[10px] font-mono transition-colors cursor-pointer ${
                    yardangCut === '3d'
                      ? 'bg-[#1B1715] text-white font-semibold'
                      : 'text-[#594F46] hover:text-[#1B1715]'
                  }`}
                >
                  Streamlined Ridges
                </button>
                <button
                  onClick={() => setYardangCut('strata')}
                  className={`px-2 py-0.5 text-[10px] font-mono transition-colors cursor-pointer ${
                    yardangCut === 'strata'
                      ? 'bg-[#1B1715] text-white font-semibold'
                      : 'text-[#594F46] hover:text-[#1B1715]'
                  }`}
                >
                  Rock Strata View
                </button>
              </div>
            )}
          </div>

          <div className="relative aspect-4/3 w-full bg-gradient-to-b from-[#F2ECE3] to-[#E5D7C5] overflow-hidden border border-[#D8C7B5]">
            <svg viewBox="0 0 400 300" className="w-full h-full select-none">
              <defs>
                <linearGradient id="hardRock" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A85A26" />
                  <stop offset="50%" stopColor="#C2723A" />
                  <stop offset="100%" stopColor="#884318" />
                </linearGradient>
                <linearGradient id="softRockTrough" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D8C7B5" />
                  <stop offset="100%" stopColor="#BAA48E" />
                </linearGradient>
              </defs>

              {yardangCut === '3d' ? (
                // 3D Oblique View of Parallel Streamlined Ridges
                <g>
                  {/* Horizon */}
                  <rect x="0" y="0" width="400" height="100" fill="#EFE5D7" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#D0BFAB" strokeWidth="1" />

                  {/* Wind Direction Guide Arrows across the entire field (Requirement 11 & 13) */}
                  <g className="animate-arrow-drift">
                    {[60, 160, 260, 340].map((x, i) => (
                      <g key={x} opacity="0.6">
                        <line x1={x} y1="20" x2={x + 30} y2="70" stroke="#A85A26" strokeWidth="2" strokeDasharray="5 3" className="animate-wind-flow" />
                        <polygon points={`${x + 30},70 ${x + 22},64 ${x + 27},59`} fill="#A85A26" />
                      </g>
                    ))}
                    <text x="20" y="35" fill="#884318" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">
                      Prevailing Wind Corridor (Parallel to Strata) ➔
                    </text>
                  </g>

                  {/* Ridge 1 (Hard Rock Ridge - Left) */}
                  <polygon
                    points="40,240 80,130 110,140 100,260"
                    fill="url(#hardRock)"
                    stroke="#592A10"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="80,130 150,110 160,115 110,140"
                    fill="#D98A53"
                    stroke="#592A10"
                    strokeWidth="1.5"
                  />

                  {/* Trough 1 (Eroded Soft Rock Furrow) */}
                  <polygon
                    points="100,260 110,140 160,115 170,120 180,270"
                    fill="url(#softRockTrough)"
                    stroke="#8F7862"
                    strokeWidth="1"
                  />

                  {/* Ridge 2 (Hard Rock Ridge - Center Main) */}
                  <polygon
                    points="180,270 200,120 235,130 240,280"
                    fill="url(#hardRock)"
                    stroke="#592A10"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="200,120 280,95 295,102 235,130"
                    fill="#DE9B68"
                    stroke="#592A10"
                    strokeWidth="1.5"
                  />

                  {/* Trough 2 (Eroded Furrow) */}
                  <polygon
                    points="240,280 235,130 295,102 320,110 330,290"
                    fill="url(#softRockTrough)"
                    stroke="#8F7862"
                    strokeWidth="1"
                  />

                  {/* Ridge 3 (Hard Rock Ridge - Right) */}
                  <polygon
                    points="330,290 340,140 370,150 380,295"
                    fill="url(#hardRock)"
                    stroke="#592A10"
                    strokeWidth="1.5"
                  />

                  {/* Wind particles actively scouring troughs (Requirement 11) */}
                  <line x1="140" y1="125" x2="140" y2="245" stroke="#C2723A" strokeWidth="2" strokeDasharray="6 4" className="animate-wind-flow-fast" />
                  <line x1="280" y1="115" x2="280" y2="255" stroke="#C2723A" strokeWidth="2" strokeDasharray="6 4" className="animate-wind-flow-fast" />

                  {/* Annotations */}
                  <text x="210" y="80" fill="#1F1B18" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    Hard Rock Ridge (Resistant)
                  </text>
                  <text x="110" y="285" fill="#884318" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">
                    Eroded Soft Rock Trough (Furrow)
                  </text>
                </g>
              ) : (
                // Cross Sectional Strata View
                <g>
                  <text x="20" y="30" fill="#1F1B18" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    Vertical Rock Band Alignment (Parallel to Wind)
                  </text>
                  {/* Alternating vertical bands */}
                  {/* Band 1: Hard */}
                  <rect x="30" y="70" width="60" height="170" fill="url(#hardRock)" stroke="#592A10" strokeWidth="1.5" />
                  <text x="45" y="150" fill="#FFF" fontSize="10" fontWeight="bold" transform="rotate(-90 45,150)">Hard Band</text>

                  {/* Band 2: Soft (eroded down) */}
                  <rect x="90" y="140" width="70" height="100" fill="url(#softRockTrough)" stroke="#8F7862" strokeWidth="1" />
                  <path d="M 90 70 L 90 140 L 160 140 L 160 70" stroke="#A85A26" strokeDasharray="3 3" fill="rgba(194, 114, 58, 0.05)" />
                  <text x="100" y="180" fill="#594F46" fontSize="10" transform="rotate(-90 100,180)">Soft Band (Eroded)</text>

                  {/* Band 3: Hard */}
                  <rect x="160" y="70" width="60" height="170" fill="url(#hardRock)" stroke="#592A10" strokeWidth="1.5" />
                  <text x="175" y="150" fill="#FFF" fontSize="10" fontWeight="bold" transform="rotate(-90 175,150)">Hard Band</text>

                  {/* Band 4: Soft (eroded down) */}
                  <rect x="220" y="140" width="70" height="100" fill="url(#softRockTrough)" stroke="#8F7862" strokeWidth="1" />
                  <path d="M 220 70 L 220 140 L 290 140 L 290 70" stroke="#A85A26" strokeDasharray="3 3" fill="rgba(194, 114, 58, 0.05)" />

                  {/* Band 5: Hard */}
                  <rect x="290" y="70" width="60" height="170" fill="url(#hardRock)" stroke="#592A10" strokeWidth="1.5" />

                  {/* Base Line */}
                  <line x1="20" y1="240" x2="380" y2="240" stroke="#1F1B18" strokeWidth="2" />
                  <text x="200" y="260" fill="#7A6B5D" fontSize="10" textAnchor="middle">
                    Original surface eroded into deep troughs by sand abrasion along soft bands
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="mt-2.5 text-xs text-[#594F46] leading-relaxed">
            <strong className="text-[#1F1B18]">Core Rule:</strong> Hard and soft rock bands lie <strong>parallel</strong> to prevailing winds. The weak strata erode into deep long furrows, leaving streamlined hard ridges standing prominent like overturned boat hulls.
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 3. VENTIFACTS: Windward Face Polish & Dreikanter
    // ----------------------------------------------------
    case 'ventifact':
      return (
        <div className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-3.5 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#EDE5D8] text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#8E3D20]">
              <Compass className="w-3.5 h-3.5" />
              <span className="font-bold tracking-tight uppercase">FIG. 2.2 · FACETED PEBBLE EVOLUTION &amp; DREIKANTER</span>
            </div>
            {interactive && (
              <div className="flex items-center gap-1 bg-[#EDE5D8] p-0.5 border border-[#DDD3C2]">
                {[
                  { stage: 0, label: 'Stage 1: Raw' },
                  { stage: 1, label: 'Stage 2: 1 Facet' },
                  { stage: 2, label: 'Stage 3: Dreikanter' },
                ].map((s) => (
                  <button
                    key={s.stage}
                    onClick={() => setVentifactStage(s.stage)}
                    className={`px-2 py-0.5 text-[10px] font-mono transition-colors cursor-pointer ${
                      ventifactStage === s.stage
                        ? 'bg-[#1B1715] text-white font-semibold'
                        : 'text-[#594F46] hover:text-[#1B1715]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative aspect-4/3 w-full bg-gradient-to-b from-[#F2ECE3] to-[#E5D7C5] overflow-hidden border border-[#D8C7B5]">
            <svg viewBox="0 0 400 300" className="w-full h-full select-none">
              {/* Ground desert pavement */}
              <line x1="0" y1="230" x2="400" y2="230" stroke="#7A6B5D" strokeWidth="2" />
              <rect x="0" y="230" width="400" height="70" fill="#CBB69E" />

              {/* Smaller surrounding pebbles on desert pavement */}
              <ellipse cx="60" cy="235" rx="14" ry="7" fill="#8F7862" />
              <ellipse cx="110" cy="238" rx="8" ry="5" fill="#A89279" />
              <ellipse cx="320" cy="236" rx="16" ry="8" fill="#8F7862" />
              <ellipse cx="360" cy="240" rx="10" ry="6" fill="#A89279" />

              {/* Wind Charged With Sand Vector */}
              <g>
                <text x="30" y="70" fill="#A85A26" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  Wind Charged with Sand ➔
                </text>
                {[90, 120, 150, 180].map((y) => (
                  <g key={y}>
                    <line x1="30" y1={y} x2="160" y2={y} stroke="#C2723A" strokeWidth="1.5" strokeDasharray="5 3" />
                    <circle cx="80" cy={y - 1} r="2" fill="#884318" />
                    <circle cx="120" cy={y + 1} r="2.2" fill="#884318" />
                  </g>
                ))}
              </g>

              {/* Central Pebble Based on Ventifact Stage */}
              {ventifactStage === 0 ? (
                // Raw irregular unpolished boulder
                <g>
                  <path
                    d="M 180 230 C 160 170, 200 130, 250 140 C 290 150, 310 190, 290 230 Z"
                    fill="#9C856C"
                    stroke="#594533"
                    strokeWidth="2"
                  />
                  <text x="210" y="200" fill="#FFF" fontSize="10" textAnchor="middle">
                    Irregular Rock Pebble
                  </text>
                </g>
              ) : ventifactStage === 1 ? (
                // Single polished flat windward face
                <g>
                  {/* Rock body */}
                  <path
                    d="M 180 230 L 190 140 L 290 160 L 280 230 Z"
                    fill="#9C856C"
                    stroke="#594533"
                    strokeWidth="2"
                  />
                  {/* Polished windward facet (Flat & Smooth) */}
                  <polygon
                    points="180,230 190,140 230,170 210,230"
                    fill="#DEAA82"
                    stroke="#A85A26"
                    strokeWidth="2"
                  />
                  <text x="175" y="125" fill="#884318" fontSize="10" fontWeight="bold">
                    Flat Polished Face (Windward)
                  </text>
                  <line x1="195" y1="130" x2="200" y2="160" stroke="#884318" strokeWidth="1" />
                </g>
              ) : (
                // Dreikanter: Multiple facets intersecting in sharp knife-like ridges
                <g>
                  {/* Facet 1 (Left polished) */}
                  <polygon
                    points="175,230 220,130 235,190 195,230"
                    fill="#E2B792"
                    stroke="#7A3F19"
                    strokeWidth="1.8"
                  />
                  {/* Facet 2 (Front-facing polished) */}
                  <polygon
                    points="220,130 280,150 260,230 235,190"
                    fill="#C6895C"
                    stroke="#7A3F19"
                    strokeWidth="1.8"
                  />
                  {/* Facet 3 (Top / rear facet) */}
                  <polygon
                    points="220,130 270,110 280,150"
                    fill="#DFAC82"
                    stroke="#7A3F19"
                    strokeWidth="1.8"
                  />

                  {/* Sharp Ridge Line */}
                  <line x1="220" y1="130" x2="235" y2="190" stroke="#522409" strokeWidth="2.5" />
                  <line x1="235" y1="190" x2="260" y2="230" stroke="#522409" strokeWidth="2" />

                  {/* Rock rotation indicator arrow */}
                  <path
                    d="M 270 95 C 290 85, 305 105, 295 125"
                    fill="none"
                    stroke="#C2723A"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <polygon points="292,125 300,123 293,115" fill="#C2723A" />

                  <text x="280" y="80" fill="#1F1B18" fontSize="10" fontWeight="bold">
                    Rock Rotation / Wind Shifts
                  </text>
                  <text x="210" y="270" fill="#884318" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Dreikanter (3 Sharp Facets &amp; Keels)
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="mt-2.5 text-xs text-[#594F46] leading-relaxed">
            <strong className="text-[#1F1B18]">Core Rule:</strong> Sand-charged wind blasts the windward side smooth and flat. When winds shift or the rock is rotated by erosion, multiple polished facets develop. Rocks with three distinct faces are called <strong>dreikanter</strong>.
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 4. DEFLATION HOLLOWS: Water Table Boundary & Oasis
    // ----------------------------------------------------
    case 'deflation':
      return (
        <div className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-3.5 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#EDE5D8] text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#8E3D20]">
              <Droplet className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="font-bold tracking-tight uppercase">FIG. 2.1 · DEFLATION DEPTH LIMIT &amp; OASIS FORMATION</span>
            </div>
            {interactive && (
              <div className="flex items-center gap-1 bg-[#EDE5D8] p-0.5 border border-[#DDD3C2]">
                {(['depressed', 'water-table'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setDeflationStage(stage)}
                    className={`px-2 py-0.5 text-[10px] font-mono transition-colors cursor-pointer ${
                      deflationStage === stage
                        ? 'bg-[#1B1715] text-white font-semibold'
                        : 'text-[#594F46] hover:text-[#1B1715]'
                    }`}
                  >
                    {stage === 'depressed' ? 'Blowout Phase' : 'Oasis Reached'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative aspect-4/3 w-full bg-gradient-to-b from-[#F2ECE3] to-[#E5D7C5] overflow-hidden border border-[#D8C7B5]">
            <svg viewBox="0 0 400 300" className="w-full h-full select-none">
              {/* Original ground surface (Ghost line) */}
              <line x1="30" y1="100" x2="370" y2="100" stroke="#A89279" strokeWidth="1.5" strokeDasharray="5 4" />
              <text x="35" y="90" fill="#7A6B5D" fontSize="9.5" fontFamily="sans-serif">
                Original Ground Surface
              </text>

              {/* Deflated Hollow Basin (Curved Downward) */}
              <path
                d="M 30 100 
                   Q 120 100, 150 160 
                   Q 200 220, 250 160 
                   Q 280 100, 370 100 
                   L 370 290 
                   L 30 290 
                   Z"
                fill="#CBB69E"
                stroke="#8F7862"
                strokeWidth="1.8"
              />

              {/* Underground Water Table Horizon (Depth Limit) */}
              <line x1="30" y1="210" x2="370" y2="210" stroke="#0284C7" strokeWidth="2.2" strokeDasharray="6 3" />
              <rect x="30" y="210" width="340" height="80" fill="rgba(2, 132, 199, 0.12)" />

              <text x="35" y="225" fill="#0369A1" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">
                Underground Water Table (Depth Limit)
              </text>

              {/* Exposed Water / Oasis at the bottom of the depression */}
              {deflationStage === 'water-table' && (
                <g>
                  {/* Oasis Pool */}
                  <ellipse cx="200" cy="210" rx="35" ry="8" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                  {/* Palm trees / vegetation on damp oasis fringe */}
                  <path d="M 175 210 L 175 185" stroke="#7A3F19" strokeWidth="2" />
                  <circle cx="175" cy="180" r="7" fill="#15803D" />
                  <path d="M 225 210 L 225 188" stroke="#7A3F19" strokeWidth="2" />
                  <circle cx="225" cy="183" r="6" fill="#15803D" />

                  <text x="200" y="170" fill="#15803D" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Desert Oasis Springs
                  </text>
                  <text x="200" y="235" fill="#0369A1" fontSize="9" textAnchor="middle">
                    Damp soil prevents further wind deflation
                  </text>
                </g>
              )}

              {/* Escaping Wind Swirl carrying away fine silt */}
              <path
                d="M 60 80 Q 150 140, 200 180 Q 250 160, 340 70"
                fill="none"
                stroke="#C2723A"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <polygon points="340,70 330,68 333,77" fill="#C2723A" />
              <text x="290" y="60" fill="#A85A26" fontSize="10" fontWeight="bold">
                Deflation Escarpment ➔
              </text>

              {/* Qattara Callout */}
              <text x="360" y="140" fill="#1F1B18" fontSize="10" textAnchor="end" fontWeight="bold">
                Egypt: Qattara Depression
              </text>
              <text x="360" y="155" fill="#594F46" fontSize="9" textAnchor="end">
                -133 meters below sea level
              </text>
            </svg>
          </div>

          <div className="mt-2.5 text-xs text-[#594F46] leading-relaxed">
            <strong className="text-[#1F1B18]">Core Rule:</strong> Strong continuous winds scoop out loose particles, lowering the terrain. The erosion stops strictly when the <strong>water table</strong> is reached, as wet mud resists deflation, giving rise to desert oases.
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 5. BARCHANS: Crescent Anatomy & Downwind Horns
    // ----------------------------------------------------
    case 'barchan':
      return (
        <div className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-3.5 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#EDE5D8] text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#8E3D20]">
              <Compass className="w-3.5 h-3.5" />
              <span className="font-bold tracking-tight uppercase">FIG. 3.2 · BARCHAN ANATOMY &amp; DOWNWIND HORN MIGRATION</span>
            </div>
            <span className="text-[10px] font-mono text-[#7A7067] bg-[#EDE5D8] px-2 py-0.5 border border-[#DDD3C2]">SLIDE 10 REF</span>
          </div>

          <div className="relative aspect-4/3 w-full bg-gradient-to-b from-[#F2ECE3] to-[#E5D7C5] overflow-hidden border border-[#D8C7B5]">
            <svg viewBox="0 0 400 300" className="w-full h-full select-none">
              {/* Background Desert Floor */}
              <rect x="0" y="0" width="400" height="300" fill="#E8DEC8" opacity="0.5" />

              {/* Wind Arrow Indicator with Animated Streamlines (Requirement 11 & 13) */}
              <g className="animate-arrow-drift">
                <text x="25" y="32" fill="#884318" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  Dominant Uni-Directional Wind ➔
                </text>
                {/* Wind streamlines flowing toward dune */}
                <line x1="25" y1="46" x2="160" y2="46" stroke="#C2723A" strokeWidth="2.5" />
                <polygon points="160,46 148,40 148,52" fill="#C2723A" />
                
                {/* Flowing dashed secondary wind vectors */}
                <line x1="25" y1="62" x2="110" y2="62" stroke="#A85A26" strokeWidth="1.6" strokeDasharray="5 4" className="animate-wind-flow" />
                <polygon points="110,62 102,58 102,66" fill="#A85A26" />
                <line x1="25" y1="78" x2="80" y2="78" stroke="#A85A26" strokeWidth="1.4" strokeDasharray="5 4" className="animate-wind-flow-fast" />
                <polygon points="80,78 72,75 72,81" fill="#A85A26" />
              </g>

              {/* Animated Sand Transport Flow over the Gentle Windward Slope toward the crest */}
              <g className="opacity-60">
                <path
                  d="M 60 150 Q 140 110, 230 115"
                  fill="none"
                  stroke="#FFF2DE"
                  strokeWidth="1.8"
                  strokeDasharray="6 5"
                  className="animate-wind-flow"
                />
                <path
                  d="M 80 165 Q 160 135, 235 155"
                  fill="none"
                  stroke="#FFF2DE"
                  strokeWidth="1.8"
                  strokeDasharray="6 5"
                  className="animate-wind-flow-fast"
                />
              </g>

              {/* 3D-angled Overhead Crescent Silhouette */}
              {/* Outer Gentle Convex Windward Slope */}
              <path
                d="M 80 150 
                   C 80 90, 180 80, 250 90 
                   C 320 100, 360 120, 370 140 
                   C 340 170, 270 200, 240 200 
                   C 210 200, 100 190, 80 150 
                   Z"
                fill="#C88554"
                stroke="#8A4A22"
                strokeWidth="1.5"
              />

              {/* Inner Steep Concave Leeward Slip-Face */}
              <path
                d="M 240 90 
                   C 220 120, 220 170, 240 200 
                   C 290 190, 350 170, 360 140 
                   C 340 115, 290 95, 240 90 
                   Z"
                fill="#A65825"
                stroke="#692C0B"
                strokeWidth="1.5"
              />

              {/* Crescent Horns Tip Indicators with Pulsing Animation (Requirement 11) */}
              <circle cx="360" cy="115" r="4.5" fill="#1F1B18" className="animate-pulse" style={{ animationDuration: '2s' }} />
              <circle cx="355" cy="165" r="4.5" fill="#1F1B18" className="animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />

              {/* Horns Direction Arrows Animated downwind */}
              <g className="animate-arrow-drift">
                <line x1="360" y1="115" x2="392" y2="105" stroke="#1F1B18" strokeWidth="1.8" />
                <polygon points="392,105 383,101 385,110" fill="#1F1B18" />

                <line x1="355" y1="165" x2="387" y2="175" stroke="#1F1B18" strokeWidth="1.8" />
                <polygon points="387,175 379,170 381,180" fill="#1F1B18" />
              </g>

              {/* Labels */}
              <g>
                {/* Windward Slope */}
                <text x="120" y="145" fill="#FFF" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">
                  Gentle Convex
                </text>
                <text x="120" y="160" fill="#FAF7F2" fontSize="9.5" fontFamily="sans-serif">
                  Windward Slope (10°–15°)
                </text>

                {/* Leeward Slope */}
                <text x="240" y="145" fill="#FAF7F2" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">
                  Steep Concave
                </text>
                <text x="240" y="160" fill="#FAF7F2" fontSize="9" fontFamily="sans-serif">
                  Slip-Face (~32°)
                </text>

                {/* Horns Annotation */}
                <text x="280" y="245" fill="#1F1B18" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  Twin Horns Point Downwind ➔
                </text>
                <text x="280" y="260" fill="#594F46" fontSize="9.5" fontFamily="sans-serif">
                  Flanks advance faster than central bulk
                </text>
              </g>
            </svg>
          </div>

          <div className="mt-2.5 text-xs text-[#594F46] leading-relaxed">
            <strong className="text-[#1F1B18]">Core Rule:</strong> Barchans form under single-direction winds. They feature a <strong>gentle convex windward slope</strong> and a <strong>steep concave leeward slope</strong>. The two tips, called <strong>horns, point downwind</strong> in the direction of wind movement.
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 6. DUNE TYPES: Transverse vs Longitudinal (Seif)
    // ----------------------------------------------------
    case 'dune-types':
      return (
        <div className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-3.5 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#EDE5D8] text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#8E3D20]">
              <Compass className="w-3.5 h-3.5" />
              <span className="font-bold tracking-tight uppercase">FIG. 3.1 · DUNE ORIENTATION: TRANSVERSE (90°) VS SEIF (PARALLEL)</span>
            </div>
            {interactive && (
              <div className="flex items-center gap-1 bg-[#EDE5D8] p-0.5 border border-[#DDD3C2]">
                {(['transverse', 'longitudinal'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setDuneType(mode)}
                    className={`px-2 py-0.5 text-[10px] font-mono transition-colors cursor-pointer ${
                      duneType === mode
                        ? 'bg-[#1B1715] text-white font-semibold'
                        : 'text-[#594F46] hover:text-[#1B1715]'
                    }`}
                  >
                    {mode === 'transverse' ? 'Transverse (90°)' : 'Longitudinal (Parallel)'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative aspect-4/3 w-full bg-gradient-to-b from-[#F2ECE3] to-[#E5D7C5] overflow-hidden border border-[#D8C7B5]">
            <svg viewBox="0 0 400 300" className="w-full h-full select-none">
              {duneType === 'transverse' ? (
                // Transverse Dunes: Ridges Perpendicular to Wind
                <g>
                  <text x="20" y="30" fill="#1F1B18" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    Transverse Dunes (Perpendicular to Wind Vector)
                  </text>
                  {/* Wind Direction Arrows (Horizontal) */}
                  <g>
                    {[60, 140, 220].map((y) => (
                      <g key={y}>
                        <line x1="20" y1={y} x2="90" y2={y} stroke="#C2723A" strokeWidth="2" />
                        <polygon points={`90,${y} 80,${y - 4} 80,${y + 4}`} fill="#C2723A" />
                      </g>
                    ))}
                    <text x="20" y="180" fill="#884318" fontSize="10" fontWeight="bold">
                      Wind Direction ➔
                    </text>
                  </g>

                  {/* Vertical Dune Ridges at 90 degrees */}
                  {[140, 230, 320].map((rx, idx) => (
                    <g key={rx}>
                      {/* Gentle windward side */}
                      <path
                        d={`M ${rx} 50 C ${rx + 15} 120, ${rx - 10} 180, ${rx + 10} 260 L ${rx + 40} 260 C ${rx + 20} 180, ${rx + 35} 120, ${rx + 30} 50 Z`}
                        fill="#C88554"
                        stroke="#8A4A22"
                        strokeWidth="1.2"
                      />
                      {/* Steep leeward slip face */}
                      <path
                        d={`M ${rx + 30} 50 C ${rx + 35} 120, ${rx + 20} 180, ${rx + 40} 260 L ${rx + 55} 260 C ${rx + 40} 180, ${rx + 50} 120, ${rx + 45} 50 Z`}
                        fill="#9E501F"
                        stroke="#6B2F0C"
                        strokeWidth="1.2"
                      />
                      {/* 90 deg marker */}
                      {idx === 0 && (
                        <g>
                          <line x1="90" y1="140" x2="140" y2="140" stroke="#1F1B18" strokeWidth="1" strokeDasharray="3 2" />
                          <line x1="140" y1="110" x2="140" y2="170" stroke="#1F1B18" strokeWidth="1" />
                          <rect x="130" y="130" width="10" height="10" fill="none" stroke="#1F1B18" strokeWidth="1" />
                          <text x="148" y="135" fill="#1F1B18" fontSize="10" fontWeight="bold">90° Perpendicular</text>
                        </g>
                      )}
                    </g>
                  ))}
                  <text x="240" y="285" fill="#594F46" fontSize="10" textAnchor="middle">
                    Continuous sand supply creates wavy sand ridges perpendicular to steady winds
                  </text>
                </g>
              ) : (
                // Longitudinal / Seif Dunes: Ridges Parallel to Wind
                <g>
                  <text x="20" y="30" fill="#1F1B18" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    Longitudinal / Seif Dunes (Parallel to Wind Vector)
                  </text>

                  {/* Wind Direction Arrows (Horizontal) */}
                  <g>
                    {[50, 150, 250].map((y) => (
                      <g key={y}>
                        <line x1="20" y1={y} x2="100" y2={y} stroke="#C2723A" strokeWidth="2" />
                        <polygon points={`100,${y} 90,${y - 4} 90,${y + 4}`} fill="#C2723A" />
                      </g>
                    ))}
                    <text x="20" y="270" fill="#884318" fontSize="10" fontWeight="bold">
                      Wind Direction ➔
                    </text>
                  </g>

                  {/* Horizontal Long Sand Ridges (Parallel to Wind) */}
                  {[80, 180].map((ry) => (
                    <g key={ry}>
                      {/* Top flank */}
                      <path
                        d={`M 110 ${ry} Q 250 ${ry - 20} 380 ${ry} L 380 ${ry + 15} Q 250 ${ry} 110 ${ry + 15} Z`}
                        fill="#C88554"
                        stroke="#8A4A22"
                        strokeWidth="1.2"
                      />
                      {/* Bottom flank */}
                      <path
                        d={`M 110 ${ry + 15} Q 250 ${ry} 380 ${ry + 15} L 380 ${ry + 35} Q 250 ${ry + 20} 110 ${ry + 35} Z`}
                        fill="#9E501F"
                        stroke="#6B2F0C"
                        strokeWidth="1.2"
                      />
                      <line x1="110" y1={ry + 15} x2="380" y2={ry + 15} stroke="#592A10" strokeWidth="1.8" />
                      <text x="385" y={ry + 20} fill="#1F1B18" fontSize="10" fontWeight="bold">
                        Parallel Sand Crest
                      </text>
                    </g>
                  ))}
                  <text x="250" y="285" fill="#594F46" fontSize="10" textAnchor="middle">
                    Two converging wind directions sweep sand into immense elongated parallel corridors
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="mt-2.5 text-xs text-[#594F46] leading-relaxed">
            <strong className="text-[#1F1B18]">Core Rule:</strong> As cited on Slide 9: <strong>Transverse dunes</strong> form perpendicular to prevailing wind, while <strong>longitudinal/seif dunes</strong> form parallel to prevailing wind direction.
          </div>
        </div>
      );

    // ----------------------------------------------------
    // 7. LOESS PLAINS: Atmospheric Suspension & Yellow Cliffs
    // ----------------------------------------------------
    case 'loess':
      return (
        <div className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-3.5 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#EDE5D8] text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#8E3D20]">
              <Compass className="w-3.5 h-3.5" />
              <span className="font-bold tracking-tight uppercase">FIG. 3.3 · LOESS PLATEAU STRATIGRAPHY &amp; SUSPENSION SETTLING</span>
            </div>
            <span className="text-[10px] font-mono text-[#7A7067] bg-[#EDE5D8] px-2 py-0.5 border border-[#DDD3C2]">NORTHERN CHINA</span>
          </div>

          <div className="relative aspect-4/3 w-full bg-gradient-to-b from-[#F2ECE3] to-[#E5D7C5] overflow-hidden border border-[#D8C7B5]">
            <svg viewBox="0 0 400 300" className="w-full h-full select-none">
              {/* Sky and Airborne Silt Clouds */}
              <rect x="0" y="0" width="400" height="90" fill="#EADFCF" />
              <g opacity="0.6">
                {[40, 140, 260].map((x) => (
                  <ellipse key={x} cx={x} cy="35" rx="45" ry="12" fill="#E5CE9F" />
                ))}
              </g>
              <text x="20" y="30" fill="#884318" fontSize="10" fontWeight="bold">
                Atmospheric Suspension (Carried Hundreds of km Beyond Deserts)
              </text>

              {/* Loess Cliff Face (Yellowish, Porous, Vertical Joints) */}
              <polygon
                points="40,90 180,90 190,140 180,240 40,240"
                fill="#E2C78A"
                stroke="#A88746"
                strokeWidth="1.5"
              />
              <polygon
                points="180,90 280,105 270,240 180,240 190,140"
                fill="#D4B673"
                stroke="#A88746"
                strokeWidth="1.5"
              />

              {/* Vertical Jointing Lines (Characteristic of unstratified loess) */}
              {[70, 110, 145, 215, 245].map((vx) => (
                <line
                  key={vx}
                  x1={vx}
                  y1="100"
                  x2={vx}
                  y2="230"
                  stroke="#9C7B38"
                  strokeWidth="1.2"
                  strokeDasharray="8 4"
                  opacity="0.7"
                />
              ))}

              {/* River Gorge (Yellow River Canyon) */}
              <path
                d="M 270 240 Q 330 220 380 250 L 380 290 L 270 290 Z"
                fill="#CBA763"
              />
              {/* Yellow River Water */}
              <path
                d="M 290 260 C 330 250 350 270 380 265 L 380 285 L 290 285 Z"
                fill="#C69E4B"
              />

              {/* Labels */}
              <g>
                <text x="60" y="130" fill="#1F1B18" fontSize="11" fontWeight="bold">
                  Yellowish, Highly Porous Silt
                </text>
                <text x="60" y="145" fill="#594F46" fontSize="9.5">
                  Unstratified, fertile mineral soil
                </text>

                <text x="210" y="270" fill="#884318" fontSize="10.5" fontWeight="bold">
                  Northern China: &gt;640,000 sq km
                </text>
                <text x="210" y="285" fill="#594F46" fontSize="9.5">
                  Largest loess deposit on Earth
                </text>
              </g>
            </svg>
          </div>

          <div className="mt-2.5 text-xs text-[#594F46] leading-relaxed">
            <strong className="text-[#1F1B18]">Core Rule:</strong> Extremely fine, light dust particles travel in suspension over hundreds of kilometers beyond deserts. They deposit <strong>yellowish, highly porous, unstratified, and fertile soil</strong> (e.g. Loess Plateau in Northern China spanning over 640,000 sq km).
          </div>
        </div>
      );

    default:
      return null;
  }
};
