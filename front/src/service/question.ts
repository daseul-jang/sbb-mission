const QUESTION_URL = 'http://localhost:8080/question';
const FETCH_OPTION: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
};

/* export const getQuestionList = async () => {
  const { listData } = await fetch(`${QUESTION_URL}/list`, FETCH_OPTION).then(
    (res) => res.json()
  );

  console.log(listData);

  return listData;
}; */

export const getQuestionList = async (page: number, size: number) => {
  const { pageData } = await fetch(
    `${QUESTION_URL}/list?page=${page}&size=${size}`,
    FETCH_OPTION
  ).then((res) => res.json());

  return pageData;
};

export const getTestData = async () => {
  console.log('getTestData');

  const res = await fetch(`${QUESTION_URL}/test`);
  console.log(res);
  return res;
};
