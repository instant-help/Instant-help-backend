const express = require('express')
const router = express.Router()
const db = require('../../db')
const userModel = require('../models/users')

// gets all users info
//  working
router.get('/', function(req, res, next){
  return (
    db('requests')
    .then(function (data) {
      res.send(data)
    })
  )
})

router.get('/current', function(req, res, next){
  return (
    db('requests')
    .whereNot({ request_status: 'closed' })
  ).then(function (data) {
    res.send(data)
  })
})

router.get('/current/:requsterUserID', function(req, res, next){
  let userID = req.params.requsterUserID
  return (
    db('requests')
    .where({user_id: userID })
    .whereNot({ request_status: 'closed' })
  ).then(function (data) {
    res.send(data)
  })
})

// working
//gets all requests by request user id
router.get('/user/:id', function(req, res, next){
  let id = req.params.id
  console.log(1)
  return (
    db('requests')
    .where({ user_id: id})
    .then(function (data) {
      res.send(data)
    })
  )
})

// working
//gets request by request id
router.get('/:id', function(req, res, next){
  let id = req.params.id
  return (
    db('requests')
    .where({ id })
    .then(function (data) {
      res.send(data)
    })
  )
})



//updates router
// description and or session status conditionally
router.put('/:id', function(req, res, next){
  let id = req.params.id
  let status = req.body.request_status
  let description = req.body.description
  console.log(id)
  let obj = {}
  if (description){
    obj.description = description
  }
  if (status){
    obj.status = status
  }
  return db('requests')
    .where({id})
    .update({
      description: description,
      request_status: status
    }).returning('*')
    .then( data => {
    res.send(data)
  })
})

//working 
// uses username to get user id. 
router.post('/:id', function(req, res, next){
  let id = req.params.id
  let description = req.body.description
  console.log(description)
        return db('requests').insert({
        user_id: id,
        description: description,
        request_status: 'pending'
      }).returning('*')
      .then(function (data) {
      res.send(data)
    })
})


module.exports = router
