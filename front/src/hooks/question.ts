import axios from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const fetchQuestion = async (id: string) => {
  const {
    data: { objData },
  } = await axios.get(`/questions/${id}`);

  return objData;
};

export default function useQuestion(id: string) {
  const {
    data: question,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['question', id],
    queryFn: () => fetchQuestion(id),
  });

  return { question, isLoading, isError, error };
}
