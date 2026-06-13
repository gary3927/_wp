const year = 2024

let isLeap
if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  isLeap = true
} else {
  isLeap = false
}

console.log(`年份: ${year}`)
console.log(`是否為閏年: ${isLeap}`)
