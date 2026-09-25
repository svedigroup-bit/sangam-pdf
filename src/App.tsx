import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WindActionSimulator } from './components/WindActionSimulator';
import { ErosionalLandforms } from './components/ErosionalLandforms';
import { DepositionalLandforms } from './components/DepositionalLandforms';
import { FieldAtlas } from './components/FieldAtlas';
import { InteractiveMap } from './components/InteractiveMap';
import { QuickRevision } from './components/QuickRevision';
import { Quiz } from './components/Quiz';
import { Footer } from './components/Footer';
import { LandformModal } from './components/LandformModal';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { ScrollReveal, SectionDivider } from './components/ScrollReveal';
import {
  LandformDetail,
  EROSIONAL_LANDFORMS,
  DEPOSITIONAL_LANDFORMS,
} from './data/geographyData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedLandform, setSelectedLandform] = useState<LandformDetail | null>(null);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      const topOffset = elem.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Open modal by landform ID (used by case study clicks)
  const handleSelectLandformById = (id: string) => {
    const found =
      EROSIONAL_LANDFORMS.find((l) => l.id === id) ||
      DEPOSITIONAL_LANDFORMS.find((l) => l.id === id);
    if (found) {
      setSelectedLandform(found);
    }
  };

  // Active section spy on scroll
  useEffect(() => {
    const sections = [
      'hero',
      'wind-action',
      'erosional-features',
      'depositional-features',
      'field-atlas',
      'quick-revision',
      'quiz',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        if (id === 'hero') {
          if (window.scrollY < 300) {
            setActiveSection('hero');
            break;
          }
        } else {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPos) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EE] text-[#1B1715] w-full overflow-x-hidden">
      {/* Editorial Scroll Reading Progress Indicator (Thin Terracotta Line) */}
      <ReadingProgressBar />

      {/* Sticky Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section (Self-contained cinematic entrance sequence) */}
        <Hero
          onStartLearning={() => handleNavigate('wind-action')}
          onExploreLandforms={() => handleNavigate('field-atlas')}
        />

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionDivider className="my-0" />
        </div>

        {/* 2. Wind Action Conditions, Sediment Transport Sandbox & Processes */}
        <ScrollReveal yOffset={35} threshold={0.08}>
          <WindActionSimulator />
        </ScrollReveal>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionDivider className="my-0" />
        </div>

        {/* 3. Erosional Landforms (Mushroom rock blast zone, Yardangs, Ventifacts, Deflation) */}
        <ScrollReveal yOffset={35} threshold={0.08}>
          <ErosionalLandforms onSelectLandform={(l) => setSelectedLandform(l)} />
        </ScrollReveal>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionDivider className="my-0" />
        </div>

        {/* 4. Depositional Landforms (Sand dunes, Barchans, Loess Plains) */}
        <ScrollReveal yOffset={35} threshold={0.08}>
          <DepositionalLandforms onSelectLandform={(l) => setSelectedLandform(l)} />
        </ScrollReveal>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionDivider className="my-0" />
        </div>

        {/* 5. Field Atlas - Interactive Museum Field Guide Explorer (All 7 Landforms) */}
        <ScrollReveal yOffset={35} threshold={0.08}>
          <FieldAtlas onSelectLandform={(l) => setSelectedLandform(l)} />
        </ScrollReveal>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionDivider className="my-0" />
        </div>

        {/* 6. Cartographic Atlas of Real-World Field Localities from PDF */}
        <ScrollReveal yOffset={35} threshold={0.08}>
          <InteractiveMap onSelectLandformById={handleSelectLandformById} />
        </ScrollReveal>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionDivider className="my-0" />
        </div>

        {/* 7. Quick Revision & Slide 3 Master Table & Flashcards */}
        <ScrollReveal yOffset={35} threshold={0.08}>
          <QuickRevision />
        </ScrollReveal>

        {/* Section Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionDivider className="my-0" />
        </div>

        {/* 8. Class 11 Examination Benchmark Assessment */}
        <ScrollReveal yOffset={35} threshold={0.08}>
          <Quiz />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Detailed Landform Exploration Modal */}
      <LandformModal
        landform={selectedLandform}
        onClose={() => setSelectedLandform(null)}
        onSelectAnother={handleSelectLandformById}
      />
    </div>
  );
}
