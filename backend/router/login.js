const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const db = require('../db')
const { setToken } = require('../jwt_config')
const { getPayload } = require('../jwt_config')



router.use(express.json())
router.use(express.urlencoded({ extended: true }))



// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null) {
//     res.status(401).json({ message: 'Unauthorized' })
//     return
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       res.status(403).json({ message: 'Forbidden' })
//       return
//     }
//     req.user = user
//     next()
//   })
// }

router.post('/', async (req, res) => {
  try {
    //console.log(req.body)
    const { ID, password } = req.body
    const sql = 'SELECT uid FROM users WHERE stuID= ? AND passwords= ?'
    const values = [ID, password]
    const [rows] = await db.query(sql, values)
    const user = rows[0]
    if (rows == null) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    } else {
      const token = setToken({ user_id: user.uid })
      res.status(200).json({ message: 'Login success', statue: true, token: token })
    }



    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
    // res.json({ token })
  } catch (err) {
    console.error('Error logging in:', err)
    res.status(500).json({ err })
  }
})

router.get('/profile', async (req, res) => {
  try {
    //console.log(req)
    const user_id = getPayload(req).user_id
    const sql = 'SELECT * FROM users WHERE uid = ?'
    const values = [user_id]
    const [rows] = await db.query(sql, values)
    if (!rows.length) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    const user = rows[0]
    res.json({ email: user.email, usernames: user.usernames, stuID: user.stuID })
  } catch (err) {
    console.error('Error fetching profile:', err)
    res.status(500).json({ err })
  }
})



module.exports = router

