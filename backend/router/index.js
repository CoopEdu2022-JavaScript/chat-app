const userRouter = require('./user')
const loginRouter = require('./login')
const postRouter = require('./post')
const comentsRouter = require('./comment')
const uploadRouter = require('./upload')
const sendMailRouter = require('./sendpassword')
const feedRouter = require('./feed')
const searchRouter = require('./searchresult')
const profRouter = require('./profile')
const iconRouter = require('./uploadicon')
module.exports = app => {
  app.use('/uploadicon', iconRouter).use('/login', loginRouter).use('/user', userRouter).use('/post', postRouter).use('/comment', comentsRouter).use('/upload', uploadRouter).use('/sendpassword', sendMailRouter).use('/feed', feedRouter).use('/searchresult', searchRouter).use('/profile', profRouter)
}
