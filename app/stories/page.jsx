import PageHeader from '@/components/layout/PageHeader';
import StoryCard from '@/components/stories/StoryCard';
import Reveal from '@/components/ui/Reveal';
import { stories } from '@/data/stories';
import styles from './stories.module.css';

export const metadata = {
  title: 'Stories',
  description: 'Festivals, folk deities and village tales from Kumaon.',
};

export default function StoriesPage() {
  return (
    <>
      <PageHeader
        tag="Stories"
        deva="कथा"
        title={
          <>
            Tales from <span className="serif">the hills.</span>
          </>
        }
        lede="Festivals, folk deities and village tales. Each story carries a few words you can take with you."
        tone="earth"
        motif="himalaya"
      />
      <div className={`container ${styles.grid}`}>
        {stories.map((story, i) => (
          <Reveal key={story.slug} delay={(i % 2) * 120}>
            <StoryCard story={story} index={i} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
