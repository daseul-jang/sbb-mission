import AuthArea from '@/components/user/auth-area/AuthArea';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Sign In',
};

export default function SigninPage() {
  return (
    <>
      <AuthArea auth='signin' />
    </>
  );
}
