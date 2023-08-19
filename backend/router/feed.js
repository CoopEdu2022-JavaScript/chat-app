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
router.get('/updatepopularity', async (req, res) => {
  let sql = `SELECT * FROM post`
  const [rows] = await db.query(sql)
  // 遍历所有帖子并更新热度
  for (let post of rows) {

    // 计算时间差
    const diffHours = (Date.now() - post.date) / (1000 * 60 * 60);


    // 计算新热度
    const newPopularity = Math.max(0, 50 - (diffHours / 4)) * ((post.likes / 2) + 1);

    // 更新数据库
    await db.query('UPDATE post SET popularity = ? WHERE post_id = ?', [newPopularity, post.post_id]);

  }
})

router.get('/:id/getallpic', async (req, res) => {
  try {

    const id = req.params.id
    const sql = 'SELECT path from images_post WHERE post_id = ?'
    const values = [id]
    const [rows] = await db.query(sql, values)
    res.send(rows[0]);
  } catch (err) {
    //console.log(err)
    // console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})
//用于搜索栏的搜索功能
router.get('/:id/search', async (req, res) => {
  try {
    const id = req.params.id
    const sql = "SELECT post_id FROM post WHERE title LIKE CONCAT('%',?,'%') ORDER BY popularity DESC"
    const values = [id]
    const [rows] = await db.query(sql, values)
    if (rows.length > 0) {
      res.send(rows)
    } else {
      res.send({})
    }
  } catch (err) {
    //console.log(err)
    // console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})
router.get('/:id/getusericon', async (req, res) => {
  try {
    const id = req.params.id
    const sql = "SELECT uid FROM post WHERE post_id=?"
    const values = [id]
    const [rows] = await db.query(sql, values)
    const sql2="SELECT usericon FROM users WHERE uid=?"
    const values2=[rows[0].uid]
    const [rows2] = await db.query(sql2, values2)
    res.send(rows2[0])
  } catch (err) {
    //console.log(err)
    // console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})
router.get('/:id/user_notif_inf', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const id = req.params.id
    const sql="SELECT notif_likes,notif_comments FROM users WHERE uid=?"
    const values=[user_id]
    const [rows] = await db.query(sql, values)
    res.send(rows[0])
  } catch (err) {
    //console.log(err)
    // console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})
router.get('/clear_notif', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const sql="UPDATE users SET notif_comments=0 WHERE uid=?"
    const values=[user_id]
    const [rows] = await db.query(sql, values)
    const sql2="UPDATE users SET notif_likes=0 WHERE uid=?"
    const [rows2]=await db.query(sql2,values)
  } catch (err) {
    //console.log(err)
    // console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})
module.exports = router
