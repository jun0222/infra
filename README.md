# infra

インフラリソースと手順書のサンプルリポジトリ。ローカル開発環境の構築やCI/CDパイプラインの設定テンプレートを提供する。

## ディレクトリ構成

```
infra/
├── docker-mysql/          # MySQL ローカル開発環境
├── docker-postgres/       # PostgreSQL ローカル開発環境
├── github-actions/        # GitHub Actions ワークフローテンプレート
├── react-gh-pages-deploy/ # React + GitHub Pages デプロイサンプル
└── Makefile               # 共通コマンド
```

## 各リソースの概要

### docker-mysql/

ローカル開発用 MySQL 8 環境。Docker Compose で起動し、初期データ投入済み。

- **用途**: アプリケーション開発時のローカルDB
- **ポート**: 13306
- **詳細**: [docker-mysql/README.md](./docker-mysql/README.md)

### docker-postgres/

ローカル開発用 PostgreSQL 16 環境。Docker Compose で起動し、初期データ投入済み。

- **用途**: アプリケーション開発時のローカルDB
- **ポート**: 15432
- **詳細**: [docker-postgres/README.md](./docker-postgres/README.md)

### github-actions/

GitHub Actions ワークフローのテンプレート集。

#### blogsync-to-deploy-vercel/

はてなブログの記事を blogsync で取得し、Vercel にデプロイするワークフロー。

| ファイル | 説明 |
|---------|------|
| `blogsync-and-build.yml` | ブログ記事の同期とビルド |
| `vercel-deploy.yml` | Vercel への自動デプロイ（記事同期含む） |

**必要な Secrets**: `BSY`, `DOMAIN`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

### react-gh-pages-deploy/

React アプリを GitHub Pages にデプロイするための最小構成サンプル。

- **用途**: 静的サイトのホスティング
- **技術スタック**: React, TypeScript, Webpack
- **詳細**: [react-gh-pages-deploy/README.md](./react-gh-pages-deploy/README.md)

## クイックスタート

```bash
# MySQL を起動
cd docker-mysql && docker compose up -d

# PostgreSQL を起動
cd docker-postgres && docker compose up -d

# React サンプルを起動
cd react-gh-pages-deploy && npm install && npm start
```

## ファイル間の依存関係

```
┌─────────────────────────────────────────────────────────────┐
│  docker-mysql/, docker-postgres/                            │
│  └── docker-compose.yml → init.sql（初回起動時に実行）       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  react-gh-pages-deploy/                                     │
│  └── webpack.config.js → src/index.tsx → dist/index.js     │
│  └── index.html → dist/index.js（ブラウザで読み込み）        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  github-actions/blogsync-to-deploy-vercel/                  │
│  └── blogsync-and-build.yml: 記事同期 → ビルド              │
│  └── vercel-deploy.yml: 記事同期 → ビルド → Vercel デプロイ │
└─────────────────────────────────────────────────────────────┘
```

## コーディングエージェント向け情報

### このリポジトリの目的

- ローカル開発環境のテンプレート提供
- CI/CD パイプラインの設定例
- デプロイ手順のドキュメント化

### 作業時の注意点

- 各サブディレクトリは独立しており、個別にコピーして使用可能
- DB の接続情報は開発用のため、本番環境では変更が必要
- GitHub Actions のワークフローは Secrets の設定が必要

### 関連技術

| カテゴリ | 技術 |
|---------|------|
| コンテナ | Docker, Docker Compose |
| データベース | MySQL 8, PostgreSQL 16 |
| フロントエンド | React, TypeScript, Webpack |
| CI/CD | GitHub Actions |
| ホスティング | GitHub Pages, Vercel |
| ブログ同期 | blogsync (はてなブログ) |
