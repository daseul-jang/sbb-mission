import { addAnswer } from '@/service/answer';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { id: string };
};

export async function POST(req: NextRequest, context: Context) {
  const { id, content } = await req.json();

  return addAnswer(id, content)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
