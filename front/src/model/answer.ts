import { Question } from './question';

export interface Answer {
  id: number;
  content: string;
  createDate: string;
  question: Question;
}
