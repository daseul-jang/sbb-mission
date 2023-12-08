import axios from '@/config/axios-config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type ReqQuestion = {
  subject: string;
  content: string;
};

/** 게시글 삭제 */
const fetchDelete = async (id: string) => {
  return await axios.delete(`/questions/${id}/delete`);
};

export const useDeleteQuestion = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate: submitDeleteQuestion, isPending } = useMutation({
    mutationFn: () => fetchDelete(id),
    onSuccess: () => {
      console.log('삭제 성공');
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: () => {
      console.log('삭제 실패');
      throw new Error('삭제 실패');
    },
  });

  return { submitDeleteQuestion, isPending };
};

/** 게시글 수정 */
const fetchModify = async (id: string, { subject, content }: ReqQuestion) => {
  return await axios.put(`/questions/${id}/modify`, { subject, content });
};

export const useModifyQuestion = (
  id: string,
  { subject, content }: ReqQuestion
) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitModifyQuestion,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => fetchModify(id, { subject, content }),
    onSuccess: () => {
      console.log('수정 성공');
      queryClient.invalidateQueries({ queryKey: ['question'] });
      router.replace(`/question/${id}`);
    },
    onError: (err) => console.log(err),
  });

  return { submitModifyQuestion, isPending, isError };
};

/** 게시글 등록 */
const fetchWrite = async ({ subject, content }: ReqQuestion) => {
  return await axios.post('/questions/write', { subject, content });
};

export const useWriteQuestion = ({ subject, content }: ReqQuestion) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitQuestion,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => fetchWrite({ subject, content }),
    onSuccess: (res) => {
      console.log('작성 성공');

      if (res.data?.errorData?.validError) {
        const { subject, content } = res.data.errorData.validError;
        const message =
          subject && content
            ? '제목과 내용은 비워둘 수 없어요!'
            : subject || content;

        if (message) {
          alert(message);
        }

        return;
      }

      queryClient.invalidateQueries({ queryKey: ['questions'] });
      router.replace('/');
      return res.data.objectData;
    },
    onError: (err) => {
      console.log('작성 실패');
      console.log(err);
    },
  });

  return { submitQuestion, isPending, isError };
};

/** 게시글 단건 조회 */
const fetchQuestion = async (id: string) => {
  const { data } = await axios.get(`/questions/${id}`);

  if (!data.objectData) throw new Error('해당 게시글이 존재하지 않음');

  return data.objectData;
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
  //console.log(data);

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
