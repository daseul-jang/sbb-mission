import { useState } from 'react';
import { Answer } from '@/model/answer';
import { AuthUser } from '@/model/user';
import { getDate } from './BoardList';
import AnswerEdit from './AnswerEdit';
import { useDeleteAnswer } from '@/hooks/answer';

interface Props {
  answer: Answer;
  user: AuthUser | undefined;
}

export default function AnswerItem({ answer, user }: Props) {
  const [isModify, setIsModify] = useState(false);
  const { submitDeleteAnswer } = useDeleteAnswer(String(answer.id));

  const modifyFalseHandler = () => {
    setIsModify(false);
  };

  const deleteHandler = () => {
    if (confirm('답변을 삭제하시겠어요?')) {
      submitDeleteAnswer();
    }
  };

  return (
    <li className='flex flex-col gap-2 p-5 border rounded-xl shadow-md mb-3 min-h-[70px]'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-1 py-1'>
          <span className='text-sm'>{answer.author.username}</span>
          <span>·</span>
          <span className='text-xs'>{getDate(answer.createDate)}</span>
        </div>
        {user?.username === answer.author.username && (
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            {!isModify && (
              <span
                className='hover:underline hover:text-amber-500 cursor-pointer'
                onClick={() => setIsModify(!isModify)}
              >
                수정
              </span>
            )}

            <span
              className='hover:underline hover:text-amber-500 cursor-pointer'
              onClick={deleteHandler}
            >
              삭제
            </span>
          </div>
        )}
      </div>
      {!isModify ? (
        <p className='text-sm' style={{ whiteSpace: 'pre-line' }}>
          {answer.content}
        </p>
      ) : (
        <AnswerEdit answer={answer} modifyFalseHandler={modifyFalseHandler} />
      )}
    </li>
  );
}
