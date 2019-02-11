const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.delete('/:id', userController.deleteUser)
router.post('/', userController.newUser)
router.put('/:id', userController.updateUser)

module.exports = router