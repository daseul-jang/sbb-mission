import { QuestionResponse } from './question';
import { getNewAccessToken } from './user';

const ANSWER_URL = 'http://localhost:8080/answer';
const FETCH_OPTION: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
};

export const addAnswer = async (
  id: number,
  content: string,
  accessToken?: string
): Promise<QuestionResponse | Error | unknown> => {
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
      throw new Error('네트워크 응답 없음');
    }

    const { objectData } = await res.json();
    console.log(objectData.question.answerList);

    return objectData;
  } catch (error) {
    console.log(error);
  }
};
