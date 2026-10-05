import AipanCanvas from '@/components/three/AipanCanvas';
import Button from '@/components/ui/Button';
import styles from './FinalCta.module.css';

export default function FinalCta() {
  return (
    <section className={styles.section}>
      <AipanCanvas />
      <div className={`container ${styles.content}`}>
        <p className={`deva ${styles.deva}`}>पैलाग</p>
        <h2 className={styles.title}>
          Start with
          <br />
          one word.
        </h2>
        <p className={styles.lede}>Three minutes. No sign-up for the demo. Baujyu is waiting at the gate.</p>
        <Button href="/learn/greet-elders" variant="paper" size="l">
          Take the first lesson
        </Button>
      </div>
    </section>
  );
}
