# React GitHub Pages Deploy サンプル

ReactアプリをGitHub Pagesにデプロイするための最小構成サンプル。

## ファイル構成と参照関係

```
react-gh-pages-deploy/
├── index.html          ─┐
├── package.json         │
├── tsconfig.json        │  設定ファイル群
├── webpack.config.js   ─┘
├── src/
│   └── index.tsx        ← ソースコード
└── dist/
    └── index.js         ← ビルド成果物
```

### ファイル間の参照関係

```
┌─────────────────────────────────────────────────────────────────┐
│  ビルド時の流れ                                                  │
│                                                                 │
│  webpack.config.js                                              │
│       │                                                         │
│       │ entry: "./src/index.tsx"                                │
│       ▼                                                         │
│  src/index.tsx  ──[ts-loader]──▶  dist/index.js                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  実行時の流れ                                                    │
│                                                                 │
│  ブラウザが index.html を読み込む                                │
│       │                                                         │
│       │ <script src="./dist/index.js">                         │
│       ▼                                                         │
│  dist/index.js が実行される                                     │
│       │                                                         │
│       │ document.getElementById("app")                         │
│       ▼                                                         │
│  <div id="app"> に React がマウントされる                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 各ファイルの役割

| ファイル | 役割 | 参照先/参照元 |
|---------|------|-------------|
| `index.html` | HTMLテンプレート | `dist/index.js` を読み込む |
| `webpack.config.js` | ビルド設定 | `src/index.tsx` を入力、`dist/index.js` を出力 |
| `tsconfig.json` | TypeScript設定 | ts-loader から参照される |
| `package.json` | 依存関係・スクリプト | npm コマンドで使用 |
| `src/index.tsx` | Reactアプリ本体 | webpack のエントリーポイント |
| `dist/index.js` | バンドル済みJS | index.html から読み込まれる |

## 使い方

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動 (localhost:8080)
npm start

# 本番ビルド
npm run build

# デプロイ (dist をコミットしてプッシュ)
npm run deploy
```

## GitHub Pages の注意点・制限事項

### 1. SSR（サーバーサイドレンダリング）は不可

GitHub Pages は**静的ファイルのみ**を配信します。Node.js などのサーバー実行環境がないため、SSRはできません。

**代替案:**
- Next.js の SSG（Static Site Generation）を使う
- Vercel / Netlify など SSR 対応のホスティングを使う

### 2. SPA のルーティング問題

GitHub Pages は存在しないパスへのアクセスで 404 を返します。

| 方式 | URL例 | 対応方法 |
|-----|-------|---------|
| HashRouter | `/#/about` | 設定不要（このサンプルでは未使用） |
| BrowserRouter | `/about` | 404.html のハックが必要 |

このサンプルはルーティングなしの単一ページ構成です。

### 3. API サーバーは別途必要

バックエンド API が必要な場合は、別サービス（Vercel, Railway, Render 等）でホスティングしてください。

### 4. SEO に不利

SPAは初回HTMLにコンテンツが含まれないため、検索エンジンのクロールに不利です。SEOが重要な場合は SSG を検討してください。

### 5. カスタムドメイン

`CNAME` ファイルをリポジトリルートに置くことで、カスタムドメインを設定できます。

## 依存関係について

| パッケージ | 用途 | 必須度 |
|-----------|------|-------|
| react, react-dom | React本体 | 必須 |
| typescript, ts-loader | TypeScript対応 | 必須 |
| webpack, webpack-cli, webpack-dev-server | ビルド・開発サーバー | 必須 |
| @types/* | 型定義 | TypeScript使用時必須 |
| react-router-dom | ルーティング | 複数ページ時のみ |
| styled-components | CSS-in-JS | 任意 |
| react-markdown | Markdown表示 | 任意 |
| dexie | IndexedDB | 任意 |
