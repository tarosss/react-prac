import { NextResponse } from 'next/server';

const todos = [
  { id: 1, title: 'サンプルタスクcsdkdvsv.ccscscsc', completed: false },
  { id: 2, title: '次の画面遷移確認', completed: true },
  { id: 3, title: 'React Query 連携テスト', completed: false },
];

export async function GET() {
  const data = {
    message: 'Next.js API response',
    todos,
    serverTime: new Date().toISOString(),
  };

  return NextResponse.json(data);
}