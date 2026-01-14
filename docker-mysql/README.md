# Docker MySQL

ローカル開発用のMySQL環境。

## 起動

```bash
docker compose up -d
```

## 接続情報

| 項目 | 値 |
|------|-----|
| Host | localhost |
| Port | 13306 |
| User | dev |
| Password | dev |
| Database | devdb |

```bash
# mysql で接続
mysql -h 127.0.0.1 -P 13306 -u dev -pdev devdb

# または docker 経由
docker exec -it mysql-dev mysql -u dev -pdev devdb
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
docker-mysql/
├── docker-compose.yml   # MySQL 8 コンテナ定義
├── init.sql             # 初期化SQL（テーブル作成・サンプルデータ）
└── README.md
```

### 参照関係

```
docker-compose.yml
    │
    ├── image: mysql:8
    │
    └── volumes:
          └── ./init.sql → /docker-entrypoint-initdb.d/init.sql
                           （初回起動時に自動実行）
```
