
const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hc20070521',
  database: 'msachatdatabase'
})

db.query('select* from user', (err, data) => {
  if (err) {
    console.log('error!', err)
  } else {
    console.log('success!', data)
  }
})
