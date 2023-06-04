const jwt = require('jsonwebtoken')

const user = { id: 123, email: 'john@example.com', name: 'John Doe' }
const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })

console.log(token)