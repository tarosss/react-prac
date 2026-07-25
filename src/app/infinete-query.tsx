import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { z } from 'zod';
const Todo = z.object({
  id: z.number(),
  title: z.string(),
})
const ApiResponse = z.object({
  todos: z.array(Todo),
  nextPage: z.number().nullable(),
})
export default function InfiniteTodoList() {
  const {
    data,                // 取得した全ページのデータが入るオブジェクト
    fetchNextPage,       // 💡 次のページを取得する関数
    hasNextPage,         // 💡 次のページが存在するかどうか（Boolean）
    isFetchingNextPage,  // 💡 追加ロード中かどうか（Boolean）
    isLoading,
    isError,
  } = useInfiniteQuery<typeof ApiResponse, Error>({
    queryKey: ['infinite-todos'],

    // 💡 1. queryFn に pageParam が渡されてくる
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/todos?page=${pageParam}`);
      if (!res.ok) throw new Error('取得失敗');
      return res.json();
    },

    // 💡 2. 最初のページ番号を指定
    initialPageParam: 1,

    // 💡 3. レスポンスから「次のページのパラメータ」を抽出して返す
    // lastPage: 最後に取得した API レスポンス
    // allPages: これまで取得した全ページの API レスポンスの配列
    getNextPageParam: (lastPage, allPages) => {
      // API が nextPage を返してくれる設計なら、そのまま返すだけ！
      return lastPage.nextPage ?? undefined; 
    },
  });

  if (isLoading) return <p>読み込み中...</p>;
  if (isError) return <p>エラーが発生しました</p>;

  return (
    <div>
      <h2>タスク一覧</h2>

      {/* 💡 4. data.pages 配下に各ページのレスポンスが入っている */}
      <ul>
        {data?.pages.map((page, pageIndex) => (
          // ページごとのループ
          <div key={pageIndex}>
            {page.todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </div>
        ))}
      </ul>

      {/* 💡 5. 「もっと見る」ボタン */}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? '読み込み中...'
          : hasNextPage
          ? 'もっと見る'
          : 'すべてのデータを読み込みました'}
      </button>
    </div>
  );
}