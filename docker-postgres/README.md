# Docker PostgreSQL

ローカル開発用のPostgreSQL環境。

## 起動

```bash
docker compose up -d
```

## 接続情報

| 項目 | 値 |
|------|-----|
| Host | localhost |
| Port | 15432 |
| User | dev |
| Password | dev |
| Database | devdb |

```bash
# psql で接続
psql -h localhost -p 15432 -U dev -d devdb

# または docker 経由
docker exec -it postgres-dev psql -U dev -d devdb
```

## CRUD確認

```sql
-- Create
INSERT INTO users (name, email) VALUES ('Charlie', 'charlie@example.com');

-- Read
SELECT * FROM users;

-- Update
UPDATE users SET name = 'Alice Smith' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 2;
```

## 停止・削除

```bash
# 停止
docker compose down

# データも削除
docker compose down -v
```

## ファイル構成

```
docker-postgres/
├── docker-compose.yml   # PostgreSQL 16 コンテナ定義
├── init.sql             # 初期化SQL（テーブル作成・サンプルデータ）
└── README.md
```

### 参照関係

```
docker-compose.yml
    │
    ├── image: postgres:16
    │
    └── volumes:
          └── ./init.sql → /docker-entrypoint-initdb.d/init.sql
                           （初回起動時に自動実行）
```
