const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')
const db = require('./db')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/scores', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 20, 100)
  res.json(db.getLeaderboard(limit))
})

app.post('/api/scores', (req, res) => {
  const { name, score, lines, level } = req.body
  if (!name || score == null) {
    return res.status(400).json({ error: 'name and score are required' })
  }
  const displayName = name.trim().slice(0, 20) || '匿名'
  const result = db.submitScore(displayName, score, lines || 0, level || 1)
  const leaderboard = db.getLeaderboard(20)
  const recentScores = db.getRecentScores(5)
  io.emit('leaderboard-update', leaderboard)
  io.emit('new-score', recentScores[0] || null)
  res.status(201).json(result)
})

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`)
  io.emit('online-count', io.engine.clientsCount)

  socket.emit('leaderboard-update', db.getLeaderboard(20))
  socket.emit('recent-scores', db.getRecentScores(10))

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`)
    io.emit('online-count', io.engine.clientsCount)
  })
})

server.listen(PORT, () => {
  console.log(`Tetris real-time server running at http://localhost:${PORT}`)
})
