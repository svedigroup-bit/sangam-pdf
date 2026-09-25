import React from 'react';
import { Compass, Wind, Layers, MapPin, ArrowRight, BookOpen, Ruler } from 'lucide-react';
import { DEPOSITIONAL_LANDFORMS, LandformDetail } from '../data/geographyData';
import { GeologicalDiagram } from './GeologicalDiagram';
import { EducationalImage } from './EducationalImage';

interface DepositionalLandformsProps {
  onSelectLandform: (landform: LandformDetail) => void;
}

export const DepositionalLandforms: React.FC<DepositionalLandformsProps> = ({
  onSelectLandform,
}) => {
  const dunes = DEPOSITIONAL_LANDFORMS.find((l) => l.id === 'sand-dunes') || DEPOSITIONAL_LANDFORMS[0];
  const barchans = DEPOSITIONAL_LANDFORMS.find((l) => l.id === 'barchans') || DEPOSITIONAL_LANDFORMS[1];
  const loess = DEPOSITIONAL_LANDFORMS.find((l) => l.id === 'loess-plains') || DEPOSITIONAL_LANDFORMS[2];

  return (
    <section id="depositional-features" className="py-20 md:py-28 bg-[#F3EFE7] border-b border-[#DDD3C2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="max-w-3xl mb-16">
          <div className="text-xs font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-2">
            CHAPTER 3 · GEOMORPHIC ACCUMULATION
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1715] font-bold tracking-tight">
            Depositional Landforms
          </h2>
          <div className="h-0.5 w-16 bg-[#8E3D20] my-4" />

          {/* Key Principle: Authoritative Scientific Proclamation */}
          <div className="border border-[#DDD3C2] p-5 sm:p-6 bg-white my-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E3D20] font-bold mb-1.5">
              FUNDAMENTAL ACCUMULATION PRINCIPLE · SLIDE 08
            </div>
            <p className="font-serif text-base sm:text-xl text-[#1B1715] italic leading-relaxed">
              &ldquo;When wind velocity drops or encounters obstacles like rocks and vegetation, transported sediments settle, building distinct depositional landforms.&rdquo;
            </p>
          </div>
        </header>

        <div className="space-y-24">
          {/* ============================================================== */}
          {/* 1. SAND DUNES: Comparative Transverse vs Longitudinal Plate    */}
          {/* ============================================================== */}
          <article className="border-t-2 border-b border-[#1B1715] pt-8 pb-10 bg-[#FAF8F5]">
            {/* Folio Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-8 border-b border-[#EDE5D8] text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#8E3D20] tracking-wider uppercase">{dunes.plateNumber}</span>
                <span className="text-[#C4B7A5]">·</span>
                <span className="text-[#1B1715] uppercase font-semibold">AEOLIAN ACCUMULATION · SAND DUNES</span>
              </div>
              <div className="text-[#786D62]">
                LOCALITY: {dunes.exampleLocation} ({dunes.geographicRegion})
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Photo Column (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="border border-[#DDD3C2] p-2 bg-white">
                  <EducationalImage
                    src={dunes.photoUrl}
                    fallbackSrc={dunes.fallbackPhotoUrl}
                    alt={dunes.photoAlt || dunes.name}
                    title={dunes.name}
                    containerClassName="relative aspect-4/3 w-full overflow-hidden bg-[#EFE9DF]"
                    loading="lazy"
                  />
                  <div className="mt-2.5 px-1 pb-1 text-xs font-mono text-[#6E6357]">
                    <strong className="text-[#1B1715] font-serif font-bold">FIG. 3.1</strong> · {dunes.photoCaption}
                  </div>
                </div>

                <div className="bg-white border border-[#EDE5D8] p-4 text-xs">
                  <span className="font-mono text-[10px] text-[#8E3D20] uppercase font-bold block mb-1">
                    DUNE ACCUMULATION DYNAMICS
                  </span>
                  <p className="text-[#443B34] leading-relaxed">
                    Dunes represent dynamic mounds of wind-transported sand that form and shift continually across desert floors in response to wind regimes and sand supply.
                  </p>
                </div>
              </div>

              {/* Text & Comparative Matrix (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1715]">
                    {dunes.name}
                  </h3>
                  <div className="text-sm font-serif italic text-[#8E3D20] mt-0.5">
                    {dunes.alternateName}
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-[#443B34] leading-relaxed">
                    {dunes.shortDefinition}
                  </p>
                </div>

                {/* Comparative Geomorphic Matrix (Transverse vs Longitudinal) */}
                <div className="border border-[#DDD3C2] bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#DDD3C2] grid grid-cols-1 sm:grid-cols-2 text-xs">
                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="font-mono text-[#8E3D20] font-bold text-xs uppercase flex items-center justify-between">
                      <span>TRANSVERSE DUNES</span>
                      <span className="text-[10px] text-[#8C7F72]">90° PERPENDICULAR</span>
                    </div>
                    <p className="text-[#443B34] leading-relaxed">
                      Form at <strong>right angles (perpendicular)</strong> to steady winds when sand supply is abundant. Ridges lie transverse to wind vector.
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="font-mono text-[#8E3D20] font-bold text-xs uppercase flex items-center justify-between">
                      <span>LONGITUDINAL (SEIF)</span>
                      <span className="text-[10px] text-[#8C7F72]">PARALLEL AXIS</span>
                    </div>
                    <p className="text-[#443B34] leading-relaxed">
                      Form <strong>parallel</strong> to dominant wind corridors as immense elongated sand ribbons when wind vectors converge.
                    </p>
                  </div>
                </div>

                {/* Field Note Panel */}
                <aside className="border-l-2 border-[#8E3D20] pl-4 py-1">
                  <div className="text-[10px] font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-1">
                    FIELD NOTE · ACCUMULATION CRITERIA
                  </div>
                  <p className="font-serif italic text-base sm:text-lg text-[#1B1715] leading-snug">
                    “Dune shape is governed by three primary variables: prevailing wind direction, velocity consistency, and the volume of available loose sand.”
                  </p>
                </aside>

                {/* Specimen Data Strip */}
                <div className="border-t border-b border-[#DDD3C2] py-3 text-xs font-mono grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[#8C7F72] uppercase block text-[10px]">SEDIMENT AGENT</span>
                    <span className="font-semibold text-[#1B1715]">SALTATING SAND</span>
                  </div>
                  <div>
                    <span className="text-[#8C7F72] uppercase block text-[10px]">ACCUMULATION TRIGGER</span>
                    <span className="font-semibold text-[#1B1715]">VELOCITY DROP</span>
                  </div>
                  <div>
                    <span className="text-[#8C7F72] uppercase block text-[10px]">MAJOR EXAMPLES</span>
                    <span className="font-semibold text-[#8E3D20]">THAR &amp; SAHARA</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectLandform(dunes)}
                    className="w-full sm:w-auto min-h-[44px] py-3 px-6 text-xs font-mono uppercase tracking-wider text-white bg-[#1B1715] hover:bg-[#8E3D20] transition-colors border border-[#1B1715] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Examine Dune Specimen Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* ============================================================== */}
          {/* 2. BARCHANS: Dual Photo + Scientific Slope Diagram            */}
          {/* ============================================================== */}
          <article className="border-t-2 border-b border-[#1B1715] pt-8 pb-10 bg-[#FAF8F5]">
            {/* Folio Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-8 border-b border-[#EDE5D8] text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#8E3D20] tracking-wider uppercase">{barchans.plateNumber}</span>
                <span className="text-[#C4B7A5]">·</span>
                <span className="text-[#1B1715] uppercase font-semibold">CRESCENT ACCUMULATION · CRESCENTIC DUNES</span>
              </div>
              <div className="text-[#786D62]">
                LOCALITY: {barchans.exampleLocation} ({barchans.geographicRegion})
              </div>
            </div>

            {/* Specimen Header */}
            <div className="max-w-3xl mb-8">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1715]">
                {barchans.name}
              </h3>
              <div className="text-sm font-serif italic text-[#8E3D20] mt-0.5">
                {barchans.alternateName}
              </div>
              <p className="mt-3 text-sm sm:text-base text-[#443B34] leading-relaxed">
                {barchans.shortDefinition}
              </p>
            </div>

            {/* Dual Exhibition: Photographic Plate (6 cols) + Scientific Illustration Panel (6 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
              {/* Photograph Field Plate */}
              <div className="lg:col-span-6 border border-[#DDD3C2] p-2 bg-white">
                <EducationalImage
                  src={barchans.photoUrl}
                  fallbackSrc={barchans.fallbackPhotoUrl}
                  alt={barchans.photoAlt || "Crescent-shaped barchan dunes formed by predominantly unidirectional wind"}
                  title={barchans.name}
                  containerClassName="relative aspect-4/3 w-full overflow-hidden bg-[#EFE9DF]"
                  objectPosition="center 40%"
                  loading="lazy"
                />
                <div className="mt-2.5 px-1 pb-1 text-xs font-mono text-[#6E6357]">
                  <strong className="text-[#1B1715] font-serif font-bold">FIG. 3.2A</strong> · {barchans.photoCaption}
                </div>
              </div>

              {/* Dedicated Scientific Diagram Panel */}
              <div className="lg:col-span-6">
                <GeologicalDiagram type={barchans.diagramType} interactive={true} />
              </div>
            </div>

            {/* Crucial Diagnostic Rule Field Note */}
            <aside className="border-l-2 border-[#8E3D20] pl-4 py-2 mb-8">
              <div className="text-[10px] font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-1">
                CRUCIAL DIAGNOSTIC RULE · CURRICULUM EXAMINATION MASTER
              </div>
              <p className="font-serif italic text-base sm:text-lg text-[#1B1715] leading-snug">
                “The two tapering tips, called horns, point downwind in the exact direction of dominant wind movement. The windward slope is gentle (10°–15°) and convex, while the sheltered leeward slope is steep (~32°) and concave.”
              </p>
            </aside>

            {/* Specimen Data Strip */}
            <div className="border-t border-b border-[#DDD3C2] py-3 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div>
                <span className="text-[#8C7F72] uppercase block text-[10px]">WIND REGIME</span>
                <span className="font-bold text-[#1B1715]">CONSTANT UNIDIRECTIONAL</span>
              </div>
              <div>
                <span className="text-[#8C7F72] uppercase block text-[10px]">HORN DIRECTION</span>
                <span className="font-bold text-[#8E3D20]">STRICTLY DOWNWIND</span>
              </div>
              <div>
                <span className="text-[#8C7F72] uppercase block text-[10px]">WINDWARD ANGLE</span>
                <span className="font-bold text-[#1B1715]">10° TO 15° (GENTLE)</span>
              </div>
              <div>
                <span className="text-[#8C7F72] uppercase block text-[10px]">LEEWARD ANGLE</span>
                <span className="font-bold text-[#1B1715]">~32° (STEEP SLIP FACE)</span>
              </div>
            </div>

            {/* 3-Step Formation Chronology Strip */}
            <div className="border border-[#EDE5D8] bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#EDE5D8] grid grid-cols-1 sm:grid-cols-3 text-xs font-mono">
              <div className="p-4 sm:p-5 space-y-1">
                <span className="text-[#8E3D20] font-bold block">01 · UNI-DIRECTIONAL WIND</span>
                <span className="text-[#443B34] text-[11px] block">Steady winds blow constantly from a single dominant quadrant across moderate sand.</span>
              </div>
              <div className="p-4 sm:p-5 space-y-1">
                <span className="text-[#8E3D20] font-bold block">02 · ASYMMETRIC SLOPES</span>
                <span className="text-[#443B34] text-[11px] block">Grains creep up gentle windward slope (10–15°) and avalanche down the steep slip-face (~32°).</span>
              </div>
              <div className="p-4 sm:p-5 space-y-1">
                <span className="text-[#8E3D20] font-bold block">03 · HORN MIGRATION</span>
                <span className="text-[#443B34] text-[11px] block">Lateral flanks advance faster than the thick center, directing horns forward downwind.</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#8C7F72]">
                EXAM NOTE: HORNS ALWAYS POINT DOWNWIND
              </span>
              <button
                onClick={() => onSelectLandform(barchans)}
                className="w-full sm:w-auto min-h-[44px] py-3 px-5 text-xs font-mono uppercase tracking-wider text-white bg-[#1B1715] hover:bg-[#8E3D20] transition-colors border border-[#1B1715] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Examine Barchan Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>

          {/* ============================================================== */}
          {/* 3. LOESS PLAINS: Wide Silt Mantle Monograph Plate              */}
          {/* ============================================================== */}
          <article className="border-t-2 border-b border-[#1B1715] pt-8 pb-10 bg-[#FAF8F5]">
            {/* Folio Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-8 border-b border-[#EDE5D8] text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#8E3D20] tracking-wider uppercase">{loess.plateNumber}</span>
                <span className="text-[#C4B7A5]">·</span>
                <span className="text-[#1B1715] uppercase font-semibold">AEOLIAN SUSPENSION MANTLE · LOESS PLAINS</span>
              </div>
              <div className="text-[#786D62]">
                LOCALITY: {loess.exampleLocation} ({loess.geographicRegion})
              </div>
            </div>

            <div className="space-y-8">
              <div className="max-w-3xl">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1715]">
                  {loess.name}
                </h3>
                <div className="text-sm font-serif italic text-[#8E3D20] mt-0.5">
                  {loess.alternateName}
                </div>
                <p className="mt-3 text-sm sm:text-base text-[#443B34] leading-relaxed">
                  {loess.shortDefinition}
                </p>
              </div>

              {/* Large Panoramic Photograph Plate */}
              <div className="border border-[#DDD3C2] p-2 bg-white">
                <EducationalImage
                  src={loess.photoUrl}
                  fallbackSrc={loess.fallbackPhotoUrl}
                  alt={loess.photoAlt || loess.name}
                  title={loess.name}
                  containerClassName="relative aspect-16/9 sm:aspect-16/7 w-full overflow-hidden bg-[#EFE9DF]"
                  loading="lazy"
                />
                <div className="mt-2.5 px-1 pb-1 text-xs font-mono text-[#6E6357] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span>
                    <strong className="text-[#1B1715] font-serif font-bold">FIG. 3.3</strong> · {loess.photoCaption}
                  </span>
                  <span className="text-[#8E3D20] shrink-0 font-medium">Northern China (&gt;640,000 km²)</span>
                </div>
              </div>

              {/* Specimen Data Strip across width */}
              <div className="border-t border-b border-[#DDD3C2] py-3 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <span className="text-[#8C7F72] uppercase block text-[10px]">PARTICLE CLASS</span>
                  <span className="font-semibold text-[#1B1715]">FINE SILT (&lt;0.05 MM)</span>
                </div>
                <div>
                  <span className="text-[#8C7F72] uppercase block text-[10px]">TRANSPORT MODE</span>
                  <span className="font-semibold text-[#8E3D20]">SUSPENSION</span>
                </div>
                <div>
                  <span className="text-[#8C7F72] uppercase block text-[10px]">STRATIFICATION</span>
                  <span className="font-semibold text-[#1B1715]">UNSTRATIFIED POROUS</span>
                </div>
                <div>
                  <span className="text-[#8C7F72] uppercase block text-[10px]">AREAL EXTENT</span>
                  <span className="font-semibold text-[#1B1715]">&gt;640,000 SQ KM</span>
                </div>
              </div>

              {/* 2-Column Split: Formation on Left, Diagnostic Profile on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-[11px] font-mono tracking-widest text-[#8C7F72] uppercase font-bold">
                    ATMOSPHERIC SUSPENSION &amp; DISTANT RAIN-OUT
                  </div>
                  <p className="text-xs sm:text-sm text-[#443B34] leading-relaxed">
                    Extremely fine dust and silt particles are lifted high into turbulent atmospheric suspension by violent desert storms. Winds transport this microscopic powder hundreds to thousands of kilometers beyond arid margins before settling over distant vegetated plains.
                  </p>
                  <div className="space-y-2 pt-2">
                    {loess.formationSteps.map((s) => (
                      <div key={s.step} className="flex items-start gap-3 text-xs text-[#5C5147]">
                        <span className="font-mono font-bold text-[#8E3D20] shrink-0">{s.step} —</span>
                        <div><strong className="text-[#1B1715] font-serif">{s.action}:</strong> {s.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4 bg-white p-5 border border-[#EDE5D8]">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#8E3D20] uppercase font-bold mb-1">
                      DIAGNOSTIC PEDOLOGY &amp; STRATIGRAPHY
                    </div>
                    <p className="text-sm font-serif font-bold text-[#1B1715] leading-relaxed">
                      Yellowish, highly porous, unstratified, and remarkably fertile mineral-rich agricultural soil.
                    </p>
                    <p className="text-xs text-[#6E6357] mt-2 leading-relaxed">
                      The world's largest loess deposit is the Loess Plateau in Northern China, which spans over 640,000 square kilometers with silt mantles reaching depths exceeding 100 meters.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EDE5D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs font-mono text-[#8C7F72]">Area: &gt;640,000 sq km</span>
                    <button
                      onClick={() => onSelectLandform(loess)}
                      className="w-full sm:w-auto min-h-[44px] py-2.5 px-4 text-xs font-mono uppercase tracking-wider text-white bg-[#1B1715] hover:bg-[#8E3D20] transition-colors border border-[#1B1715] cursor-pointer flex items-center justify-center"
                    >
                      Examine Dossier →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
