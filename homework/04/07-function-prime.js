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
