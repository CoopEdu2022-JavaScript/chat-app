const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
const port = 3000
const path = require('path')
const mysql = require('mysql')
const crypto = require('crypto')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/like', (req, res) => {
  let { like } = req.body;  // true false

  res.send(is_success)
})
router.post('/login', (req, res) => {
  let { uid,name} = req.body
    res.send(uid == 'admin' && pwd == 'admin')
  })
module.exports = router