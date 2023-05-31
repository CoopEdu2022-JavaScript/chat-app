const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('./db')



router.use(express.json())
router.use(express.urlencoded({ extended: true }))

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Forbidden' })
      return
    }
    req.user = user
    next()
  })
}

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const sql = 'SELECT * FROM user WHERE email = ?'
    const values = [email]
    const [rows] = await db.query(sql, values)
    if (!rows.length) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }
    const user = rows[0]
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch (err) {
    console.error('Error logging in:', err)
    res.status(500).json({ err })
  }
})

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const sql = 'SELECT * FROM user WHERE id = ?'
    const values = [req.user.id]
    const [rows] = await db.query(sql, values)
    if (!rows.length) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    const user = rows[0]
    res.json({ email: user.email, name: user.name })
  } catch (err) {
    console.error('Error fetching profile:', err)
    res.status(500).json({ err })
  }
})



module.exports = router

