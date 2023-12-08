import { useModifyAnswer } from '@/hooks/answer';
import { Answer } from '@/model/answer';
import { useState } from 'react';

interface Props {
  answer: Answer;
  modifyFalseHandler: () => void;
}

export default function AnswerEdit({ answer, modifyFalseHandler }: Props) {
  const [content, setContent] = useState(answer.content);
  const { submitModifyAnswer, isPending } = useModifyAnswer(
    {
      id: String(answer.id),
      content,
      setContent: setContent,
    },
    modifyFalseHandler
  );

  const modifySubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitModifyAnswer();
  };

  return (
    <form className='flex flex-col gap-2' onSubmit={modifySubmitHandler}>
      <textarea
        className='w-full resize-none rounded-md focus:outline-amber-300 p-4 text-sm border min-h-[100px]'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className='flex justify-end gap-2'>
        <button className='btn' onClick={modifyFalseHandler}>
          취소
        </button>
        <button className='btn'>수정</button>
      </div>
    </form>
  );
}
