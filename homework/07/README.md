# 習題 7 — JavaScript 練習（看懂 Blog 網誌範例的關鍵）

## 題目來源

[ccc114b/_wp Issue #17](https://github.com/ccc114b/_wp/issues/17)

## 執行方式

```bash
node 01-object-property.js
node 02-destructuring.js
...
```

---

## 題目 1：物件屬性存取

**目標：** 理解 `post.title` 的運作。

**解答：** `01-object-property.js`

```js
const post = { id: 1, title: 'Hello World', content: 'Markdown content' }

// 點符號
console.log(post.title)

// 中括號
console.log(post['title'])
```

**執行結果：**
```
Hello World
Hello World
```

---

## 題目 2：物件解構賦值

**目標：** 理解 `const { title, content } = req.body;`。

**解答：** `02-destructuring.js`

```js
const req = { body: { title: 'JS教學', content: '內容在此', author: 'Gemini' } }
const { title, content } = req.body
```

**執行結果：**
```
JS教學
內容在此
```

---

## 題目 3：陣列的遍歷與字串拼接

**目標：** 理解部落格首頁如何產生文章列表。

**解答：** `03-foreach-template.js`

```js
const posts = [{ id: 1, t: 'A' }, { id: 2, t: 'B' }]
let html = ''
posts.forEach(post => {
  html += `<div>${post.t}</div>`
})
```

**執行結果：**
```
<div>A</div><div>B</div>
```

---

## 題目 4：字典與動態參數

**目標：** 理解 `req.params.id` 的來源。

**解答：** `04-dictionary.js`

```js
const params = {}
params['id'] = 99
```

**執行結果：**
```
{ id: 99 }
```

---

## 題目 5：Callback 函數傳參 (Error-First)

**目標：** 理解 `getPost(id, callback)` 的非同步設計。

**解答：** `05-callback-params.js`

```js
function fetchData(id, callback) {
  const fakeData = { id, status: 'success' }
  callback(null, fakeData)
}

fetchData(101, (err, data) => {
  if (err) { console.log('發生錯誤：' + err) }
  else { console.log('成功取得資料：', data) }
})
```

**執行結果：**
```
成功取得資料： { id: 101, status: 'success' }
```

---

## 題目 6：JSON 處理

**目標：** 理解 `app.use(express.json())` 在處理什麼。

**解答：** `06-json-parse.js`

```js
const jsonStr = '{"title": "Post 1", "tags": ["js", "node"]}'
const obj = JSON.parse(jsonStr)
console.log(obj.tags[1])
```

**執行結果：**
```
node
```

---

## 題目 7：模擬資料庫查詢

**目標：** 理解 `db.get(sql, params, callback)` 的結構。

**解答：** `07-fake-db.js`

```js
function fakeGet(sql, params, callback) {
  callback(null, { id: 1, title: '掌握 JavaScript 函數', content: '...' })
}

fakeGet('SELECT * FROM posts WHERE id = ?', [1], (err, row) => {
  console.log('抓到的文章標題是：', row.title)
})
```

**執行結果：**
```
抓到的文章標題是： 掌握 JavaScript 函數
```

---

## 題目 8：樣板字串中的邏輯運算

**目標：** 理解 HTML 模板的動態產生。

**解答：** `08-template-logic.js`

```js
const user = 'Guest'
const html = `<h1>Welcome, ${user || 'Stranger'}</h1>`
```

**執行結果：**
```
<h1>Welcome, Guest</h1>
<h1>Welcome, Stranger</h1>
```

---

## 題目 9：陣列的字串切片

**目標：** 理解 `substr` 在 JS 端的預習邏輯。

**解答：** `09-substring.js`

```js
const items = ['Very long content here', 'Another Very long content here', '3rd Very long content here']
items.forEach(item => {
  console.log(item.substring(0, 10) + '...')
})
```

**執行結果：**
```
Very long ...
Another Ve...
3rd Very l...
```

---

## 題目 10：錯誤優先回呼模式

**目標：** 理解程式中不斷出現的 `if (err) return ...`。

**解答：** `10-error-first-callback.js`

```js
function checkAdmin(role, callback) {
  if (role !== 'admin') { callback('Access Denied') }
  else { callback(null, 'Welcome') }
}
```

**執行結果：**
```
錯誤：Access Denied
訊息：Welcome
```

---

## 對照表：題目與 Blog 範例的對應關係

| 題號 | 主題 | 對應 Blog 原始碼 |
|:----:|------|----------------|
| 1 | 物件屬性存取 | `post.title`、`post.content` |
| 2 | 物件解構賦值 | `const { title, content } = req.body` |
| 3 | forEach + 樣板字串 | `posts.forEach` 產生文章列表 HTML |
| 4 | 字典動態參數 | `req.params.id` |
| 5 | Callback 傳參 | `getPost(id, (err, post) => ...)` |
| 6 | JSON 解析 | `express.json()` 解析請求主體 |
| 7 | 模擬資料庫查詢 | `db.get(sql, params, callback)` |
| 8 | 樣板邏輯運算 | 動態 HTML 產生 |
| 9 | 字串切片 | 文章摘要截取 |
| 10 | 錯誤優先回呼 | `if (err) return ...` 模式 |
