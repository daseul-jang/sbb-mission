/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import GreenCheckIcon from '@/components/ui/icon/GreenCheckIcon';
import { AuthProps } from './AuthArea';
import RememberMe from './RememberMe';
import FindPassword from './FindPassword';
import AuthInputArea from '@/components/user/auth-area/AuthInputArea';
import AuthBottom from './AuthBottom';
import { useSignup } from '@/hooks/user';
import { LoginInfo, SignupInfo } from '@/model/user';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

interface inputType {
  signin: LoginInfo;
  signup: SignupInfo;
}

const userInput: inputType = {
  signin: {
    username: 'test1',
    password: '1234',
  },
  signup: {
    username: 'test1',
    password: '1234',
    passwordCheck: '1234',
    email: 'test1@test.com',
  },
};

export default function AuthForm({ auth }: AuthProps) {
  console.log(auth);
  const router = useRouter();
  const type = userInput[auth];

  const [user, setUser] = useState<LoginInfo | SignupInfo>(type);
  const { submitSignup, isPending, isError, error } = useSignup(user);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (auth === 'signin') {
      try {
        console.log('handleSubmitSignup signin');
        const res = await signIn('credentials', {
          ...user,
          redirect: false,
        });

        console.log(res);

        if (!res?.ok || res?.errorData) {
          toast.error('로그인을 다시 시도해주세요.');
          return;
        }

        toast.success(`${user.username}님 환영합니다! 🎉`);

        setTimeout(() => {
          router.replace('/');
        }, 500);
      } catch (err) {}
    } else if (auth === 'signup') {
      submitSignup();
    }
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={handleAuthSubmit}>
      <div className='relative'>
        <div className='absolute right-0 mt-4'>
          <GreenCheckIcon />
        </div>
        <AuthInputArea
          type='text'
          title='아이디'
          name='username'
          value={user?.username}
          placeholder='아이디 입력'
          onChange={handleOnChange}
        />
      </div>
      <div className='mt-8 content-center'>
        <AuthInputArea
          type='password'
          title='비밀번호'
          name='password'
          value={user?.password}
          placeholder='비밀번호 입력'
          onChange={handleOnChange}
        />
      </div>
      {auth === 'signup' && 'email' in user ? (
        <>
          <div className='mt-8 content-center'>
            <AuthInputArea
              type='password'
              name='passwordCheck'
              title='비밀번호 확인'
              value={user.passwordCheck || ''}
              placeholder='동일한 비밀번호 입력'
              onChange={handleOnChange}
            />
          </div>
          <div className='mt-8 content-center'>
            <AuthInputArea
              type='email'
              title='이메일'
              name='email'
              value={user.email || ''}
              placeholder='이메일 입력'
              onChange={handleOnChange}
            />
          </div>
        </>
      ) : (
        <div className='flex items-center justify-between'>
          <RememberMe />
          <FindPassword />
        </div>
      )}
      <AuthBottom auth={auth} />
    </form>
  );
}
