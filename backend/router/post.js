/* eslint-disable camelcase */
const express = require('express')
const router = express.Router()
const db = require('../db')
const { getPayload } = require('../jwt_config')
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/post', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const { title, content} = req.body
    const time = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    const sql = 'INSERT INTO post (title, content, date, uid,likes) VALUES (?, ?, ?, ?,0)'
    const values = [title, content, time, user_id]
    await db.query(sql, values)
    res.send(true)
  } catch (err) {
    console.error('Error creating post:', err)
    res.status(500).json({ err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id  = req.params.id
    const sql = 'SELECT title, content, date, uid, likes, comments_id, post_id FROM post WHERE id = ?'
    const values = [id]
    const rows = await db.query(sql, values)
    res.json(rows[0])
  } catch (err) {
    console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})

router.put('/:id/likes', async(req, res) => {
  // const { id } = req.params
  // db.query('UPDATE post SET likes = likes + 1 WHERE id = ?', [id], (err, data) => {
  //   if (err) res.status(500).json({ err })
  //   else res.send(true)
  // })
  try {
    const { user_id } = getPayload(req)
    const id  = req.params.id
    const sql = `INSERT INTO like_post (post_id, user_id, time) VALUES (${id}, ${user_id}, NOW());
    UPDATE post SET likes = likes + 1 WHERE id = ${id}`
    
    const [rows] = await db.query(sql)
    
    res.send(true)
  } catch(err){
    console.error('not success', err)
    res.status(500).json({err})
  }
  
})

router.put('/:id/unlike', async(req, res) => {
  // const { id } = req.params
  // db.query('UPDATE post SET likes = likes - 1 WHERE id = ?', [id], (err, data) => {
  //   if (err) res.status(500).json({ err })
  //   else res.send(true)
  // })
  try {
    const id  = req.params.id
    const { user_id } = getPayload(req)
    const sql = `DELETE FROM like_post WHERE post_id = ${id} AND user_id = ${user_id};
    UPDATE post SET likes = likes - 1 WHERE id = ${id}`
  
    const [rows] = await db.query(sql)
    res.send(true)
  } catch(err){
    console.error('not success', err)
    res.status(500).json({err})
  }

})

router.get('/:id/hlike', async(req, res) => {
  // const { id } = req.params
  // db.query('SELECT likes FROM post WHERE id = ?', [id], (err, data) => {
  //   if (err) res.status(500).json({ err })
  //   else res.send(data)
  // })
  
  try {
    const id  = req.params.id
    const sql = 'SELECT likes FROM post WHERE post_id = ?;SELECT * FROM like_post WHERE post_id = ?, user_id = ?'
    const values = [id]
    const [rows] = await db.query(sql, values)

    res.send(rows[0])
  } catch (err) {
    console.error('Error fetching likes:', err)
    res.status(500).json({ err })
  }
})                                                      




