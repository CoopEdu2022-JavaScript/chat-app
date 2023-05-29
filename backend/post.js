/* eslint-disable camelcase */
const express = require('express')
const router = express.Router()
const db = require('./db')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))



router.post('/post', (req, res) => {
  const { title, content, user_id } = req.body
  const time = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
  db.query('INSERT INTO post (title, content, date, uid) VALUES (?, ?, ?, ?)',
    [title, content, time, user_id], (err, data) => {
      if (err) res.status(500).json({ err })
      else res.send(true)
    })
})
router.get('/{id}', (req, res) => {
  const { id } = req.params
  db.query('SELECT title,content,date,uid,likes,coments_id,post_id FROM post WHERE id = ?', [id], (err, data) => {
    if (err) res.status(500).json({ err })
    else res.send(data)
  })
})

router.put('/{id}/likes', (req, res) => {
  const { id } = req.params
  db.query('UPDATE post SET likes = likes + 1 WHERE id = ?', [id], (err, data) => {
    if (err) res.status(500).json({ err })
    else res.send(true)
  })
})

router.put('/{id}/unlike', (req, res) => {
  const { id } = req.params
  db.query('UPDATE post SET likes = likes - 1 WHERE id = ?', [id], (err, data) => {
    if (err) res.status(500).json({ err })
    else res.send(true)
  })
})

router.get('/{id}/like', (req, res) => {
  const { id } = req.params
  db.query('SELECT likes FROM post WHERE id = ?', [id], (err, data) => {
    if (err) res.status(500).json({ err })
    else res.send(data)
  })
})