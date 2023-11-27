import { Answer } from '@/model/answer';
import { getDate } from './BoardList';

export default function AnswerItem({ answer }: { answer: Answer }) {
  return (
    <li className='flex justify-between p-3 border-b'>
      <p>{answer.content}</p>
      <p className='text-xs'>{getDate(answer.createDate)}</p>
    </li>
  );
}
