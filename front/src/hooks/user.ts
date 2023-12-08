'use client';

import axios from '@/config/axios-config';
import { SignupInfo } from '@/model/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const fetchSignup = async (user: SignupInfo) => {
  const res = await axios.post('/auth/signup', user);
  console.log(res);

  return res.data;
};

export const useSignup = (user: SignupInfo) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitSignup,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => fetchSignup(user),
    onSuccess: (res) => {
      if (res.errorData) {
        console.log('회원가입 에러');

        const validError = res.errorData?.validError;
        const errorMessage = res.errorData?.errorMessage;

        let message = errorMessage;

        if (validError) {
          ['username', 'password', 'passwordCheck', 'email'].forEach((key) => {
            if (validError[key]) {
              message = validError[key];
            }
          });
        }

        if (message) {
          alert(message);
        }

        return;
      }

      queryClient.invalidateQueries({ queryKey: ['questions'] });

      toast.success('회원가입 성공! 😘');

      setTimeout(() => {
        router.replace('/user/signin');
      }, 800);
    },
    onError: (error) => {
      console.log('에러!!!!!!!!!!!!!!!');
      console.log(error);

      toast.error('알 수 없는 오류가 발생했어요 😵‍💫');
    },
  });

  return { submitSignup, isPending, isError, error };
};
