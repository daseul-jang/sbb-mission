'use client';

import { useWriteQuestion } from '@/hooks/question';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function QuestionWrite() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [post, setPost] = useState({ subject: '', content: '' });
  const { submitQuestion, isPending, isError } = useWriteQuestion(post);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      router.replace('/');
    }
  }, [user]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [post.subject]);

  if (!user || isPending) {
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

  const handleWriteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitQuestion();

    if (isError) return;

    router.replace('/');
  };

  return (
    <form
      className='p-5 flex flex-col justify-between gap-5 h-screen'
      onSubmit={handleWriteSubmit}
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
        <button className='btn'>등록하기</button>
      </div>
    </form>
  );
}
