import { addQuestion } from '@/service/question';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { subject, content } = await req.json();

  return addQuestion(subject, content)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
