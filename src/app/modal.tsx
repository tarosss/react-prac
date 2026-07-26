import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Context を作成して開閉状態を共有
const ModalContext = createContext<{
  isOpen: boolean;
  open: () => void;
  close: () => void;
} | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Modal components must be inside <Modal>');
  return context;
}

// 2. 親コンポーネント (状態を管理)
export function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3. 子コンポーネント群 (役割ごとに分割)
Modal.Open = function ModalOpen({ children }: { children: ReactNode }) {
  const { open } = useModalContext();
  return <span onClick={open}>{children}</span>;
};

Modal.Window = function ModalWindow({ children }: { children: ReactNode }) {
  const { isOpen, close } = useModalContext();
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}>
      <div style={{ background: 'white', padding: 20, margin: '100px auto', width: 300 }}>
        <button onClick={close}>✕</button>
        {children}
      </div>
    </div>
  );
};

Modal.Test = ({ children }: { children: ReactNode }) => {
    return (
        <>
        {children}
        <span>これはtestです</span>
        </>
    )
}

// 4. 使う側のコード（順序や追加要素を自由に配置できる！）
export function App() {
  return (
    <Modal>
        <Modal.Test >
            <p>cscs</p>
            <p>おろみどろ</p>
        </Modal.Test>
      <Modal.Open>
        <button>モーダルを開く</button>
      </Modal.Open>

      <Modal.Window>
        <h2>お知らせ</h2>
        <p>自由なコンテンツをここに入れられます。</p>
      </Modal.Window>
    </Modal>
  );
}