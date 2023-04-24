const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js');
const weatherController = require('../controllers/weatherController.js');


router.get('/login', userController.verifyUser, (req, res) => {
  // 'Login successful'
  // userId stored in res.locals.userId
  return res.status(200).json(res.locals.userId);
})


router.post('/signup', userController.createUser, (req, res) => {
  // 'User successfully created'
  return res.status(201).json(res.locals.userId);
})

router.get('/:userId/saved', userController.getSavedLocations, weatherController.getSavedWeather, (req, res) => {
  // console.log('final response dataArray ', res.locals.dataArray);
  return res.status(200).json(res.locals.dataArray);
})


router.patch('/:userId/addNewLocation', userController.addNewLocation, (req, res) => {
  return res.status(200).json(res.locals.newLocationData);
})

router.delete('/:userId/deleteLocation', userController.deleteLocation, (req, res) => {
  return res.status(200).send('Location deleted.');
})


module.exports = router