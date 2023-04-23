const User = require('../models/userModel.js')

const userController = {}

userController.createUser = (req, res, next) => {
  const { username, password } = req.body
  if ( !username || !password ) {
    return next({
      log: 'userController.createUser',
      message: { err: 'No username or password entered' }
    })
  }
  User.find({ username }).exec()
    .then(user => {
      if (user.length) {
        return next({
          log: 'userController.createUser',
          message: { err: 'User already exists, enter a different username' }
        })
      }
      User.create({ username, password })
        .then(result => {
          // anything to store?
          res.locals.account = result
          return next()
        })
    })
    .catch(err => 
      next({
        log: `userController.createUser: ${err}`,
        message: { err: 'Error creating user' }
      })  
    )
}

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body

  User.find({ username }).exec()
    .then(user => {
      if (user[0].password === password) {
        // anything to pass down?
        return next()
      }
    })
    .catch(err => 
      next({
        log: `userController.verifyUser: ${err}`,
        message: { err: 'Error verifying user' }
      })  
    )
}




module.exports = userController