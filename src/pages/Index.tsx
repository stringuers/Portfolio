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

const Index = () => {
  return (
    <div className="relative w-full min-h-screen bg-premium">
      <CustomCursor />
      <Background3DPhoto 
        imageUrl="/images/hero-bg.jpg" // You can change this to your photo path
        intensity={25} // Adjust parallax intensity (0-50)
        opacity={0.2} // Adjust photo opacity (0-1)
        blur={3} // Adjust blur amount (0-10)
      />
      <BackgroundParticles />
      <ScrollProgress />
      <QuickNav />
      <Navigation />
      <main className="relative z-10 w-full">
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
