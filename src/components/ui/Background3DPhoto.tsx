import { useEffect, useState, useRef } from 'react';

interface Background3DPhotoProps {
  imageUrl?: string;
  intensity?: number;
  opacity?: number;
  blur?: number;
}

const Background3DPhoto = ({ 
  imageUrl = '/images/hero-bg.jpg', // Path to your photo (can be in /public/images/ or /src/assets/)
  intensity = 25,
  opacity = 0.2,
  blur = 3
}: Background3DPhotoProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      targetX = ((e.clientX - centerX) / rect.width) * intensity;
      targetY = ((e.clientY - centerY) / rect.height) * intensity;
    };

    const animate = () => {
      // Smooth interpolation for better performance
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      
      setMousePosition({ x: currentX, y: currentY });
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Main 3D Photo Layer */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) 
                     rotateX(${-mousePosition.y * 0.15}deg) 
                     rotateY(${mousePosition.x * 0.15}deg) 
                     scale(${isHovering ? 1.08 : 1})`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
            opacity: opacity,
            filter: `blur(${blur}px) brightness(0.6) contrast(1.1)`,
            transform: 'translateZ(0)',
            backgroundSize: 'cover',
          }}
        />
      </div>

      {/* Depth Layer 1 - Behind main */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px, -150px) 
                     rotateX(${-mousePosition.y * 0.08}deg) 
                     rotateY(${mousePosition.x * 0.08}deg) 
                     scale(1.15)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
            opacity: opacity * 0.4,
            filter: `blur(${blur + 2}px) brightness(0.4)`,
            transform: 'translateZ(-80px)',
            backgroundSize: 'cover',
          }}
        />
      </div>

      {/* Depth Layer 2 - Front (subtle) */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-400 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px, 50px) 
                     rotateX(${-mousePosition.y * 0.05}deg) 
                     rotateY(${mousePosition.x * 0.05}deg) 
                     scale(0.95)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
            opacity: opacity * 0.3,
            filter: `blur(${blur - 1}px) brightness(0.8)`,
            transform: 'translateZ(30px)',
            backgroundSize: 'cover',
          }}
        />
      </div>

      {/* Gradient overlay to blend with design */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            hsl(var(--background) / 0.3) 40%,
            hsl(var(--background) / 0.7) 70%,
            hsl(var(--background)) 100%
          )`,
        }}
      />

      {/* Additional overlay for better integration */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            135deg,
            hsl(var(--background) / 0.4) 0%,
            transparent 30%,
            transparent 70%,
            hsl(var(--background) / 0.4) 100%
          )`,
        }}
      />
    </div>
  );
};

export default Background3DPhoto;
