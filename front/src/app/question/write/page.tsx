import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import QuestionWrite from '@/components/board/QuestionWrite';
import Redirect from '@/components/exception/Redirect';

export const metadata: Metadata = {
  title: '질문하기',
  description: 'Add Question',
};

export default async function WritePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session) {
    return <Redirect message='로그인이 필요한 서비스입니다.' />;
  }

  return (
    <section className='max-w-screen-md mx-auto'>
      <QuestionWrite />
    </section>
  );
}
