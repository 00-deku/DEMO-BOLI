import Motif from '@/components/art/Motif';
import Button from '@/components/ui/Button';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <section className={styles.page}>
      <Motif motif="himalaya" size={140} className={styles.motif} />
      <h1 className={styles.title}>Lost on the trail</h1>
      <p>This path doesn&apos;t go anywhere yet. Let&apos;s head back to the village.</p>
      <Button href="/">Back home</Button>
    </section>
  );
}
