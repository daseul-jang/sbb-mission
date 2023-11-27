import LastPageIcon from './icon/LastPageIcon';
import NextIcon from './icon/NextIcon';
import PrevIcon from './icon/PrevIcon';
import FirstPageIcon from './icon/FirstPageIcon';
import PageButton from './button/PageButton';

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
      <PageButton
        btnType='start'
        cond={currentPage === 0}
        onClick={() => onPageChange(0)}
      >
        <FirstPageIcon />
      </PageButton>
      <PageButton cond={startPage === currentPage} onClick={handlePrevPage}>
        <PrevIcon />
      </PageButton>
      {pages.map((page) => (
        <PageButton
          key={page}
          cond={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </PageButton>
      ))}
      <PageButton
        cond={currentPage === totalPages - 1}
        onClick={handleNextPage}
      >
        <NextIcon />
      </PageButton>
      <PageButton
        btnType='end'
        cond={currentPage === totalPages - 1}
        onClick={() => onPageChange(totalPages - 1)}
      >
        <LastPageIcon />
      </PageButton>
    </div>
  );
}
