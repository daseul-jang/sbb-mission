import { Question } from './question';

export type Answer = {
  id: number;
  content: string;
  createDate: string;
  question: Question;
};
