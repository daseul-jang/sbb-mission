import axios from '@/config/axios-config';
import { SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ReqAnswer = {
  id: string;
  content: string;
  setContent: (str: SetStateAction<string>) => void;
};

/** 답변 삭제 */
const fetchDelete = async (id: string) => {
  return await axios.delete(`/answer/${id}/delete`);
};

export const useDeleteAnswer = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate: submitDeleteAnswer, isPending } = useMutation({
    mutationFn: () => fetchDelete(id),
    onSuccess: () => {
      console.log('삭제 성공');
      queryClient.invalidateQueries({ queryKey: ['question'] });
    },
    onError: () => {
      console.log('삭제 실패');
    },
  });

  return { submitDeleteAnswer, isPending };
};

/** 답변 수정 */
const fetchModifyAnswer = async (id: string, content: string) => {
  return await axios.put(`/answer/${id}/modify`, { id, content });
};

export const useModifyAnswer = (
  { id, content, setContent }: ReqAnswer,
  modifyFalseHandler: () => void
) => {
  const queryClient = useQueryClient();
  const { mutate: submitModifyAnswer, isPending } = useMutation({
    mutationFn: () => fetchModifyAnswer(id, content),
    onSuccess: (res) => {
      console.log('답변 수정 성공');
      console.log(res);

      setContent('');
      modifyFalseHandler();
      queryClient.invalidateQueries({ queryKey: ['question'] });
    },
    onError: () => {
      console.log('답변 수정 실패!!!!!!');
    },
  });

  return { submitModifyAnswer, isPending };
};

/** 답변 등록 */
const fetchAddAnswer = async (id: string, content: string) => {
  return await axios.post('/answer', { id, content });
};

export const useWriteAnswer = ({ id, content, setContent }: ReqAnswer) => {
  const queryClient = useQueryClient();
  const { mutate: submitAnswer, isPending } = useMutation({
    mutationFn: () => fetchAddAnswer(id, content),
    onSuccess: () => {
      console.log('성공');
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['question'] });
    },
    onError: (err) => {
      console.log('에러!!!!!!!!!!!!');
      console.log(err);
    },
  });

  return { submitAnswer, isPending };
};
