import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CVDropdown from '@/components/CVDropdown';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // If not on home page, navigate to home first.
    // Use Vite's BASE_URL so this works on GitHub Pages (/Portfolio/).
    const base = (import.meta as any).env?.BASE_URL || '/';
    const isOnHome = location.pathname === '/' || location.pathname === base;

    if (!isOnHome) {
      navigate(base);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'About', id: 'about', type: 'scroll' },
    { label: 'Skills', id: 'skills', type: 'scroll' },
    { label: 'Projects', id: 'projects', type: 'scroll' },
    { label: 'Experience', id: 'experience', type: 'scroll' },
    { label: 'Events', id: 'events', type: 'scroll' },
    { label: 'Contact', id: 'contact', type: 'scroll' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-xl font-bold font-mono text-primary hover:text-secondary transition-colors"
          >
            &lt;AK /&gt;
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.type === 'link' ? (
                <Link
                  key={item.id}
                  to={item.id}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </button>
              )
            )}
            <CVDropdown />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navItems.map((item) =>
              item.type === 'link' ? (
                <Link
                  key={item.id}
                  to={item.id}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                >
                  {item.label}
                </button>
              )
            )}
            <div className="px-4 pt-2">
              <CVDropdown />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
