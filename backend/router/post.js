/* eslint-disable camelcase */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const db = require('../db/db')
const { getPayload } = require('../jwt_config')
const { v5: uuidv5 } = require("uuid")
router.use(express.json())
router.use(express.urlencoded({ extended: true }))
const fs = require('fs')
// server.js
// function emptydir(delpath) {
//   fpath = "../frontend/src/assets/images"
//   const files = fs.readdirSync(fpath);
//   files.forEach(file => {
//     const filePath = `${fpath}/${file}`;
//     const stats = fs.statSync(filePath);
//     let path_to_compare = filePath.replace('../frontend/', '')
//     if (stats.isDirectory()) {
//       emptydir(filePath);
//     } else {
//       if (path_to_compare == delpath) {
//         fs.unlinkSync(filePath);
//         console.log(`删除${file}文件成功`)
//       }
//       else {
//         console.log(path_to_compare)
//       }
//     }
//   });
// }
router.post('/newpost', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const { title, content } = req.body
    //console.log(title)
    const namespace = '8e884ace-bee4-11e4-8dfc-aa07a5b093db'
    const time = new Date().getTime().toString()
    const uuid = uuidv5(`${title}${content}${user_id}${time}`, namespace)
    const values = [title, content, user_id, uuid]
    const sql = `INSERT INTO post (title, content,date, uid, likes,coments_id,post_id,images,popularity) VALUES (?,?,NOW(),?,0,0,?,9099,50)`
    const [rows] = await db.query(sql, values)
    res.json({ state: true, post_id: uuid })
  } catch (err) {
    console.error('Error creating post:', err)
    res.status(500).json({ err })
  }
})

router.get('/:id', async (req, res) => {
  const { user_id } = getPayload(req)
  const id = req.params.id
  const sql = 'SELECT * FROM post WHERE post_id = ?'
  const values = [id]
  const [rows] = await db.query(sql, values)
  res.json(rows[0])
}
)
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
// router.delete('/:id/delete', async (req, res) => {
//   try {
//     const { user_id } = getPayload(req)
//     const id = req.params.id
//     const sql = `DELETE FROM post WHERE post_id = ? AND uid=?;DELETE FROM like_post WHERE post_id =?;DELETE FROM conment WHERE post_id = ? `
//     const values = [id, user_id, id, id, id]
//     const image_del = 'SELECT path FROM images_post WHERE post_id=?'
//     const val = [id]
//     const [del_img] = await db.query(image_del, val)
//     console.log(del_img[0])
//     emptydir(del_img[0].path)
//     const [rows] = await db.query(sql, values)
//     // const imgJson=JSON.stringify(del_img)
//     res.json(del_img)
//   } catch (err) {
//     console.error('Error fetching post:', err)
//     res.status(500).json({ err })
//   }
// })
router.delete('/:id/delete', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const id = req.params.id
    const sql = `DELETE FROM post WHERE post_id = ? AND uid=?;DELETE FROM like_post WHERE post_id =?;DELETE FROM conment WHERE post_id = ? `
    const values = [id, user_id, id, id]
    await db.query(sql,values);
    const sql2 = 'UPDATE images_post SET status=inactive WHERE post_id=?'
    const values2 = [id]
    await db.query(sql2,values2)

    
    
    
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
    const sql2 = 'SELECT uid FROM post WHERE post_id=?'
    const values2 = [id]
    const [rows2] = await db.query(sql2, values2)
    const sql3 = 'UPDATE users SET notif_likes = notif_likes + 1 WHERE uid = ?'
    const values3 = [rows2[0].uid]
    const [rows3] = await db.query(sql3, values3)
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
    const sql2 = "SELECT uid FROM post WHERE post_id=?"
    const values2 = [id]
    const [rows2] = await db.query(sql2, values2)
    const sql3 = "UPDATE users SET notif_likes = notif_likes - 1 WHERE uid=? AND notif_likes>0"
    const values3 = [rows2[0].uid]
    const [rows3] = await db.query(sql3, values3)
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
    // console.log(rows[0][0].likes)
    if (!rows[1][0] == []) isLiked = true;
    res.json({ likes: rows[0][0].likes, isLiked })

  } catch (err) {
    console.error('Error fetching likes:', err)
    res.status(500).json({ err })
  }
})
router.get('/:id/can_be_deleted', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const id = req.params.id
    const sql = 'SELECT name FROM images_post WHERE path=?'
    const values = [id]
    const [rows] = await db.query(sql, values)
    res.json(rows[0])

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
    const sql2 = 'SELECT * FROM users WHERE uid = ? LIMIT 1'
    const values2 = [rows[0].uid]
    const [rows2] = await db.query(sql2, values2)
    res.send(rows2[0])

  } catch (err) {
    //console.log(err)
    // console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})

router.get('/:id/detail', async (req, res) => {
  try {
    const { user_id } = getPayload(req)
    const id = req.params.id
    const sql = 'SELECT * FROM post WHERE post_id = ?'
    const values = [id]
    const sql2 = 'SELECT usernames FROM users WHERE uid = ? LIMIT 1'
    const sql3 = 'SELECT * FROM images_post WHERE post_id = ?'
    const sql4 = 'SELECT * FROM like_post WHERE post_id = ?'
    const promises = [
      db.query(sql, values),
      db.query(sql2, [values[0]]),
      db.query(sql3, values),
      db.query(sql4, values)
    ]
    Promise.all(promises)
      .then(([rows, rows2, rows3, rows4]) => {
        const post = rows[0]
        const usernames = rows2[0].usernames
        const images = rows3
        const likes = rows4.length
        res.json({ ...post, usernames, images, likes })
      })
      .catch(err => {
        console.error('Error fetching post:', err)
        const error = new Error('Internal server error')
        error.status = 500
        next(error)
      })
  } catch (err) {
    console.error('Error fetching post:', err)
    res.status(500).json({ err })
  }
})

router.get('/detail', async (req, res, next) => {
  try {
    const { user_id } = getPayload(req)
    const ids = req.query.ids.split(',')
    const sql = 'SELECT * FROM post WHERE post_id IN (?)'
    const values = [ids]
    const sql2 = 'SELECT usernames FROM users WHERE uid = ? LIMIT 1'
    const sql3 = 'SELECT * FROM images_post WHERE post_id IN (?)'
    const sql4 = 'SELECT post_id, COUNT(*) AS likes FROM like_post WHERE post_id IN (?) GROUP BY post_id'
    const promises = [
      db.query(sql, values),
      db.query(sql2, [values[0][0]]),
      db.query(sql3, values),
      db.query(sql4, values)
    ]
    Promise.all(promises)
      .then(([rows, rows2, rows3, rows4]) => {
        const posts = rows.map(post => {
          const usernames = rows2[0].usernames
          const images = rows3.filter(image => image.post_id === post.post_id)
          const likes = rows4.find(like => like.post_id === post.post_id)?.likes || 0
          return { ...post, usernames, images, likes }
        })
        res.json(posts)
      })
      .catch(err => {
        console.error('Error fetching posts:', err)
        const error = new Error('Internal server error')
        error.status = 500
        next(error)
      })
  } catch (err) {
    console.error('Error fetching posts:', err)
    res.status(500).json({ err })
  }
})
function deleteInactiveImages() {
  const currentTime = new Date();
  const targetTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 5, 0, 0); // 设置目标时间为当天的5:00

  if (currentTime >= targetTime) {
    
    const deleteQuery = 'SELECT path FROM image_post WHERE status = inactive ';
    let [temp] = db.query(deleteQuery)
    for (i=0;i>=temp.length;i++){
      fs.unlink(temp[i], (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('文件已成功删除！');
      });
    }

    
    clearInterval(timer);
  }
}
const timer = setInterval(deleteInactiveImages, 100000);

module.exports = router
