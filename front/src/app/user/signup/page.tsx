import AuthArea from '@/components/user/auth-area/AuthArea';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: 'Sign Up',
};

export default function SignupPage() {
  return (
    <div>
      <AuthArea auth='signup' />
    </div>
  );
}
