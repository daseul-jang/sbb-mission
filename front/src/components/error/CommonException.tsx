import { useSession } from 'next-auth/react';
import Link from 'next/link';
import TextCenterArea from '../ui/TextCenterArea';
import WriteButton from '../ui/button/WriteButton';

interface Props {
  code?: number;
  msg?: string;
  cause?: {
    address: string;
    code: string;
    errno: number;
    syscall: string;
  };
}

export default function CommonException({ code, msg, cause }: Props) {
  const { data: session } = useSession();

  if (cause?.errno === -4078) msg = '서버와 연결이 끊겼습니다 🤕';

  return (
    <TextCenterArea>
      <div className='flex flex-col gap-5'>
        <span className='text-2xl font-bold'>{msg}</span>
        {code === -111 && (
          <>
            {session ? (
              <WriteButton />
            ) : (
              <Link href='/user/signin' className='btn'>
                로그인 하고 질문하기!
              </Link>
            )}
          </>
        )}
      </div>
    </TextCenterArea>
  );
}
