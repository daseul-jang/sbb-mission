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
      console.log('성공');
      console.log(res);

      queryClient.invalidateQueries({ queryKey: ['questions'] });
      toast.success('성공적으로 가입되었습니다.');
      setTimeout(() => {
        router.replace('/user/signin');
      }, 800);
    },
    onError: (error) => {
      console.log('에러!!!!!!!!!!!!!!!');
      console.log(error);
      //alert('회원가입을 다시 시도해 주세요.');
      toast.error('회원가입을 다시 시도해 주세요.');
    },
  });

  return { submitSignup, isPending, isError, error };
};
