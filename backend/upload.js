const express = require('express')
const multer = require('multer')
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken')
const router = express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

// 配置 MySQL 数据库连接
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
})

// 配置 JWT 密钥
const JWT_SECRET = 'mysecretkey'

// 登录路由
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const conn = await pool.getConnection()
    const [rows] = await conn.query('SELECT * FROM user WHERE username = ?', [username])
    conn.release()
    if (!rows.length) {
      res.status(401).json({ message: 'Invalid username or password' })
      return
    }
    const user = rows[0]
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      res.status(401).json({ message: 'Invalid username or password' })
      return
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch (err) {
    console.error('Error logging in:', err)
    res.status(500).json({ err })
  }
})

app.post('/upload', upload.array('images', 9), async function (req, res, next) {
  const files = req.files
  if (!files || files.length === 0) {
    const error = new Error('Please upload at least one file')
    error.status = 400
    return next(error)
  }
  try {
    // 将文件信息存入数据库
    const conn = await pool.getConnection()
    const promises = files.map(file => {
      return conn.query('INSERT INTO images (filename, path) VALUES (?, ?)', [file.filename, file.path])
    })
    await Promise.all(promises)
    conn.release()
    res.send('Files uploaded successfully')
  } catch (err) {
    console.error('Error uploading files:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Forbidden' })
      return
    }
    req.user = decoded
    next()
  })
}

module.exports = router