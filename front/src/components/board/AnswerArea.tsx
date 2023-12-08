'use client';

import { useQuestion } from '@/hooks/question';
import AnswerForm from './AnswerForm';
import { Answer } from '@/model/answer';
import AnswerItem from './AnswerItem';
import { DetailProps } from './QuestionDetail';

export default function AnswerArea({ id, user }: DetailProps) {
  const { question, isLoading, isError, error } = useQuestion(id);

  if (isLoading) {
    return <></>;
  }

  if (!question) {
    return <></>;
  }

  return (
    <div className='flex flex-col gap-8 p-4 my-12 h-ull'>
      <div className='flex flex-col gap-3'>
        <h1 className='px-2'>답변 {question.answerList.length} 개</h1>
        <AnswerForm id={id} user={user} />
      </div>
      <ul className='bg-white h-full flex flex-col justify-center'>
        {question.answerList.map((answer: Answer) => (
          <AnswerItem key={answer.id} answer={answer} user={user} />
        ))}
      </ul>
    </div>
  );
}
