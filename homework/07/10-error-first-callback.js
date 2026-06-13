// 10. 錯誤優先回呼模式 (Error-First Callback Pattern)

function checkAdmin(role, callback) {
  if (role !== 'admin') {
    callback('Access Denied')
  } else {
    callback(null, 'Welcome')
  }
}

// 測試：非 admin
checkAdmin('user', (err, msg) => {
  if (err) {
    console.log('錯誤：' + err)
  } else {
    console.log('訊息：' + msg)
  }
})
// 錯誤：Access Denied

// 測試：admin
checkAdmin('admin', (err, msg) => {
  if (err) {
    console.log('錯誤：' + err)
  } else {
    console.log('訊息：' + msg)
  }
})
// 訊息：Welcome
