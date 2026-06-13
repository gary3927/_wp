console.log('九九乘法表')
console.log('==========')

for (let i = 1; i <= 9; i++) {
  let row = ''
  for (let j = 1; j <= 9; j++) {
    row += `${i}×${j}=${i * j}\t`
  }
  console.log(row)
}
