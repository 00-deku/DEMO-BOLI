'use client';

// One place to set up the animation libraries:
//  - GSAP + ScrollTrigger drive every scroll-linked (parallax) animation.
//  - Lenis smooths the native scroll so parallax feels buttery, not steppy.
// Lenis keeps the real browser scroll position, so window.scrollY,
// IntersectionObserver and the three.js scenes keep working unchanged.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Only animate when the user hasn't asked for reduced motion.
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

let lenis = null;
export const setLenis = (instance) => {
  lenis = instance;
};
export const getLenis = () => lenis;

export { gsap, ScrollTrigger, useGSAP };
