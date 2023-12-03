import { NextRequest, NextResponse } from 'next/server';
import { addUser } from '@/service/user';

export async function POST(req: NextRequest) {
  const user = await req.json();

  return addUser(user)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
