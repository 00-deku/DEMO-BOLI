import AipanCanvas from '@/components/three/AipanCanvas';
import Button from '@/components/ui/Button';
import Parallax from '@/components/motion/Parallax';
import styles from './Opening.module.css';

// The first thing on the home page: one word, one button, a turning Aipan.
export default function Opening() {
  return (
    <section className={styles.section}>
      <AipanCanvas />
      <Parallax speed={-0.15} className={styles.layer}>
        <div className={`container ${styles.content}`}>
          <p className={styles.word}>
            <span className="deva">पैलाग</span>
            <span className={styles.gloss}>pailaag · a respectful hello</span>
          </p>
          <h1 className={styles.title}>
            Start with
            <br />
            one word.
          </h1>
          <p className={styles.lede}>Learn Kumaoni in three-minute lessons. No sign-up for the demo.</p>
          <div className={styles.actions}>
            <Button href="/learn/greet-elders" variant="paper" size="l">
              Take the first lesson
            </Button>
            <a href="#welcome" className={styles.explore}>
              Explore Boli ↓
            </a>
          </div>
        </div>
      </Parallax>
    </section>
  );
}
