import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';
import { modifyAnswer } from '@/service/answer';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return;
  }

  const { id, content } = await req.json();

  return modifyAnswer(id, content, user.accessToken)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
