import Link from 'next/link';
import Motif from '@/components/art/Motif';
import styles from './StoryCard.module.css';

const MOTIF_FOR = {
  saffron: 'diyo',
  marigold: 'aipan',
  umber: 'himalaya',
  sindoor: 'chowki',
};

// A story as a framed "poster" with a big Devanagari title.
export default function StoryCard({ story, index = 0 }) {
  return (
    <Link href={`/stories/${story.slug}`} className={`${styles.card} ${styles[story.palette]}`} style={{ '--i': index }}>
      <div className={styles.poster}>
        <Motif motif={MOTIF_FOR[story.palette] || 'aipan'} size={150} className={styles.motif} />
        <span className={`deva ${styles.deva}`}>{story.kumaoni}</span>
      </div>
      <div className={styles.text}>
        <span className={styles.kind}>
          {story.kind} · {story.season}
        </span>
        <h3 className={styles.title}>{story.title}</h3>
        <p className={styles.excerpt}>{story.excerpt}</p>
        <span className={styles.read}>Read the story →</span>
      </div>
    </Link>
  );
}
