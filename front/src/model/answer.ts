import { Question } from './question';
import { BaseUser } from './user';

export interface Answer {
  id: number;
  author: BaseUser;
  content: string;
  createDate: string;
  question: Question;
}
