'use client';

import { useRef } from 'react';
import HillsCanvas from '@/components/three/HillsCanvas';
import VillageScene from '@/components/art/VillageScene';
import Button from '@/components/ui/Button';
import { gsap, MOTION_OK, useGSAP } from '@/lib/motion';
import styles from './Hero.module.css';

export default function Hero() {
  const root = useRef(null);

  // Layered parallax: as the hero scrolls away, the title lifts and fades
  // fastest, and the village layers sink at different speeds (see the
  // data-depth groups in VillageScene). The three.js mountains behind stay
  // still, so the village visibly moves against them.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrub = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };

        gsap.to('[data-hero-layer="title"]', { yPercent: -45, ease: 'none', scrollTrigger: scrub });
        gsap.to('[data-hero-layer="copy"]', { yPercent: -80, opacity: 0, ease: 'none', scrollTrigger: scrub });

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
        <div data-hero-layer="title" className={styles.titleBlock}>
          <p className={styles.eyebrow}>
            Welcome to
          </p>
          <h2 className={styles.title}>
            <span className={styles.word}>Boli</span>
          </h2>
        </div>
        <div data-hero-layer="copy" className={styles.copyBlock}>
          <p className={styles.lede}>
            Learn <strong>Kumaoni</strong>{' '}
            <span className="serif">the way it was always taught:</span> one word at a time, with a story and a
            grandfather who never runs out of either.
          </p>
          <div className={styles.actions}>
            <Button href="/learn" size="l">
              See the lessons
            </Button>
            <Button href="/baujyu" variant="paper" size="l">
              Meet Baujyu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
