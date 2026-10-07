import Link from 'next/link';
import { notFound } from 'next/navigation';
import AipanBorder from '@/components/art/AipanBorder';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { getStory, stories } from '@/data/stories';
import styles from './story.module.css';

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

// Next.js 15: route params arrive as a Promise.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = getStory(slug);
  return story ? { title: story.title, description: story.excerpt } : { title: 'Story not found' };
}

const TONE_FOR = { saffron: 'fire', marigold: 'fire', umber: 'earth', sindoor: 'geru' };

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  const others = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <article>
      <PageHeader
        tag={`${story.kind} · ${story.season}`}
        deva={story.kumaoni}
        title={story.title}
        lede={story.excerpt}
        tone={TONE_FOR[story.palette] || 'fire'}
      />

      <div className={`container ${styles.layout}`}>
        <div className={styles.body}>
          {story.body.map((paragraph, i) => (
            <p key={i} className={i === 0 ? styles.first : undefined}>
              {paragraph}
            </p>
          ))}
          <p className={styles.note}>Retold for the Boli prototype. To be reviewed with community storytellers.</p>
        </div>

        <aside className={styles.words} aria-label="Words from this story">
          <h2 className={styles.wordsTitle}>Words to keep</h2>
          <ul>
            {story.words.map((word) => (
              <li key={word.roman}>
                <span className="deva">{word.deva}</span>
                <strong>{word.roman}</strong>
                <span>{word.meaning}</span>
              </li>
            ))}
          </ul>
          <Button href="/learn" size="s">
            Practise words
          </Button>
        </aside>
      </div>

      <AipanBorder id="story" tone="ink" />

      <nav className={`container ${styles.more}`} aria-label="More stories">
        <p className={styles.moreLabel}>More stories</p>
        <div className={styles.moreList}>
          {others.map((s) => (
            <Link key={s.slug} href={`/stories/${s.slug}`} className={styles.moreLink}>
              <span className="deva">{s.kumaoni}</span>
              <span>{s.title}</span>
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
