import { Question } from './question';
import { BaseUser } from './user';

export interface ResponseDto {
  successMessage: string;
  errorData?: ErrorResponseDto;
  listData?: Question[] | null;
  pageData?: PageData | null;
  objectData?: Question | BaseUser | null;
}

export interface ErrorResponseDto {
  errorStatus: number;
  errorMesage: string;
  validError: [];
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
