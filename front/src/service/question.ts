import { postFetch } from '@/config/fetch-config';

const QUESTION_URL = 'http://localhost:8080/question';
const FETCH_OPTION: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
};

export const addQuestion = async (
  subject: string,
  content: string,
  accessToken?: string
) => {
  try {
    /* const data = await postFetch(`${QUESTION_URL}/register`, accessToken, {
      cache: 'force-cache',
      body: JSON.stringify({ subject, content }),
    }).then((res) => res.json()); */

    const data = await fetch(`${QUESTION_URL}/register`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      method: 'POST',
      body: JSON.stringify({ subject, content }),
    }).then((res) => res.json());

    return data;
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
