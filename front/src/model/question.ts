import { Answer } from './answer';

export type Question = {
  id?: number;
  subject: string;
  content: string;
  createDate?: string;
  answerList?: Answer[];
};

export type PageData = {
  content: Question[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
};

export type Pageable = {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
};

export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type ResQuestionData = {
  error?: string | undefined;
  listData?: Question[] | undefined;
  pageData?: PageData | undefined;
  objData?: Question | undefined;
};
