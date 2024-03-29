const express = require('express')
const app = express()
const router = require('./router')
const cors = require('cors')
const port = 3000
const fs = require('fs')
const path = require('path');
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname + '/uploads'))
const corsOptions = {
  origin: ['http://localhost:5173', 'http://172.10.21.169:5173', 'http://10.16.0.152:5173', 'http://192.168.137.1:5173', 'http://172.16.37.204:5173', 'http://192.168.0.6:5173', 'http://192.168.192.250:5173', 'http://172.30.31.76:5173']
}
app.use(cors(corsOptions))

router(app)

app.listen(port, () => {
  //console.log('Server is running on http://localhost:3000')
  //int_test
})

