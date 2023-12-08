import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AuthArea from '@/components/user/auth-area/AuthArea';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Sign In',
};

export default async function SigninPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <>
      <AuthArea auth='signin' />
    </>
  );
}
