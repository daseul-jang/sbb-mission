import axios from '@/config/axios-config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ReqQuestion = {
  subject: string;
  content: string;
};

const fetchModify = async (id: number, { subject, content }: ReqQuestion) => {
  return await axios.put(`/questions/${id}/modify`, { subject, content });
};

export const useQuestionModify = (
  id: number,
  { subject, content }: ReqQuestion
) => {
  const queryClient = useQueryClient();
  const {
    mutate: submitQuestionModify,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => fetchModify(id, { subject, content }),
    onSuccess: () => {
      console.log('수정 성공');
      queryClient.invalidateQueries({ queryKey: ['question'] });
    },
  });

  return { submitQuestionModify, isPending, isError };
};

/** 게시글 등록 */
const fetchWrite = async ({ subject, content }: ReqQuestion) => {
  return await axios.post('/questions/write', { subject, content });
};

export const useQuestionWrite = ({ subject, content }: ReqQuestion) => {
  const queryClient = useQueryClient();
  const {
    mutate: submitQuestion,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => fetchWrite({ subject, content }),
    onSuccess: () => {
      console.log('작성 성공');
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: () => {
      console.log('에러!!!!!!!!!!!!!!!');
    },
  });

  return { submitQuestion, isPending, isError };
};

/** 게시글 단건 조회 */
const fetchQuestion = async (id: string) => {
  const {
    data: { objectData },
  } = await axios.get(`/questions/${id}`);

  return objectData;
};

export const useQuestion = (id: string) => {
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
};

/** 페이징이 적용된 게시글 목록 */
const fetchQuestions = async (page: number, size: number) => {
  const { data } = await axios.get(`/questions?page=${page}&size=${size}`);
  return data;
};

export const useQuestions = (page: number, size: number) => {
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
};
