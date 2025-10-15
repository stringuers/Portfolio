import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const keywords = ['Pentesting', 'AI/ML', 'IoT Security', 'React', 'DevOps', 'CTF Player'];

  useEffect(() => {
    const keyword = keywords[currentIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= keyword.length) {
        setTypedText(keyword.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          const eraseInterval = setInterval(() => {
            if (charIndex > 0) {
              charIndex--;
              setTypedText(keyword.slice(0, charIndex));
            } else {
              clearInterval(eraseInterval);
              setCurrentIndex((prev) => (prev + 1) % keywords.length);
            }
          }, 50);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(18, 24, 38, 0.85), rgba(18, 24, 38, 0.85)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="text-primary animate-glow">Abdelmoemen Kilani</span> 👋
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Computer Engineering & IoT Student | Passionate about{' '}
            <span className="text-secondary font-semibold">Cybersecurity</span>,{' '}
            <span className="text-secondary font-semibold">AI</span>, and{' '}
            <span className="text-secondary font-semibold">Full-Stack Development</span>
          </p>

          <div className="h-12 mb-8">
            <span className="text-2xl font-mono text-primary">
              &gt; {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollToSection('projects')}
            >
              View My Projects
            </Button>
            <Button
              variant="outline-glow"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </Button>
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
