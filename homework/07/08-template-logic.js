// 8. 樣板字串中的邏輯運算 (Template Literals with Logic)

const user = 'Guest'

const html = `<h1>Welcome, ${user ? user : 'Stranger'}</h1>`
console.log(html)
// <h1>Welcome, Guest</h1>

const html2 = `<h1>Welcome, ${user || 'Stranger'}</h1>`
console.log(html2)
// <h1>Welcome, Guest</h1>

// 如果 user 為空值
const user2 = ''
const html3 = `<h1>Welcome, ${user2 || 'Stranger'}</h1>`
console.log(html3)
// <h1>Welcome, Stranger</h1>
