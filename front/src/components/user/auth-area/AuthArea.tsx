/* eslint-disable @next/next/no-img-element */

import BgImageDiv from '@/components/ui/BgImageDiv';
import SocialRoundIcon from '@/components/ui/icon/SocialRoundIcon';
import AuthForm from './AuthForm';
import SocialIconArea from './SocialIconArea';

export type AuthType = 'signin' | 'signup';

type Props = {
  authType: AuthType;
};

export default function AuthArea({ authType }: Props) {
  return (
    <BgImageDiv>
      <div className='text-center'>
        <h2 className='mt-4 text-3xl font-bold text-gray-900'>
          {authType === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>
        {/* <p className='mt-2 text-sm text-gray-600'>로그인 하기</p> */}
      </div>
      {authType === 'signin' && <SocialIconArea />}
      <AuthForm authType={authType} />
    </BgImageDiv>
  );
}
