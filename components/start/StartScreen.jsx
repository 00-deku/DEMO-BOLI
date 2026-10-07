import AipanCanvas from '@/components/three/AipanCanvas';
import Wordmark from '@/components/art/Wordmark';
import Button from '@/components/ui/Button';
import styles from './StartScreen.module.css';

// The first screen of the site. Two Aipan wheels roll in from the left and
// right edges (only half of each is on screen), then the BOLI wordmark and
// two buttons appear between them. The footer from the layout follows below.
//
// "I already have an account" opens the learner dashboard for now: there are
// no accounts yet, progress is saved in this browser.
export default function StartScreen() {
  return (
    <section className={styles.screen}>
      <div className={`${styles.wheel} ${styles.left}`} aria-hidden="true">
        <AipanCanvas fit />
      </div>
      <div className={`${styles.wheel} ${styles.right}`} aria-hidden="true">
        <AipanCanvas fit />
      </div>

      <div className={styles.center}>
        <h1 className={styles.logo}>
          <Wordmark outlined />
        </h1>
        <div className={styles.actions}>
          <Button href="/home" variant="paper" size="l">
            Get started
          </Button>
          <Button href="/learn" variant="ink" size="l">
            I already have an account
          </Button>
        </div>
      </div>
    </section>
  );
}
