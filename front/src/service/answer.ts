const ANSWER_URL = 'http://localhost:8080/answer';
const FETCH_OPTION: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
};

export const addAnswer = async (id: number, content: string) => {
  console.log('addAnswer');
  console.log(id);
  console.log(content);

  try {
    const res = await fetch(`${ANSWER_URL}/register/${id}`, {
      ...FETCH_OPTION,
      method: 'POST',
      body: content,
    });
    return res;
  } catch (error) {}
};
