import { postFetch } from '@/config/fetch-config';
import { getNewAccessToken } from './user';
import { Answer } from '@/model/answer';

export interface QuestionResponse {
  id: number;
  subject: string;
  author: string;
  content: string;
  createDate: string;
  answerList: Answer[];
}

const QUESTION_URL = 'http://localhost:8080/question';
const FETCH_OPTION: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
};

export const modifyQuestion = async (
  id: number,
  subject: string,
  content: string,
  accessToken: string
) => {
  try {
    const res = await fetch(`${QUESTION_URL}/modify/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'force-cache',
      method: 'PUT',
      body: JSON.stringify({ subject, content }),
    });

    if (!res.ok) {
      throw new Error('수정 실패');
    }

    const { objectDate } = await res.json();

    return objectDate;
  } catch (err) {
    return err;
  }
};

export const addQuestion = async (
  subject: string,
  content: string,
  accessToken: string
): Promise<QuestionResponse | Error | unknown> => {
  try {
    const res = await fetch(`${QUESTION_URL}/register`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'force-cache',
      method: 'POST',
      body: JSON.stringify({ subject, content }),
    });

    if (res.status === 401 || res.status === 403) {
      const newUser = await getNewAccessToken();
      if (newUser) {
        return await addQuestion(subject, content, newUser.accessToken);
      } else {
        throw new Error('토큰 재발급 실패');
      }
    } else if (!res.ok) {
      throw new Error('네트워크 응답 없음');
    }

    const { objectData } = await res.json();

    return objectData;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getQuestionList = async (page: number, size: number) => {
  try {
    const data = await fetch(
      `${QUESTION_URL}/list?page=${page}&size=${size}`,
      FETCH_OPTION
    ).then((res) => res.json());

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getQuestionDetail = async (id: number) => {
  const { objectData } = await fetch(
    `${QUESTION_URL}/detail/${id}`,
    FETCH_OPTION
  ).then((res) => res.json());

  return objectData;
};
