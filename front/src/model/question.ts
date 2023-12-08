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
