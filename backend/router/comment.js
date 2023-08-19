const express = require('express')
const router = express.Router()
const { getPayload } = require('../jwt_config')
const db = require('../db')



router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/:id/comment', async (req, res) => {
	try {
		const { user_id } = getPayload(req)
		const id = req.params.id
		const { content } = req.body
		const value = [content, id, user_id, id]
		await db.query(`INSERT INTO conment (content, post_id, uid, date) VALUES ( ?, ?, ?, NOW());UPDATE post SET coments_id = coments_id + 1 WHERE post_id = ?`, value)
		const sql = "SELECT uid FROM post WHERE post_id=?"
		const values = [id]
		const [rows] = await db.query(sql, values)
		const sql2="UPDATE users SET notif_comments = notif_comments + 1 WHERE uid=?"
		const values2=[rows[0].uid]
		const [rows2] = await db.query(sql2, values2)
		res.json({ state: true })
	} catch (err) {
		console.error('Error creating comment:', err)
		res.status(500).json({ err })
	}
})



router.get('/:id/comment', async (req, res) => {
	try {
		const { user_id } = getPayload(req)
		const id = req.params.id
		const values = [id]
		const sql = `
		SELECT conment.content, conment.date, users.usernames, conment.post_id, conment.conment_id, conment.uid
FROM conment 
INNER JOIN users ON users.uid = conment.uid
WHERE conment.post_id = ?
	  `
		const [rows] = await db.query(sql, values)
		const comments = rows.map(row => ({
			content: row.content,
			date: row.date,
			username: row.usernames,
			postId: row.post_id,
			commentId: row.comment_id
		}))
		res.send(comments)
	} catch (err) {
		console.error('Error fetching comments:', err)
		res.status(500).json({ err })
	}
})

router.put('/:id/comment', async (req, res) => {
	try {
		const { conmemt_id } = req.query
		const { id } = req.params
		const { content } = req.body
		const user_id = getPayload(req).user_id
		await db.query(`UPDATE conment SET content = '${content}',date=now() WHERE post_id = ${id} AND user_id = ${user_id} AND conment_id = ${conmemt_id}`)
		res.json({ state: true })
	} catch (err) {
		console.error('Error updating comment:', err)
		res.status(500).json({ err })
	}
})

router.delete('/:id/comment', async (req, res) => {
	try {
		const { conmemt_id } = req.query
		const { id } = req.params
		const user_id = getPayload(req).user_id
		await db.query(`DELETE FROM conment WHERE post_id = ${id} AND user_id = ${user_id} AND conment_id = ${conmemt_id};UPDATE post SET coments_id = coments_id - 1 WHERE post_id = ${id}`)
		res.json({ state: true })
	} catch (err) {
		console.error('Error deleting comment:', err)
		res.status(500).json({ err })
	}
})

module.exports = router


