const express = require('express')
const app = express()
const router = express.Router()

const port = 3000
const path = require('path')
const db = require('./db')
const crypto = require('crypto')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.post('/login', (req, res) => {
  const username = req.body.fusername
  const password = req.body.fpassword
  if (username === undefined) {
    res.status(400).json({ error: '用户名或密码不能为空' })
    return
  }
  if (password === undefined) {
    res.status(400).json({ error: '用户名或密码不能为空' })
    return
  }
  const hash = crypto.createHash('sha3-256')
  hash.update(password)
  const passwordHashed = hash.digest('hex')
  db.query('SELECT * FROM users WHERE usernames = ? AND passwords = ?',
    [username, passwordHashed],
    function (err, results) {
      if (err) throw err
      if (results.length > 0) {
        res.json({ success: true })
      } else {
        res.status(401).json({ error: '用户名或密码错误' })
      }
    }
  )
})

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'login.html'))
})
process.on('exit', function () {
  db.end()
})
module.exports = router
