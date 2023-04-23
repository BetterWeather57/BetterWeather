const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')


router.get('/login', userController.verifyUser, (req, res) => {
  return res.status(200).send('User successfully logged in')
})


router.post('/signup', userController.createUser, (req, res) => {
  return res.status(201).send('User successfully created')
})


module.exports = router