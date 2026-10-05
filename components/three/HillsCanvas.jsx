'use client';

import useThreeScene from '@/hooks/useThreeScene';
import { buildHills } from '@/lib/three/hills';
import styles from './Canvas.module.css';

// Layered Himalayan ridges at dusk. The scene itself lives in lib/three/hills.js.
export default function HillsCanvas({ className = '' }) {
  const mountRef = useThreeScene(buildHills);
  return <div ref={mountRef} className={`${styles.canvas} ${className}`} aria-hidden="true" />;
}
