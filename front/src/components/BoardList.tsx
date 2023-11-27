'use client';

import { useEffect } from 'react';
import useQuestions from '@/hooks/questions';
import { Question } from '@/model/question';
import Pagination from './ui/Pagination';
import LoadingSpinnerCircle from './ui/icon/LoadingSpinnerCircle';
import TextCenterArea from './ui/TextCenterArea';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BoardList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 0;
  const { questions, isLoading, isError, queryError } = useQuestions(page, 10);

  useEffect(() => {
    if (localStorage.getItem('reload') === 'true') {
      router.replace('/');
      localStorage.removeItem('reload');
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('reload', 'true');
    });

    return () => {
      localStorage.removeItem('reload');
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinnerCircle />;
  }

  if (isError || queryError) {
    return <TextCenterArea>에러!!!!</TextCenterArea>;
  }

  const { error, pageData } = questions?.questionData;

  if (error) {
    return <TextCenterArea>{error}</TextCenterArea>;
  }

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}&size=10`);
  };

  return (
    <div className='flex flex-col gap-3 px-3'>
      <div className='flex justify-between'>
        <h1 className='flex items-center text-2xl font-bold px-3'>
          🙋‍♀️ 질문있어요!
        </h1>
        <button className='btn' onClick={() => router.push('/question/write')}>
          질문하기
        </button>
      </div>
      <div className='flex flex-col items-center gap-14 mb-16'>
        <div className='overflow-x-auto w-full'>
          <table className='table border-t-2 border-b'>
            <thead className='border-b-2'>
              <tr className='text-center'>
                <th className='w-2/12 border-r'>번호</th>
                <th className='w-8/12 px-3'>제목</th>
                <th className='w-2/12 border-l'>날짜</th>
              </tr>
            </thead>
            <tbody>
              {pageData.content.map((question: Question) => (
                <tr key={question.id} className='hover'>
                  <td className='text-center text-sm text-neutral-500 border-r'>
                    {question.id}
                  </td>
                  <td className='px-5 flex items-center gap-4 text-neutral-600 hover:text-neutral-800'>
                    <button
                      onClick={() =>
                        router.push(
                          `/question/${question.id}?page=${page}&size=10`
                        )
                      }
                    >
                      {question.subject}
                    </button>
                    <span className='badge badge-sm badge-outline badge-warning text-xs'>
                      {question.answerList?.length}
                    </span>
                  </td>
                  <td className='text-center text-neutral-500 border-l'>
                    {getDate(question.createDate || '')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={pageData?.totalPages || 0}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export const getDate = (createDate: string) => {
  const date = new Date(createDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = date.getFullYear();

  // getMonth 메서드는 0부터 시작하므로 1을 더함
  // ("0" + 값).slice(-2) : 항상 두 자리 숫자를 유지하기 위함
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  if (date >= today) {
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return `${hour}:${minute}`;
  }

  return `${year}.${month}.${day}`;
};
