import BgImageDiv from '@/components/ui/BgImageDiv';
import AuthForm from './AuthForm';
import SocialIconArea from './SocialIconArea';

export type AuthType = 'signin' | 'signup';

export interface AuthProps {
  auth: AuthType;
}

export default function AuthArea({ auth }: AuthProps) {
  return (
    <BgImageDiv>
      <div className='text-center'>
        <h2 className='mt-4 pb-3 text-3xl font-bold text-gray-900'>
          {auth === 'signin' ? '로그인' : '회원가입'}
        </h2>
      </div>
      {auth === 'signin' && <SocialIconArea />}
      <AuthForm auth={auth} />
    </BgImageDiv>
  );
}
