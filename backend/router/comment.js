const express = require('express')
const router = express.Router()
const { getPayload } = require('../jwt_config')
const db = require('../db')



router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/:id/comment', async (req, res) => {
	try {
		const {id} = req.params
		const { content} = req.body
		const user_id = getPayload(req).user_id
		await db.query(`INSERT INTO conment (content, post_id, user_id, date) VALUES ('${content}', ${id}, ${user_id}, NOW());UPDATE post SET coments_id = coments_id + 1 WHERE post_id = ${id}`)
		res.json({state:true})
  } catch (err) {
		console.error('Error creating comment:', err)
		res.status(500).json({ err })
	}
})
	
	
	
router.get('/:id/comment', (req, res) => {
	// const  id  = req.params
	// db.query('SELECT content,date,uid,post_id FROM ? WHERE id = ?', [id,id], (err, data) => {
	// 		if (err) res.status(500).json({ err })
	// 		else res.send(data)
	// 		})
	// })
	try {
		const {id} = req.params
		const sql = `SELECT content,date,uid,post_id,conment_id FROM conment WHERE post_id = ${id}`
		const [rows] = db.query(sql)
		res.json(rows[0])
	} catch (err) {
		console.error('Error fetching comment:', err)
		res.status(500).json({ err })
	}
})

router.put('/:id/comment', async(req, res) => {
	try {
		const {conmemt_id} = req.query
		const {id} = req.params
		const { content} = req.body
		const user_id = getPayload(req).user_id
		await db.query(`UPDATE conment SET content = '${content}',date=now() WHERE post_id = ${id} AND user_id = ${user_id} AND conment_id = ${conmemt_id}`)
		res.json({state:true})
	} catch (err) {
		console.error('Error updating comment:', err)
		res.status(500).json({ err })
	}
})

router.delete('/:id/comment', async(req, res) => {
	try {
		const {conmemt_id} = req.query
		const {id} = req.params
		const user_id = getPayload(req).user_id
		await db.query(`DELETE FROM conment WHERE post_id = ${id} AND user_id = ${user_id} AND conment_id = ${conmemt_id};UPDATE post SET coments_id = coments_id - 1 WHERE post_id = ${id}`)
		res.json({state:true})
	} catch (err) {
		console.error('Error deleting comment:', err)
		res.status(500).json({ err })
	}
})

module.exports = router


