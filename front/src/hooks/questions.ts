import { useQuery } from '@tanstack/react-query';
import axios from '@/config/axios-config';

const fetchQuestions = async (page: number, size: number) => {
  const {
    data: { listData },
  } = await axios.get(`/?page=${page}&size=${size}`);

  return listData;
};

export default function useQuestions(page: number, size: number) {
  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['questions', page, size],
    queryFn: () => fetchQuestions(page, size),
  });

  return { questions, isLoading, isError, error };
}

export const useTestData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['testData'],
    queryFn: async () => {
      const res = await fetch('/add-test-data');
      console.log(res);
      return res;
    },
  });
};
