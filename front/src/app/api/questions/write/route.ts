import { addQuestion } from '@/service/question';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log('글쓰기 세션유저 확인');
  console.log(user);

  const { subject, content } = await req.json();

  return addQuestion(subject, content, user?.accessToken)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
