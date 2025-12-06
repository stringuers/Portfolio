import { lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import InteractiveShowcase from '@/components/InteractiveShowcase';
import Experience from '@/components/Experience';
import Learning from '@/components/Learning';
import EventsSection from './Events';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import BackgroundParticles from '@/components/ui/BackgroundParticles';
import Background3DPhoto from '@/components/ui/Background3DPhoto';
import ScrollProgress from '@/components/ui/ScrollProgress';
import QuickNav from '@/components/ui/QuickNav';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Testimonials from '@/components/Testimonials';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import AccessibilityHelper from '@/components/ui/AccessibilityHelper';
import { SectionSkeleton } from '@/components/ui/LoadingSkeleton';

const Index = () => {
  return (
    <ErrorBoundary>
      <AccessibilityHelper />
      <div className="relative w-full min-h-screen bg-premium">
        <CustomCursor />
        <Background3DPhoto 
          imageUrl="/images/hero-bg.jpg"
          intensity={25}
          opacity={0.2}
          blur={3}
        />
        <BackgroundParticles />
        <ScrollProgress />
        <QuickNav />
        <Navigation />
        <main id="main-content" className="relative z-10 w-full" role="main">
          <Suspense fallback={<SectionSkeleton />}>
            <Hero />
            <About />
            <InteractiveShowcase />
            <Skills />
            <Projects />
            <Experience />
            <Learning />
            <EventsSection />
            <Testimonials />
            <Contact />
          </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
