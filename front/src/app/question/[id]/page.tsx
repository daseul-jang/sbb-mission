import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AnswerArea from '@/components/board/AnswerArea';
import QuestionDetail from '@/components/board/QuestionDetail';
import DetailSection from '@/components/ui/DetailSection';
import { getQuestionDetail } from '@/service/question';
import { cache } from 'react';
import Redirect from '@/components/exception/Redirect';

interface Props {
  params: {
    id: string;
  };
}

const getQuestion = cache(async (id: number) => await getQuestionDetail(id));

export default async function QuestionDetailPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const questionDetail = await getQuestion(Number(id));

  if (!questionDetail.objectData) {
    return <Redirect message='존재하지 않는 게시글입니다.' />;
  }

  return (
    <section className='flex flex-col h-full max-w-screen-md mx-auto'>
      <DetailSection sectionType='detail'>
        <QuestionDetail id={id} user={user} />
      </DetailSection>
      <DetailSection>
        <AnswerArea id={id} user={user} />
      </DetailSection>
    </section>
  );
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const { objectData } = await getQuestion(Number(id));

  return {
    title: `${objectData?.subject || ''}`,
    description: `${objectData?.subject || ''} | ${
      objectData?.content.substr(0, 10) || ''
    }`,
  };
}
