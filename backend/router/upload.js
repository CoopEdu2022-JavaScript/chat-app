const express = require('express')
const multer = require('multer')
const db = require('../db')

const router = express.Router()
const { getPayload } = require('../jwt_config')

const upload = multer({ dest: 'uploads/' })


router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/:id/upload', upload.single('image'), async (req, res) => {
  const {id} = req.params
  const user_id = getPayload(req).user_id
  const { originalname, mimetype, filename, path, size } = req.file
  const sql = 'INSERT INTO images (name, type, filename, path, size,post_id,uid) VALUES (?, ?, ?, ?, ?);UPDATE post SET images = images + 1 WHERE post_id = ?'
  const values = [originalname, mimetype, filename, path, size,id,user_id,id]
  try {
    const conn = await db.getConnection()
    const [rows] = await conn.query(sql, values)
    conn.release()
    console.log('File uploaded successfully')
    res.send('File uploaded successfully')
  } catch (err) {
    console.error('Error uploading file:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})
router.get('/:id', async (req, res) => {
  try {
    const id  = req.params.id
    const sql = 'SELECT * FROM post WHERE post_id = ?'
    const values = [id]
    const [rows] = await db.query(sql, values)
    res.json(rows[0])
  } catch (err) {
    console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})


module.exports = router