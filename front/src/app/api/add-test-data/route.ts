import { getTestData } from '@/service/question';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await getTestData();

  return NextResponse.json({ data }, { status: 200 });
}
