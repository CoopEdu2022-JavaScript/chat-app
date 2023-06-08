const userRouter = require('./user')
const loginRouter = require('./login')


module.exports = app => {
  app.use('/login', loginRouter).use('/user', userRouter)
}
