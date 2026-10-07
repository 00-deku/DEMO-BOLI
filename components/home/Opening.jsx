import AipanCanvas from '@/components/three/AipanCanvas';
import Button from '@/components/ui/Button';
import Parallax from '@/components/motion/Parallax';
import styles from './Opening.module.css';

// The first thing on the home page: one word, one button, a turning Aipan.
// Its red-ochre ground fades at the bottom into the hero's sky.
export default function Opening() {
  return (
    <section className={styles.section}>
      <AipanCanvas />
      <Parallax speed={-0.15} className={styles.layer}>
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
      </Parallax>
    </section>
  );
}
