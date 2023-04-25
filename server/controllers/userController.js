const User = require('../models/userModel.js')
const ObjectId = require('mongodb').ObjectId; // ObjectId isn't a global variable and needs to be required from mongo

//store api key in .env file!
const API_KEY = '2d27cf9efb8f4b5a842225540232104'

const userController = {}

// middleware to create new user w/ username and password
userController.createUser = (req, res, next) => {
  const { username, password } = req.body
  console.log('user', req.body)
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
        console.log(user);
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

  User.find({ _id: new ObjectId(`${userId}`) }).exec()
    .then(user => {
      // store saved location array on res locals
      res.locals.savedLocation = user[0].savedLocation;
      // console.log('user saved locations: ', res.locals.savedLocation)
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
userController.addNewLocation = async (req, res, next) => {
  const userId  = req.params.userId; // YES IT'S NOT DRY I KNOW OKAY
  const newLocation = req.body.location; // check that label matches what is sent in the request

  // make fetch req to api with newLocation first to check if valid location, if not valid location return an error
  // if data is returned store and appropriate metrics 
  // store location in mongodb user doc

  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${newLocation}&days=1`)
    .then(res => res.json())
    .then(result => {
        return result;
    })
    .catch(err => {
      return next({
        log: `userController.addNewLocation: ${err}`,
        message: { err: 'Error fetching weather data for new location' }
      });
    })

    // deconstruct response to include simplified metrics for new saved location card
    const { location, current, forecast } = response;
    const { name, region, country, localtime } = location;
    const { temp_f, temp_c, condition } = current;
    const max_temp = forecast.forecastday[0].day.maxtemp_f;
    const min_temp = forecast.forecastday[0].day.mintemp_f;
    const avg_temp = forecast.forecastday[0].day.avgtemp_f;

    const object = {
      location: { name, region, country, localtime },
      condition: condition,
      current: { temp_f, temp_c },
      max: max_temp,
      min: min_temp,
      avg: avg_temp,
    }

      // console.log(object);
    res.locals.newLocationData = object;


    User.findOneAndUpdate(
      { _id: new ObjectId(`${userId}`) }, 
      {$addToSet: {savedLocation: object.location.name}}, // addToSet to only add location if not already in array
      {new: true}
      )
      .then(user => {
        console.log(user);
        return next()
      })
      .catch(err => {
        console.log(err)
        return next({
          log: `userController.addNewLocation: ${err}`,
          message: { err: 'Error adding location' }
        })
      })

}

// delete location from user's saved list
userController.deleteLocation = (req, res, next) => {

}



module.exports = userController;