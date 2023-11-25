'use client';

import { useState } from 'react';
import useQuestions from '@/hooks/questions';
import { Question } from '@/model/question';
import Pagination from './Pagination';

export default function BoardList() {
  const [page, setPage] = useState(0);
  const { questions, isLoading, isError, error } = useQuestions(page, 10);
  //const { content } = questions;
  console.log(questions);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러 ㅠㅠ</div>;
  }

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className='flex flex-col items-center gap-20 my-8'>
      <div className='overflow-x-auto w-full'>
        <table className='table'>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {questions.content.map((question: Question) => (
              <tr key={question.id} className='hover'>
                <td>{question.id}</td>
                <th>{question.subject}</th>
                <td>{getDate(question.createDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={questions.totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

const getDate = (createDate: string) => {
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
