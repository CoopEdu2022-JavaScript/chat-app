const express = require('express')
const multer = require('multer')
const db = require('../db')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { getPayload } = require('../jwt_config')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

app.post(':id/upload', upload.array('images', 9), async function (req, res, next) {
  const files = req.files
  const { id } = req.params
  const user_id = getPayload(req).user_id
  if (!files || files.length === 0) {
    const error = new Error('Please upload at least one file')
    error.status = 400
    return next(error)
  }
  try {
    
    await db.query(`INSERT INTO images (user_id, date) VALUES (${user_id}, NOW())`)
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