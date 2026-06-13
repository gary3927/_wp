const students = [
  { name: 'Alice', age: 20, score: 85 },
  { name: 'Bob', age: 21, score: 92 },
  { name: 'Charlie', age: 19, score: 78 },
  { name: 'Diana', age: 22, score: 95 },
]

console.log('=== 學生資料 ===')
for (let i = 0; i < students.length; i++) {
  const s = students[i]
  console.log(`姓名: ${s.name}, 年齡: ${s.age}, 成績: ${s.score}`)
}

let total = 0
for (let i = 0; i < students.length; i++) {
  total += students[i].score
}
const avg = total / students.length
console.log(`\n平均成績: ${avg.toFixed(1)}`)

const topStudents = students.filter(s => s.score >= 90)
console.log(`\n優秀學生 (成績 ≥ 90):`)
topStudents.forEach(s => console.log(`  ${s.name} - ${s.score}分`))
