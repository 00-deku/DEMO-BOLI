'use client';

import { useRef } from 'react';
import { ScrollTrigger, useGSAP } from '@/lib/motion';
import { manifesto } from '@/data/site';
import SectionTag from '@/components/ui/SectionTag';
import styles from './Manifesto.module.css';

// Words light up one by one as the section scrolls past.
// A GSAP ScrollTrigger reports progress; we toggle a data attribute on each
// word directly instead of using React state, so scrolling never re-renders.
export default function Manifesto() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  const words = manifesto.split(' ');

  useGSAP(
    () => {
      const light = (progress) => {
        const lit = Math.round(progress * wordsRef.current.length);
        wordsRef.current.forEach((node, i) => {
          if (node) node.dataset.lit = i < lit ? 'true' : 'false';
        });
      };
      // Progress runs from the section top at 80% of the viewport
      // to three quarters of the way through the section.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: '75% bottom',
        onUpdate: (self) => light(self.progress),
        onRefresh: (self) => light(self.progress),
      });
    },
    { scope: sectionRef },
  );

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
