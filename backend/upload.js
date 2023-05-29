const express = require('express')
const multer = require('multer')
const mysql = require('mysql2/promise')
const router = express.Router()
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
router.post('/upload', upload.array('images', 9), async function (req, res, next) {
	const { post_id } = req.query
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
			return conn.query('INSERT INTO images (filename, path) VALUES (?, ?) WHERE post_id = ?' [file.filename, file.path, post_id])
		});
		await Promise.all(promises)
		conn.release()
		res.send('Files uploaded successfully')
	} catch (err) {
		console.error('Error uploading files:', err)
		res.status(500).json({ error: 'Internal server error' })
	}
})

router.get('/images', async function (req, res) {
	const { post_id } = req.query
	try {
		// Fetch image data from database
		const conn = await pool.getConnection()
		const [rows] = await conn.query('SELECT * FROM images')
		conn.release()
		// Map rows to image objects
		const images = rows.map(row => {
			return {
				filename: row.filename,
				path: row.path
			}
		})
		res.json(images)
	} catch (err) {
		console.error('Error fetching images:', err)
		res.status(500).json({ error: 'Internal server error' })
	}
})


router.listen(3000, function () {
  console.log('Server started on port 3000')
})