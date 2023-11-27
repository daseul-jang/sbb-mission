'use client';

import useQuestion from '@/hooks/question';
import AnswerForm from './AnswerForm';
import { Answer } from '@/model/answer';
import AnswerItem from './AnswerItem';

export default function AnswerArea({ id }: { id: string }) {
  const { question, isLoading, isError, error } = useQuestion(id);

  if (isLoading) {
    return <></>;
  }

  console.log(question.answerList);

  return (
    <div className='flex flex-col gap-10 p-4 my-12 h-ull'>
      <AnswerForm id={id} />
      <ul className='bg-white h-full flex flex-col justify-center'>
        {question.answerList.map((answer: Answer) => (
          <AnswerItem key={answer.id} answer={answer} />
        ))}
      </ul>
    </div>
  );
}
