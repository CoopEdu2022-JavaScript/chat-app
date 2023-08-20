
const express = require('express')
const router = express.Router()
const db = require('../db/db')


router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/:id/getdetails', async (req, res, next) => {
    try {
      const id = req.params.id
      const sql = 'SELECT * FROM post WHERE post_id = ?'
      const values = [id]
      const [rows] = await db.query(sql, values)
      res.json(rows[0])
    } catch (err) {
      console.error('Error searching posts:', err)
      const error = new Error('Internal server error')
      error.status = 500
      next(error)
    }
  })

module.exports = router