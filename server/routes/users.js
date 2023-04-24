const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')


router.get('/login', userController.verifyUser, (req, res) => {
  // 'Login successful'
  // userId stored in res.locals.userId
  return res.status(200).json(res.locals.userId);
})


router.post('/signup', userController.createUser, (req, res) => {
  // 'User successfully created'
  return res.status(201).json(res.locals._id);
})

router.get('/:userId/saved', userController.getSavedLocations, (req, res) => {
  return res.status(200).json(res.locals.savedLocation);
})


router.patch('/:userId/addNewLocation', userController.addNewLocation, (req, res) => {
  return res.status(200).send('Location saved!');
})

router.delete('/:userId/deleteLocation', userController.deleteLocation, (req, res) => {
  return res.status(200).send('Location deleted.');
})


module.exports = router