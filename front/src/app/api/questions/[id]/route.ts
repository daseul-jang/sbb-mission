import { getQuestionDetail } from '@/service/question';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { id: string };
}

export async function GET(_: NextRequest, context: Context) {
  const objectData = await getQuestionDetail(Number(context.params.id));
  return NextResponse.json({ objectData }, { status: 200 });
}
