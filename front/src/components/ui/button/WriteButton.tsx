import { useRouter } from 'next/navigation';

export default function WriteButton() {
  const router = useRouter();

  return (
    <button className='btn' onClick={() => router.push('/question/write')}>
      질문하기
    </button>
  );
}
