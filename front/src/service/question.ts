import { ResponseDto } from '@/model/common';
import { getNewAccessToken } from './user';

const QUESTION_URL = 'http://localhost:8080/question';

export const deleteQuestion = async (
  id: number,
  accessToken: string
): Promise<ResponseDto | Error | unknown> => {
  try {
    const res = await fetch(`${QUESTION_URL}/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      method: 'DELETE',
    });

    if (res.status === 401 || res.status === 403) {
      const newUser = await getNewAccessToken();
      if (newUser) {
        return await deleteQuestion(id, newUser.accessToken);
      } else {
        throw new Error('토큰 재발급 실패');
      }
    } else if (!res.ok) {
      throw new Error('게시글 삭제 오류');
    }

    const data = await res.json();

    // successMessage 반환
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const modifyQuestion = async (
  id: number,
  subject: string,
  content: string,
  accessToken: string
): Promise<ResponseDto | Error | unknown> => {
  try {
    const res = await fetch(`${QUESTION_URL}/modify/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      method: 'PUT',
      body: JSON.stringify({ subject, content }),
    });

    if (res.status === 401 || res.status === 403) {
      const newUser = await getNewAccessToken();
      if (newUser) {
        return await modifyQuestion(id, subject, content, newUser.accessToken);
      } else {
        throw new Error('토큰 재발급 실패');
      }
    } else if (!res.ok) {
      throw new Error('게시글 수정 오류');
    }

    const { objectData } = await res.json();

    return objectData;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const addQuestion = async (
  subject: string,
  content: string,
  accessToken: string
): Promise<ResponseDto | Error | unknown> => {
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
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getQuestionDetail = async (id: number) => {
  try {
    const res = await fetch(`${QUESTION_URL}/detail/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getQuestionList = async (page: number, size: number) => {
  try {
    const res = await fetch(`${QUESTION_URL}/list?page=${page}&size=${size}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log(res.status);

    const data = await res.json();

    //console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
