// 6. Callback 篩選器 (自製 filter)

function myFilter(arr, callback) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      result.push(arr[i])
    }
  }
  return result
}

const numbers = [1, 5, 8, 12]
const filtered = myFilter(numbers, n => n > 7)
console.log(filtered) // [8, 12]
