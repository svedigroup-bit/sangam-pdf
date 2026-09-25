import React from 'react';
import { Compass, Layers, MapPin, ArrowRight, BookOpen, Ruler } from 'lucide-react';
import { EROSIONAL_LANDFORMS, LandformDetail } from '../data/geographyData';
import { GeologicalDiagram } from './GeologicalDiagram';
import { EducationalImage } from './EducationalImage';

interface ErosionalLandformsProps {
  onSelectLandform: (landform: LandformDetail) => void;
}

export const ErosionalLandforms: React.FC<ErosionalLandformsProps> = ({ onSelectLandform }) => {
  const deflation = EROSIONAL_LANDFORMS.find((l) => l.id === 'deflation-hollows') || EROSIONAL_LANDFORMS[0];
  const ventifacts = EROSIONAL_LANDFORMS.find((l) => l.id === 'ventifacts') || EROSIONAL_LANDFORMS[1];
  const mushroom = EROSIONAL_LANDFORMS.find((l) => l.id === 'mushroom-rocks') || EROSIONAL_LANDFORMS[2];
  const yardangs = EROSIONAL_LANDFORMS.find((l) => l.id === 'yardangs') || EROSIONAL_LANDFORMS[3];

  return (
    <section id="erosional-features" className="py-20 md:py-28 bg-[#F8F5EE] border-b border-[#DDD3C2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Textbook Monograph Heading */}
        <header className="max-w-3xl mb-16">
          <div className="text-xs font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-2">
            CHAPTER 3 · GEOMORPHIC EROSION
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1715] font-bold tracking-tight">
            Erosional Landforms
          </h2>
          <div className="h-0.5 w-16 bg-[#8E3D20] my-4" />
          <p className="text-base sm:text-lg text-[#5C5147] leading-relaxed font-normal">
            Where loose sand and dry weathered detritus are propelled across bare bedrock, high-velocity winds scoop out depressions, polish pebbles into faceted dreikanter, and carve strata into streamlined ridges.
          </p>
        </header>

        <div className="space-y-24">
          {/* ============================================================== */}
          {/* 1. DEFLATION HOLLOWS: Wide 7-col Photo Plate + 5-col Specimen  */}
          {/* ============================================================== */}
          <article className="border-t-2 border-b border-[#1B1715] pt-8 pb-10 bg-[#FAF8F5]">
            {/* Folio Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-8 border-b border-[#EDE5D8] text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#8E3D20] tracking-wider uppercase">{deflation.plateNumber}</span>
                <span className="text-[#C4B7A5]">·</span>
                <span className="text-[#1B1715] uppercase font-semibold">GEOMORPHIC EROSION · BLOWOUT BASIN</span>
              </div>
              <div className="text-[#786D62]">
                LOCALITY: {deflation.exampleLocation} ({deflation.geographicRegion})
              </div>
            </div>

            {/* Asymmetrical 12-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column (7 cols): Title & Photograph Field Plate */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1715]">
                    {deflation.name}
                  </h3>
                  <div className="text-sm font-serif italic text-[#8E3D20] mt-0.5">
                    {deflation.alternateName}
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-[#443B34] leading-relaxed">
                    {deflation.shortDefinition}
                  </p>
                </div>

                {/* Archival Mounted Photograph */}
                <div className="border border-[#DDD3C2] p-2 bg-white">
                  <EducationalImage
                    src={deflation.photoUrl}
                    fallbackSrc={deflation.fallbackPhotoUrl}
                    alt={deflation.photoAlt || deflation.name}
                    title={deflation.name}
                    containerClassName="relative aspect-16/9 w-full overflow-hidden bg-[#EFE9DF]"
                    loading="lazy"
                  />
                  <div className="mt-2.5 px-1 pb-1 text-xs font-mono text-[#6E6357] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span>
                      <strong className="text-[#1B1715] font-serif font-bold">FIG. 2.1</strong> · {deflation.photoCaption}
                    </span>
                    <span className="text-[#8E3D20] shrink-0 font-medium">{deflation.exampleLocation}</span>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Specimen Data Strip + Field Note + Action */}
              <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-[#EDE5D8] lg:pl-8">
                {/* Specimen Data Strip (Section 7) */}
                <div className="border-t border-b border-[#DDD3C2] py-3 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C7F72] uppercase">AGENT</span>
                    <span className="font-semibold text-[#1B1715]">HIGH-VELOCITY WIND</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#EDE5D8] pt-2">
                    <span className="text-[#8C7F72] uppercase">PROCESS</span>
                    <span className="font-semibold text-[#1B1715]">DEFLATION (PARTICLE LIFT)</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#EDE5D8] pt-2">
                    <span className="text-[#8C7F72] uppercase">LIMITING DATUM</span>
                    <span className="font-semibold text-[#8E3D20]">WATER TABLE (DAMP SAND)</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#EDE5D8] pt-2">
                    <span className="text-[#8C7F72] uppercase">MAX DEPRESSION</span>
                    <span className="font-semibold text-[#1B1715]">−133 M (QATTARA BASIN)</span>
                  </div>
                </div>

                {/* Field Note Panel (Section 6) */}
                <aside className="border-l-2 border-[#8E3D20] pl-4 py-1">
                  <div className="text-[10px] font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-1">
                    FIELD NOTE · HYDRO-GEOMORPHIC BOUNDARY
                  </div>
                  <p className="font-serif italic text-base sm:text-lg text-[#1B1715] leading-snug">
                    “Deflation is halted the instant the subterranean water table is breached; damp moisture binds sand grains firmly together, giving rise to fertile desert oases.”
                  </p>
                </aside>

                {/* Diagnostic Key Feature Strip */}
                <div className="bg-white border border-[#DDD3C2] p-4 text-xs">
                  <div className="font-mono text-[10px] text-[#8E3D20] uppercase font-bold flex items-center gap-1.5 mb-1">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>DIAGNOSTIC CRITERIA</span>
                  </div>
                  <p className="text-sm font-serif font-bold text-[#1B1715] leading-relaxed">
                    {deflation.keyFeature}
                  </p>
                  <p className="text-xs text-[#5C5147] mt-1.5 leading-relaxed">
                    Over millennia, persistent gales excavate depressions measuring hundreds of square kilometers down to bedrock aquifers.
                  </p>
                </div>

                <button
                  onClick={() => onSelectLandform(deflation)}
                  className="w-full py-3 px-4 text-xs font-mono uppercase tracking-wider text-white bg-[#1B1715] hover:bg-[#8E3D20] transition-colors border border-[#1B1715] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Examine Specimen Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom: 3-Stage Formation Process Ledger Strip */}
            <div className="mt-10 pt-6 border-t border-[#EDE5D8]">
              <div className="text-[11px] font-mono tracking-widest text-[#8C7F72] uppercase font-bold mb-4">
                FORMATION SEQUENCE · STEP-BY-STEP REACTION
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#EDE5D8] border border-[#EDE5D8] bg-white text-xs">
                {deflation.formationSteps.map((s) => (
                  <div key={s.step} className="p-4 sm:p-5 space-y-1.5">
                    <div className="font-mono text-[#8E3D20] font-bold">
                      PHASE {s.step} · {s.action.toUpperCase()}
                    </div>
                    <p className="text-[#443B34] leading-relaxed">
                      {s.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* ============================================================== */}
          {/* 2. VENTIFACTS: Inverted Asymmetric Grid (7-col Text + 5-col Img)*/}
          {/* ============================================================== */}
          <article className="border-t-2 border-b border-[#1B1715] pt-8 pb-10 bg-[#FAF8F5]">
            {/* Folio Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-8 border-b border-[#EDE5D8] text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#8E3D20] tracking-wider uppercase">{ventifacts.plateNumber}</span>
                <span className="text-[#C4B7A5]">·</span>
                <span className="text-[#1B1715] uppercase font-semibold">PEBBLE ABRASION · FACETED STONES</span>
              </div>
              <div className="text-[#786D62]">
                LOCALITY: {ventifacts.exampleLocation} ({ventifacts.geographicRegion})
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column (7 cols on desktop, order-2 on mobile so photo is visible first) */}
              <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1715]">
                    {ventifacts.name}
                  </h3>
                  <div className="text-sm font-serif italic text-[#8E3D20] mt-0.5">
                    {ventifacts.alternateName}
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-[#443B34] leading-relaxed">
                    {ventifacts.shortDefinition}
                  </p>
                </div>

                {/* Specimen Data Strip */}
                <div className="border-t border-b border-[#DDD3C2] py-3 text-xs font-mono space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[#8C7F72] uppercase">ABRASIVE MEDIUM</span>
                    <span className="font-semibold text-[#1B1715]">SALTATING QUARTZ GRAINS</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-[#EDE5D8] pt-2">
                    <span className="text-[#8C7F72] uppercase">GEOMETRY</span>
                    <span className="font-semibold text-[#8E3D20]">DREIKANTER (THREE POLISHED FACETS)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-[#EDE5D8] pt-2">
                    <span className="text-[#8C7F72] uppercase">PALEOCLIMATE RECORD</span>
                    <span className="font-semibold text-[#1B1715]">DOCUMENTS PREHISTORIC WIND DIRECTIONS</span>
                  </div>
                </div>

                {/* Field Note Panel */}
                <aside className="border-l-2 border-[#8E3D20] pl-4 py-1">
                  <div className="text-[10px] font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-1">
                    FIELD NOTE · IN SITU ABRASION
                  </div>
                  <p className="font-serif italic text-base sm:text-lg text-[#1B1715] leading-snug">
                    “The windward side of pebbles receives constant sand-blast bombardment, cut flat and polished smooth. When the stone shifts or rolls, new facets are carved, producing multi-sided dreikanter.”
                  </p>
                </aside>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectLandform(ventifacts)}
                    className="w-full sm:w-auto min-h-[44px] py-3 px-6 text-xs font-mono uppercase tracking-wider text-white bg-[#1B1715] hover:bg-[#8E3D20] transition-colors border border-[#1B1715] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Examine Ventifact Specimen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column (5 cols on desktop, order-1 on mobile for visual specimen recognition) */}
              <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
                <div className="border border-[#DDD3C2] p-2 bg-white">
                  <EducationalImage
                    src={ventifacts.photoUrl}
                    fallbackSrc={ventifacts.fallbackPhotoUrl}
                    alt={ventifacts.photoAlt || ventifacts.name}
                    title={ventifacts.name}
                    containerClassName="relative aspect-4/3 w-full overflow-hidden bg-[#EFE9DF]"
                    loading="lazy"
                  />
                  <div className="mt-2.5 px-1 pb-1 text-xs font-mono text-[#6E6357]">
                    <strong className="text-[#1B1715] font-serif font-bold">FIG. 2.2</strong> · {ventifacts.photoCaption}
                  </div>
                </div>

                <div className="bg-white border border-[#EDE5D8] p-4 text-xs">
                  <div className="font-mono text-[10px] text-[#8C7F72] uppercase font-bold mb-1">
                    SPECIMEN DIAGNOSIS
                  </div>
                  <p className="text-[#443B34] leading-relaxed">
                    Sharp, planar facets meet along well-defined ridges. The texture is vitreous or satin-polished by micro-pitting from windblown silt.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* ============================================================== */}
          {/* 3. MUSHROOM ROCKS: Master 12-Col Scientific Plate               */}
          {/* ============================================================== */}
          <article className="border-t-2 border-b border-[#1B1715] pt-8 pb-10 bg-[#FAF8F5]">
            {/* Folio Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-8 border-b border-[#EDE5D8] text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#8E3D20] tracking-wider uppercase">{mushroom.plateNumber}</span>
                <span className="text-[#C4B7A5]">·</span>
                <span className="text-[#1B1715] uppercase font-semibold">DIFFERENTIAL ABRASION · PEDESTAL ROCK</span>
              </div>
              <div className="text-[#786D62]">
                LOCALITY: {mushroom.exampleLocation} ({mushroom.geographicRegion})
              </div>
            </div>

            {/* Specimen Header */}
            <div className="max-w-3xl mb-8">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1715]">
                {mushroom.name}
              </h3>
              <div className="text-sm font-serif italic text-[#8E3D20] mt-0.5">
                {mushroom.alternateName}
              </div>
              <p className="mt-3 text-sm sm:text-base text-[#443B34] leading-relaxed">
                {mushroom.shortDefinition} Prominently observed across the arid expanses of Western Rajasthan, India.
              </p>
            </div>

            {/* Dual Exhibition: Photographic Plate (6 cols) + Scientific Illustration Panel (6 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
              {/* Photo Plate (6 cols) */}
              <div className="lg:col-span-6 border border-[#DDD3C2] p-2 bg-white">
                <EducationalImage
                  src={mushroom.photoUrl}
                  fallbackSrc={mushroom.fallbackPhotoUrl}
                  alt={mushroom.photoAlt || mushroom.name}
                  title={mushroom.name}
                  containerClassName="relative aspect-4/3 w-full overflow-hidden bg-[#EFE9DF]"
                  loading="lazy"
                />
                <div className="mt-2.5 px-1 pb-1 text-xs font-mono text-[#6E6357]">
                  <strong className="text-[#1B1715] font-serif font-bold">FIG. 2.3A</strong> · {mushroom.photoCaption}
                </div>
              </div>

              {/* Dedicated Scientific Diagram Panel (6 cols) */}
              <div className="lg:col-span-6">
                <GeologicalDiagram type={mushroom.diagramType} interactive={true} />
              </div>
            </div>

            {/* Field Note Panel (Unboxed, thin terracotta line) */}
            <aside className="border-l-2 border-[#8E3D20] pl-4 py-2 mb-8 bg-transparent">
              <div className="text-[10px] font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-1">
                FIELD NOTE · THE CRITICAL 2–3 FT ABRASION CEILING
              </div>
              <p className="font-serif italic text-base sm:text-lg text-[#1B1715] leading-snug">
                “Maximum abrasion occurs at lower levels because heavier sand grains travel close to the ground, bouncing strictly within the 2 to 3 feet (0.6 to 0.9 m) sand-blast zone. The base is aggressively undercut while the broad cap remains preserved.”
              </p>
            </aside>

            {/* Specimen Data Strip (Section 7) */}
            <div className="border-t border-b border-[#DDD3C2] py-3 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div>
                <span className="text-[#8C7F72] uppercase block text-[10px]">SALTATION ZONE</span>
                <span className="font-bold text-[#8E3D20]">2 TO 3 FEET</span>
              </div>
              <div>
                <span className="text-[#8C7F72] uppercase block text-[10px]">EROSION RATE</span>
                <span className="font-bold text-[#1B1715]">BASE &gt;&gt; CAP</span>
              </div>
              <div>
                <span className="text-[#8C7F72] uppercase block text-[10px]">GEOLOGICAL RESULT</span>
                <span className="font-bold text-[#1B1715]">NARROW STALK PILLAR</span>
              </div>
              <div>
                <span className="text-[#8C7F72] uppercase block text-[10px]">CURRICULUM SITE</span>
                <span className="font-bold text-[#1B1715]">RAJASTHAN, INDIA</span>
              </div>
            </div>

            {/* 4-Step Formation Chronology Strip */}
            <div className="border border-[#EDE5D8] bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#EDE5D8] grid grid-cols-1 sm:grid-cols-4 text-xs font-mono">
              <div className="p-4 space-y-1">
                <span className="text-[#8E3D20] font-bold block">01 · TRANSPORT</span>
                <span className="text-[#443B34] text-[11px] block">Dense sand grains are propelled close to ground level.</span>
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[#8E3D20] font-bold block">02 · BASAL STRIKE</span>
                <span className="text-[#443B34] text-[11px] block">Bouncing grains hammer the lower rock within 2–3 feet.</span>
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[#8E3D20] font-bold block">03 · UNDERCUTTING</span>
                <span className="text-[#443B34] text-[11px] block">Base scours rapidly; upper rock remains largely unswept.</span>
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[#8E3D20] font-bold block">04 · PEDESTAL</span>
                <span className="text-[#443B34] text-[11px] block">Narrow stalk is left holding a wide, top-heavy mushroom cap.</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#8C7F72]">
                THRESHOLD: 2–3 FT (0.6–0.9 M) MAX ABRASION ZONE
              </span>
              <button
                onClick={() => onSelectLandform(mushroom)}
                className="w-full sm:w-auto min-h-[44px] py-3 px-5 text-xs font-mono uppercase tracking-wider text-white bg-[#1B1715] hover:bg-[#8E3D20] transition-colors border border-[#1B1715] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Examine Mushroom Rock Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>

          {/* ============================================================== */}
          {/* 4. YARDANGS: Diagram on Left (6 cols) + Text on Right (6 cols) */}
          {/* ============================================================== */}
          <article className="border-t-2 border-b border-[#1B1715] pt-8 pb-10 bg-[#FAF8F5]">
            {/* Folio Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-8 border-b border-[#EDE5D8] text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#8E3D20] tracking-wider uppercase">{yardangs.plateNumber}</span>
                <span className="text-[#C4B7A5]">·</span>
                <span className="text-[#1B1715] uppercase font-semibold">PARALLEL STRATA SCOUR · STREAMLINED RIDGES</span>
              </div>
              <div className="text-[#786D62]">
                LOCALITY: {yardangs.exampleLocation} ({yardangs.geographicRegion})
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column (6 cols): Dedicated Scientific Illustration Panel */}
              <div className="lg:col-span-6">
                <GeologicalDiagram type={yardangs.diagramType} interactive={true} />
              </div>

              {/* Right Column (6 cols): Editorial Text & Specimen Record */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1715]">
                    {yardangs.name}
                  </h3>
                  <div className="text-sm font-serif italic text-[#8E3D20] mt-0.5">
                    {yardangs.alternateName}
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-[#443B34] leading-relaxed">
                    {yardangs.shortDefinition}
                  </p>
                </div>

                {/* Specimen Data Strip */}
                <div className="border-t border-b border-[#DDD3C2] py-3 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C7F72] uppercase">STRATIGRAPHY</span>
                    <span className="font-semibold text-[#1B1715]">ALTERNATING VERTICAL BANDS</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#EDE5D8] pt-2">
                    <span className="text-[#8C7F72] uppercase">WIND ALIGNMENT</span>
                    <span className="font-semibold text-[#8E3D20]">PARALLEL TO BEDDING PLANES</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#EDE5D8] pt-2">
                    <span className="text-[#8C7F72] uppercase">TROUGH FORMATION</span>
                    <span className="font-semibold text-[#1B1715]">WEAK STRATA CORRIDORS</span>
                  </div>
                </div>

                {/* Field Note Panel */}
                <aside className="border-l-2 border-[#8E3D20] pl-4 py-1">
                  <div className="text-[10px] font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-1">
                    FIELD NOTE · AERODYNAMIC EQUILIBRIUM
                  </div>
                  <p className="font-serif italic text-base sm:text-lg text-[#1B1715] leading-snug">
                    “Yardangs resemble overturned boat hulls aligned with mathematical precision along the dominant wind azimuth. Hard bands withstand abrasion to stand high as sharp ridges.”
                  </p>
                </aside>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs font-mono text-[#8C7F72]">Example: Lut Desert (Iran)</span>
                  <button
                    onClick={() => onSelectLandform(yardangs)}
                    className="w-full sm:w-auto min-h-[44px] py-3 px-5 text-xs font-mono uppercase tracking-wider text-white bg-[#1B1715] hover:bg-[#8E3D20] transition-colors border border-[#1B1715] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Examine Yardang Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
