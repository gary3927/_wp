// 8. 參數傳址陷阱：重新賦值 vs 修改

let listA = [1, 2]
let listB = [3, 4]

function process(a, b) {
  a.push(99)    // 修改傳入的陣列內容 → 影響原陣列
  b = [100]      // 重新賦值參數 → 不影響原陣列
}

process(listA, listB)

console.log('listA:', listA) // [1, 2, 99]
console.log('listB:', listB) // [3, 4]

/*
原因：
- a 和 listA 指向同一個陣列物件，a.push(99) 修改了該物件，所以 listA 也受影響。
- b 和 listB 一開始指向同一個陣列，但 b = [100] 讓 b 指向新陣列，
  listB 仍指向原陣列 [3, 4]，所以不受影響。
*/
