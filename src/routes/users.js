const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

// Gets a list of all Users
router.get('/', userController.getAllUsers)

// Gets a list of Users that are currently offering help
router.get('/offeringhelp', userController.getAllOfferingHelp)

// Gets a Users profile information
router.get('/:id', userController.getUserByUser_ID)

// Creates a new User
router.post('/', userController.newUser)

// Updates User information by User id
router.put('/:id', userController.updateUser)

module.exports = router