import LearnDashboard from '@/components/learn/LearnDashboard';
import PageHeader from '@/components/layout/PageHeader';

export const metadata = {
  title: 'Learn',
  description: 'Short Kumaoni lessons: greetings, family and food.',
};

export default function LearnPage() {
  return (
    <>
      <PageHeader
        tag="Learn"
        deva="पाठ"
        title={
          <>
            Little lessons, <span className="serif">big hills.</span>
          </>
        }
        lede="Pick a stop on the trail. Each lesson takes about three minutes: a few word cards, then a quick check."
        tone="fire"
      />
      <LearnDashboard />
    </>
  );
}
