// 10. 綜合應用：計算總價

function calculateTotal(cart, discountFunc) {
  const sum = cart.reduce((acc, price) => acc + price, 0)
  return discountFunc(sum)
}

const total = calculateTotal([100, 200, 300], function (amount) {
  return amount - 50
})

console.log(total) // 550 (600 - 50)
