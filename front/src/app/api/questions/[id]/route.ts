import { getQuestionDetail } from '@/service/question';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { id: string };
}

export async function GET(_: NextRequest, context: Context) {
  /* const response = await getQuestionDetail(Number(context.params.id));
  return NextResponse.json({ response }, { status: 200 }); */

  return getQuestionDetail(Number(context.params.id))
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
