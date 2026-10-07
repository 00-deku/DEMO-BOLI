import Opening from '@/components/home/Opening';
import Hero from '@/components/home/Hero';
import Manifesto from '@/components/home/Manifesto';
import Features from '@/components/home/Features';
import BaujyuIntro from '@/components/home/BaujyuIntro';
import LessonTrail from '@/components/home/LessonTrail';
import BadgeShelf from '@/components/home/BadgeShelf';
import StoriesStrip from '@/components/home/StoriesStrip';
import AipanBorder from '@/components/art/AipanBorder';

export const metadata = { title: 'Home' };

// Home page, top to bottom: one word to start, then the world of Boli.
export default function HomePage() {
  return (
    <>
      <Opening />
      <Hero />
      <Manifesto />
      <Features />
      <AipanBorder id="home-1" tone="geru" />
      <BaujyuIntro />
      <LessonTrail />
      <BadgeShelf />
      <StoriesStrip />
    </>
  );
}
