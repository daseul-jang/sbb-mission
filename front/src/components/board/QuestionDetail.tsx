'use client';

import { useDeleteQuestion, useQuestion } from '@/hooks/question';
import LoadingSpinner from '../ui/icon/LoadingSpinnerCircle';
import { getDate } from './BoardList';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
}

export default function QuestionDetail({ id }: Props) {
  const router = useRouter();
  const { question, isLoading, isError, error } = useQuestion(id);
  const { submitDeleteQuestion, isPending } = useDeleteQuestion(id);
  const { data: session } = useSession();
  const user = session?.user;
  console.log('퀘스쳔디테일');
  console.log(session);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>에러</div>;
  }

  const handleDeleteSubmit = () => {
    if (user?.username !== question.author.username) {
      alert('삭제 권한이 없습니다.');
      router.replace(`/`);
      return;
    }

    if (confirm('삭제하시겠어요?')) {
      submitDeleteQuestion();
      router.replace(`/`);
    }
  };

  return (
    <div className='flex flex-col p-4 lg:mt-6'>
      <div className='basis-1/4 flex flex-col gap-3 justify-center p-4 border-b border-gray-300'>
        <p className='text-3xl font-bold'>{question.subject}</p>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-2 px-1 text-sm text-gray-600'>
            <span>{question.author.username}</span>
            <span>·</span>
            <span>{getDate(question.createDate || '')}</span>
          </div>
          {user?.username === question.author.username && (
            <div className='flex flex-row gap-2 px-1 text-sm text-gray-600'>
              <Link
                href={`/question/${id}/modify`}
                className='hover:text-amber-500'
              >
                수정
              </Link>
              <span
                className='hover:text-amber-500 cursor-pointer'
                onClick={handleDeleteSubmit}
              >
                삭제
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='basis-3/4 flex flex-col p-5 h-full'>
        {question.content}
      </div>
    </div>
  );
}
