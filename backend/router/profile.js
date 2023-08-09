const express = require('express')
const multer = require('multer')
const db = require('../db')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const { getPayload } = require('../jwt_config')

const uploadPath = path.join(__dirname, '../../frontend/src/assets/icons/');
const upload = multer({ dest: uploadPath });


router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/:id/upload', upload.single('image'), async (req, res) => {
  // console.log(req.headers)
  const { id } = req.params
  const user_id = getPayload(req).user_id
  const { originalname, mimetype, filename, path, size } = req.file
  fs.renameSync(path, path + '.png')
  const tmp = path.split('\\')
  const newpath = 'src/assets/images/' + tmp[tmp.length - 1] + '.png'
  const sql = 'INSERT INTO images_post (name, type, filename, path, size,post_id,uid) VALUES (?,?,?, ?, ?, ?, ?);UPDATE post SET images = images + 1 WHERE post_id = ?'
  const values = [originalname, mimetype, filename, newpath, size, id, user_id, id]
  try {
    const conn = await db.getConnection()
    const [rows] = await conn.query(sql, values)
    conn.release()
    //console.log('File uploaded successfully')
    res.send('File uploaded successfully')
  } catch (err) {
    console.error('Error uploading file:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})