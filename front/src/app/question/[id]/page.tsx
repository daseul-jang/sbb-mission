import AnswerArea from '@/components/AnswerArea';
import QuestionDetail from '@/components/QuestionDetail';
import DetailSection from '@/components/ui/DetailSection';

type Props = {
  params: {
    id: string;
  };
};

export default async function QuestionDetailPage({ params: { id } }: Props) {
  return (
    <section className='flex flex-col h-full'>
      <DetailSection sectionType='detail'>
        <QuestionDetail id={id} />
      </DetailSection>
      <DetailSection>
        <AnswerArea id={id} />
      </DetailSection>
    </section>
  );
}