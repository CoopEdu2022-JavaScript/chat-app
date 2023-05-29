/* eslint-disable camelcase */
const express = require('express')
const router = express.Router()
const db = require('./db')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  db.query('SELECT * FROM post', (_err, data) => {
    res.send(data)
  })
})

router.post('/post', (req, res) => {
  const { title, content, user_id } = req.body
  const time = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
  db.query('INSERT INTO post (title, content, time, user_id) VALUES (?, ?, ?, ?)',
    [title, content, time, user_id], (err, data) => {
      if (err) res.status(500).json({ err })
      else res.send(true)
    })
})
