import AipanCanvas from '@/components/three/AipanCanvas';
import Button from '@/components/ui/Button';
import Parallax from '@/components/motion/Parallax';
import styles from './Opening.module.css';

// The opening's text block. Exported on its own because the start screen
// renders an invisible copy to measure how tall this section will be, and
// so how big its mandala will be drawn.
export function OpeningText() {
  return (
    <div className={`container ${styles.content}`}>
      <p className={`deva ${styles.word}`}>पैलाग</p>
      <h1 className={styles.title}>
        Start with
        <br />
        one word.
      </h1>
      <p className={styles.lede}>Learn BOLI in three-minute lessons. No sign-up for the demo.</p>
      <div className={styles.cta}>
        <Button href="/learn/greet-elders" variant="paper" size="l">
          Take the first lesson
        </Button>
      </div>
    </div>
  );
}

// The first thing on the home page: one word, one button, a turning Aipan.
// Its red-ochre ground fades at the bottom into the hero's sky.
export default function Opening() {
  return (
    <section className={styles.section}>
      <div className={styles.mandala} data-opening-mandala>
        <AipanCanvas />
      </div>
      <Parallax speed={-0.15} className={styles.layer}>
        <OpeningText />
      </Parallax>
    </section>
  );
}
