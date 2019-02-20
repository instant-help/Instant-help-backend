const express = require('express')
const router = express.Router()
const db = require('../../db')
const userModel = require('../models/users')

// gets all users info
router.get('/', function(req, res, next){
  return (
    db('requests')
    .then(function (data) {
      res.send(data)
    })
  )
})

//updates router.
router.put('/:id', function(req, res, next){
  let id = req.params.id
  let status = req.body.session_status
  console.log(id)
  return db('requests')
    .where({id})
    .update({
      session_status: status
    }).returning('*')
    .then(function (data) {
    res.send(data)
  })
})
// uses username to get user id. 
router.post('/', function(req, res, next){
  let { description, username } = req.body
  console.log('working 1', description, username)
  userModel.getOneByUserName(username)
    .then(userinfo => {
      return db('users')
        .where({ username })
        .first()
          .then(function (result) {
          console.log('result')
            return db('requests').insert({
            user_id: userinfo.id,
            description: description,
            session_status: 'pending'
          }).returning('*')
          .then(function (data) {
          res.send(data)
        })
    })
  })
})
  


module.exports = router
