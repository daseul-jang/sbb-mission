import QuestionWrite from '@/components/board/QuestionWrite';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '질문하기',
  description: 'Add Question',
};

export default function WritePage() {
  return (
    <section className='max-w-screen-md mx-auto'>
      <QuestionWrite />
    </section>
  );
}
