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
import DynamicBackground from '@/components/ui/DynamicBackground';

const Index = () => {
  return (
    <div className="relative">
      <DynamicBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <InteractiveShowcase />
        <Skills />
        <Projects />
        <Experience />
        <Learning />
        <EventsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
