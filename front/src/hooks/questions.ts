import axios from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const fetchQuestions = async (page: number, size: number) => {
  const { data: questionData } = await axios.get(
    `/questions?page=${page}&size=${size}`
  );

  return questionData;
};

export default function useQuestions(page: number, size: number) {
  const {
    data: questions,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ['questions', page, size],
    queryFn: () => fetchQuestions(page, size),
  });

  return { questions, isLoading, isError, queryError };
}
