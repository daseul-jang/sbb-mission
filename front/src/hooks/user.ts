import axios from '@/config/axios-config';
import { SignupInfo } from '@/model/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const fetchSignup = async (user: SignupInfo) => {
  return await axios.post('/auth/signup', user);
};

export const useSignup = (user: SignupInfo) => {
  const queryClient = useQueryClient();
  const { mutate: submitSignup, isPending } = useMutation({
    mutationFn: () => fetchSignup(user),
    onSuccess: () => {
      console.log('성공');
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: () => {
      console.log('에러!!!!!!!!!!!!!!!');
    },
  });

  return { submitSignup, isPending };
};
