const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
const port = 3000
const path = require('path')
const mysql = require('mysql')
const crypto = require('crypto')
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb+srv://<username>:<password>@cluster0.urecvjg.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
async function run () {
  try {
    await client.connect()

    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } finally {
    await client.close()
  }
}
run().catch(console.dir)
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/profile', (req, res) => {
  const name = req.body
})
