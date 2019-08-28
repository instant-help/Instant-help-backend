const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

// Gets a list of all users
router.get('/', userController.getAllUsers)

// gets a list of Users that are currently offering help
router.get('/offeringhelp', userController.getAllOfferingHelp)

// Gets a Users profile information
router.get('/:id', userController.getUserByUser_id)

// Creates a new user
router.post('/', userController.newUser)

// Updates User information by User id
router.put('/:id', userController.updateUser)

module.exports = router