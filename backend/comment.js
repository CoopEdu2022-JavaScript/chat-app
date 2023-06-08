const express = require('express')
const router = express.Router()

const mysql = require('mysql2/promise')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/:id/comment', (req, res) => {
    const id = req.params

    createTable(id)
    const { content, user_id } = req.body
    const time = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    db.query('INSERT INTO ? (content, date, uid, post_id) VALUES (?, ?, ?, ?)',
        [id,content, time, user_id, id], (err, data) => {
        if (err) res.status(500).json({ err })
        else res.send(true)
        })
    })
router.get('/:id/comment', (req, res) => {
    const  id  = req.params
    db.query('SELECT content,date,uid,post_id FROM ? WHERE id = ?', [id,id], (err, data) => {
        if (err) res.status(500).json({ err })
        else res.send(data)
        })
    })


