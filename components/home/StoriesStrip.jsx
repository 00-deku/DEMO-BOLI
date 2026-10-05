import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SectionTag from '@/components/ui/SectionTag';
import StoryCard from '@/components/stories/StoryCard';
import { stories } from '@/data/stories';
import styles from './StoriesStrip.module.css';

export default function StoriesStrip() {
  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.headText}>
            <SectionTag number="06" deva="कथा">
              Stories
            </SectionTag>
            <h2 className={styles.title}>
              Words need <span className="serif">somewhere to live.</span>
            </h2>
          </div>
          <Button href="/stories" variant="ink">
            All stories
          </Button>
        </header>

        <div className={styles.grid}>
          {stories.slice(0, 3).map((story, i) => (
            <Reveal key={story.slug} delay={i * 120}>
              <StoryCard story={story} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
