'use client';

import { useEffect, useRef } from 'react';
import { manifesto } from '@/data/site';
import SectionTag from '@/components/ui/SectionTag';
import styles from './Manifesto.module.css';

// Words light up one by one as the section scrolls past.
// We toggle a data attribute directly on each word instead of using React
// state, so scrolling never triggers a re-render.
export default function Manifesto() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  const words = manifesto.split(' ');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const view = window.innerHeight;
      // 0 when the section top hits 80% of the viewport, 1 near its end.
      const progress = Math.min(1, Math.max(0, (view * 0.8 - rect.top) / (rect.height * 0.75)));
      const lit = Math.round(progress * wordsRef.current.length);
      wordsRef.current.forEach((node, i) => {
        if (node) node.dataset.lit = i < lit ? 'true' : 'false';
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="manifesto" ref={sectionRef} className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <SectionTag number="01" deva="किलै" tone="paper">
          Why Boli
        </SectionTag>
        <p className={styles.text}>
          {words.map((word, i) => (
            <span
              key={i}
              ref={(node) => {
                wordsRef.current[i] = node;
              }}
              className={`${styles.word} ${/Kumaoni|Harela|Boli/.test(word) ? styles.accent : ''}`}
              data-lit="false"
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
