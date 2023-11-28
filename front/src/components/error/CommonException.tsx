import TextCenterArea from '../ui/TextCenterArea';

type Props = {
  msg?: string;
  cause?: {
    address: string;
    code: string;
    errno: number;
    syscall: string;
  };
};

export default function CommonException({ msg, cause }: Props) {
  if (cause?.errno === -4078) msg = '서버와 연결이 끊겼습니다 🤕';

  return (
    <TextCenterArea>
      <span className='text-2xl font-bold'>{msg}</span>
    </TextCenterArea>
  );
}
