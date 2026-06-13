# 作業 04：10 個 JavaScript 程式練習

## 使用到的語法

- if / else
- for 迴圈
- while 迴圈
- function (函式)
- JSON
- Array (陣列)
- Object (物件)

---

## 程式列表與執行結果

### 1. 01-if-grade.js — 根據分數給等第 (if)

**程式碼：**

```js
const score = 85

let grade
if (score >= 90) {
  grade = 'A'
} else if (score >= 80) {
  grade = 'B'
} else if (score >= 70) {
  grade = 'C'
} else if (score >= 60) {
  grade = 'D'
} else {
  grade = 'F'
}

console.log(`分數: ${score}`)
console.log(`等第: ${grade}`)
```

**執行結果：**

```
分數: 85
等第: B
```

---

### 2. 02-if-leap.js — 閏年判斷 (if)

**程式碼：**

```js
const year = 2024

let isLeap
if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  isLeap = true
} else {
  isLeap = false
}

console.log(`年份: ${year}`)
console.log(`是否為閏年: ${isLeap}`)
```

**執行結果：**

```
年份: 2024
是否為閏年: true
```

---

### 3. 03-for-sum.js — 1 加到 N (for)

**程式碼：**

```js
const n = 100
let sum = 0

for (let i = 1; i <= n; i++) {
  sum += i
}

console.log(`1 加到 ${n} 的總和 = ${sum}`)
```

**執行結果：**

```
1 加到 100 的總和 = 5050
```

---

### 4. 04-for-table.js — 九九乘法表 (for)

**程式碼：**

```js
console.log('九九乘法表')
console.log('==========')

for (let i = 1; i <= 9; i++) {
  let row = ''
  for (let j = 1; j <= 9; j++) {
    row += `${i}×${j}=${i * j}\t`
  }
  console.log(row)
}
```

**執行結果：**

```
九九乘法表
==========
1×1=1	1×2=2	1×3=3	1×4=4	1×5=5	1×6=6	1×7=7	1×8=8	1×9=9	
2×1=2	2×2=4	2×3=6	2×4=8	2×5=10	2×6=12	2×7=14	2×8=16	2×9=18	
3×1=3	3×2=6	3×3=9	3×4=12	3×5=15	3×6=18	3×7=21	3×8=24	3×9=27	
4×1=4	4×2=8	4×3=12	4×4=16	4×5=20	4×6=24	4×7=28	4×8=32	4×9=36	
5×1=5	5×2=10	5×3=15	5×4=20	5×5=25	5×6=30	5×7=35	5×8=40	5×9=45	
6×1=6	6×2=12	6×3=18	6×4=24	6×5=30	6×6=36	6×7=42	6×8=48	6×9=54	
7×1=7	7×2=14	7×3=21	7×4=28	7×5=35	7×6=42	7×7=49	7×8=56	7×9=63	
8×1=8	8×2=16	8×3=24	8×4=32	8×5=40	8×6=48	8×7=56	8×8=64	8×9=72	
9×1=9	9×2=18	9×3=27	9×4=36	9×5=45	9×6=54	9×7=63	9×8=72	9×9=81	
```

---

### 5. 05-while-factorial.js — 計算階乘 (while)

**程式碼：**

```js
const n = 6
let result = 1
let i = 1

while (i <= n) {
  result *= i
  i++
}

console.log(`${n}! = ${result}`)
```

**執行結果：**

```
6! = 720
```

---

### 6. 06-while-gcd.js — 最大公因數 (while + function)

**程式碼：**

```js
function gcd(a, b) {
  while (b !== 0) {
    let temp = b
    b = a % b
    a = temp
  }
  return a
}

console.log(`gcd(48, 18) = ${gcd(48, 18)}`)
console.log(`gcd(56, 98) = ${gcd(56, 98)}`)
```

**執行結果：**

```
gcd(48, 18) = 6
gcd(56, 98) = 14
```

---

### 7. 07-function-prime.js — 質數判斷 (function + for)

**程式碼：**

```js
function isPrime(n) {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}

for (let i = 1; i <= 20; i++) {
  console.log(`${i} ${isPrime(i) ? '是' : '不是'}質數`)
}
```

**執行結果：**

```
1 不是質數
2 是質數
3 是質數
4 不是質數
5 是質數
6 不是質數
7 是質數
8 不是質數
9 不是質數
10 不是質數
11 是質數
12 不是質數
13 是質數
14 不是質數
15 不是質數
16 不是質數
17 是質數
18 不是質數
19 是質數
20 不是質數
```

---

### 8. 08-function-celsius.js — 攝氏華氏轉換 (function)

**程式碼：**

```js
function cToF(c) {
  return c * 9 / 5 + 32
}

function fToC(f) {
  return (f - 32) * 5 / 9
}

console.log('攝氏 0°C = 華氏 ' + cToF(0) + '°F')
console.log('攝氏 100°C = 華氏 ' + cToF(100) + '°F')
console.log('華氏 32°F = 攝氏 ' + fToC(32) + '°C')
console.log('華氏 212°F = 攝氏 ' + fToC(212) + '°C')
```

**執行結果：**

```
攝氏 0°C = 華氏 32°F
攝氏 100°C = 華氏 212°F
華氏 32°F = 攝氏 0°C
華氏 212°F = 攝氏 100°C
```

---

### 9. 09-array-json-students.js — 學生資料管理 (Array + JSON)

**程式碼：**

```js
const students = [
  { name: 'Alice', age: 20, score: 85 },
  { name: 'Bob', age: 21, score: 92 },
  { name: 'Charlie', age: 19, score: 78 },
  { name: 'Diana', age: 22, score: 95 },
]

console.log('=== 學生資料 ===')
for (let i = 0; i < students.length; i++) {
  const s = students[i]
  console.log(`姓名: ${s.name}, 年齡: ${s.age}, 成績: ${s.score}`)
}

let total = 0
for (let i = 0; i < students.length; i++) {
  total += students[i].score
}
const avg = total / students.length
console.log(`\n平均成績: ${avg.toFixed(1)}`)

const topStudents = students.filter(s => s.score >= 90)
console.log(`\n優秀學生 (成績 ≥ 90):`)
topStudents.forEach(s => console.log(`  ${s.name} - ${s.score}分`))
```

**執行結果：**

```
=== 學生資料 ===
姓名: Alice, 年齡: 20, 成績: 85
姓名: Bob, 年齡: 21, 成績: 92
姓名: Charlie, 年齡: 19, 成績: 78
姓名: Diana, 年齡: 22, 成績: 95

平均成績: 87.5

優秀學生 (成績 ≥ 90):
  Bob - 92分
  Diana - 95分
```

---

### 10. 10-object-car.js — 汽車物件 (Object)

**程式碼：**

```js
const car = {
  brand: 'Toyota',
  model: 'Corolla',
  year: 2024,
  speed: 0,

  accelerate(amount) {
    this.speed += amount
    console.log(`加速 ${amount} km/h，目前時速: ${this.speed} km/h`)
  },

  brake(amount) {
    this.speed = Math.max(0, this.speed - amount)
    console.log(`減速 ${amount} km/h，目前時速: ${this.speed} km/h`)
  },

  displayInfo() {
    console.log(`品牌: ${this.brand}`)
    console.log(`型號: ${this.model}`)
    console.log(`年份: ${this.year}`)
    console.log(`目前時速: ${this.speed} km/h`)
  },
}

car.displayInfo()
console.log('---')
car.accelerate(30)
car.accelerate(20)
car.brake(15)
console.log('---')
car.displayInfo()
```

**執行結果：**

```
品牌: Toyota
型號: Corolla
年份: 2024
目前時速: 0 km/h
---
加速 30 km/h，目前時速: 30 km/h
加速 20 km/h，目前時速: 50 km/h
減速 15 km/h，目前時速: 35 km/h
---
品牌: Toyota
型號: Corolla
年份: 2024
目前時速: 35 km/h
```

---

## 涵蓋語法對照表

| 程式 | if/else | for | while | function | JSON | Array | Object |
|------|:-------:|:---:|:-----:|:--------:|:----:|:-----:|:------:|
| 01-if-grade | ✅ | | | | | | |
| 02-if-leap | ✅ | | | | | | |
| 03-for-sum | | ✅ | | | | | |
| 04-for-table | | ✅ | | | | | |
| 05-while-factorial | | | ✅ | | | | |
| 06-while-gcd | | | ✅ | ✅ | | | |
| 07-function-prime | | ✅ | | ✅ | | | |
| 08-function-celsius | | | | ✅ | | | |
| 09-array-json-students | | ✅ | | | ✅ | ✅ | |
| 10-object-car | | | | ✅ | | | ✅ |
