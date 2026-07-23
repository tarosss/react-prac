# ベースイメージの指定
FROM node:20-alpine

# コンテナ内の作業ディレクトリを設定
WORKDIR /app

# コマンド実行用のシェルをbashに指定（任意）
RUN apk update && apk add bash

# ポートの開放（Viteのデフォルトは5173）
EXPOSE 5173

# コンテナ起動時に開発サーバーを実行
CMD ["npm", "run", "dev"]