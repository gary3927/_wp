// 9. 延遲執行的 Callback

setTimeout(() => {
  const parts = ['Task', 'Completed']
  console.log(parts.join(' ')) // Task Completed
}, 2000)
