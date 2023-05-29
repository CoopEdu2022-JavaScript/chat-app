
const mysql = require('mysql')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
})

module.exports = db



