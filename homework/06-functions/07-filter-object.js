// 7. 箭頭函數處理物件

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
]

const adults = users.filter(user => user.age >= 18)
console.log(adults)
// [{ name: 'Alice', age: 25 }]
