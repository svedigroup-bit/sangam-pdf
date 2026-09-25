import React, { useEffect, useState } from 'react';
import { X, MapPin, BookOpen, Compass, Ruler, Camera, Layers, Check } from 'lucide-react';
import { LandformDetail } from '../data/geographyData';
import { GeologicalDiagram } from './GeologicalDiagram';
import { EducationalImage } from './EducationalImage';

interface LandformModalProps {
  landform: LandformDetail | null;
  onClose: () => void;
  onSelectAnother?: (landformId: string) => void;
}

export const LandformModal: React.FC<LandformModalProps> = ({
  landform,
  onClose,
  onSelectAnother,
}) => {
  const [viewMode, setViewMode] = useState<'photo' | 'diagram'>('photo');

  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!landform) return;
    setViewMode('photo'); // Reset to photo on new open
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [landform, onClose]);

  if (!landform) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-landform-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-[#1B1715]/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[94vh] bg-[#FAF8F5] border border-[#C8B8A4] shadow-2xl overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-[#EDE5D8] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8E3D20] uppercase shrink-0">
              {landform.plateNumber}
            </span>
            <span aria-hidden="true" className="text-[#C8B8A4]">·</span>
            <span className="text-xs font-mono text-[#786D62] font-semibold uppercase truncate">
              {landform.category === 'erosional' ? 'EROSIONAL FEATURE' : 'DEPOSITIONAL FEATURE'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#5C5147] hover:text-[#1B1715] hover:bg-[#FAF8F5] active:bg-[#EDE5D8] transition-colors cursor-pointer border border-[#DDD3C2] shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-[#8E3D20]" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto overscroll-contain p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* Title Header */}
          <div>
            <h3
              id="modal-landform-title"
              className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1715]"
            >
              {landform.name}
            </h3>
            {landform.alternateName && (
              <div className="text-xs sm:text-sm font-serif italic text-[#8E3D20] mt-1">
                Also catalogued as: {landform.alternateName}
              </div>
            )}
            <p className="mt-3 text-sm sm:text-base text-[#443B34] leading-relaxed font-normal">
              {landform.shortDefinition}
            </p>
          </div>

          {/* Specimen Data Strip (Section 7) */}
          <div className="border-t border-b border-[#DDD3C2] py-3 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <span className="text-[#8C7F72] uppercase block text-[10px]">CATEGORY</span>
              <span className="font-bold text-[#1B1715] uppercase">{landform.category}</span>
            </div>
            <div>
              <span className="text-[#8C7F72] uppercase block text-[10px]">LOCATION</span>
              <span className="font-bold text-[#8E3D20] truncate block" title={landform.exampleLocation}>
                {landform.exampleLocation}
              </span>
            </div>
            <div>
              <span className="text-[#8C7F72] uppercase block text-[10px]">REGION</span>
              <span className="font-bold text-[#1B1715] truncate block" title={landform.geographicRegion}>
                {landform.geographicRegion}
              </span>
            </div>
            <div>
              <span className="text-[#8C7F72] uppercase block text-[10px]">CURRICULUM</span>
              <span className="font-bold text-[#1B1715]">CLASS 11 CH. 3</span>
            </div>
          </div>

          {/* Visual Showcase: Switch between Real Field Photo and Analytical Cross-Section */}
          <div className="border border-[#DDD3C2] bg-white p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EDE5D8] mb-4">
              <div className="text-xs font-mono text-[#786D62]">
                {viewMode === 'photo' ? 'DOCUMENTARY FIELD PHOTOGRAPH' : 'ANALYTICAL GEOLOGICAL CROSS-SECTION'}
              </div>

              <div className="flex items-center gap-1 bg-[#EDE5D8] p-0.5 border border-[#DDD3C2] self-start sm:self-auto">
                <button
                  onClick={() => setViewMode('photo')}
                  className={`min-h-[36px] px-3 py-1 text-xs font-mono transition-colors cursor-pointer border-0 flex items-center gap-1.5 ${
                    viewMode === 'photo'
                      ? 'bg-[#1B1715] text-white font-semibold'
                      : 'text-[#443B34] hover:text-[#1B1715]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Field Photo</span>
                </button>
                <button
                  onClick={() => setViewMode('diagram')}
                  className={`min-h-[36px] px-3 py-1 text-xs font-mono transition-colors cursor-pointer border-0 flex items-center gap-1.5 ${
                    viewMode === 'diagram'
                      ? 'bg-[#1B1715] text-white font-semibold'
                      : 'text-[#443B34] hover:text-[#1B1715]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Diagram</span>
                </button>
              </div>
            </div>

            {viewMode === 'photo' ? (
              <div className="p-1 border border-[#EDE5D8] bg-[#FAF8F5]">
                <EducationalImage
                  src={landform.photoUrl}
                  fallbackSrc={landform.fallbackPhotoUrl}
                  alt={landform.photoAlt || landform.name}
                  title={landform.name}
                  containerClassName="aspect-16/9 w-full bg-[#EAE2D5] overflow-hidden"
                  loading="lazy"
                />
                <div className="mt-2.5 px-1 pb-1 text-xs font-mono text-[#786D62] flex items-center justify-between">
                  <span>{landform.photoCaption}</span>
                  <span className="text-[#8E3D20] font-semibold">{landform.exampleLocation}</span>
                </div>
              </div>
            ) : (
              <div>
                <GeologicalDiagram type={landform.diagramType} interactive={true} />
              </div>
            )}
          </div>

          {/* Editorial Field Note Callout */}
          <aside className="border-l-2 border-[#8E3D20] pl-4 py-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E3D20] font-bold mb-1">
              FIELD STUDY NOTE &amp; IN SITU DIAGNOSIS
            </div>
            <p className="font-serif text-lg text-[#1B1715] italic leading-snug">
              “{landform.fieldNote}”
            </p>
          </aside>

          {/* Formation Sequence (01 → 02 → 03) */}
          <div className="bg-white border border-[#DDD3C2] p-6">
            <div className="text-xs font-mono tracking-widest text-[#8C7F72] uppercase font-semibold mb-4 pb-2 border-b border-[#EDE5D8]">
              FORMATION CHRONOLOGY
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#EDE5D8] border border-[#EDE5D8] bg-[#FAF8F5]">
              {landform.formationSteps.map((step) => (
                <div key={step.step} className="p-4 space-y-1">
                  <div className="font-mono text-xs font-bold text-[#8E3D20]">
                    PHASE {step.step} · {step.action.toUpperCase()}
                  </div>
                  <p className="text-xs text-[#5C5147] leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column Grid: Critical Measurements & Real-World Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Key Feature & Height Note */}
            <div className="bg-white p-5 border border-[#DDD3C2]">
              <div className="text-xs font-mono text-[#8E3D20] uppercase tracking-wider flex items-center gap-1.5 mb-2 font-semibold">
                <Ruler className="w-3.5 h-3.5" />
                <span>Critical Diagnostic Threshold</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#1B1715] mb-2 leading-relaxed">
                {landform.keyFeature}
              </p>
              {landform.depthOrHeightNote && (
                <div className="text-xs text-[#5C5147] font-mono bg-[#FAF8F5] p-2.5 border border-[#EDE5D8] mt-2">
                  {landform.depthOrHeightNote}
                </div>
              )}
            </div>

            {/* Real World Location from PDF */}
            <div className="bg-white p-5 border border-[#DDD3C2]">
              <div className="text-xs font-mono text-[#8E3D20] uppercase tracking-wider flex items-center gap-1.5 mb-2 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Textbook Case Study</span>
              </div>
              <div className="text-base font-serif font-bold text-[#1B1715]">
                {landform.exampleLocation}
              </div>
              <div className="text-xs font-serif italic text-[#786D62] mb-2">
                {landform.geographicRegion}
              </div>
              <p className="text-xs text-[#5C5147] leading-relaxed">
                Featured directly in the Maharashtra State Board Class 11 curriculum as the primary field specimen.
              </p>
            </div>
          </div>

          {/* Syllabus Key Terms */}
          <div className="pt-4 border-t border-[#EDE5D8]">
            <div className="text-xs font-mono text-[#8C7F72] mb-2 uppercase tracking-wider">
              Curriculum Index Terms:
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#443B34]">
              {landform.keyTerms.map((term, i) => (
                <React.Fragment key={term}>
                  <span className="text-[#8E3D20] font-semibold">{term}</span>
                  {i < landform.keyTerms.length - 1 && (
                    <span aria-hidden="true" className="text-[#C8B8A4]">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#F8F5EE] border-t border-[#EDE5D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-mono text-[#786D62] hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-[#DDD3C2] text-[10px] font-mono">ESC</kbd> to return to chapter
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-semibold text-white bg-[#1B1715] hover:bg-[#8E3D20] active:bg-[#6D2E16] transition-colors cursor-pointer flex items-center justify-center"
          >
            Close Specimen Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
