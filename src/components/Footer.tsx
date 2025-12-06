import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/stringuers', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/abdelmoemen-kilani-030756295/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:kilenimoemen2004@gmail.com', label: 'Email' },
  ];

  return (
    <>
      <footer className="relative z-10 bg-card/60 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-mono text-accent">
                  &lt;AK /&gt;
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Computer Engineering & IoT student passionate about building secure and innovative solutions.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="p-2 rounded-lg bg-background/50 border border-border hover:border-accent hover:text-accent transition-all duration-300 hover:scale-110"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
                <ul className="space-y-2">
                  {footerLinks.map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-foreground/70 hover:text-accent transition-colors duration-300 text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info */}
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
                <div className="space-y-3 text-foreground/70">
                  <p className="flex items-center gap-2">
                    <span className="text-2xl">🇹🇳</span>
                    <span>Based in Tunisia</span>
                  </p>
                  <p>Open to opportunities</p>
                  <p>Available for collaboration</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-foreground/60 text-sm font-mono">
                  moemen@portfolio:~$ Let's build something amazing!
                </p>
                <p className="text-foreground/60 text-sm">
                  © {new Date().getFullYear()} Abdelmoemen Kilani. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          variant="hero"
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-glow-primary z-50 hover:scale-110 transition-transform"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};

export default Footer;
