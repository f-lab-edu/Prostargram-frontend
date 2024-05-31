import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const result = await req.json();

  const readedFile = await fs.readFileSync(`./public/mock/user.json`, {
    encoding: 'utf-8',
  });

  const parsed = JSON.parse(readedFile);
  parsed.data.links = result;

  await fs.writeFileSync('./public/mock/user.json', JSON.stringify(parsed));

  return NextResponse.json(parsed.data.links);
}
