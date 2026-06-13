# 習題 6 — JavaScript 函數與參數練習解答

## 題目來源

[ccc114b/_wp Issue #16](https://github.com/ccc114b/_wp/issues/16)

## 執行方式

所有程式使用 Node.js 執行：

```bash
node 01-callback.js
node 02-iife.js
...
```

---

## 題目 1：Callback 基礎實作

**題目：** 建立 `mathTool(num1, num2, action)`，傳入不同匿名函數達成相加與相減。

**解答：** `01-callback.js`

```js
function mathTool(num1, num2, action) {
  return action(num1, num2)
}

const result1 = mathTool(10, 5, function (a, b) { return a + b })
const result2 = mathTool(10, 5, function (a, b) { return a - b })
```

**執行結果：**
```
15
5
```

**觀念：** Callback 函數作為參數傳入，由呼叫端決定行為。

---

## 題目 2：匿名函數與立即執行 (IIFE)

**題目：** 寫出 IIFE，內部定義 `count = 100` 並印出，外部無法存取。

**解答：** `02-iife.js`

```js
;(function () {
  const count = 100
  console.log('Count is: ' + count)
})()
```

**執行結果：**
```
Count is: 100
```

**觀念：** IIFE 建立獨立作用域，變數不會污染全域。

---

## 題目 3：箭頭函數與陣列轉換

**題目：** `prices = [100, 200, 300, 400]`，用 `map` + 箭頭函數打 8 折。

**解答：** `03-arrow-map.js`

```js
const prices = [100, 200, 300, 400]
const discounted = prices.map(p => p * 0.8)
```

**執行結果：**
```
[ 80, 160, 240, 320 ]
```

**觀念：** 箭頭函數簡潔語法，`map` 回傳新陣列不修改原陣列。

---

## 題目 4：陣列參數的「破壞性修改」

**題目：** 寫 `cleanData(arr)` 移除最後元素、最前面加上 `"Start"`。

**解答：** `04-destructive.js`

```js
function cleanData(arr) {
  arr.pop()
  arr.unshift('Start')
}

let myData = [1, 2, 3]
cleanData(myData)
```

**執行結果：**
```
[ 'Start', 1, 2 ]
```

**觀念：** 陣列是傳參考，`pop`/`unshift` 直接修改原陣列。

---

## 題目 5：函數回傳函數 (Higher-Order Function)

**題目：** 寫 `multiplier(factor)` 回傳箭頭函數 `n => n * factor`。

**解答：** `05-higher-order.js`

```js
function multiplier(factor) {
  return n => n * factor
}

const double = multiplier(2)
console.log(double(10)) // 20
```

**執行結果：**
```
20
30
```

**觀念：** 閉包 (Closure) — 回傳的函數記住了 `factor` 變數。

---

## 題目 6：Callback 篩選器 (自製 filter)

**題目：** 手寫 `myFilter(arr, callback)` 模擬 `filter`。

**解答：** `06-my-filter.js`

```js
function myFilter(arr, callback) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) result.push(arr[i])
  }
  return result
}

const filtered = myFilter([1, 5, 8, 12], n => n > 7)
```

**執行結果：**
```
[ 8, 12 ]
```

**觀念：** 了解高階函數 `filter` 的底層實作原理。

---

## 題目 7：箭頭函數處理物件

**題目：** 從 `users` 陣列中篩選出 `age >= 18` 的人。

**解答：** `07-filter-object.js`

```js
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
]

const adults = users.filter(user => user.age >= 18)
```

**執行結果：**
```
[ { name: 'Alice', age: 25 } ]
```

**觀念：** 箭頭函數搭配 `filter` 處理物件陣列。

---

## 題目 8：參數傳址陷阱

**題目：** 解釋 `a.push(99)` 與 `b = [100]` 對原陣列的不同影響。

**解答：** `08-pass-by-ref.js`

```js
let listA = [1, 2]
let listB = [3, 4]

function process(a, b) {
  a.push(99)   // 修改物件內容 → 影響原陣列
  b = [100]     // 重新賦值 → 不影響原陣列
}

process(listA, listB)
```

**執行結果：**
```
listA: [ 1, 2, 99 ]
listB: [ 3, 4 ]
```

**觀念：** JavaScript 是傳值呼叫，但物件型別的值是參考位址。
- `a.push(99)` 透過參考修改同一物件 → 影響原陣列。
- `b = [100]` 讓 `b` 指向新物件，原參考不受影響。

---

## 題目 9：延遲執行的 Callback

**題目：** 用 `setTimeout` 2 秒後印出 `"Task Completed"`。

**解答：** `09-setTimeout.js`

```js
setTimeout(() => {
  const parts = ['Task', 'Completed']
  console.log(parts.join(' '))
}, 2000)
```

**執行結果（2 秒後）：**
```
Task Completed
```

**觀念：** `setTimeout` 接受 callback 作為延遲執行的函數。

---

## 題目 10：綜合應用：計算總價

**題目：** `calculateTotal(cart, discountFunc)` — 加總後套用折扣。

**解答：** `10-calculate-total.js`

```js
function calculateTotal(cart, discountFunc) {
  const sum = cart.reduce((acc, price) => acc + price, 0)
  return discountFunc(sum)
}

const total = calculateTotal([100, 200, 300], function (amount) {
  return amount - 50
})
```

**執行結果：**
```
550
```

**觀念：** `reduce` 加總陣列 + Callback 處理折扣邏輯。

---

## 總結對照表

| 題號 | 主題 | 關鍵技術 |
|:----:|------|----------|
| 1 | Callback 基礎 | 回呼函數參數 |
| 2 | IIFE | 立即執行函數、作用域 |
| 3 | 箭頭函數 + map | `map`、箭頭函數 |
| 4 | 破壞性修改 | `pop`、`unshift`、傳參考 |
| 5 | Higher-Order Function | 回傳函數、閉包 |
| 6 | 自製 filter | 手寫 `filter` |
| 7 | 箭頭函數處理物件 | `filter` + 物件條件 |
| 8 | 傳址陷阱 | 修改 vs 重新賦值 |
| 9 | 延遲執行 | `setTimeout`、`join` |
| 10 | 綜合應用 | `reduce` + Callback |
