import Link from 'next/link';
import { getDate } from './BoardList';
import { Question } from '@/model/question';

export default function QuestionDetailView({
  question,
}: {
  question: Question;
}) {
  return (
    <>
      <div className='basis-1/4 flex flex-col gap-3 justify-center p-4 border-b border-gray-300'>
        <p className='text-3xl font-bold'>{question.subject}</p>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-2 px-1 text-sm text-gray-600'>
            <span>{question.author.username}</span>
            <span>·</span>
            <span>{getDate(question.createDate || '')}</span>
          </div>
          <div className='flex flex-row gap-2 px-1 text-sm text-gray-600'>
            <Link href={`#`}>수정</Link>
            <Link href={`#`}>삭제</Link>
          </div>
        </div>
      </div>
      <div className='basis-3/4 flex flex-col p-5 h-full'>
        {question.content}
      </div>
    </>
  );
}
