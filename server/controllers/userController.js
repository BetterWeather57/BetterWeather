const User = require('../models/userModel.js')

const userController = {}

// middleware to create new user w/ username and password
userController.createUser = (req, res, next) => {
  const { username, password } = req.body
  if ( !username || !password ) {
    return next({
      log: 'userController.createUser',
      message: { err: 'No username or password entered' }
    })
  }
  // check if username is unique
  User.find({ username }).exec()
    .then(user => {
      if (user.length) {
        return next({
          log: 'userController.createUser',
          message: { err: 'User already exists, enter a different username' }
        })
      }
      // if username is unique, add new user to db
      User.create({ username, password })
        .then(result => {
          // store userId in response sent back
          // res.locals.account = result; => result is the created user object/doc as json
          res.locals.userId = result._id;
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

// verification middleware to login
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body

  User.find({ username }).exec()
    .then(user => {
      if (user[0].password === password) {
        // pass down user id ('_id' in each user doc) back as userId
        res.locals.userId = user[0]._id;
        return next();
      }
    })
    .catch(err => 
      next({
        log: `userController.verifyUser: ${err}`,
        message: { err: 'Error verifying user' }
      })  
    )
}

// fetch saved locations for a specific user
// *** for now, will only return array of user's saved locations as strings, need to send api data too???
userController.getSavedLocations = (req, res, next) => {
  const userId = req.params.userId;
  // console.log(userId);

  User.find({ userId }).exec()
    .then(user => {
      console.log(user);
      res.locals.savedLocation = user;
      return next();
    })
    .catch(err =>
      next({
        log: `userController.getSavedLocations: ${err}`,
        message: { err: 'Error fetching saved locations' }
      })
    )


}

// add a new saved location to user's account in db
userController.addNewLocation = (req, res, next) => {

}

// delete location from user's saved list
userController.deleteLocation = (req, res, next) => {

}



module.exports = userController;