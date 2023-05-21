const userRouter = require('./user')

module.exports = app => {
  app.use('/', userRouter)
}
