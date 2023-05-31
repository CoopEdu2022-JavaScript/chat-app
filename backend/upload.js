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

// 上传文件路由
router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { filename } = req.file
    const conn = await pool.getConnection()
    const [result] = await conn.query('INSERT INTO file (filename) VALUES (?)', [filename])
    conn.release()
    res.json({ id: result.insertId, filename })
  } catch (err) {
    console.error('Error uploading file:', err)
    res.status(500).json({ err })
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