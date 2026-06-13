function cToF(c) {
  return c * 9 / 5 + 32
}

function fToC(f) {
  return (f - 32) * 5 / 9
}

console.log('攝氏 0°C = 華氏 ' + cToF(0) + '°F')
console.log('攝氏 100°C = 華氏 ' + cToF(100) + '°F')
console.log('華氏 32°F = 攝氏 ' + fToC(32) + '°C')
console.log('華氏 212°F = 攝氏 ' + fToC(212) + '°C')
