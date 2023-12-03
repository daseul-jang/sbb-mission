import Link from 'next/link';
import { AuthProps, AuthType } from './AuthArea';

export default function AuthBottom({ auth }: AuthProps) {
  const ui = settingUi(auth);

  return (
    <>
      <div className='mt-4'>
        <button
          type='submit'
          className='w-full flex justify-center bg-amber-500 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-amber-400 shadow-lg cursor-pointer transition ease-in duration-300'
        >
          {ui.submitBtn}
        </button>
      </div>
      <p className='flex flex-col items-center justify-center gap-1 mt-10 text-center text-sm text-gray-500'>
        <span>{ui.guideText}</span>
        <Link
          href={ui.link}
          className='text-sm text-amber-500 hover:text-amber-600 no-underline hover:underline cursor-pointer transition ease-in duration-300'
        >
          {ui.linkText}
        </Link>
      </p>
    </>
  );
}

const settingUi = (auth: AuthType) => {
  switch (auth) {
    case 'signin':
      return {
        submitBtn: '로그인',
        guideText: '회원이 아니신가요?',
        link: '/user/signup',
        linkText: '가입하기',
      };
    case 'signup':
      return {
        submitBtn: '가입하기',
        guideText: '이미 회원이신가요?',
        link: '/user/signin',
        linkText: '로그인하기',
      };
  }
};
