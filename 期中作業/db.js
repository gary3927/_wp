const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, 'data', 'scores.json')

function load() {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
  } catch {
    return []
  }
}

function save(scores) {
  fs.writeFileSync(dbPath, JSON.stringify(scores, null, 2))
}

function submitScore(name, score, lines, level) {
  const scores = load()
  const entry = {
    id: Date.now(),
    name,
    score,
    lines: lines || 0,
    level: level || 1,
    created_at: new Date().toISOString(),
  }
  scores.push(entry)
  save(scores)
  const rank = scores.filter(s => s.score > score).length + 1
  return { id: entry.id, rank }
}

function getLeaderboard(limit = 20) {
  const scores = load()
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s, i) => ({ ...s, rank: i + 1 }))
}

function getRecentScores(limit = 10) {
  const scores = load()
  return scores
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit)
}

module.exports = { submitScore, getLeaderboard, getRecentScores }
