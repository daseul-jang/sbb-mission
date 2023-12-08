import { ResponseDto } from '@/model/common';
import { getNewAccessToken } from './user';

const ANSWER_URL = 'http://localhost:8080/answer';
const FETCH_OPTION: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
};

export const deleteAnswer = async (
  id: number,
  accessToken: string
): Promise<ResponseDto | Error | unknown> => {
  try {
    const res = await fetch(`${ANSWER_URL}/delete/${id}`, {
      ...FETCH_OPTION,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'DELETE',
    });

    if (res.status === 401 || res.status === 403) {
      const newUser = await getNewAccessToken();
      if (newUser) {
        return await deleteAnswer(id, newUser.accessToken);
      } else {
        throw new Error('토큰 재발급 실패');
      }
    } else if (!res.ok) {
      throw new Error('답변 삭제 오류');
    }

    const data = await res.json();

    // successMessage 반환
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const modifyAnswer = async (
  id: number,
  content: string,
  accessToken: string
): Promise<ResponseDto | Error | unknown> => {
  try {
    const res = await fetch(`${ANSWER_URL}/modify/${id}`, {
      ...FETCH_OPTION,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'PUT',
      body: content,
    });

    if (res.status === 401 || res.status === 403) {
      const newUser = await getNewAccessToken();
      if (newUser) {
        return await modifyAnswer(id, content, newUser.accessToken);
      } else {
        throw new Error('토큰 재발급 실패');
      }
    } else if (!res.ok) {
      throw new Error('답변 수정 오류');
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addAnswer = async (
  id: number,
  content: string,
  accessToken: string
): Promise<ResponseDto | Error | unknown> => {
  try {
    const res = await fetch(`${ANSWER_URL}/register/${id}`, {
      ...FETCH_OPTION,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: content,
    });

    if (res.status === 401 || res.status === 403) {
      const newUser = await getNewAccessToken();
      if (newUser) {
        return await addAnswer(id, content, newUser.accessToken);
      } else {
        throw new Error('토큰 재발급 실패');
      }
    } else if (!res.ok) {
      console.log(await res.json());

      throw new Error('답변 작성 오류');
    }

    const { objectData } = await res.json();

    return objectData;
  } catch (error) {
    console.log(error);
  }
};
