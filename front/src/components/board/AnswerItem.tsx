import { Answer } from '@/model/answer';
import { getDate } from './BoardList';

export default function AnswerItem({ answer }: { answer: Answer }) {
  return (
    <li className='flex justify-between items-center p-3 border-b min-h-[70px]'>
      <p>{answer.content}</p>
      <p className='text-xs'>{getDate(answer.createDate)}</p>
    </li>
  );
}
