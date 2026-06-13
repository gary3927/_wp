// 5. 函數回傳函數 (Higher-Order Function)

function multiplier(factor) {
  return n => n * factor
}

const double = multiplier(2)
console.log(double(10)) // 20

const triple = multiplier(3)
console.log(triple(10)) // 30
