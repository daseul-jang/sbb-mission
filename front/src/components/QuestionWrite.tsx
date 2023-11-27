'use client';

import useWrite from '@/hooks/questionWrite';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinnerCircle from './ui/icon/LoadingSpinnerCircle';
import { useRouter } from 'next/navigation';

export default function QuestionWrite() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [post, setPost] = useState({ subject: '', content: '' });
  const { submitQuestion, isPending } = useWrite(post);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [post.subject]);

  if (isPending) {
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

  const handleSubmitWrite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitQuestion();
    router.replace('/');
  };

  return (
    <form
      className='p-5 flex flex-col justify-between gap-5 h-screen'
      onSubmit={handleSubmitWrite}
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
