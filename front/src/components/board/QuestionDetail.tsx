'use client';

import { useQuestion } from '@/hooks/question';
import LoadingSpinner from '../ui/icon/LoadingSpinnerCircle';
import { getDate } from './BoardList';
import Link from 'next/link';
import QuestionDetailView from './QuestionDetailView';
import { useState } from 'react';

interface Props {
  id: string;
}

export default function QuestionDetail({ id }: Props) {
  const { question, isLoading, isError, error } = useQuestion(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>에러</div>;
  }
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
          <div className='flex flex-row gap-2 px-1 text-sm text-gray-600'>
            <Link href={`/question/${id}/modify`}>수정</Link>
            <Link href={`#`}>삭제</Link>
          </div>
        </div>
      </div>
      <div className='basis-3/4 flex flex-col p-5 h-full'>
        {question.content}
      </div>
    </div>
  );
}
