'use client';

import { useState } from 'react';
import TodoItem from './todoItem';
import { useCounterStore } from './stores/counterStore';
import Test from './test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
interface Todo {
  id: number;
  text: string;
} 

// 💡 Homeに関係ない一言メッセージ（NoTask）なら、Homeの「外」に定義すれば安全です！
const NoTask = () => <p>タスクはありません。平和です！</p>;

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sample, setSample] = useState<number>(1);
  const [inputText, setInputText] = useState('');
  const { count, increment, decrement } = useCounterStore();
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newTodo: Todo = { id: Date.now(), text: inputText };
    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <main style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1 onClick={() => setSample(sample + 1)}>Next.js Todo App {sample}</h1>
      
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="タスクを入力..fsfs."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>追加</button>
      </form>
        <p onClick={increment}>あ</p>
      {count}
    <Test />
    </main>
  );
}