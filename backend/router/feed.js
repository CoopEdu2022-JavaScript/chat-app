const express = require('express')
const router = express.Router()
const db = require('../db')
const { getPayload } = require('../jwt_config')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
    try {
        const { user_id } = getPayload(req)
        let sql = 'SELECT * FROM post ORDER BY time DESC LIMIT 10'
        

        
        const [rows] = await db.query(sql)
        res.json(rows)
    } catch (err) {
        console.error('Error fetching feed:', err)
        res.status(500).json({ err })
    }
    }
)
