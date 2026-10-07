import { notFound } from 'next/navigation';
import LessonPlayer from '@/components/learn/LessonPlayer';
import { allLessons, getLesson, getNextLesson } from '@/data/lessons';

// Pre-render one page per lesson at build time.
export function generateStaticParams() {
  return allLessons.map((lesson) => ({ lessonId: lesson.id }));
}

// Next.js 15: route params arrive as a Promise.
export async function generateMetadata({ params }) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  return { title: lesson ? lesson.title : 'Lesson not found' };
}

export default async function LessonPage({ params }) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();
  const next = getNextLesson(lesson.id);
  return <LessonPlayer lesson={lesson} nextLesson={next ? { id: next.id, title: next.title } : null} />;
}
