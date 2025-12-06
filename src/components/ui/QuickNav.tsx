import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuickNav = () => {
  const [currentSection, setCurrentSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
      
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNext = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    const nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
    scrollToSection(sections[nextIndex].id);
  };

  const scrollToPrev = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    scrollToSection(sections[prevIndex].id);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col items-center gap-2 bg-card/80 backdrop-blur-md border border-border rounded-full p-2 shadow-lg">
        {/* Previous button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToPrev}
          className="h-8 w-8 rounded-full hover:bg-accent/10 hover:text-accent transition-all"
          aria-label="Previous section"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>

        {/* Section indicators */}
        <div className="flex flex-col gap-2 py-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative w-2 h-8 rounded-full transition-all duration-300 ${
                currentSection === section.id
                  ? 'bg-accent w-2'
                  : 'bg-foreground/20 hover:bg-foreground/40 w-1.5'
              }`}
              aria-label={section.label}
            />
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToNext}
          className="h-8 w-8 rounded-full hover:bg-accent/10 hover:text-accent transition-all"
          aria-label="Next section"
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuickNav;

