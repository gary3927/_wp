# 網頁設計課程 — 平時作業總匯整

## 基本資訊

- **課程：** 網頁設計 (114 學年下學期)
- **教師：** 陳鍾誠
- **學校：** 金門大學資訊工程系
- **學生：** 林楷睿

## AI 使用聲明

- **有無使用 AI：** 有
- **使用工具：** opencode (AI coding assistant)
- **使用方式：** 使用 AI 協助產生程式碼、除錯、撰寫 README 說明文件
- **原創性：** 所有程式皆經由本人理解與測試後提交，AI 輔助生成後已逐一驗證執行結果
- **參考來源：** 無直接複製他人程式碼，部分範例參考課程教材 ccc114b/_wp

---

## 作業總覽

| 作業 | 主題 | 技術重點 | 檔案數 |
|:----:|------|----------|:------:|
| 01 | 個人網頁 | HTML + CSS 排版設計 | 1 |
| 02 | HTML 表單設計 | input types, form, CSS 美化 | 1 |
| 03 | Node.js Hello World | Node.js 基礎、console.log | 2 |
| 04 | 10 個 JavaScript 程式 | if, for, while, function, JSON, Array, Object | 11 |
| 05 | 購物車網站 (3 版本) | HTML → CSS → JS 逐步進化 | 7 |
| 06 | JavaScript 函數練習 | Callback, IIFE, map, filter, HOF, 閉包 | 11 |
| 07 | Blog 範例關鍵練習 | 解構、forEach、JSON、Error-First Callback | 11 |

---

## 作業 01 — 個人網頁

### 檔案

`index.html`

### 說明

使用 HTML 與 CSS 建立個人名片式網頁，包含：

- 個人頭像與姓名
- 關於自我介紹
- 專業技能標籤
- 修課目標列表

### 技術特點

- CSS 漸層背景（`linear-gradient`）
- Flexbox 卡片居中排版
- 圓形頭像（`border-radius: 50%`）
- 自定義項目符號（`::before`）
- 標籤樣式（`skills span`）

---

## 作業 02 — HTML 表單設計

### 檔案

`form.html`

### 說明

設計了一份全功能的 HTML 表單（數位生活習慣與意見調查），涵蓋了 HTML5 各種 input type：

| 題號 | 類型 | 用途 |
|:----:|:----:|------|
| 1 | `type="text"` | 姓名輸入 |
| 2 | `type="password"` | 密碼輸入 |
| 3 | `type="email"` | 電子郵件 |
| 4 | `type="tel"` | 手機號碼 |
| 5 | `type="url"` | 個人網站 |
| 6 | `type="number"` | 年齡 |
| 7 | `type="radio"` | 作業系統選擇 |
| 8 | `type="checkbox"` | 興趣複選 |
| 9 | `type="range"` | 滿意度滑桿 |
| 10 | `type="color"` | 顏色選擇 |
| 11 | `type="date"` | 日期選擇 |
| 12 | `type="time"` | 時間選擇 |
| 13 | `type="week"` | 週次選擇 |
| 14 | `type="month"` | 月份選擇 |
| 15 | `type="file"` | 檔案上傳 |
| 16 | `type="search"` + datalist | 城市搜尋 |
| 17 | `<select>` | 學歷下拉選單 |
| 18 | `<textarea>` | 意見回饋 |

### 學習重點

- HTML5 各種 input type 的用途與瀏覽器行為
- `<fieldset>` / `<legend>` 分組表單
- CSS 美化表單元素
- `pattern` 屬性做正則驗證
- `<datalist>` 提供搜尋建議

---

## 作業 03 — Node.js Hello World

### 檔案

- `hello.js`
- `README.md`

### 程式碼

```js
console.log('hello 你好')
```

### 執行方式

```bash
node hello.js
```

### 輸出

```
hello 你好
```

### 學習重點

- Node.js 環境基礎
- `console.log` 輸出
- 中文字元在終端機的顯示

---

## 作業 04 — 10 個 JavaScript 程式練習

### 檔案

10 個 JS 程式 + README.md

### 程式列表

| 編號 | 檔案 | 主題 | 涵蓋語法 |
|:----:|------|------|----------|
| 1 | `01-if-grade.js` | 分數等第判斷 | if/else |
| 2 | `02-if-leap.js` | 閏年判斷 | if/else |
| 3 | `03-for-sum.js` | 1 加到 N | for |
| 4 | `04-for-table.js` | 九九乘法表 | 巢狀 for |
| 5 | `05-while-factorial.js` | 階乘計算 | while |
| 6 | `06-while-gcd.js` | 最大公因數 | while + function |
| 7 | `07-function-prime.js` | 質數判斷 | function + for |
| 8 | `08-function-celsius.js` | 攝氏/華氏轉換 | function |
| 9 | `09-array-json-students.js` | 學生資料管理 | Array + JSON |
| 10 | `10-object-car.js` | 汽車物件 | Object |

### 學習重點

- JavaScript 基本流程控制（if, for, while）
- 函式定義與呼叫
- 陣列操作（filter, forEach, reduce）
- JSON 物件資料結構

---

## 作業 05 — 購物車網站專案

### 目錄結構

```
homework/05/
├── README.md
├── v1/         ← 純 HTML
├── v2/         ← HTML + CSS
└── v3/         ← HTML + CSS + JS
```

### 版本演進

| 版本 | 技術 | 功能 |
|:----:|:----:|------|
| v1 | HTML only | 靜態商品表格 |
| v2 | HTML + CSS | 卡片式設計、Grid 排版、hover 動畫 |
| v3 | HTML + CSS + JS | 加入購物車、數量增減、總金額計算、購物車徽章 |

### 商品項目

| 編號 | 商品 | 價格 |
|:----:|------|:----:|
| 1 | 無線藍牙耳機 | $1,290 |
| 2 | 機械式鍵盤 | $2,490 |
| 3 | 行動電源 10000mAh | $890 |
| 4 | USB-C 多功能 Hub | $690 |
| 5 | 筆電鋁合金支架 | $1,190 |
| 6 | 電競滑鼠墊 (加大) | $350 |

### 學習重點

- 漸進式增強（Progressive Enhancement）
- CSS Grid/Flexbox 排版
- JavaScript DOM 操作
- 事件處理與狀態管理

---

## 作業 06 — JavaScript 函數與參數練習

### 檔案

10 個 JS 程式 + README.md

### 題目與解答

| 題號 | 主題 | 關鍵技術 |
|:----:|------|----------|
| 1 | Callback 基礎 | `mathTool(num1, num2, action)` |
| 2 | IIFE | 立即執行函數、封閉作用域 |
| 3 | 箭頭函數 + map | `prices.map(p => p * 0.8)` |
| 4 | 破壞性修改 | `pop()` + `unshift()` |
| 5 | Higher-Order Function | `multiplier(factor)` 回傳閉包 |
| 6 | 自製 filter | 手寫 `myFilter(arr, callback)` |
| 7 | 箭頭函數處理物件 | `users.filter(user => user.age >= 18)` |
| 8 | 傳址陷阱 | `push` vs 重新賦值 |
| 9 | 延遲執行 | `setTimeout` + 箭頭函數 |
| 10 | 綜合應用 | `reduce` + Callback 折扣 |

### 學習重點

- Callback 函數的運作機制
- IIFE 封閉作用域
- 箭頭函數簡潔語法
- 傳值 vs 傳參考
- 高階函數（map, filter, reduce）
- 閉包（Closure）

---

## 作業 07 — Blog 網誌範例關鍵練習

### 檔案

10 個 JS 程式 + README.md

### 題目與說明

| 題號 | 主題 | 對應 Blog 原始碼 |
|:----:|------|----------------|
| 1 | 物件屬性存取 | `post.title`、`post.content` |
| 2 | 物件解構賦值 | `const { title, content } = req.body` |
| 3 | forEach + 樣板字串 | `posts.forEach` 產生文章列表 |
| 4 | 字典動態參數 | `req.params.id` |
| 5 | Callback 傳參 | `getPost(id, (err, post) => ...)` |
| 6 | JSON 解析 | `express.json()` 解析請求主體 |
| 7 | 模擬資料庫查詢 | `db.get(sql, params, callback)` |
| 8 | 樣板邏輯運算 | `${user \|\| 'Stranger'}` |
| 9 | 字串切片 | 文章摘要 `substring(0, 10) + '...'` |
| 10 | 錯誤優先回呼 | `if (err) return ...` 模式 |

### 學習重點

- Error-First Callback 模式（Node.js 核心慣例）
- 物件解構賦值（`const { title } = req.body`）
- `JSON.parse` 解析前後端資料交換
- 模擬資料庫查詢流程
- 樣板字串的條件運算

---

## 技術成長歷程

```
01 個人網頁   ──→ HTML + CSS 基礎排版與設計
    │
    ▼
02 HTML 表單  ──→ 認識 HTML5 各種輸入元素與表單設計
    │
    ▼
03 Node.js    ──→ JavaScript 後端執行環境入門
    │
    ▼
04 JS 基礎    ──→ 流程控制、函式、陣列、物件
    │
    ▼
05 購物車網站  ──→ 漸進式前端開發 (HTML → CSS → JS)
    │
    ▼
06 函數進階   ──→ Callback、IIFE、高階函數、閉包
    │
    ▼
07 Blog 實戰  ──→ Error-First Callback、資料庫模擬、解構賦值
```

## 結語

從最基礎的個人網頁與 HTML 表單設計開始，逐步學習 JavaScript 程式設計、前端互動開發，到最後理解 Node.js 後端的 Error-First Callback 模式與資料庫查詢流程。七次作業涵蓋了網頁設計從前端到後端的完整學習路徑。
