const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'msa_db'
})

db.query('select* from user', (err, data) => {
  if (err) {
    console.log('error!', err)
  } else {
    console.log('success!', data)
  }
})
