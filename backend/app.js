const express = require('express')
const app = express()
const router = require('./router')
const cors = require('cors')
const port = 3000
app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:5173'
}
app.use(cors(corsOptions))

router(app)

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})
