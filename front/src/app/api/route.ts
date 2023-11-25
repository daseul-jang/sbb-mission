import { getQuestionList } from '@/service/question';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(request.url);
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page'));
  const size = Number(searchParams.get('size'));

  const listData = await getQuestionList(page, size);

  return NextResponse.json({ listData }, { status: 200 });
}
