const COLS = 10
const ROWS = 20
const BLOCK_SIZE = 30

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')
const nextCanvas = document.getElementById('next-canvas')
const nextCtx = nextCanvas.getContext('2d')

const scoreEl = document.getElementById('score')
const levelEl = document.getElementById('level')
const linesEl = document.getElementById('lines')
const highScoreEl = document.getElementById('high-score')
const overlay = document.getElementById('name-overlay')
const finalScoreEl = document.getElementById('final-score')
const nameInput = document.getElementById('name-input')
const submitBtn = document.getElementById('submit-btn')
const skipBtn = document.getElementById('skip-btn')
const leaderboardList = document.getElementById('leaderboard-list')
const recentList = document.getElementById('recent-list')
const onlineCountEl = document.getElementById('online-count')

const PIECES = {
  I: { shape: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], color: '#00f0f0' },
  O: { shape: [[1,1],[1,1]], color: '#f0f000' },
  T: { shape: [[0,1,0],[1,1,1],[0,0,0]], color: '#a000f0' },
  S: { shape: [[0,1,1],[1,1,0],[0,0,0]], color: '#00f000' },
  Z: { shape: [[1,1,0],[0,1,1],[0,0,0]], color: '#f00000' },
  J: { shape: [[1,0,0],[1,1,1],[0,0,0]], color: '#0000f0' },
  L: { shape: [[0,0,1],[1,1,1],[0,0,0]], color: '#f0a000' },
}
const PIECE_NAMES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']

let board, currentPiece, nextPiece
let score, lines, level, gameOver, dropInterval, lastDrop, animationId, highScore

const socket = io()

socket.on('leaderboard-update', (data) => renderLeaderboard(data))
socket.on('online-count', (count) => { onlineCountEl.textContent = count })
socket.on('new-score', (data) => {
  if (data) {
    const entry = document.createElement('div')
    entry.className = 'recent-entry'
    entry.innerHTML = `<span class="name">${data.name}</span><span class="pts">${data.score.toLocaleString()}</span>`
    recentList.prepend(entry)
    if (recentList.children.length > 10) recentList.lastChild?.remove()
  }
})
socket.on('recent-scores', (data) => {
  if (data && data.length > 0) {
    recentList.innerHTML = data.map(s => `
      <div class="recent-entry">
        <span class="name">${s.name}</span>
        <span class="pts">${s.score.toLocaleString()}</span>
      </div>
    `).join('')
  } else {
    recentList.innerHTML = '<div class="loading">尚無資料</div>'
  }
})

function renderLeaderboard(scores) {
  if (!scores || scores.length === 0) {
    leaderboardList.innerHTML = '<div class="loading">尚無紀錄</div>'
    return
  }
  const rankClass = (i) => {
    if (i === 0) return 'gold'
    if (i === 1) return 'silver'
    if (i === 2) return 'bronze'
    return ''
  }
  leaderboardList.innerHTML = scores.map((s, i) => `
    <div class="lb-entry">
      <span class="rank ${rankClass(i)}">${i + 1}</span>
      <span class="name">${s.name}</span>
      <span class="pts">${s.score.toLocaleString()}</span>
    </div>
  `).join('')
}

async function submitScore(name) {
  try {
    await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score, lines, level }),
    })
  } catch { /* ignore */ }
}

function init() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  score = 0; lines = 0; level = 1; gameOver = false
  dropInterval = 1000; lastDrop = 0; animationId = null
  highScore = parseInt(localStorage.getItem('tetris_high')) || 0
  highScoreEl.textContent = highScore
  overlay.classList.remove('active')
  spawnPiece()
  updateScore()
  if (animationId) cancelAnimationFrame(animationId)
  lastDrop = performance.now()
  gameLoop(performance.now())
}

function randomPiece() {
  const name = PIECE_NAMES[Math.floor(Math.random() * PIECE_NAMES.length)]
  const { shape, color } = PIECES[name]
  return { name, shape: shape.map(r => [...r]), color, x: Math.floor((COLS - shape[0].length) / 2), y: 0 }
}

function collide(piece, offX = 0, offY = 0) {
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (!piece.shape[r][c]) continue
      const nx = piece.x + c + offX, ny = piece.y + r + offY
      if (nx < 0 || nx >= COLS || ny >= ROWS) return true
      if (ny >= 0 && board[ny][nx]) return true
    }
  }
  return false
}

function lockPiece() {
  for (let r = 0; r < currentPiece.shape.length; r++) {
    for (let c = 0; c < currentPiece.shape[r].length; c++) {
      if (currentPiece.shape[r][c]) {
        const y = currentPiece.y + r, x = currentPiece.x + c
        if (y >= 0) board[y][x] = currentPiece.color
      }
    }
  }
  clearLines()
  spawnPiece()
}

function clearLines() {
  let cleared = 0
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r].every(c => c !== null)) {
      board.splice(r, 1)
      board.unshift(Array(COLS).fill(null))
      cleared++; r++
    }
  }
  if (cleared > 0) {
    const points = [0, 100, 300, 500, 800]
    score += (points[cleared] || 0) * level
    lines += cleared
    level = Math.floor(lines / 10) + 1
    dropInterval = Math.max(80, 1000 - (level - 1) * 80)
    updateScore()
  }
}

function spawnPiece() {
  currentPiece = nextPiece || randomPiece()
  currentPiece.x = Math.floor((COLS - currentPiece.shape[0].length) / 2)
  currentPiece.y = 0
  nextPiece = randomPiece()
  if (collide(currentPiece)) {
    gameOver = true
    if (score > highScore) {
      highScore = score
      localStorage.setItem('tetris_high', highScore)
      highScoreEl.textContent = highScore
    }
    finalScoreEl.textContent = score
    overlay.classList.add('active')
    nameInput.value = ''
    nameInput.focus()
  }
  drawNext()
}

function rotate() {
  const s = currentPiece.shape
  const rotated = s[0].map((_, i) => s.map(row => row[i]).reverse())
  const orig = currentPiece.shape
  currentPiece.shape = rotated
  const kicks = [[0,0],[-1,0],[1,0],[0,-1],[-1,-1],[1,-1]]
  for (const [kx, ky] of kicks) {
    if (!collide(currentPiece, kx, ky)) {
      currentPiece.x += kx; currentPiece.y += ky
      return
    }
  }
  currentPiece.shape = orig
}

function moveLeft() { if (!collide(currentPiece, -1, 0)) currentPiece.x-- }
function moveRight() { if (!collide(currentPiece, 1, 0)) currentPiece.x++ }
function moveDown() {
  if (!collide(currentPiece, 0, 1)) { currentPiece.y++; return true }
  lockPiece(); return false
}
function hardDrop() { while (!collide(currentPiece, 0, 1)) currentPiece.y++; lockPiece() }

function ghostY() {
  let gy = currentPiece.y
  while (!collide(currentPiece, 0, gy - currentPiece.y + 1)) gy++
  return gy
}

function drawBlock(context, x, y, color, ghost = false) {
  const bx = x * BLOCK_SIZE, by = y * BLOCK_SIZE
  if (ghost) {
    context.strokeStyle = color; context.globalAlpha = 0.3; context.lineWidth = 2
    context.strokeRect(bx + 1, by + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2)
    context.globalAlpha = 1
  } else {
    context.fillStyle = color
    context.fillRect(bx + 1, by + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2)
    context.fillStyle = 'rgba(255,255,255,0.2)'
    context.fillRect(bx + 2, by + 2, BLOCK_SIZE - 6, 4)
    context.fillStyle = 'rgba(0,0,0,0.2)'
    context.fillRect(bx + 2, by + BLOCK_SIZE - 6, BLOCK_SIZE - 4, 4)
  }
}

function drawBoard() {
  ctx.fillStyle = '#0f0f1a'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c]) drawBlock(ctx, c, r, board[r][c])
    }
  }
  if (currentPiece && !gameOver) {
    const gy = ghostY()
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) drawBlock(ctx, currentPiece.x + c, gy + r, currentPiece.color, true)
      }
    }
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) drawBlock(ctx, currentPiece.x + c, currentPiece.y + r, currentPiece.color)
      }
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'
      ctx.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    }
  }
  if (gameOver) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    ctx.font = '24px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 10)
    ctx.font = '14px sans-serif'
    ctx.fillText('按 R 重新開始', canvas.width / 2, canvas.height / 2 + 20)
  }
}

function drawNext() {
  nextCtx.fillStyle = '#16213e'
  nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height)
  if (nextPiece) {
    const offX = (nextCanvas.width - nextPiece.shape[0].length * 24) / 2
    const offY = (nextCanvas.height - nextPiece.shape.length * 24) / 2
    for (let r = 0; r < nextPiece.shape.length; r++) {
      for (let c = 0; c < nextPiece.shape[r].length; c++) {
        if (nextPiece.shape[r][c]) {
          nextCtx.fillStyle = nextPiece.color
          nextCtx.fillRect(offX + c * 24 + 1, offY + r * 24 + 1, 22, 22)
          nextCtx.fillStyle = 'rgba(255,255,255,0.2)'
          nextCtx.fillRect(offX + c * 24 + 2, offY + r * 24 + 2, 16, 3)
        }
      }
    }
  }
}

function updateScore() {
  scoreEl.textContent = score; levelEl.textContent = level; linesEl.textContent = lines
}

function gameLoop(time) {
  if (gameOver) { drawBoard(); return }
  if (time - lastDrop > dropInterval) { moveDown(); lastDrop = time }
  drawBoard()
  animationId = requestAnimationFrame(gameLoop)
}

document.addEventListener('keydown', (e) => {
  if (gameOver) {
    if (e.key === 'r' || e.key === 'R') init()
    return
  }
  switch (e.key) {
    case 'ArrowLeft': moveLeft(); break
    case 'ArrowRight': moveRight(); break
    case 'ArrowDown': moveDown(); break
    case 'ArrowUp': rotate(); break
    case ' ': hardDrop(); break
    case 'r': case 'R': init(); break
  }
  if (e.key === ' ') e.preventDefault()
})

submitBtn.addEventListener('click', () => {
  const name = nameInput.value.trim() || '匿名'
  submitScore(name)
  overlay.classList.remove('active')
  init()
})

skipBtn.addEventListener('click', () => {
  overlay.classList.remove('active')
  init()
})

nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitBtn.click()
})

init()
