const express = require('express')
const multer = require('multer')
const db = require('../db/db')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const { getPayload } = require('../jwt_config')

const uploadPath = path.join(__dirname, '../../frontend/src/assets/icons/');
const upload = multer({ dest: uploadPath });


router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.post('/icon', upload.single('image'), async (req, res) => {

    const user_id = getPayload(req).user_id
    console.log(user_id)
    const { originalname, mimetype, filename, path, size } = req.file
    fs.renameSync(path, path + '.png')
    const tmp = path.split('\\')
    const newpath = 'src/assets/icons/' + tmp[tmp.length - 1] + '.png'
    const sql = 'UPDATE users SET usericon=? WHERE uid=? LIMIT 1'
    const values = [newpath,user_id]
    try {
  
      const [rows] = await db.query(sql, values)
  
      //console.log('File uploaded successfully')
      res.send('File uploaded successfully')
    } catch (err) {
      console.error('Error uploading file:', err)
      res.status(500).json({ error: 'Internal server error' })
    }
  })
  module.exports = router