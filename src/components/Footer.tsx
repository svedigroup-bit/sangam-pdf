import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#221C18] text-[#D4C7B8] border-t border-[#3A3027] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-12 sm:pb-14">
        {/* Top Editorial Monograph Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-14 border-b border-[#3A3027]">
          {/* Left Block: Monograph Title, Chapter & Epigraph Quote */}
          <div className="md:col-span-7 lg:col-span-8 space-y-6">
            <div>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#FAF6EE] leading-[1.05] uppercase">
                Work of Wind
              </div>
              <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#C2723A] leading-tight uppercase mt-1">
                Landforms
              </div>
            </div>

            <div className="space-y-0.5 text-xs sm:text-sm font-mono text-[#A89A8B]">
              <p className="uppercase tracking-widest text-[#E6DDD0] font-medium">Class 11 Geography</p>
              <p className="text-[#8E8072]">Chapter 3</p>
            </div>

            <blockquote className="pt-2 text-base sm:text-lg font-serif italic text-[#EDE4D8] leading-relaxed max-w-xl">
              “Understanding how wind shapes, transports and deposits material across arid landscapes.”
            </blockquote>
          </div>

          {/* Right Block: Field Guide Navigation */}
          <div className="md:col-span-5 lg:col-span-4 md:pl-6 lg:pl-10 flex flex-col justify-start">
            <div className="space-y-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-[#FAF6EE] font-semibold">
                  Field Guide
                </div>
                <div className="h-[1px] w-28 bg-[#B85D2A] mt-2 mb-4" />
              </div>

              <nav aria-label="Monograph Field Guide Sections">
                <ul className="space-y-3 text-sm">
                  <li>
                    <button
                      onClick={() => onNavigate('hero')}
                      className="text-[#C5B7A6] hover:text-[#FAF6EE] hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-2.5 font-serif"
                    >
                      <span className="font-mono text-xs text-[#8E8072] w-5">01</span>
                      <span>Overview</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('wind-action')}
                      className="text-[#C5B7A6] hover:text-[#FAF6EE] hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-2.5 font-serif"
                    >
                      <span className="font-mono text-xs text-[#8E8072] w-5">02</span>
                      <span>Wind Action</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('erosional-features')}
                      className="text-[#C5B7A6] hover:text-[#FAF6EE] hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-2.5 font-serif"
                    >
                      <span className="font-mono text-xs text-[#8E8072] w-5">03</span>
                      <span>Erosion</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('depositional-features')}
                      className="text-[#C5B7A6] hover:text-[#FAF6EE] hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-2.5 font-serif"
                    >
                      <span className="font-mono text-xs text-[#8E8072] w-5">04</span>
                      <span>Deposition</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('field-atlas')}
                      className="text-[#C5B7A6] hover:text-[#FAF6EE] hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-2.5 font-serif"
                    >
                      <span className="font-mono text-xs text-[#8E8072] w-5">05</span>
                      <span>Field Atlas</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Middle Section: Curriculum Reference & Back to Top */}
        <div className="py-8 sm:py-10 border-b border-[#3A3027] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-mono text-xs uppercase tracking-widest text-[#E6DDD0] font-semibold">
              Class 11 Geography
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#A89A8B]">
              Maharashtra State Board
            </div>
            <div className="font-serif text-sm text-[#8E8072] pt-0.5">
              Chapter 3 · Digital Field Guide
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2.5 bg-[#2A221C] hover:bg-[#342B24] border border-[#45392F] hover:border-[#B85D2A] text-[#FAF6EE] transition-all cursor-pointer font-mono text-xs uppercase tracking-widest"
            aria-label="Back to top of monograph"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#C2723A] group-hover:-translate-y-0.5 transition-transform" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Bottom Colophon / Copyright Imprint */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#8E8072]">
          <div>
            © 2026 Work of Wind · Educational Resource
          </div>
          <div className="text-[#A89A8B]">
            Field Guide to Aeolian Geomorphology
          </div>
        </div>
      </div>
    </footer>
  );
};
