// 4. 陣列參數的「破壞性修改」

function cleanData(arr) {
  arr.pop()       // 移除最後一個
  arr.unshift('Start')  // 在最前面加上 "Start"
}

let myData = [1, 2, 3]
cleanData(myData)
console.log(myData) // ['Start', 1, 2]
