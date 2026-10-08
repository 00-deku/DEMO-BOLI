'use client';

import { useRef } from 'react';
import HillsCanvas from '@/components/three/HillsCanvas';
import VillageScene from '@/components/art/VillageScene';
import Wordmark from '@/components/art/Wordmark';
import { gsap, MOTION_OK, useGSAP } from '@/lib/motion';
import styles from './Hero.module.css';

export default function Hero() {
  const root = useRef(null);

  // Layered parallax: as the hero scrolls away, the BOLI title lifts
  // fastest, and the village layers sink at different speeds (see the
  // data-depth groups in VillageScene). The three.js mountains behind stay
  // still, so the village visibly moves against them.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrub = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };

        gsap.to('[data-hero-layer="title"]', { yPercent: -45, ease: 'none', scrollTrigger: scrub });

        gsap.utils.toArray('[data-depth]').forEach((layer) => {
          const depth = Number(layer.dataset.depth);
          gsap.to(layer, { y: depth * 260, ease: 'none', scrollTrigger: scrub });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="welcome" className={styles.hero}>
      <HillsCanvas />
      <div className={styles.village}>
        <VillageScene />
      </div>

      <div className={`container ${styles.content}`}>
        {/* BOLI with a thin white outline: the single highlight of the hero */}
        <h2 data-hero-layer="title" className={styles.titleBlock}>
          <Wordmark outlined="light" className={styles.word} />
        </h2>
      </div>
    </section>
  );
}
