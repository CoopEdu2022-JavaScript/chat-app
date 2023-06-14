const express = require('express')
const app = express()
const router = require('./router')
const cors = require('cors')
const port = 3000
app.use(express.json())
app.use(express.static(__dirname + '/uploads'))
const corsOptions = {
  origin: ['http://localhost:5173', 'http://172.10.21.169:5173', 'http://10.16.0.152:5173']
}
app.use(cors(corsOptions))

router(app)

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})
