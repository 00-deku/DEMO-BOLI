import HillsCanvas from '@/components/three/HillsCanvas';
import VillageScene from '@/components/art/VillageScene';
import Button from '@/components/ui/Button';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HillsCanvas />
      <div className={styles.village}>
        <VillageScene />
      </div>

      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>
          <span className="deva">पैलाग!</span> Hello, welcome to
        </p>
        <h1 className={styles.title}>
          <span className={styles.word}>Boli</span>
          <span className={`deva ${styles.deva}`} aria-hidden="true">
            बोलि
          </span>
        </h1>
        <p className={styles.lede}>
          Learn <strong>Kumaoni</strong>{' '}
          <span className="serif">the way it was always taught:</span> one word at a time, with a story and a
          grandfather who never runs out of either.
        </p>
        <div className={styles.actions}>
          <Button href="/learn" size="l">
            Start learning
          </Button>
          <Button href="/baujyu" variant="paper" size="l">
            Meet Baujyu
          </Button>
        </div>
      </div>

      <a href="#manifesto" className={styles.scroll} aria-label="Scroll to read more">
        <span />
      </a>
    </section>
  );
}
