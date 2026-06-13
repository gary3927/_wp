// 9. 陣列的字串切片 (Substring)

const items = [
  'Very long content here',
  'Another Very long content here',
  '3rd Very long content here',
]

items.forEach(item => {
  const snippet = item.substring(0, 10) + '...'
  console.log(snippet)
})

// Very long ...
// Another Ve...
// 3rd Very l...
