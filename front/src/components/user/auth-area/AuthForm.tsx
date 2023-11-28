/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import GreenCheckIcon from '@/components/ui/icon/GreenCheckIcon';
import { AuthType } from './AuthArea';
import Link from 'next/link';
//import AuthInput from '@/components/ui/form/AuthInput';

type SigninUser = {
  username: string;
  password: string;
};

type SignupUser = SigninUser & {
  email: string;
};

type AuthUserMap = {
  [key: string]: SigninUser | SignupUser;
};

type Props = {
  authType: AuthType;
};

const init: AuthUserMap = {
  signin: {
    username: '',
    password: '',
  },
  signup: {
    username: '',
    password: '',
    email: '',
  },
};

export default function AuthForm({ authType }: Props) {
  console.log(authType);

  const type = init[authType];
  console.log(type);

  const [user, setUser] = useState<SigninUser | SignupUser>(type);
  const [passwordCheck, setPasswordCheck] = useState('');
  console.log(user);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className='mt-8 space-y-6' action='#' method='POST'>
      <input type='hidden' name='remember' value='true' />
      <div className='relative'>
        <div className='absolute right-0 mt-4'>
          <GreenCheckIcon />
        </div>
        {/* <AuthInput
          title='email'
          type='text'
          user={user}
          onChage={handleOnChange}
        /> */}
        <label className='text-sm font-bold text-gray-700 tracking-wide'>
          아이디
        </label>
        <input
          className='w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-amber-400'
          type='text'
          name='username'
          placeholder='아이디를 입력해 주세요'
          value={user.username}
          onChange={handleOnChange}
        />
      </div>
      <div className='mt-8 content-center'>
        <label className='text-sm font-bold text-gray-700 tracking-wide'>
          비밀번호
        </label>
        <input
          className='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-amber-400'
          type='password'
          name='password'
          placeholder='비밀번호를 입력해 주세요.'
          value={user.password}
          onChange={handleOnChange}
        />
      </div>
      {authType === 'signup' && 'email' in user ? (
        <>
          <div className='mt-8 content-center'>
            <label className='text-sm font-bold text-gray-700 tracking-wide'>
              비밀번호 확인
            </label>
            <input
              className='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-amber-400'
              type='password'
              placeholder='비밀번호를 입력해 주세요.'
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
          <div className='mt-8 content-center'>
            <label className='text-sm font-bold text-gray-700 tracking-wide'>
              이메일
            </label>
            <input
              className='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-amber-400'
              type='email'
              name='email'
              placeholder='이메일을 입력해 주세요.'
              value={user.email}
              onChange={handleOnChange}
            />
          </div>
        </>
      ) : (
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              id='remember_me'
              name='remember_me'
              type='checkbox'
              className='h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded'
            />
            <label
              htmlFor='remember_me'
              className='ml-2 block text-sm text-gray-900'
            >
              Remember me
            </label>
          </div>
          <div className='text-sm'>
            <a
              href='#'
              className='font-medium text-amber-400 hover:text-amber-500'
            >
              비밀번호 찾기
            </a>
          </div>
        </div>
      )}
      <div className='mt-4'>
        <button
          type='submit'
          className='w-full flex justify-center bg-amber-500 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-amber-400 shadow-lg cursor-pointer transition ease-in duration-300'
        >
          {authType === 'signin' ? '로그인' : '가입하기'}
        </button>
      </div>
      <p className='flex flex-col items-center justify-center gap-1 mt-10 text-center text-sm text-gray-500'>
        <span>
          {authType === 'signin' ? '회원이 아니신가요?' : '이미 회원이신가요?'}
        </span>
        <Link
          href='/user/signup'
          className='text-sm text-amber-400 hover:text-amber-500 no-underline hover:underline cursor-pointer transition ease-in duration-300'
        >
          {authType === 'signin' ? '가입하기' : '로그인하기'}
        </Link>
      </p>
    </form>
  );
}
