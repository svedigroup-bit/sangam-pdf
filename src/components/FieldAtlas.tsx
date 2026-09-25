import React, { useState } from 'react';
import { Camera, Layers, MapPin, ArrowRight, BookOpen, Ruler, Compass } from 'lucide-react';
import { EROSIONAL_LANDFORMS, DEPOSITIONAL_LANDFORMS, LandformDetail } from '../data/geographyData';
import { GeologicalDiagram } from './GeologicalDiagram';
import { EducationalImage } from './EducationalImage';

interface FieldAtlasProps {
  onSelectLandform: (landform: LandformDetail) => void;
}

export const FieldAtlas: React.FC<FieldAtlasProps> = ({ onSelectLandform }) => {
  // Combine all 7 landforms in curriculum sequence
  const allLandforms: LandformDetail[] = [
    ...EROSIONAL_LANDFORMS, // Deflation Hollows, Ventifacts, Mushroom Rocks, Yardangs
    ...DEPOSITIONAL_LANDFORMS, // Sand Dunes, Barchans, Loess Plains
  ];

  const [selectedId, setSelectedId] = useState<string>(allLandforms[2].id); // Default to Mushroom Rocks
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | 'diagram'>('photo');
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'exit' | 'enter'>('idle');

  const current = allLandforms.find((l) => l.id === selectedId) || allLandforms[0];

  const handleSelect = (id: string) => {
    if (id === selectedId || transitionPhase !== 'idle') return;

    // Smooth editorial plate transition (opacity 1 -> 0, then enter opacity 0 -> 1 with scale 1.04 -> 1)
    setTransitionPhase('exit');

    setTimeout(() => {
      setSelectedId(id);
      setActiveMediaTab('photo');
      setTransitionPhase('enter');

      requestAnimationFrame(() => {
        setTimeout(() => {
          setTransitionPhase('idle');
        }, 30);
      });
    }, 200);
  };

  return (
    <section id="field-atlas" className="py-20 md:py-28 bg-[#F3EFE7] border-b border-[#DDD3C2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="max-w-3xl mb-14">
          <div className="text-xs font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-2">
            CHAPTER 3 · COMPREHENSIVE SPECIMEN CATALOGUE
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1715] font-bold tracking-tight">
            Field Atlas &amp; Visual Index
          </h2>
          <div className="h-0.5 w-16 bg-[#8E3D20] my-4" />
          <p className="font-serif text-lg sm:text-xl text-[#443B34] italic mb-2">
            Wind-shaped landforms observed through process, form and material.
          </p>
          <p className="text-sm sm:text-base text-[#5C5147] leading-relaxed font-normal">
            A visual index of the seven diagnostic landforms documented in Class 11 Geography. Select any specimen from the geological index to examine its documentary photograph, scientific cross-section, and diagnostic criteria.
          </p>
        </header>

        {/* Mobile Horizontal Swipe Specimen Selector (Touch-friendly 44px min-height, immediate access to all 7 landforms) */}
        <div className="lg:hidden mb-6 bg-white border border-[#DDD3C2] p-2.5 shadow-2xs">
          <div className="text-[11px] font-mono text-[#8C7F72] px-1 pb-1.5 uppercase tracking-wider flex items-center justify-between border-b border-[#EDE5D8] mb-2">
            <span className="font-semibold text-[#1B1715]">INDEX: 07 SPECIMENS</span>
            <span className="text-[#8E3D20]">← Swipe to select →</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar touch-pan-x">
            {allLandforms.map((item, idx) => {
              const isSelected = item.id === selectedId;
              const numStr = (idx + 1).toString().padStart(2, '0');

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`min-h-[44px] px-3.5 py-2 text-left shrink-0 transition-all cursor-pointer border flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-[#1B1715] text-white border-[#1B1715] shadow-xs'
                      : 'bg-[#FAF8F5] text-[#2C2622] hover:bg-[#EDE5D8] border-[#DDD3C2]'
                  }`}
                  aria-selected={isSelected}
                >
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-[#C2723A]' : 'text-[#8E3D20]'
                    }`}
                  >
                    {numStr}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-serif text-xs font-bold leading-tight whitespace-nowrap">
                      {item.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider ${
                        isSelected ? 'text-white/70' : 'text-[#8C7F72]'
                      }`}
                    >
                      {item.category === 'erosional' ? 'Erosion' : 'Deposition'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 12-Column Geological Atlas Layout: Left (4 cols Index Register) + Right (8 cols Master Exhibition Plate) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ============================================================== */}
          {/* LEFT: THE GEOLOGICAL ATLAS REGISTER / INDEX (4 cols on desktop) */}
          {/* ============================================================== */}
          <div className="hidden lg:block lg:col-span-4 bg-white border border-[#DDD3C2]">
            {/* Register Top Banner */}
            <div className="p-4 bg-[#FAF8F5] border-b border-[#EDE5D8] flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#1B1715] uppercase tracking-wider">GEOLOGICAL REGISTER</span>
              <span className="text-[#8E3D20]">07 SPECIMENS</span>
            </div>

            {/* Architectural Atlas Index Items (Section 8) */}
            <nav className="divide-y divide-[#EDE5D8]" aria-label="Landform index">
              {allLandforms.map((item, idx) => {
                const isSelected = item.id === selectedId;
                const numStr = (idx + 1).toString().padStart(2, '0');

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full text-left p-4 sm:p-4.5 transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#FAF8F5] border-l-4 border-l-[#8E3D20]'
                        : 'bg-white hover:bg-[#FAF9F6] border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`font-mono text-xs font-bold pt-0.5 ${
                          isSelected ? 'text-[#8E3D20]' : 'text-[#8C7F72]'
                        }`}
                      >
                        {numStr}
                      </span>
                      <div>
                        <div
                          className={`font-serif text-sm sm:text-base font-bold transition-colors ${
                            isSelected ? 'text-[#1B1715]' : 'text-[#2C2622] group-hover:text-[#8E3D20]'
                          }`}
                        >
                          {item.name}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#8C7F72] mt-0.5 flex items-center gap-1.5">
                          <span>{item.category === 'erosional' ? 'EROSIONAL FEATURE' : 'DEPOSITIONAL FEATURE'}</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 transition-transform shrink-0 ${
                        isSelected
                          ? 'text-[#8E3D20] translate-x-1'
                          : 'text-[#C4B7A5] group-hover:text-[#1B1715] group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Register Summary Strip */}
            <div className="p-3.5 bg-[#FAF8F5] border-t border-[#EDE5D8] text-[11px] font-mono text-[#786D62] flex items-center justify-between">
              <span>Class 11 Geography Syllabus</span>
              <span className="text-[#8E3D20] font-semibold">Maharashtra Board Standard</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: MASTER FIELD EXHIBITION PLATE (8 columns)              */}
          {/* ============================================================== */}
          <div className="lg:col-span-8 bg-white border border-[#DDD3C2] shadow-2xs">
            {/* Top Folio Bar */}
            <div className="p-3 sm:p-5 bg-[#FAF8F5] border-b border-[#EDE5D8] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="text-[#8E3D20] font-bold uppercase tracking-wider">
                  FOLIO {current.plateNumber}
                </span>
                <span className="text-[#C4B7A5]">·</span>
                <span className="text-[#1B1715] uppercase font-semibold text-[11px] sm:text-xs">
                  {current.category === 'erosional' ? 'EROSIONAL SPECIMEN' : 'DEPOSITIONAL SPECIMEN'}
                </span>
              </div>

              {/* Media Switcher: Crisp segmented buttons without pill styling, min 38px height */}
              <div className="flex items-center gap-1 bg-[#EDE5D8] p-0.5 border border-[#DDD3C2]">
                <button
                  onClick={() => setActiveMediaTab('photo')}
                  className={`min-h-[36px] px-2.5 sm:px-3 py-1 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeMediaTab === 'photo'
                      ? 'bg-[#1B1715] text-white font-semibold'
                      : 'text-[#5C5147] hover:text-[#1B1715]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Field Photograph</span>
                </button>
                <button
                  onClick={() => setActiveMediaTab('diagram')}
                  className={`min-h-[36px] px-2.5 sm:px-3 py-1 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeMediaTab === 'diagram'
                      ? 'bg-[#1B1715] text-white font-semibold'
                      : 'text-[#5C5147] hover:text-[#1B1715]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Scientific Diagram</span>
                </button>
              </div>
            </div>

            {/* Active Specimen Body with Transition (Mobile: Image first, then Title, then data, note, formation) */}
            <div
              className={`p-4 sm:p-8 flex flex-col space-y-6 sm:space-y-8 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
                transitionPhase === 'exit'
                  ? 'opacity-0 scale-[0.98] -translate-x-1 duration-200'
                  : transitionPhase === 'enter'
                  ? 'opacity-0 scale-[1.04] translate-x-2 duration-0'
                  : 'opacity-100 scale-100 translate-x-0 duration-500'
              }`}
            >
              {/* Visual Mount (order-1 on mobile so image appears first, order-2 on desktop) */}
              <div className="order-1 lg:order-2 border border-[#DDD3C2] p-2 bg-[#FAF8F5]">
                {activeMediaTab === 'photo' ? (
                  <div>
                    <EducationalImage
                      src={current.photoUrl}
                      fallbackSrc={current.fallbackPhotoUrl}
                      alt={current.photoAlt || current.name}
                      title={current.name}
                      containerClassName="relative aspect-16/10 w-full overflow-hidden bg-[#EFE9DF]"
                      loading="lazy"
                    />
                    <div className="mt-2.5 px-1 pb-1 text-xs font-mono text-[#6E6357] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <strong className="text-[#1B1715] font-serif font-bold">Documentary Record</strong> · {current.photoCaption}
                      </div>
                      <div className="shrink-0 text-[#8E3D20] font-medium">
                        {current.exampleLocation}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <GeologicalDiagram type={current.diagramType} interactive={true} />
                  </div>
                )}
              </div>

              {/* Specimen Identification Header (order-2 on mobile, order-1 on desktop) */}
              <div className="order-2 lg:order-1">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1715]">
                  {current.name}
                </h3>
                {current.alternateName && (
                  <div className="text-xs font-serif italic text-[#8E3D20] mt-0.5">
                    Curriculum Index Alternate: {current.alternateName}
                  </div>
                )}
                <p className="mt-3 text-sm sm:text-base text-[#443B34] leading-relaxed font-normal">
                  {current.shortDefinition}
                </p>
              </div>

              {/* Specimen Data Strip (Section 7) (order-3) */}
              <div className="order-3 border-t border-b border-[#DDD3C2] py-3 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <span className="text-[#8C7F72] uppercase block text-[10px]">CATEGORY</span>
                  <span className="font-bold text-[#1B1715]">
                    {current.category === 'erosional' ? 'EROSION' : 'DEPOSITION'}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C7F72] uppercase block text-[10px]">KEY FEATURE</span>
                  <span className="font-bold text-[#8E3D20] truncate block" title={current.keyFeature}>
                    {current.keyFeature}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C7F72] uppercase block text-[10px]">LOCALITY</span>
                  <span className="font-bold text-[#1B1715] truncate block" title={current.exampleLocation}>
                    {current.exampleLocation}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C7F72] uppercase block text-[10px]">REGION</span>
                  <span className="font-bold text-[#1B1715] truncate block" title={current.geographicRegion}>
                    {current.geographicRegion}
                  </span>
                </div>
              </div>

              {/* Field Note Panel (Section 6) (order-4) */}
              <aside className="order-4 border-l-2 border-[#8E3D20] pl-4 py-1.5">
                <div className="text-[10px] font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-1">
                  FIELD NOTE · SPECIMEN OBSERVATION
                </div>
                <p className="font-serif text-base sm:text-lg text-[#1B1715] italic leading-snug">
                  “{current.fieldNote}”
                </p>
              </aside>

              {/* Step-by-Step Formation Process (order-5) */}
              <div className="order-5 space-y-3 pt-2">
                <div className="text-[11px] font-mono tracking-widest text-[#8C7F72] uppercase font-bold border-b border-[#EDE5D8] pb-1.5">
                  FORMATION SEQUENCE
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {current.formationSteps.map((step) => (
                    <div key={step.step} className="p-3 bg-[#FAF8F5] border border-[#EDE5D8] text-xs">
                      <div className="font-mono font-bold text-[#8E3D20] mb-1">
                        {step.step} · {step.action}
                      </div>
                      <p className="text-[#443B34] text-[11px] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Strip (order-6, touch-friendly min 44px) */}
              <div className="order-6 pt-4 border-t border-[#EDE5D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#8C7F72]">
                  {current.depthOrHeightNote || 'Class 11 Textbook Curriculum Standard'}
                </div>
                <button
                  onClick={() => onSelectLandform(current)}
                  className="w-full sm:w-auto min-h-[44px] py-3 px-6 text-xs font-mono uppercase tracking-wider text-white bg-[#1B1715] hover:bg-[#8E3D20] transition-colors border border-[#1B1715] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Full Geological Specimen Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
