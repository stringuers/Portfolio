import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ChevronDown, Code2, Shield, Brain, ArrowRight } from 'lucide-react';
import CVDropdown from '@/components/CVDropdown';

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
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Small accent line */}
              <div className="w-16 h-0.5 bg-accent mb-4" />
              
              {/* Main heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="block text-foreground mb-2">I'm Abdelmoemen,</span>
                <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  a Full-Stack Developer
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-xl">
                Building secure systems and robust applications at the intersection of{' '}
                <span className="text-accent font-semibold">cybersecurity</span>,{' '}
                <span className="text-accent font-semibold">AI/ML</span>, and{' '}
                <span className="text-accent font-semibold">full-stack engineering</span>.
              </p>

              {/* Typing animation */}
              <div className="flex items-center gap-3 py-4">
                <span className="text-2xl font-mono font-semibold text-accent">
                  &gt; {typedText}
                  <span className="animate-pulse ml-1">|</span>
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-6 text-base font-semibold gpu-accelerated"
                >
                  View Projects
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-6 text-base font-semibold border-2 hover:bg-accent/10 hover:border-accent transition-all duration-200 gpu-accelerated"
                >
                  Contact Me
                </Button>
                <CVDropdown 
                  enUrl="/cv/Cv_English.pdf" 
                  frUrl="/cv/cv.pdf"
                  videoUrl={undefined}
                />
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-6 pt-4">
                <span className="text-sm text-foreground/60 font-medium">Follow me:</span>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: 'https://github.com/stringuers', label: 'GitHub' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/abdelmoemen-kilani-030756295/', label: 'LinkedIn' },
                    { icon: Mail, href: 'mailto:kilenimoemen2004@gmail.com', label: 'Email' },
                  ].map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="p-2 rounded-lg bg-card/60 border border-border hover:border-accent hover:text-accent transition-all duration-300 hover:scale-110"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Visual Elements */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main visual container */}
                <div className="relative p-8 bg-card/40 backdrop-blur-sm border border-border rounded-2xl">
                  {/* Tech icons floating */}
                  <div className="absolute -top-4 -right-4 p-4 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-xl">
                    <Code2 className="w-8 h-8 text-accent animate-float" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 p-4 bg-primary/30 backdrop-blur-sm border border-primary/40 rounded-xl">
                    <Shield className="w-8 h-8 text-primary animate-float" style={{ animationDelay: '1s' }} />
                  </div>
                  
                  {/* Center content */}
                  <div className="text-center space-y-6 py-12">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border-2 border-accent/30 mb-4">
                      <Brain className="w-16 h-16 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">Computer Engineering</h3>
                      <p className="text-foreground/70">IoT & Security Specialist</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -z-10 top-8 left-8 w-full h-full bg-accent/5 rounded-2xl border border-accent/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/60 hover:text-accent transition-colors group z-10"
        aria-label="Scroll to about section"
      >
        <div className="flex flex-col items-center gap-2">
          <ChevronDown className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform" />
          <span className="text-xs font-mono opacity-70">Scroll</span>
        </div>
      </button>
    </section>
  );
};

export default Hero;
