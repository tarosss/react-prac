import { create } from 'zustand';
import { devtools } from 'zustand/middleware'; // 👈 インポート

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>()(
  devtools(
    (set) => ({
      count: 0,
      
      // 💡 set() の第2引数に false、第3引数に「アクション名」を書きます！
      increment: () => set((state) => ({ count: state.count + 1 }), false, 'counter/increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, 'counter/decrement'),
    })
  )
);