const express = require('express')
const multer = require('multer')
const mysql = require('mysql2/promise')

const app = express()

// 配置 multer 中间件
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
  password: '123456',
  database: 'user'
})

// 处理上传请求
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

app.listen(3000, function () {
  console.log('Server started on port 3000')
})