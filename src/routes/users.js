const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const db = require('../../db')

// working
router.get('/offeringhelp', userController.getAllOfferingHelp)

router.get('/', userController.getAllUsers)

// broken
router.get('/:id', function(req, res, next){
  let id = req.params.id
  return db('users')
    .where({ id })
    .then( function (data){
      res.send(data)
    })
})
// broken working
// i can get this to delete but i cant get it to 
// return anything without causing an error
router.delete('/:id', function(req, res, next){
  let id = req.params.id
  return db('users')
    .where({ id })
    .returning('*')
    .del()
    .then( function (data){
      res.send(data)
    })

    // .then( function (data){
    //   res.send(data)
    // })
})
// broken
router.post('/', userController.newUser)
// broken
router.put('/:id', userController.updateUser)

module.exports = router




