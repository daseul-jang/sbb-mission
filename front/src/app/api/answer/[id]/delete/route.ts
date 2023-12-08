import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { deleteAnswer } from '@/service/answer';

interface Context {
  params: { id: string };
}

export async function DELETE(_: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return;
  }

  return deleteAnswer(Number(context.params.id), user.accessToken)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
