const express = require('express')
const router = express.Router()
const db = require('../db')
const { getPayload } = require('../jwt_config')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
    try {
        const { user_id } = getPayload(req)
        let sql = `SELECT * FROM (
            SELECT post_id FROM post ORDER BY popularity DESC LIMIT 5
          ) AS t1
          UNION 
          SELECT * FROM (
            SELECT post_id FROM post
            WHERE post_id NOT IN (
              SELECT post_id FROM (
                SELECT post_id FROM post ORDER BY popularity DESC LIMIT 5
              ) AS t1 
            )
            ORDER BY RAND() LIMIT 5
          ) AS t2`
        
        const [rows] = await db.query(sql)
        
        const all = await Promise.all(
            rows.map(async ({ post_id }) => {
                const [postRows] = await db.query('SELECT * FROM post WHERE post_id = ?', [post_id])
                return postRows[0]
            })
        )   

        res.send(all)
    } catch (err) {
        console.error('Error fetching feed:', err)
        res.status(500).json({ err })
    }
})
module.exports = router
