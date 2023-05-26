const userRouter = require('./user')
const loginRouter = require('./login')
const profileRouter = require('./Profile')

module.exports = app => {
  app.use('/login', loginRouter).use('/user', userRouter).use('/profile', profileRouter)
}
