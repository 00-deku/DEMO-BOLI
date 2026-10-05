import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import Manifesto from '@/components/home/Manifesto';
import Features from '@/components/home/Features';
import BaujyuIntro from '@/components/home/BaujyuIntro';
import LessonTrail from '@/components/home/LessonTrail';
import BadgeShelf from '@/components/home/BadgeShelf';
import StoriesStrip from '@/components/home/StoriesStrip';
import FinalCta from '@/components/home/FinalCta';
import AipanBorder from '@/components/art/AipanBorder';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Features />
      <AipanBorder id="home-1" tone="geru" />
      <BaujyuIntro />
      <LessonTrail />
      <BadgeShelf />
      <Marquee tone="ink" reverse />
      <StoriesStrip />
      <FinalCta />
    </>
  );
}
