import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

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

  return (
    <>
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold font-mono text-primary mb-4">&lt;AK /&gt;</h3>
                <p className="text-muted-foreground">
                  Computer Engineering & IoT student passionate about building secure and innovative solutions.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => {
                          const element = document.getElementById(item.toLowerCase());
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>Based in Tunisia 🇹🇳</p>
                  <p>Open to opportunities</p>
                  <p>Available for collaboration</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-muted-foreground text-sm font-mono">
                  moemen@portfolio:~$ Let's build something amazing!
                </p>
                <p className="text-muted-foreground text-sm">
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
          className="fixed bottom-8 right-8 rounded-full shadow-glow-primary z-50 animate-fade-in"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};

export default Footer;
