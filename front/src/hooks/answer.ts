import { SetStateAction } from 'react';
import axios from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ReqAnswer = {
  id: number;
  content: string;
  setContent: (str: SetStateAction<string>) => void;
};

const fetchAddAnswer = async (id: number, content: string) => {
  return await axios.post('/answer', { id: id, content: content });
};

export default function useAnswer({ id, content, setContent }: ReqAnswer) {
  const queryClient = useQueryClient();
  const { mutate: submitAnswer, isPending } = useMutation({
    mutationFn: () => fetchAddAnswer(id, content),
    onSuccess: () => {
      console.log('성공');
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['question'] });
    },
    onError: () => {
      console.log('에러!!!!!!!!!!!!');
    },
  });

  return { submitAnswer, isPending };
}
