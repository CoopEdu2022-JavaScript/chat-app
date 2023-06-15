
const express = require('express')
const router = express.Router()
const db = require('../db')


router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/search', async (req, res, next) => {
    const { q } = req.query
    const sql = `
      SELECT post_id
      FROM posts
      WHERE title LIKE ?
        OR content LIKE ?
    `
    const values = [`%${q}%`, `%${q}%`]
    try {
      const conn = await db.getConnection()
      const [rows] = await conn.query(sql, values)
      conn.release()
      res.json(rows)
    } catch (err) {
      console.error('Error searching posts:', err)
      const error = new Error('Internal server error')
      error.status = 500
      next(error)
    }
  })

module.exports = router