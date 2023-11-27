import { getQuestionList } from '@/service/question';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log(req.url);
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page'));
  const size = Number(searchParams.get('size'));

  const questionData = await getQuestionList(page, size);
  //console.log(questionData);

  return NextResponse.json({ questionData }, { status: 200 });
}
