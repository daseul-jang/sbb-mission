const ANSWER_URL = 'http://localhost:8080/answer';
const FETCH_OPTION: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
};

export const addAnswer = async (id: number, content: string) => {
  try {
    const data = await fetch(`${ANSWER_URL}/register/${id}`, {
      ...FETCH_OPTION,
      method: 'POST',
      body: content,
    }).then((res) => res.json());
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
