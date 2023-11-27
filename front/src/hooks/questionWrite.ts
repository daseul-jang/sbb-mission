import axios from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ReqQuestion = {
  subject: string;
  content: string;
};

const fetchWrite = async ({ subject, content }: ReqQuestion) => {
  return await axios.post('/questions/write', { subject, content });
};

export default function useWrite({ subject, content }: ReqQuestion) {
  console.log('useWrite');
  console.log({ subject, content });

  const queryClient = useQueryClient();
  const { mutate: submitQuestion, isPending } = useMutation({
    mutationFn: () => fetchWrite({ subject, content }),
    onSuccess: () => {
      console.log('성공');
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: () => {
      console.log('에러!!!!!!!!!!!!!!!');
    },
  });

  return { submitQuestion, isPending };
}
