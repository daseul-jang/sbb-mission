import AnswerArea from '@/components/board/AnswerArea';
import QuestionDetail from '@/components/board/QuestionDetail';
import DetailSection from '@/components/ui/DetailSection';
import { getQuestionDetail } from '@/service/question';
import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

export default async function QuestionDetailPage({ params: { id } }: Props) {
  return (
    <section className='flex flex-col h-full max-w-screen-md mx-auto'>
      <DetailSection sectionType='detail'>
        <QuestionDetail id={id} />
      </DetailSection>
      <DetailSection>
        <AnswerArea id={id} />
      </DetailSection>
    </section>
  );
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const data = await getQuestionDetail(Number(id));
  console.log(data);

  return {
    title: `${data.subject}`,
    description: `${data.subject} | ${data.content.substr(0, 10)}`,
  };
}
