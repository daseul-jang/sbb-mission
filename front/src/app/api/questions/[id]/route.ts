import { getQuestionDetail } from '@/service/question';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  //console.log(context);

  const objData = await getQuestionDetail(Number(context.params.id));

  return NextResponse.json({ objData }, { status: 200 });
}
