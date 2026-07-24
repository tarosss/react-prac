// 💡 5秒間待機させるためのユーティリティ関数
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function createLocalApiMiddleware() {
  const todos = [
    { id: 1, title: 'サンプルタスクs', completed: false },
    { id: 2, title: '次の画面遷移確認', completed: true },
    { id: 3, title: 'React Query 連携テスト', completed: false },
  ];


  const mutationsTodos = [
    { id: 1, title: 'サンプルタスクcsdkdvsv.ccscscsc', completed: false },
    { id: 2, title: '次の画面遷移確認', completed: true },
    { id: 3, title: 'React Query 連携テスト', completed: false },
  ];
  return {
    name: 'vite-local-api',
    configureServer(server) {
      // 💡 async を追加して await を使えるようにします
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/todos')) {
          // 💡 ここで5秒（5000ms）待機します！
          await sleep(100);

          const data = {
            message: 'Vite local API response',
            todos,
            serverTime: new Date().toISOString(),
          };

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return;
        }

        if (req.url.startsWith('/api/mutations') && req.method === 'POST') {
            mutationsTodos.push({ id: mutationsTodos.length + 1, title: 'mutationによって追加されたタスク ', completed: false });    
                      const data = {
                        
            message: 'Vite local API response',
            todos: mutationsTodos,
            serverTime: new Date().toISOString(),
          };

            res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
            return;
        }
        next();
      });
    },
  };
}