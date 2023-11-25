import { useState } from 'react';
import LastPageIcon from './ui/icon/LastPageIcon';
import NextIcon from './ui/icon/NextIcon';
import PrevIcon from './ui/icon/PrevIcon';
import FirstPageIcon from './ui/icon/FirstPageIcon';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pagesToShow = 5;

  let startPage = Math.max(0, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages - 1, startPage + pagesToShow - 1);

  const pages = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  const handlePrevPage = () => {
    if (currentPage < pagesToShow) {
      onPageChange(0);
    } else {
      onPageChange(Math.max(0, currentPage - pagesToShow));
    }
  };

  const handleNextPage = () => {
    if (totalPages - currentPage <= pagesToShow) {
      onPageChange(totalPages - 1);
    } else {
      onPageChange(Math.min(totalPages - 1, currentPage + pagesToShow));
    }
  };

  return (
    <div className='join'>
      <button
        className={`join-item btn btn-sm ${currentPage === 0 && 'btn-active'}`}
        onClick={() => onPageChange(0)}
      >
        <FirstPageIcon />
      </button>
      <button
        className={`join-item btn btn-sm ${
          startPage === currentPage && 'btn-active'
        }`}
        onClick={handlePrevPage}
      >
        <PrevIcon />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`join-item btn btn-sm ${
            page === currentPage && 'btn-active'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className={`join-item btn btn-sm ${
          currentPage === totalPages - 1 && 'btn-active'
        }`}
        onClick={handleNextPage}
      >
        <NextIcon />
      </button>
      <button
        className={`join-item btn btn-sm ${
          currentPage === totalPages - 1 && 'btn-active'
        }`}
        onClick={() => onPageChange(totalPages - 1)}
      >
        <LastPageIcon />
      </button>
    </div>
  );
}
