import { useQuery, useMutation } from '@tanstack/react-query';
import { useCounterStore } from './stores/counterStore';
import { useState } from 'react';

// API レスポンスの型定義（TypeScript用）
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface ApiResponse {
  message: string;
  todos: Todo[];
  serverTime: string;
  selectedTodos: Todo[];
}

export default function Test() {
  const localCount = useCounterStore((state) => state.count + 1);

  const [text, setText] = useState<string>('');
  // 💡 useQuery の設定
  const { data, isLoading, isError, refetch, isFetching } = useQuery<ApiResponse>({
    queryKey: ['todos', text],
    queryFn: async () => {
      const res = await fetch('/api/todos', { cache: 'no-store' });
      if (!res.ok) throw new Error('APIの取得に失敗しました');
      return res.json();
    },
    staleTime: 0, // 💡 キャッシュを即座に古くなったとみなす設定
    enabled: false, // 💡 これを入れると、画面を開いた直後の自動取得をストップします
    select: (data) => {
      // 💡 取得したデータを加工して返すこともできます
      return {
        ...data,
        selectedTodos: data.todos.filter((todo) => todo.title.includes(text)),
      };
    }
  });

  const [mutations, setMutations] = useState<ApiResponse | null>(null);
  const { mutate, isPending, } = useMutation<ApiResponse, Error, { title: string }>({
    mutationFn: async (newTodo: { title: string }) => {
      const res = await fetch('/api/mutations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) throw new Error('Todoの追加に失敗しました');
      return res.json();
    },
    onSuccess: (data) => {
      console.log('Mutation 成功:', data);
      setMutations(data);
    },
    onError: (error) => {
      console.error('Mutation 失敗:', error);
    }
  });


  const runMutation = () => {
    mutate({ title: text });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Page</h1>
      <p>This is a test page for Zustand store.</p>
      <p>localCount: {localCount}</p>

      <hr style={{ margin: '20px 0' }} />

      <h2>TanStack Query Fetch テスト</h2>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      {/* 💡 ボタンを押すと refetch() が呼ばれて API にリクエストが飛びます */}
      <button 
        onClick={() => refetch()} 
        disabled={isFetching}
        style={{ padding: '8px 16px', cursor: 'pointer' }}
      >
        {isFetching ? '取得中...' : 'データを取得する'}
      </button>

      { isLoading && <p>データを取得中...</p>}
      { isFetching && <p>データ保存中...</p>}
      {/* エラー発生時 */}
      {isError && <p style={{ color: 'red' }}>データの取得に失敗しました</p>}

      {/* 取得結果の表示 */}
      {data && (
        <div style={{ marginTop: '15px', background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          <p><strong>Message:</strong> {data.message}</p>
          <p><strong>Server Time:</strong> {data.serverTime}</p>
          
          <h3>Todo 一覧:</h3>
          <ul>
            {data.todos.map((todo) => (
              <li key={todo.id}>
                {todo.completed ? '✅' : '🟦'} {todo.title}
              </li>
            ))}

          </ul>

        </div>
      )}

      <button onClick={runMutation} disabled={isPending}>
        {isPending ? 'Mutation 実行中...' : 'Mutation を実行する'}
      </button>
      {mutations && (
        <div style={{ marginTop: '15px', background: '#e0ffe0', padding: '10px', borderRadius: '5px' }}>
          <h3>Mutation 結果:</h3> 
          <p><strong>Message:</strong> {mutations.message}</p>
          <p><strong>Server Time:</strong> {mutations.serverTime}</p>
          <h4>Todo 一覧:</h4> 
          <ul>
            {mutations.todos.map((todo) => (
              <li key={todo.id}>  
                {todo.completed ? '✅' : '🟦'} {todo.title
                  }
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}