const express = require('express')
const path = require('path')
const db = require('./db')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/scores', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 20, 100)
  const scores = db.getLeaderboard(limit)
  res.json(scores)
})

app.post('/api/scores', (req, res) => {
  const { name, score, lines, level } = req.body
  if (!name || score == null) {
    return res.status(400).json({ error: 'name and score are required' })
  }
  const displayName = name.trim().slice(0, 20) || '匿名'
  const result = db.submitScore(displayName, score, lines || 0, level || 1)
  res.status(201).json(result)
})

app.listen(PORT, () => {
  console.log(`Tetris server running at http://localhost:${PORT}`)
})
