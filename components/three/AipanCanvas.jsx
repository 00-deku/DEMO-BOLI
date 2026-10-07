'use client';

import useThreeScene from '@/hooks/useThreeScene';
import { buildAipan } from '@/lib/three/aipan';
import styles from './Canvas.module.css';

// A turning Aipan mandala. The scene itself lives in lib/three/aipan.js.
// `fit` keeps the whole mandala inside the canvas instead of bleeding out.
export default function AipanCanvas({ className = '', fit = false }) {
  const mountRef = useThreeScene((ctx) => buildAipan(ctx, { fit }));
  return <div ref={mountRef} className={`${styles.canvas} ${className}`} aria-hidden="true" />;
}
