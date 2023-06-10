const userRouter = require('./user')
const loginRouter = require('./login')
const postRouter = require('./post')

module.exports = app => {
  app.use('/login', loginRouter).use('/user', userRouter).use('/post', postRouter)
}
