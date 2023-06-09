const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/ogin', (req, res) => {
  let { uid, pwd } = req.body
  res.send(uid == 'admin' && pwd == 'admin')
})

router.get('/like', (req, res) => {
  let { like } = req.body  // true false
  // to db
  res.send(is_success)
})
router.get('/', (req, res) => {
  console.log(234234234)
  res.send(req.headers.authorization)
})
module.exports = router