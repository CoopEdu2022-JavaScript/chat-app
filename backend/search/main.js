const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'lzCUqYpu3nqh4maxH*81'
  },
  tls: {
    ca: fs.readFileSync('C:/Users/zhang/http_ca.crt'),
    rejectUnauthorized: false
  }
})