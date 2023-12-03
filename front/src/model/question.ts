import { Answer } from './answer';
import { BaseUser } from './user';

export interface Question {
  id?: number;
  subject: string;
  author: BaseUser;
  content: string;
  createDate?: string;
  answerList?: Answer[] | null;
}

export interface PageData {
  content: Question[] | null;
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
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface ResQuestionData {
  error?: string | null;
  listData?: Question[] | null;
  pageData?: PageData | null;
  objData?: Question | null;
}
