# 網頁設計 — 期中專題建議報告

## 目錄

1. [前言](#1-前言)
2. [專案類型總覽](#2-專案類型總覽)
3. [網誌型專案 (Blog)](#3-網誌型專案-blog)
4. [社群軟體 (Social Media)](#4-社群軟體-social-media)
5. [商店系統 (E-commerce)](#5-商店系統-e-commerce)
6. [郵件系統 (Gmail-like)](#6-郵件系統-gmail-like)
7. [結合 AI 之應用](#7-結合-ai-之應用)
8. [校務系統](#8-校務系統)
9. [搜尋引擎](#9-搜尋引擎)
10. [GitHub-like 平台](#10-github-like-平台)
11. [遊戲 + 排名伺服器](#11-遊戲--排名伺服器)
12. [技術棧比較表](#12-技術棧比較表)
13. [總結與建議](#13-總結與建議)

---

## 1. 前言

本報告針對「程式專案 + 報告 + 學習筆記」之需求，提出九種不同類型的網頁專案建議。每個專案皆包含：

- **專案簡介**：做什麼、給誰用
- **技術棧建議**：前端 / 後端 / 資料庫 / 部署
- **Server 端技術**：至少一種 Server 端語言或框架（Node.js、FastAPI、Rust、Next.js...）
- **核心功能**：MVP 階段應實現的功能
- **學習筆記方向**：可以深入研究的技術主題

---

## 2. 專案類型總覽

| 編號 | 專案類型 | 建議 Server 技術 | 難度 | 適合人數 |
|:----:|----------|:----------------:|:----:|:--------:|
| 1 | 網誌 (Blog) | Next.js / Node.js + Express | ★★☆ | 1~2 人 |
| 2 | 社群軟體 | Node.js + Socket.io | ★★★ | 2~3 人 |
| 3 | 商店系統 | FastAPI / Node.js | ★★☆ | 1~2 人 |
| 4 | 郵件系統 | Rust (Actix) / Node.js | ★★★★ | 2~3 人 |
| 5 | AI 應用 | FastAPI + Ollama | ★★★ | 1~2 人 |
| 6 | 校務系統 | Next.js + Prisma | ★★★ | 2~3 人 |
| 7 | 搜尋引擎 | Rust / FastAPI | ★★★★ | 2~3 人 |
| 8 | GitHub-like 平台 | Rust / Node.js + Git | ★★★★★ | 3~4 人 |
| 9 | 遊戲 + 排名 | Node.js + WebSocket | ★★☆ | 1~2 人 |

---

## 3. 網誌型專案 (Blog)

### 專案簡介

建立一個支援 Markdown 撰寫、標籤分類、留言互動的個人或多人部落格平台。

### 技術棧建議

```
前端：     Next.js (React) / Tailwind CSS
後端：     Next.js API Routes 或 Node.js + Express
資料庫：   SQLite (開發) → PostgreSQL (正式)
認證：     NextAuth.js 或 JWT
部署：     Vercel / Railway
```

### Server 技術 — Next.js (Node.js)

```typescript
// pages/api/posts.ts — API Route 範例
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      include: { author: true, tags: true },
      orderBy: { createdAt: 'desc' }
    })
    res.status(200).json(posts)
  } else if (req.method === 'POST') {
    const { title, content, tags } = req.body
    const post = await prisma.post.create({
      data: { title, content, tags: { connect: tags } }
    })
    res.status(201).json(post)
  }
}
```

### 核心功能

- 使用者註冊 / 登入
- Markdown 編輯器（可選用 MDX）
- 文章 CRUD
- 標籤分類與搜尋
- 留言系統
- RSS Feed

### 學習筆記方向

- Next.js SSR / SSG / ISR 差異
- Prisma ORM 用法
- Markdown 解析（remark / rehype）
- JWT 認證流程

---

## 4. 社群軟體 (Social Media)

### 專案簡介

微型社群平台，支援發文、按讚、追蹤、即時聊天，類似 Twitter 或 Threads。

### 技術棧建議

```
前端：     React (Vite) + Tailwind CSS
後端：     Node.js + Express + Socket.io
資料庫：   PostgreSQL + Redis (快取)
即時通訊： WebSocket (Socket.io)
檔案儲存： Cloudinary 或本地 multer
```

### Server 技術 — Node.js + Socket.io

```javascript
// server.js — 即時聊天與通知
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

io.use((socket, next) => {
  const token = socket.handshake.auth.token
  // 驗證 JWT ...
  next()
})

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId)
  })

  socket.on('send-message', (data) => {
    io.to(data.roomId).emit('new-message', data)
  })

  socket.on('like-post', (postId) => {
    // 廣播按讚通知給貼文作者
    socket.to(postId).emit('notification', { type: 'like' })
  })
})

server.listen(3000)
```

### 核心功能

- 使用者個人檔案
- 發文 / 刪文 / 編輯
- 按讚 / 倒讚
- 追蹤 / 粉絲
- 即時一對一聊天
- 通知系統

### 學習筆記方向

- WebSocket 雙向通訊原理
- Redis 即時資料處理
- 訊息佇列（Bull / RabbitMQ）
- Feed 流演算法

---

## 5. 商店系統 (E-commerce)

### 專案簡介

從一頁式商店到完整電商平台，支援商品管理、購物車、訂單與金流。

### 技術棧建議

```
前端：     React / Next.js + Tailwind CSS
後端：     FastAPI (Python) 或 Node.js + Express
資料庫：   PostgreSQL 或 MongoDB
金流：     TapPay / 綠界 SDK
部署：     Docker + Railway / Fly.io
```

### Server 技術 — FastAPI (Python)

```python
# main.py — FastAPI 購物車 API
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
import databases
import sqlalchemy

app = FastAPI()
database = databases.Database("sqlite:///shop.db")

class CartItem(BaseModel):
    product_id: int
    quantity: int

class Order(BaseModel):
    items: List[CartItem]
    total: float

@app.post("/api/cart/add")
async def add_to_cart(item: CartItem, user_id: int = Depends(get_current_user)):
    query = """
        INSERT INTO cart (user_id, product_id, quantity)
        VALUES (:user_id, :product_id, :quantity)
        ON CONFLICT(user_id, product_id)
        DO UPDATE SET quantity = cart.quantity + :quantity
    """
    await database.execute(query, {
        "user_id": user_id,
        "product_id": item.product_id,
        "quantity": item.quantity
    })
    return {"status": "ok"}

@app.post("/api/orders/create")
async def create_order(order: Order, user_id: int = Depends(get_current_user)):
    order_id = await database.execute(
        "INSERT INTO orders (user_id, total) VALUES (:user_id, :total)",
        {"user_id": user_id, "total": order.total}
    )
    for item in order.items:
        await database.execute(
            "INSERT INTO order_items (order_id, product_id, quantity) VALUES (:oid, :pid, :qty)",
            {"oid": order_id, "pid": item.product_id, "qty": item.quantity}
        )
    return {"order_id": order_id, "status": "created"}
```

### 核心功能

- 商品列表（含分類、篩選）
- 購物車 CRUD
- 結帳流程
- 訂單查詢
- 賣家後台管理
- 搜尋功能

### 學習筆記方向

- FastAPI 非同步處理
- RESTful API 設計
- 資料庫正規化
- 金流串接流程

---

## 6. 郵件系統 (Gmail-like)

### 專案簡介

Web 郵件客戶端，支援收發信、資料夾分類、標籤、搜尋，模擬 Gmail 核心功能。

### 技術棧建議

```
前端：     React (Vite) + Tailwind CSS
後端：     Rust (Actix-web / Axum) 或 Node.js
資料庫：   PostgreSQL
郵件協定： IMAP / SMTP (模擬)
全文搜尋： PostgreSQL FTS 或 Elasticsearch
```

### Server 技術 — Rust (Axum)

```rust
// src/main.rs — Rust Axum 郵件 API
use axum::{
    extract::{Path, State},
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

#[derive(Serialize, Deserialize)]
struct Email {
    id: i64,
    subject: String,
    sender: String,
    content: String,
    folder: String,
    is_read: bool,
}

async fn list_emails(
    State(pool): State<PgPool>,
    Path(folder): Path<String>,
) -> Json<Vec<Email>> {
    let emails = sqlx::query_as::<_, Email>(
        "SELECT * FROM emails WHERE folder = $1 ORDER BY created_at DESC"
    )
    .bind(&folder)
    .fetch_all(&pool)
    .await
    .unwrap();

    Json(emails)
}

async fn send_email(
    State(pool): State<PgPool>,
    Json(email): Json<Email>,
) -> Json<String> {
    sqlx::query(
        "INSERT INTO emails (subject, sender, content, folder) VALUES ($1, $2, $3, 'inbox')"
    )
    .bind(&email.subject)
    .bind(&email.sender)
    .bind(&email.content)
    .execute(&pool)
    .await
    .unwrap();

    Json("sent".to_string())
}

#[tokio::main]
async fn main() {
    let pool = PgPool::connect("postgres://...").await.unwrap();
    let app = Router::new()
        .route("/api/emails/{folder}", get(list_emails))
        .route("/api/emails/send", post(send_email))
        .with_state(pool);

    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
```

### 核心功能

- 收件匣 / 寄件備份 / 垃圾桶
- 撰寫與發送郵件
- 郵件標籤與分類
- 全文搜尋
- 已讀 / 未讀標記

### 學習筆記方向

- Rust 所有權與並發模型
- Axum 框架設計模式
- IMAP/SMTP 協議
- 資料庫全文檢索

---

## 7. 結合 AI 之應用

### 專案簡介

整合大型語言模型（LLM），提供 AI 聊天、摘要、翻譯、程式碼生成等智慧功能。

### 技術棧建議

```
前端：     Next.js / React + Tailwind CSS
後端：     FastAPI (Python) — 最適合 AI 整合
AI 模型：  Ollama (本地) 或 NVIDIA API / OpenAI API
資料庫：   PostgreSQL + pgvector (向量搜尋)
部署：     Docker + GPU 伺服器
```

### Server 技術 — FastAPI + Ollama

```python
# ai_service.py — FastAPI AI 服務
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import ollama  # 本地 Ollama
# 或使用 NVIDIA API / OpenAI API

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
    model: str = "llama3.2"  # 或 mistral, phi3 等

class ChatResponse(BaseModel):
    reply: str
    model: str

class SummaryRequest(BaseModel):
    text: str
    max_length: int = 200

@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    response = ollama.chat(model=req.model, messages=[
        {"role": "user", "content": req.message}
    ])
    return ChatResponse(reply=response["message"]["content"], model=req.model)

@app.post("/api/summarize")
async def summarize(req: SummaryRequest):
    prompt = f"請用中文將以下文字摘要成不超過{req.max_length}字：\n{req.text}"
    response = ollama.chat(model="llama3.2", messages=[
        {"role": "user", "content": prompt}
    ])
    return {"summary": response["message"]["content"]}

@app.post("/api/translate")
async def translate(text: str, target_lang: str = "zh-TW"):
    response = ollama.chat(model="llama3.2", messages=[
        {"role": "user", "content": f"Translate to {target_lang}: {text}"}
    ])
    return {"translated": response["message"]["content"]}
```

### 核心功能

- AI 聊天機器人
- 文章摘要 / 改寫
- 翻譯功能
- 程式碼生成與解釋
- RAG（檢索增強生成）— 上傳文件後問答

### 學習筆記方向

- LLM API 串接（Ollama / OpenAI / NVIDIA）
- Prompt Engineering
- RAG 架構與向量資料庫
- Stream / SSE 串流回應

---

## 8. 校務系統

### 專案簡介

學校行政系統，包含選課、成績查詢、課程管理、教師與學生角色權限管理。

### 技術棧建議

```
前端：     Next.js + Tailwind CSS + Shadcn/ui
後端：     Next.js API Routes 或 Node.js + Express
資料庫：   PostgreSQL
ORM：      Prisma
認證：     NextAuth.js (支援學校帳號)
角色：     Admin / Teacher / Student
```

### 核心功能

- 角色權限管理（RBAC）
- 課程 CRUD
- 選課系統（學生選課 / 退選）
- 成績輸入與查詢
- 課表檢視
- 公告系統

### 學習筆記方向

- RBAC 權限模型設計
- Prisma 多對多關係
- 資料庫交易（選課避免超修）
- Next.js Middleware 權限控制

---

## 9. 搜尋引擎

### 專案簡介

自建全文搜尋引擎，支援網頁爬取、索引建立、關鍵字搜尋、排名。

### 技術棧建議

```
後端：     Rust (Tantivy) 或 FastAPI + Whoosh
爬蟲：     Python (Scrapy / BeautifulSoup)
索引：     Tantivy (Rust) / Elasticsearch
前端：     React + Tailwind CSS
資料庫：   PostgreSQL (儲存原始資料)
```

### Server 技術 — Rust (Tantivy)

```rust
// search.rs — Tantivy 搜尋引擎
use tantivy::collector::TopDocs;
use tantivy::query::QueryParser;
use tantivy::schema::*;
use tantivy::{doc, Index, IndexWriter, ReloadPolicy};

pub struct SearchEngine {
    index: Index,
    schema: Schema,
}

impl SearchEngine {
    pub fn new() -> Self {
        let mut schema_builder = Schema::builder();
        schema_builder.add_text_field("title", TEXT | STORED);
        schema_builder.add_text_field("body", TEXT);
        schema_builder.add_text_field("url", STRING | STORED);
        let schema = schema_builder.build();
        let index = Index::create_in_ram(schema.clone());

        SearchEngine { index, schema }
    }

    pub fn add_document(&self, title: &str, body: &str, url: &str) {
        let mut writer: IndexWriter = self.index.writer(50_000_000).unwrap();
        let title_field = self.schema.get_field("title").unwrap();
        let body_field = self.schema.get_field("body").unwrap();
        let url_field = self.schema.get_field("url").unwrap();

        writer.add_document(doc!(
            title_field => title,
            body_field => body,
            url_field => url,
        ));
        writer.commit().unwrap();
    }

    pub fn search(&self, query_str: &str, num_results: usize) -> Vec<String> {
        let reader = self.index
            .reader_builder()
            .reload_policy(ReloadPolicy::OnCommitWithDelay)
            .try_into()
            .unwrap();

        let searcher = reader.searcher();
        let title = self.schema.get_field("title").unwrap();
        let body = self.schema.get_field("body").unwrap();
        let query_parser = QueryParser::for_index(&self.index, vec![title, body]);

        let query = query_parser.parse_query(query_str).unwrap();
        let top_docs = searcher.search(&query, &TopDocs::with_limit(num_results)).unwrap();

        top_docs
            .into_iter()
            .map(|(_score, doc_address)| {
                let doc = searcher.doc::<TantivyDocument>(doc_address).unwrap();
                // 取出 URL 等資訊
                String::new()
            })
            .collect()
    }
}
```

### 核心功能

- 網頁爬蟲（可限定特定網站）
- 倒排索引建立
- 關鍵字搜尋 + 高亮
- 搜尋結果排名（TF-IDF / BM25）
- 分頁與過濾

### 學習筆記方向

- 資訊檢索理論（倒排索引、TF-IDF、BM25）
- Tantivy / Elasticsearch 底層原理
- 爬蟲與 robots.txt 規範
- 中文分詞（jieba / ckip）

---

## 10. GitHub-like 平台

### 專案簡介

簡化版的程式碼託管平台，支援 repository 管理、檔案瀏覽、Issue 追蹤與 Pull Request。

### 技術棧建議

```
前端：     React / Next.js + Monaco Editor (程式碼編輯器)
後端：     Rust (Axum) 或 Node.js + Express
資料庫：   PostgreSQL
儲存：     物件儲存 (S3 / MinIO)
Git 操作： libgit2 (Rust) 或 isomorphic-git (JS)
認證：     SSH Key / OAuth
```

### 核心功能

- Repository 建立 / clone / push
- 檔案瀏覽與線上編輯
- Commit 歷史檢視
- Issue 與 Milestone
- Pull Request + Code Review
- Fork / Star / Watch

### 學習筆記方向

- Git 內部原理（blob / tree / commit 物件）
- libgit2 或 isomorphic-git
- 分散式版本控制概念
- SSH 金鑰認證流程

---

## 11. 遊戲 + 排名伺服器

### 專案簡介

一款簡單的網頁遊戲（例如 猜數字、打地鼠、賽車、俄羅斯方塊），搭配後端排名系統，玩家可看到全球排行榜。

### 技術棧建議

```
前端：     Phaser.js (遊戲引擎) 或 純 Canvas + React
後端：     Node.js + Express + WebSocket
即時排名： WebSocket 廣播即時排名更新
資料庫：   SQLite (開發) / PostgreSQL (正式)
排行榜：   Redis Sorted Set (即時排名)
```

### Server 技術 — Node.js + WebSocket + Redis

```javascript
// game-server.js — 遊戲排名伺服器
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const Redis = require('ioredis')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const redis = new Redis()

// 使用 Redis Sorted Set 儲存排行榜
// key: "leaderboard", score: 分數, member: 玩家名稱

io.on('connection', (socket) => {
  // 新玩家連線，發送目前前十名
  socket.on('join', async (playerName) => {
    socket.playerName = playerName
    const top10 = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES')
    socket.emit('leaderboard', top10)
  })

  // 遊戲結束，提交分數
  socket.on('submit-score', async (score) => {
    const name = socket.playerName
    await redis.zadd('leaderboard', score, name)

    // 廣播更新排行榜給所有玩家
    const top10 = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES')
    io.emit('leaderboard', top10)

    // 通知該玩家他的排名
    const rank = await redis.zrevrank('leaderboard', name)
    socket.emit('your-rank', rank + 1)
  })

  // 即時多人遊戲配對
  socket.on('find-match', () => {
    // 配對邏輯...
  })
})

server.listen(3001, () => {
  console.log('Game server running on port 3001')
})
```

### 建議遊戲類型

| 遊戲 | 複雜度 | 說明 |
|------|:------:|------|
| 猜數字 | ★☆☆ | 出題 → 猜測 → 提示 |
| 打地鼠 | ★★☆ | Canvas 動畫 + 計分 |
| 2048 | ★★☆ | 鍵盤操作 + 合併邏輯 |
| 貪食蛇 | ★★☆ | 多人大廳 + 最高分 |
| 俄羅斯方塊 | ★★★ | 旋轉/落下 + 排名 |
| 射擊小遊戲 | ★★★ | Canvas + 即時對戰 |

### 核心功能

- 遊戲主邏輯（瀏覽器端）
- 分數提交 API
- 即時排行榜
- 玩家個人最高分記錄
- 遊戲大廳 / 配對

### 學習筆記方向

- Canvas / Phaser.js 遊戲開發
- WebSocket 即時通訊
- Redis Sorted Set 排行榜原理
- 遊戲迴圈 (Game Loop) 設計

---

## 12. 技術棧比較表

| 技術 | 優勢 | 劣勢 | 適合專案 |
|:----:|------|------|----------|
| **Node.js** | 生態豐富、學習曲線低、NPM 套件多 | 單執行緒、CPU 密集不適合 | Blog、商店、聊天、遊戲 |
| **Next.js** | SSR/SSG/ISR、全端框架、Vercel 部署 | 抽象層較多、複雜度中等 | Blog、電商、校務系統 |
| **FastAPI** (Python) | 高效能 Async、自動 API 文件、AI 生態佳 | Python Runtime 較慢 | AI 應用、商店 API |
| **Rust** (Axum/Actix) | 極高效能、記憶體安全、無 GC | 學習曲線陡峭、開發較慢 | 郵件系統、搜尋引擎、Git 平台 |
| **Python + Scrapy** | 爬蟲生態最強 | 非同步較弱 | 搜尋引擎爬蟲 |
| **Redis** | 記憶體資料庫、極快 | 資料量受限、持久化需注意 | 排行榜、快取、即時資料 |

---

## 13. 總結與建議

### 選擇建議

| 你的目標 | 推薦專案 |
|----------|----------|
| 想學前端 + 後端整合 | 網誌 (Next.js) 或 商店 (FastAPI) |
| 想學即時通訊 | 社群軟體 (Socket.io) |
| 想學 AI / LLM 串接 | AI 應用 (FastAPI + Ollama) |
| 想學 Rust / 高效能後端 | 搜尋引擎 或 GitHub-like |
| 想學遊戲開發 | 遊戲 + 排名伺服器 |
| 想學資料庫設計 | 校務系統 或 郵件系統 |

### 學習路徑建議

```
第一週： 規劃 + 環境建置 + 資料庫設計
第二週： 前端頁面 + 基礎 API
第三週： 核心功能整合
第四週： 進階功能 + 測試
第五週： 部署 + 效能優化
第六週： 撰寫報告 + 整理學習筆記
```

### 報告應包含

1. **專案簡介** — 動機、目標、功能列表
2. **技術架構圖** — Frontend / Backend / Database 關係
3. **各功能實作說明** — 附程式碼片段
4. **測試結果** — API 測試 / 畫面截圖
5. **遇到的問題與解決方式**
6. **學習心得** — 學到了什麼、哪些可以做得更好
7. **參考資料** — 教材、文件、文章連結
