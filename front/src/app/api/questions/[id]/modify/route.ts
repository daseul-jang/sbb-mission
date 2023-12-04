import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { modifyQuestion } from '@/service/question';

interface Context {
  params: { id: string };
}

export async function PUT(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return;
  }

  const { subject, content } = await req.json();

  return modifyQuestion(
    Number(context.params.id),
    subject,
    content,
    user.accessToken
  )
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
