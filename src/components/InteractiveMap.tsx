import React, { useState } from 'react';
import { MapPin, Globe, Compass, BookOpen, ArrowRight } from 'lucide-react';
import { CASE_STUDY_LOCATIONS, CaseStudyLocation } from '../data/geographyData';

interface InteractiveMapProps {
  onSelectLandformById: (id: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectLandformById }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudyLocation>(CASE_STUDY_LOCATIONS[0]);

  return (
    <section id="interactive-map" className="py-16 md:py-24 bg-[#F8F5EE] border-b border-[#E3DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono tracking-widest text-[#A44A29] uppercase font-semibold mb-2">
            CHAPTER 3 · FIELD EXPEDITIONS
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1715] font-bold tracking-tight">
            Cartographic Field Atlas
          </h2>
          <div className="h-0.5 w-16 bg-[#A44A29] my-4" />
          <p className="text-base sm:text-lg text-[#5C5147] leading-relaxed font-normal">
            Five authoritative real-world geological locations documented in the Class 11 geography curriculum where aeolian erosion and deposition can be examined in situ.
          </p>
        </div>

        {/* Map & Dossier Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cartographic Plate (7 cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#DDD3C2] p-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#EDE5D8] pb-3 mb-4 text-xs font-mono text-[#786D62]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#A44A29]" />
                <span className="font-semibold text-[#1B1715]">GLOBAL ARID BELT ATLAS</span>
              </div>
              <span>GRATICULE SCALE 1:50,000,000</span>
            </div>

            {/* Stylized Archival Map Canvas */}
            <div className="relative aspect-16/10 w-full bg-[#EAE2D5] border border-[#D5C9B7] overflow-hidden select-none">
              <svg viewBox="0 0 1000 600" className="w-full h-full">
                <defs>
                  <linearGradient id="parchmentLand" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DFD2C0" />
                    <stop offset="100%" stopColor="#D5C5B1" />
                  </linearGradient>
                </defs>

                {/* Ocean Background */}
                <rect width="1000" height="600" fill="#E8DEC8" opacity="0.4" />

                {/* Graticule Lines */}
                <line x1="0" y1="210" x2="1000" y2="210" stroke="#C8B8A4" strokeWidth="1" strokeDasharray="3 3" />
                <text x="15" y="205" fill="#8E3D20" fontSize="11" fontFamily="JetBrains Mono, monospace">
                  23.5°N Tropic of Cancer (Subtropical Desert Belt)
                </text>

                <line x1="0" y1="300" x2="1000" y2="300" stroke="#C8B8A4" strokeWidth="0.8" strokeDasharray="2 2" />
                <text x="15" y="295" fill="#8C7F72" fontSize="10" fontFamily="JetBrains Mono, monospace">
                  0° Equator
                </text>

                <line x1="0" y1="390" x2="1000" y2="390" stroke="#C8B8A4" strokeWidth="1" strokeDasharray="3 3" />
                <text x="15" y="385" fill="#8E3D20" fontSize="11" fontFamily="JetBrains Mono, monospace">
                  23.5°S Tropic of Capricorn
                </text>

                {/* Continents Outline */}
                {/* North America */}
                <path d="M 120 120 Q 200 80, 260 140 Q 280 220, 220 280 Q 150 250, 110 180 Z" fill="url(#parchmentLand)" stroke="#B8A793" strokeWidth="1.2" />
                {/* South America */}
                <path d="M 230 310 Q 310 330, 290 420 Q 260 520, 230 550 Q 200 450, 210 350 Z" fill="url(#parchmentLand)" stroke="#B8A793" strokeWidth="1.2" />
                {/* Europe */}
                <path d="M 440 120 Q 520 110, 560 160 Q 510 200, 450 180 Z" fill="url(#parchmentLand)" stroke="#B8A793" strokeWidth="1.2" />
                {/* Africa */}
                <path d="M 440 200 Q 560 200, 570 260 Q 580 340, 530 450 Q 480 470, 450 350 Q 400 280, 440 200 Z" fill="url(#parchmentLand)" stroke="#B8A793" strokeWidth="1.2" />
                {/* Asia */}
                <path d="M 560 130 Q 750 110, 850 160 Q 880 270, 780 300 Q 680 350, 620 280 Q 560 220, 560 130 Z" fill="url(#parchmentLand)" stroke="#B8A793" strokeWidth="1.2" />
                {/* Australia */}
                <path d="M 760 380 Q 860 380, 870 450 Q 800 480, 750 440 Z" fill="url(#parchmentLand)" stroke="#B8A793" strokeWidth="1.2" />

                {/* Desert Soil Wash (Terracotta/Ochre) */}
                <ellipse cx="500" cy="225" rx="60" ry="25" fill="#A44A29" opacity="0.18" />
                <circle cx="675" cy="235" r="20" fill="#A44A29" opacity="0.22" />
                <circle cx="630" cy="225" r="16" fill="#A44A29" opacity="0.22" />
                <circle cx="770" cy="205" r="25" fill="#B38728" opacity="0.2" />
                <ellipse cx="500" cy="400" rx="14" ry="28" fill="#A44A29" opacity="0.18" />

                {/* Clickable Survey Pins */}
                {CASE_STUDY_LOCATIONS.map((loc) => {
                  const isSelected = selectedCase.id === loc.id;
                  let px = 500;
                  let py = 250;
                  if (loc.id === 'qattara') { px = 515; py = 215; }
                  else if (loc.id === 'rajasthan') { px = 675; py = 230; }
                  else if (loc.id === 'lut-desert') { px = 635; py = 220; }
                  else if (loc.id === 'loess-plateau') { px = 775; py = 200; }
                  else if (loc.id === 'namib-barchans') { px = 505; py = 405; }

                  return (
                    <g
                      key={loc.id}
                      onClick={() => setSelectedCase(loc)}
                      className="cursor-pointer group"
                    >
                      {isSelected && (
                        <circle
                          cx={px}
                          cy={py}
                          r="16"
                          fill="none"
                          stroke="#A44A29"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      )}

                      <circle
                        cx={px}
                        cy={py}
                        r={isSelected ? 7 : 5}
                        fill={isSelected ? '#8E3D20' : '#1B1715'}
                        stroke="#FAF8F3"
                        strokeWidth="1.5"
                      />

                      <circle
                        cx={px}
                        cy={py}
                        r={2}
                        fill="#FFFFFF"
                      />

                      <text
                        x={px + 10}
                        y={py + 4}
                        fill={isSelected ? '#8E3D20' : '#2C2622'}
                        fontSize={isSelected ? "11.5" : "10"}
                        fontWeight={isSelected ? "bold" : "600"}
                        fontFamily="Newsreader, Georgia, serif"
                      >
                        {loc.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Location Selectors with min 40px touch targets */}
            <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-[#EDE5D8]">
              {CASE_STUDY_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedCase(loc)}
                  className={`min-h-[40px] px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer border flex items-center justify-center ${
                    selectedCase.id === loc.id
                      ? 'bg-[#1B1715] text-white border-[#1B1715]'
                      : 'bg-[#F8F5EE] text-[#443B34] border-[#D5C9B7] hover:border-[#A44A29] active:bg-[#EDE5D8]'
                  }`}
                >
                  {loc.name} ({loc.country})
                </button>
              ))}
            </div>
          </div>

          {/* Cartographic Dossier Panel (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#DDD3C2] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#8C7F72] border-b border-[#EDE5D8] pb-3">
              <span className="text-[#8E3D20] font-bold uppercase tracking-wider">
                {selectedCase.category === 'erosional' ? 'EROSIONAL LOCALITY' : 'DEPOSITIONAL LOCALITY'}
              </span>
              <span>{selectedCase.region} · {selectedCase.country}</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1715]">
                {selectedCase.name}
              </h3>
              <div className="text-sm font-serif italic text-[#8E3D20] mt-0.5">
                {selectedCase.region}, {selectedCase.country}
              </div>
            </div>

            {/* Specimen Data Strip (Section 7) */}
            <div className="border-t border-b border-[#DDD3C2] py-3 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#8C7F72] uppercase">DIAGNOSTIC LANDFORM</span>
                <span className="font-semibold text-[#1B1715]">{selectedCase.landformName}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#EDE5D8] pt-2">
                <span className="text-[#8C7F72] uppercase">GEOMORPHIC BELT</span>
                <span className="font-semibold text-[#8E3D20]">
                  {selectedCase.id === 'namib-barchans' ? '23.5°S CAPRICORN' : '23.5°N CANCER'}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[#EDE5D8] pt-2">
                <span className="text-[#8C7F72] uppercase">CURRICULUM RECORD</span>
                <span className="font-semibold text-[#1B1715]">PRIMARY CLASS 11 SPECIMEN</span>
              </div>
            </div>

            {/* Field Study Note Panel */}
            <aside className="border-l-2 border-[#8E3D20] pl-4 py-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E3D20] font-bold mb-1">
                EXPEDITION FIELD MEMORANDUM
              </div>
              <p className="font-serif text-sm sm:text-base text-[#1B1715] italic leading-snug">
                {selectedCase.highlight}
              </p>
            </aside>

            <p className="text-xs sm:text-sm text-[#443B34] leading-relaxed font-normal">
              {selectedCase.detailedText}
            </p>

            <button
              onClick={() => onSelectLandformById(selectedCase.landformId)}
              className="w-full py-3 px-4 text-xs font-mono uppercase tracking-wider text-white bg-[#1B1715] hover:bg-[#8E3D20] transition-colors border border-[#1B1715] flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Examine {selectedCase.landformName} Specimen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
