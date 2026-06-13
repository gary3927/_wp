# AI 使用聲明

本專案在開發過程中使用了 AI 工具（OpenCode / Claude）協助：

| 項目 | 說明 |
|------|------|
| 程式碼生成 | AI 產生 Tetris 遊戲邏輯（tetris.js）、伺服器端（server.js、db.js）、前端版面（index.html、style.css），由學生審閱與修改 |
| 除錯 | AI 協助診斷 `EADDRINUSE`、better-sqlite3 編譯失敗、Socket.io 事件名稱錯誤等問題 |
| 文件撰寫 | 本 README.md 由 AI 協助產生初稿，學生修改與補充 |

學生 林楷睿 (gary3927) 聲明：以上內容如實填寫，所有程式碼均已理解其運作原理。

---

# 俄羅斯方塊 Tetris + 即時排行榜

![Tetris screenshot](screenshot.png)

> 金門大學 資訊工程學系 期中專題  
> 學生：林楷睿（gary3927）  
> 授課教師：陳鍾誠  
> 課程：網站設計 (Web Programming)  
> 繳交日期：2026/6/14

## 專案簡介

一個網頁版俄羅斯方塊遊戲，搭配即時排行榜系統。支援單人遊戲、分數登錄、即時排行榜更新，以及線上人數顯示。遊戲畫面使用 Canvas 繪製，排行榜透過 WebSocket 即時推送。

### 功能列表

- **遊戲功能**
  - 七種標準方塊（I、O、T、S、Z、J、L）
  - 鍵盤操作（方向鍵左右移動、上旋轉、下加速、空白鍵直接落下）
  - 分數計算：1行=100×等級、2行=300×等級、3行=500×等級、4行=800×等級
  - 等級系統：每消10行升1級，掉落間隔減少80ms（最快80ms）
  - Next 預覽、Ghost piece 輔助線

- **排行榜系統**
  - REST API：GET/POST /api/scores
  - WebSocket 即時推送排行榜更新
  - 顯示前20名高分、最近10筆成績、線上人數

- **部署與維運**
  - 單一 Node.js 服務，同時提供 HTTP + WebSocket
  - JSON 檔案儲存，無需資料庫

## 技術架構

```
┌─────────────────────────────────────────────┐
│              Browser (Client)                │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  │
│  │ Tetris  │  │  Canvas  │  │ Socket.io │  │
│  │  Game   │  │  Render  │  │  Client   │  │
│  └─────────┘  └──────────┘  └───────────┘  │
└──────────────────┬──────────────────────────┘
                   │ HTTP / WebSocket
                   ▼
┌─────────────────────────────────────────────┐
│           Node.js Server (server.js)        │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │ Express  │  │Socket.io │  │   db.js   │ │
│  │  Static  │  │  Events  │  │ JSON File │ │
│  └──────────┘  └──────────┘  └───────────┘ │
└─────────────────────────────────────────────┘
```

- **Frontend**: HTML5 Canvas + Vanilla JavaScript + Socket.io Client
- **Backend**: Node.js + Express + Socket.io
- **Storage**: JSON 檔案 (data/scores.json)
- **Deployment**: 本機執行 (Node.js)

## 本機執行

```bash
# 1. 安裝相依套件
cd homework/midterm
npm install

# 2. 啟動伺服器
node server.js

# 3. 開啟瀏覽器
open http://localhost:3000
```

### 清除分數資料

```bash
rm data/scores.json
```

## API 說明

### GET /api/scores

回傳排行榜前 20 名。

**Response:**
```json
{
  "scores": [
    { "player": "Alice", "score": 9999, "level": 15, "lines": 150, "date": "2026-06-13T..." },
    ...
  ]
}
```

### POST /api/scores

新增一筆分數記錄。

**Request Body:**
```json
{
  "player": "Alice",
  "score": 9999,
  "level": 15,
  "lines": 150
}
```

**Response:**
```json
{ "success": true, "rank": 1 }
```

## WebSocket 事件

| 事件 | 方向 | 說明 |
|------|------|------|
| `new-score` | Client → Server | 送出分數（含 player, score, level, lines） |
| `leaderboard-update` | Server → Client | 前20名排行榜更新 |
| `recent-scores` | Server → Client | 最近10筆成績更新 |
| `online-count` | Server → Client | 目前線上人數 |

## 學習筆記

### Canvas 遊戲迴圈

透過 `requestAnimationFrame` 驅動遊戲更新，每次 frame 檢查時間差決定是否讓方塊自動下落。這種方式比 `setInterval` 更精準且節省資源。

### WebSocket + REST 雙通道

遊戲登錄分數同時支援 REST API（curl/程式呼叫）與 WebSocket（即時多人連線）。WebSocket 連線後會自動推送排行榜給所有在線用戶。

### 無資料庫設計

本來想用 SQLite 儲存分數，但 Windows 編譯 better-sqlite3 需要 C++ 工具鏈。改用 JSON 檔案儲存，讀寫都是同步操作，資料量小（不到 1MB）時效率足夠。

## 參考資料

- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Socket.io 官方文件](https://socket.io/docs/v4/)
- [Express 官方文件](https://expressjs.com/)
- [陳鍾誠 — 網站設計](https://github.com/ccc114b/_wp)
