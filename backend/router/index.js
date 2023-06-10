const userRouter = require('./user')
const loginRouter = require('./login')
const postRouter = require('./post')
const coments_id = require('./comment')
module.exports = app => {
  app.use('/login', loginRouter).use('/user', userRouter).use('/post', postRouter).use('/comment', coments_id)
}
