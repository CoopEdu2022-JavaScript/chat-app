/* eslint-disable camelcase */
const express = require('express')
const router = express.Router()
const db = require('../db')
const { getPayload } = require('../jwt_config')
const { v5: uuidv5 } = require("uuid")
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/newpost', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const { title, content } = req.body
    console.log(title)
    const namespace = '8e884ace-bee4-11e4-8dfc-aa07a5b093db'
    const time = new Date().getTime().toString()
    const uuid = uuidv5(`${title}${content}${user_id}${time}`, namespace)
    const values = [title, content, user_id, uuid]
    const sql = `INSERT INTO post (title, content,date, uid, likes,coments_id,post_id,images) VALUES (?,?,NOW(),?,0,0,?,9099)`
    const [rows] = await db.query(sql, values)
    res.json({ state: true, post_id: uuid })
  } catch (err) {
    console.error('Error creating post:', err)
    res.status(500).json({ err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const id = req.params.id
    const sql = 'SELECT * FROM post WHERE post_id = ?'
    const values = [id]
    const [rows] = await db.query(sql, values)
    res.json(rows[0])
  } catch (err) {
    console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})
router.put('/:id/fix', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const id = req.params.id
    const { title, content } = req.body
    const sql = `UPDATE post SET title = '${title}', content = '${content}' ,date = NOW() WHERE post_id = ${id} AND uid = ${user_id}`
    const [rows] = await db.query(sql)
    res.json({ state: true })
  } catch (err) {
    console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})
router.delete('/:id/delete', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const id = req.params.id
    const sql = `DELETE FROM post WHERE post_id = ? AND uid=?;DELETE FROM like_post WHERE post_id =?;DELETE FROM conment WHERE post_id = ? ;Delete FROM images_post WHERE post_id = ?`
    const values = [id, user_id, id, id, id]

    const [rows] = await db.query(sql, values)

    res.json({ state: true })
  } catch (err) {
    console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})

router.post('/:id/likes', async (req, res) => {
  // const { id } = req.params
  // db.query('UPDATE post SET likes = likes + 1 WHERE id = ?', [id], (err, data) => {
  //   if (err) res.status(500).json({ err })
  //   else res.send(true)
  // })
  try {
    const { user_id } = getPayload(req)
    const id = req.params.id
    const sql = `INSERT INTO like_post (post_id, uid, time) VALUES (?, ?, NOW());
    UPDATE post SET likes = likes + 1 WHERE post_id = ?;`
    const values = [id, user_id, id]
    const [rows] = await db.query(sql, values)

    res.send({ state: true })
  } catch (err) {
    console.error('not success', err)
    res.status(500).json({ err })
  }

})

router.delete('/:id/unlike', async (req, res) => {
  // const { id } = req.params
  // db.query('UPDATE post SET likes = likes - 1 WHERE id = ?', [id], (err, data) => {
  //   if (err) res.status(500).json({ err })
  //   else res.send(true)
  // })
  try {
    const id = req.params.id
    const { user_id } = getPayload(req)
    const sql = `DELETE FROM like_post WHERE post_id = ? AND uid = ?;
    UPDATE post SET likes=likes-1 WHERE post_id = ?`
    const values = [id, user_id, id]
    const [rows] = await db.query(sql, values)
    res.send(true)
  } catch (err) {
    console.error('not success', err)
    res.status(500).json({ err })
  }

})

router.get('/:id/hlike', async (req, res) => {
  // const { id } = req.params
  // db.query('SELECT likes FROM post WHERE id = ?', [id], (err, data) => {
  //   if (err) res.status(500).json({ err })
  //   else res.send(data)
  // })

  try {
    const { user_id } = getPayload(req)
    const id = req.params.id
    const sql = 'SELECT likes FROM post WHERE post_id = ?;SELECT * FROM like_post WHERE post_id = ? AND uid = ?'
    const values = [id, id, user_id]
    const [rows] = await db.query(sql, values)
    let isLiked = false;
    console.log(rows)
    if (!rows[1][0] == []) isLiked = true;
    res.json({ likes: rows[0][0].likes, isLiked })

  } catch (err) {
    console.error('Error fetching likes:', err)
    res.status(500).json({ err })
  }
})

router.get('/users/getallpost', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const sql = 'SELECT * FROM post where uid = ?'
    const values = [user_id]
    const [rows] = await db.query(sql, values)
    res.json(rows)
  } catch (err) {
    console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})

router.get('/usersname/:id', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const id = req.params.id
    const sql = 'SELECT usernames FROM users WHERE uid = ? LIMIT 1'
    const values = [id]
    const [rows] = await db.query(sql, values)
    res.json(rows[0])
  } catch (err) {
    console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})

router.get('/:id/users', async (req, res) => {
  try {

    const { user_id } = getPayload(req)
    const id = req.params.id
    const sql = 'SELECT uid FROM post WHERE post_id = ?'
    const values = [id]
    const [rows] = await db.query(sql, values)
    const sql2 = 'SELECT usernames FROM users WHERE uid = ? LIMIT 1'
    const values2 = [rows[0].uid]
    const [rows2] = await db.query(sql2, values2)
    res.send(rows2[0])

  } catch (err) {
    console.log(err)
    // console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})

// router.get('/:id/detail', async (req, res) => {
//   try {
//     const { user_id } = getPayload(req)
//     const id  = req.params.id
//     const sql = 'SELECT * FROM post WHERE post_id = ?'
//     const values = [id]
//     const [rows] = await db.query(sql, values)
//     const sql2 = 'SELECT usernames FROM users WHERE uid = ? LIMIT 1'
//     const values2 = [rows[0].uid]
//     const [rows2] = await db.query(sql2, values2)
//     const sql3 = 'SELECT * FROM images_post WHERE post_id = ?'
//     const values3 = [id]
//     const [rows3] = await db.query(sql3, values3)
//     const sql4 = 'SELECT * FROM like_post WHERE post_id = ?'
//     const values4 = [id]

//     res.json({ ...rows[0], usernames: rows2[0].usernames, images: rows3 })

module.exports = router

