import { useState } from 'react';
import useAnswer from '@/hooks/answer';
import Button from './ui/button/Button';

export default function AnswerForm({ id }: { id: string }) {
  const [content, setContent] = useState('');
  const { submitAnswer, isPending } = useAnswer({
    id: Number(id),
    content: content,
    setContent: setContent,
  });

  const handlerSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAnswer();
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handlerSubmitAnswer}>
      <textarea
        className='resize-none rounded-md focus:outline-amber-300 p-4 text-sm border min-h-[100px]'
        value={content}
        placeholder='답글을 입력해 주세요.'
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className='flex justify-end'>
        <Button>댓글 등록</Button>
      </div>
    </form>
  );
}
