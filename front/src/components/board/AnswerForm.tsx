import { useState } from 'react';
import { useWriteAnswer } from '@/hooks/answer';
import Button from '../ui/button/Button';
import { useSession } from 'next-auth/react';
import { DetailProps } from './QuestionDetail';
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle';

export default function AnswerForm({ id, user }: DetailProps) {
  const [content, setContent] = useState('');
  const { submitAnswer, isPending } = useWriteAnswer({
    id: id,
    content: content,
    setContent: setContent,
  });

  if (isPending) {
    return <LoadingSpinnerCircle />;
  }
  const handlerSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAnswer();
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handlerSubmitAnswer}>
      <textarea
        className='resize-none rounded-md focus:outline-amber-300 p-4 text-sm border min-h-[100px]'
        value={content}
        placeholder={
          user ? '답변을 입력해 주세요.' : '로그인이 필요한 서비스입니다.'
        }
        {...(!user && { disabled: true })}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className='flex justify-end'>
        <button className='btn' {...(!user && { disabled: true })}>
          답변 등록
        </button>
      </div>
    </form>
  );
}
