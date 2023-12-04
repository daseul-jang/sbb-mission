import { Answer } from '@/model/answer';
import { getDate } from './BoardList';

export default function AnswerItem({ answer }: { answer: Answer }) {
  return (
    <li className='flex flex-col gap-1 px-3 py-6 border rounded-xl shadow-md mb-3 min-h-[70px]'>
      <div className='flex items-center gap-2'>
        <p className='text-center'>{answer.author.username}</p>
        <p className='text-xs text-center'>{getDate(answer.createDate)}</p>
      </div>
      <p>{answer.content}</p>
    </li>
  );
}
