import { useSession } from 'next-auth/react';
import Link from 'next/link';
import TextCenterArea from '../ui/TextCenterArea';
import WriteButton from '../ui/button/WriteButton';
import { AxiosError } from 'axios';

interface AxiosResponse {
  response: {
    status: number;
    statusText: string;
  };
}

interface ErrorData {
  errorCode: string;
  errorMessage: string;
  errorStatus: number;
  errorType: string;
  validError: {};
}

interface Props {
  status?: number;
  code?: string;
  msg?: string;
  cause?: {
    address: string;
    code: string;
    errno: number;
    syscall: string;
  };
  errorData?: Error | AxiosError<AxiosResponse> | ErrorData | null;
}

export default function CommonException({
  status,
  code,
  msg = '오류가 발생했어요 😓',
  cause,
  errorData,
}: Props) {
  const { data: session } = useSession();
  const errorMessage = isErrorData(errorData) && errorData.errorMessage;
  const errorStatus = isErrorData(errorData) && errorData.errorStatus;

  if (
    cause?.errno === -4078 ||
    (errorData instanceof AxiosError && errorData.response)
  ) {
    msg = '서버와 연결이 끊겼습니다 🤕';
  }

  return (
    <TextCenterArea>
      <div className='flex flex-col gap-5'>
        <span className='text-2xl font-bold'>
          {errorMessage ? errorMessage : msg}
        </span>
        {errorStatus === 404 && (
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

const isErrorData = (data: any): data is ErrorData => {
  return (
    data &&
    data.hasOwnProperty('errorMessage') &&
    data.hasOwnProperty('errorStatus')
  );
};
