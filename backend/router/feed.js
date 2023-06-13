const express = require('express')
const router = express.Router()
const db = require('../db')
const { getPayload } = require('../jwt_config')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
    try {
        const { user_id } = getPayload(req)
        let sql = 'SELECT post_id FROM post ORDER BY time DESC LIMIT 10'
        
        let all = []
        
        const [rows] = await db.query(sql)
        let sql2 = 'SELECT post_id FROM post ORDER BY likes DESC LIMIT 10'
        const [rows2] = await db.query(sql2)
        let sql3 = 'SELECT post_id FROM post ORDER BY coments_id DESC LIMIT 10'
        const [rows3] = await db.query(sql3)
        all.push.apply(all, rows, rows2, rows3)

        res.json(all[0])
    } catch (err) {
        console.error('Error fetching feed:', err)
        res.status(500).json({ err })
    }
    }
)
module.exports = router
