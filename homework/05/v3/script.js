const products = [
  { id: 1, name: '無線藍牙耳機', price: 1290, emoji: '🎧', stock: true },
  { id: 2, name: '機械式鍵盤', price: 2490, emoji: '⌨️', stock: true },
  { id: 3, name: '行動電源 10000mAh', price: 890, emoji: '🔋', stock: true },
  { id: 4, name: 'USB-C 多功能 Hub', price: 690, emoji: '🔌', stock: true },
  { id: 5, name: '筆電鋁合金支架', price: 1190, emoji: '💻', stock: true },
  { id: 6, name: '電競滑鼠墊 (加大)', price: 350, emoji: '🖱️', stock: true },
]

let cart = {}

function renderProducts() {
  const grid = document.getElementById('product-grid')
  grid.innerHTML = ''
  products.forEach(p => {
    const card = document.createElement('div')
    card.className = 'product-card'
    card.innerHTML = `
      <div class="product-image">${p.emoji}</div>
      <h3>${p.name}</h3>
      <p class="price">$${p.price.toLocaleString()}</p>
      <span class="stock in-stock">有貨</span>
      <button class="btn-add" onclick="addToCart(${p.id})">
        加入購物車
      </button>
    `
    grid.appendChild(card)
  })
}

function renderCart() {
  const content = document.getElementById('cart-content')
  const summary = document.getElementById('cart-summary')
  const countEl = document.getElementById('cart-count')
  const totalEl = document.getElementById('cart-total-price')

  const items = Object.values(cart)
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0)
  countEl.textContent = totalCount

  if (items.length === 0) {
    content.innerHTML = `<div class="cart-empty"><p>購物車中沒有商品</p></div>`
    summary.style.display = 'none'
    return
  }

  let html = ''
  let totalPrice = 0
  items.forEach(item => {
    const subtotal = item.price * item.qty
    totalPrice += subtotal
    html += `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.emoji} ${item.name}</div>
          <div class="cart-item-price">$${item.price.toLocaleString()}</div>
        </div>
        <div class="cart-item-actions">
          <button onclick="decreaseQty(${item.id})">−</button>
          <span class="cart-item-qty">${item.qty}</span>
          <button onclick="increaseQty(${item.id})">+</button>
          <button class="btn-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
      </div>
    `
  })
  content.innerHTML = html
  totalEl.textContent = `$${totalPrice.toLocaleString()}`
  summary.style.display = 'block'
}

function addToCart(id) {
  if (cart[id]) {
    cart[id].qty++
  } else {
    const p = products.find(p => p.id === id)
    cart[id] = { id: p.id, name: p.name, price: p.price, emoji: p.emoji, qty: 1 }
  }
  renderCart()
}

function increaseQty(id) {
  if (cart[id]) {
    cart[id].qty++
    renderCart()
  }
}

function decreaseQty(id) {
  if (cart[id]) {
    cart[id].qty--
    if (cart[id].qty <= 0) {
      delete cart[id]
    }
    renderCart()
  }
}

function removeFromCart(id) {
  delete cart[id]
  renderCart()
}

function clearCart() {
  cart = {}
  renderCart()
}

renderProducts()
renderCart()
