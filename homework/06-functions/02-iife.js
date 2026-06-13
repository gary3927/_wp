// 2. 匿名函數與立即執行 (IIFE)

;(function () {
  const count = 100
  console.log('Count is: ' + count)
})()

// 外部無法存取 count
// console.log(count) // ReferenceError: count is not defined
