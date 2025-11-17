import { useEffect, useState } from 'react';
import DepthParticleField from './DepthParticleField';

/**
 * DynamicBackground
 * - Uses a canvas-based depth particle field with multi-layer parallax and cinematic depth.
 *   Intensity (calm/normal/intense) is synchronized from Navigation via localStorage
 *   and custom events.
 */
export default function DynamicBackground() {
  const [intensity, setIntensity] = useState<'calm' | 'normal' | 'intense'>('normal');

  useEffect(() => {
    // Read initial intensity from localStorage
    const stored = localStorage.getItem('bgIntensity');
    if (stored === 'calm' || stored === 'normal' || stored === 'intense') {
      setIntensity(stored);
    }

    // Listen for intensity changes from Navigation
    const handleIntensityChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newIntensity = customEvent.detail?.intensity;
      if (newIntensity === 'calm' || newIntensity === 'normal' || newIntensity === 'intense') {
        setIntensity(newIntensity);
      }
    };

    window.addEventListener('bg-intensity-changed', handleIntensityChange);
    return () => window.removeEventListener('bg-intensity-changed', handleIntensityChange);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <DepthParticleField intensity={intensity} />
    </div>
  );
}
