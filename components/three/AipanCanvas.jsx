'use client';

import useThreeScene from '@/hooks/useThreeScene';
import { buildAipan } from '@/lib/three/aipan';
import styles from './Canvas.module.css';

// A turning Aipan mandala. The scene itself lives in lib/three/aipan.js.
export default function AipanCanvas({ className = '' }) {
  const mountRef = useThreeScene(buildAipan);
  return <div ref={mountRef} className={`${styles.canvas} ${className}`} aria-hidden="true" />;
}
