'use client'; // 💡 Vueの単一ファイルコンポーネントのように、クライアント側で動かす宣言

export default function TodoItem({ todo, onDelete }: { todo: { id: number; text: string }; onDelete: (id: number) => void }) {
    console.log('これはTodoItemコンポーネントです。todo:', todo);
    return (
        
        <div>
            <span>{todo.text}</span>
            <button onClick={() => onDelete(todo.id)}>削除</button>
        </div>
    )
}
