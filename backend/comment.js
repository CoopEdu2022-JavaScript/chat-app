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
      const sql = (`
        CREATE TABLE IF NOT EXISTS ? (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        )`[coments_id])
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
    db.query('SELECT content,date,uid,post_id FROM ? WHERE id = ?', [id], (err, data) => {
        if (err) res.status(500).json({ err })
        else res.send(data)
        })
    })


