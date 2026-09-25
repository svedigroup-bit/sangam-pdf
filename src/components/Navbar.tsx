import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Compass, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const desktopNavItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'wind-action', label: 'Wind Action' },
    { id: 'erosional-features', label: 'Erosion' },
    { id: 'depositional-features', label: 'Deposition' },
    { id: 'field-atlas', label: 'Field Atlas' },
    { id: 'quick-revision', label: 'Revision' },
  ];

  const mobileNavItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'wind-action', label: 'Wind Action' },
    { id: 'erosional-features', label: 'Erosional Features' },
    { id: 'depositional-features', label: 'Depositional Features' },
    { id: 'field-atlas', label: 'Field Atlas' },
    { id: 'quick-revision', label: 'Revision' },
    { id: 'quiz', label: 'Assessment' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 w-full ${
        isScrolled
          ? 'bg-[#F8F5EE]/95 backdrop-blur-xs border-b border-[#DDD3C2] shadow-2xs'
          : 'bg-[#F8F5EE] border-b border-[#E3DBD0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          {/* Masthead Text Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-left group flex items-center gap-2.5 cursor-pointer focus-visible:outline-none min-h-[44px] py-1"
            aria-label="Work of Wind Home"
          >
            <Compass className="w-4 h-4 text-[#A44A29] shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#1B1715] truncate">
                WORK OF WIND
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#786D62] -mt-1 truncate">
                Class 11 Geography
              </span>
            </div>
          </button>

          {/* Desktop Editorial Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-mono uppercase tracking-wider text-[#5C5147]">
            {desktopNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`py-1 cursor-pointer relative group transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#A44A29] font-bold'
                      : 'hover:text-[#1B1715]'
                  }`}
                >
                  {/* Subtle active terracotta dot */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A44A29] animate-pulse" />
                  )}
                  <span>{item.label}</span>
                  {/* Underline growing from left to right */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#A44A29] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                      isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Desktop Assessment Button on the Right */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => handleLinkClick('quiz')}
              className={`group px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer border flex items-center gap-2 ${
                activeSection === 'quiz'
                  ? 'bg-[#8E3D20] text-white border-[#8E3D20] shadow-xs'
                  : 'bg-[#1B1715] hover:bg-[#8E3D20] text-white border-[#1B1715] hover:border-[#8E3D20]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              <span>Assessment</span>
            </button>
          </div>

          {/* Mobile MENU toggle button - min 44px touch target */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] px-2.5 py-1.5 text-[#443B34] hover:text-[#1B1715] cursor-pointer flex items-center gap-1.5 border border-[#DDD3C2] bg-[#FAF8F5] active:bg-[#EDE5D8] transition-colors focus-visible:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-[#8E3D20]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8E3D20]">CLOSE</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-[#1B1715]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B1715]">MENU</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Smooth slide & fade, large touch targets min 48px, zero horizontal push) */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden w-full border-b border-[#DDD3C2] bg-[#F8F5EE] shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 divide-y divide-[#EDE5D8]">
            <div className="text-[11px] font-mono text-[#8C7F72] py-1.5 uppercase tracking-wider flex items-center justify-between">
              <span>Curriculum Navigation</span>
              <span className="text-[#8E3D20]">Class 11 Geography</span>
            </div>

            <nav className="py-2 space-y-1" aria-label="Mobile Navigation">
              {mobileNavItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                const isAssessment = item.id === 'quiz';

                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`w-full min-h-[46px] px-3.5 py-2.5 text-left text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer border ${
                      isAssessment
                        ? isActive
                          ? 'bg-[#8E3D20] text-white border-[#8E3D20] font-bold'
                          : 'bg-[#1B1715] text-white border-[#1B1715] hover:bg-[#8E3D20] font-semibold'
                        : isActive
                        ? 'bg-[#EAE3D6] text-[#8E3D20] font-bold border-[#DDD3C2]'
                        : 'bg-transparent text-[#2C2622] hover:bg-[#F3EFE7] border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-mono ${isAssessment ? 'text-white/70' : isActive ? 'text-[#8E3D20]' : 'text-[#8C7F72]'}`}>
                        0{idx + 1}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {isActive && (
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${isAssessment ? 'text-white' : 'text-[#8E3D20]'}`}>
                        ● Current
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
