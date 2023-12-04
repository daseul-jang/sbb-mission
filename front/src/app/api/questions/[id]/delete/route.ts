import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { deleteQuestion } from '@/service/question';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { id: string };
}

export async function DELETE(_: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return;
  }

  return deleteQuestion(Number(context.params.id), user.accessToken)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
