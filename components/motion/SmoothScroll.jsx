'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, setLenis, getLenis } from '@/lib/motion';

// Turns on Lenis smooth scrolling for the whole site and drives it from
// GSAP's ticker, so ScrollTrigger and Lenis update on the same frame.
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      lerp: 0.09, // lower = floatier, higher = snappier
      wheelMultiplier: 1,
      anchors: true, // smooth-scroll to #links like "Explore Boli"
    });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // New page: jump to the top instantly and re-measure scroll triggers.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
