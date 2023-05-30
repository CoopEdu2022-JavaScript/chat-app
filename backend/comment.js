const express = require('express')
const router = express.Router()
const db = require('./db')
const mysql = require('mysql2/promise')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

async function createTable(coments_id) {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydatabase'
      })
    //   const sql = ('SET NAMES utf8mb4;
    //     SET FOREIGN_KEY_CHECKS = 0;
        
    //     -- ----------------------------
    //     -- Table structure for conment
    //     -- ----------------------------
    //     DROP TABLE IF EXISTS `conment`;
    //     CREATE TABLE `conment`  (
    //         `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    //         `post_id` bigint NOT NULL,
    //         `uid` bigint NOT NULL,
    //         `date` datetime NOT NULL,
    //         `conment_id` bigint NOT NULL AUTO_INCREMENT,
    //         PRIMARY KEY (`conment_id`, `post_id`) USING BTREE
    //     ) ENGINE = InnoDB AUTO_INCREMENT = 1001 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
        
    //     SET FOREIGN_KEY_CHECKS = 1;
    //   '[coments_id])
      const [rows, fields] = await connection.execute(sql)
      console.log('Table created successfully')
    } catch (err) {
      console.error('Error creating table:', err)
    }
  }
router.post('/{id}/comment', (req, res) => {
    const { id } = req.params

    createTable(id)
    const { content, user_id } = req.body
    const time = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    db.query('INSERT INTO ? (content, date, uid, post_id) VALUES (?, ?, ?, ?)',
        [id,content, time, user_id, id], (err, data) => {
        if (err) res.status(500).json({ err })
        else res.send(true)
        })
    })
router.get('/{id}/comment', (req, res) => {
    const { id } = req.params
    db.query('SELECT content,date,uid,post_id FROM ? WHERE id = ?', [id,id], (err, data) => {
        if (err) res.status(500).json({ err })
        else res.send(data)
        })
    })


