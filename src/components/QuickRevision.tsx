import React, { useState } from 'react';
import { Table, BookOpen, RotateCw, Check, Compass, Layers } from 'lucide-react';
import { OVERVIEW_TABLE_DATA, FLASHCARDS_DATA } from '../data/geographyData';

export const QuickRevision: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<number[]>([]);

  const currentCard = FLASHCARDS_DATA[activeCardIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setActiveCardIndex((prev) => (prev + 1) % FLASHCARDS_DATA.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setActiveCardIndex((prev) => (prev - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length);
  };

  const toggleMastered = (id: number) => {
    setMasteredCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="quick-revision" className="py-16 md:py-24 bg-[#F8F5EE] border-b border-[#E3DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono tracking-widest text-[#A44A29] uppercase font-semibold mb-2">
            CHAPTER 3 · SYLLABUS SYNTHESIS
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B1715] font-bold tracking-tight">
            Comprehensive Revision
          </h2>
          <div className="h-0.5 w-16 bg-[#A44A29] my-4" />
          <p className="text-base sm:text-lg text-[#5C5147] leading-relaxed font-normal">
            Authoritative reference table transcribed from Slide 3 of the Class 11 Geography presentation alongside an interactive revision flashcard system for exam mastery.
          </p>
        </div>

        {/* 1. Official PDF Slide 3 Overview Table */}
        <div className="bg-white border border-[#DDD3C2] mb-20 overflow-hidden">
          <div className="p-6 bg-[#FAF8F5] border-b border-[#EDE5D8] flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#8E3D20] uppercase tracking-wider mb-1 font-bold">
                SLIDE 03 · OFFICIAL CURRICULUM SYNTHESIS
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B1715] flex items-center gap-2">
                <Table className="w-5 h-5 text-[#8E3D20]" />
                <span>Geomorphic Master Reference Ledger</span>
              </h3>
            </div>
            <span className="text-xs font-mono text-[#1B1715] bg-white px-3 py-1 border border-[#DDD3C2]">
              Maharashtra State Board Standard
            </span>
          </div>

          {/* Mobile Swipe Prompt */}
          <div className="sm:hidden px-4 py-2 bg-[#F3EFE7] border-b border-[#EDE5D8] text-[11px] font-mono text-[#786D62] flex items-center justify-between">
            <span>Slide 3 Master Reference</span>
            <span className="text-[#8E3D20] font-medium">← Swipe horizontally →</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EDE5D8] bg-[#F8F5EE] text-xs font-mono text-[#786D62] uppercase tracking-wider">
                  <th className="py-3.5 px-6 font-semibold">Category</th>
                  <th className="py-3.5 px-6 font-semibold">Landform</th>
                  <th className="py-3.5 px-6 font-semibold">Key Mechanism &amp; Diagnostic Feature</th>
                  <th className="py-3.5 px-6 font-semibold">Textbook Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE5D8] text-xs sm:text-sm text-[#443B34]">
                {OVERVIEW_TABLE_DATA.map((row) => (
                  <tr
                    key={row.landform}
                    className="hover:bg-[#FAF8F5] transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-xs font-bold text-[#8E3D20] whitespace-nowrap">
                      {row.category.toUpperCase()}
                    </td>
                    <td className="py-4 px-6 font-serif font-bold text-[#1B1715] text-base whitespace-nowrap">
                      {row.landform}
                    </td>
                    <td className="py-4 px-6 leading-relaxed font-normal text-[#443B34]">
                      {row.keyMechanism}
                    </td>
                    <td className="py-4 px-6 font-serif italic text-[#8E3D20] whitespace-nowrap">
                      {row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Interactive Revision Flashcards */}
        <div className="bg-white border border-[#DDD3C2] p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-[#EDE5D8]">
            <div>
              <div className="text-xs font-mono text-[#8E3D20] uppercase tracking-wider font-bold mb-1">
                ACTIVE RECALL MONOGRAPH
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1715]">
                Examination Revision Plate
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5147] mt-1 font-normal">
                Test recall of vital measurements (2–3 ft abrasion zone, &gt;640,000 km² loess) and core mechanisms.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto text-xs font-mono">
              <span className="text-[#786D62]">
                PLATE {activeCardIndex + 1} OF {FLASHCARDS_DATA.length}
              </span>
              <span className="text-[#8E3D20] bg-[#FAF8F5] px-3 py-1 border border-[#DDD3C2] font-semibold">
                {masteredCards.length} Mastered
              </span>
            </div>
          </div>

          {/* Flashcard Body */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[220px] p-6 sm:p-10 border border-[#D5C9B7] bg-[#FAF8F5] hover:bg-[#F3EFE7] transition-all flex flex-col justify-between select-none relative group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#786D62] mb-4">
              <span className="text-[#8E3D20] font-bold uppercase tracking-wider">
                TOPIC: {currentCard.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#8E3D20] font-medium">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click to reverse plate</span>
              </span>
            </div>

            <div className="py-4">
              {!isFlipped ? (
                <div>
                  <div className="text-xs font-mono text-[#8C7F72] uppercase tracking-wider mb-2 font-semibold">
                    Question:
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1B1715] leading-snug">
                    {currentCard.front}
                  </h4>
                </div>
              ) : (
                <div className="animate-in fade-in duration-150">
                  <div className="text-xs font-mono text-[#8E3D20] uppercase tracking-wider mb-2 font-semibold">
                    Curriculum Model Answer:
                  </div>
                  <div className="text-sm sm:text-base text-[#1B1715] leading-relaxed whitespace-pre-line font-normal">
                    {currentCard.back}
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs font-mono text-[#8C7F72] flex items-center justify-between pt-4 border-t border-[#EDE5D8]">
              <span>Tap anywhere to flip card</span>
              <span>Class 11 Geography · Chapter 3</span>
            </div>
          </div>

          {/* Flashcard Action Buttons (Full touch targets min 44px, stacked/flexed cleanly on mobile) */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <button
              onClick={() => toggleMastered(currentCard.id)}
              className={`w-full sm:w-auto min-h-[44px] px-4 py-2.5 text-xs font-mono font-semibold transition-colors cursor-pointer border flex items-center justify-center gap-2 ${
                masteredCards.includes(currentCard.id)
                  ? 'bg-[#2E5C38] text-white border-[#2E5C38]'
                  : 'bg-white text-[#443B34] border-[#DDD3C2] hover:border-[#2E5C38]'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{masteredCards.includes(currentCard.id) ? 'Mastered ✓' : 'Mark as Mastered'}</span>
            </button>

            <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrev}
                className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 text-xs font-mono bg-[#FAF8F5] border border-[#DDD3C2] hover:bg-[#EDE5D8] active:bg-[#E3DBD0] text-[#1B1715] cursor-pointer flex items-center justify-center"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold bg-[#1B1715] text-white hover:bg-[#8E3D20] active:bg-[#6D2E16] transition-colors cursor-pointer flex items-center justify-center"
              >
                Next Card →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
