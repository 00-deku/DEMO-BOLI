import { notFound } from 'next/navigation';
import LessonPlayer from '@/components/learn/LessonPlayer';
import { allLessons, getLesson, getNextLesson } from '@/data/lessons';

// Pre-render one page per lesson at build time.
export function generateStaticParams() {
  return allLessons.map((lesson) => ({ lessonId: lesson.id }));
}

export function generateMetadata({ params }) {
  const lesson = getLesson(params.lessonId);
  return { title: lesson ? lesson.title : 'Lesson not found' };
}

export default function LessonPage({ params }) {
  const lesson = getLesson(params.lessonId);
  if (!lesson) notFound();
  const next = getNextLesson(lesson.id);
  return <LessonPlayer lesson={lesson} nextLesson={next ? { id: next.id, title: next.title } : null} />;
}
