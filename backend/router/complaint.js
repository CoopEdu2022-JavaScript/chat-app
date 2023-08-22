const express = require('express')
const router = express.Router()
const db = require('../db/db')
const { ObjectId } = require('mongodb')
const client = require('../db/mongo')
const { getPayload } = require('../jwt_config')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/complaint/:id', async (req, res) => {
    try {
        
        const id = req.params.id;
        
        
        
        const sql = 'SELECT * FROM post WHERE post_id = ?'
        const {title,content,time,user_id} = await db.query(sql, [id])
        
        res.send(true)
    } catch (err) {
        console.error(err)
        res.send(false)
    }
    })





