/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useQuestion, useModifyQuestion } from '@/hooks/question';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle';
import { useSession } from 'next-auth/react';

export default function QuestionEdit() {
  const router = useRouter();
  const { id } = useParams();
  const { question, isError } = useQuestion(id as string);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [post, setPost] = useState({
    subject: question?.subject,
    content: question?.content,
  });
  const {
    submitModifyQuestion,
    isPending,
    isError: isEditError,
  } = useModifyQuestion(id as string, post);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!question || user?.username !== question.author.username) {
      alert('권한이 없습니다.');
      //router.replace(`/question/${id}`);
      router.back();
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [post.subject]);

  if (!question || user?.username !== question.author.username || isPending) {
    return <LoadingSpinnerCircle />;
  }

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleModifySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitModifyQuestion();

    if (isEditError) return;

    router.replace(`/question/${id}`);
  };

  return (
    <form
      className='p-5 flex flex-col justify-between gap-5 h-screen'
      onSubmit={handleModifySubmit}
    >
      <div className='flex flex-col basis-1/12 bg-white justify-center h-full rounded-md mt-3'>
        <textarea
          name='subject'
          ref={textareaRef}
          value={post.subject}
          onChange={handleOnChange}
          placeholder='제목을 입력하세요'
          className='resize-none text-3xl font-bold w-full focus:outline-none'
          rows={1}
        />
      </div>
      <div className='flex flex-col basis-9/12 py-5 border-t'>
        <textarea
          name='content'
          value={post.content}
          onChange={handleOnChange}
          placeholder='내용을 입력하세요'
          className='resize-none h-full text-xl focus:outline-none'
        />
      </div>
      <div className='flex flex-col basis-2/12'>
        <button className='btn'>수정하기</button>
      </div>
    </form>
  );
}
