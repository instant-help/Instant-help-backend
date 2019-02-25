const express = require('express')
const router = express.Router()
const db = require('../../db')
// const queuesController = require('../controllers/queues')


// working 
router.post('/', function(req, res, next){
  console.log(req.body)
  let { helper_id, request_id } = req.body
  console.log(helper_id, request_id)
  return (
    db('queues')
    .insert({
      helper_id: helper_id, 
      request_id: request_id
    }).returning('*')
    .then(function (data) {
      res.send(data)
    })
  )
})

// gets all users info
// WORKING
router.get('/', function(req, res, next){
  return (
    db('queues')
    .then(function (data) {
      res.send(data)
    })
  )
})

// gets all helpers queues
// WORKING
router.get('/helper/:id', function(req, res, next){
  let id = req.params.id
  return (
    db('queues')
    .where({helper_id: id})
    .then(function (data) {
      res.send(data)
    })
  )
})

// WORKING
router.get('/request/:id', function(req, res, next){
  let id = req.params.id
  return (
    db('queues')
    .where({request_id: id})
    .then(function (data) {
      res.send(data)
    })
  )
})

// WORKING
router.delete('/all', function(req, res, next){
  return (
    db('queues')
    .del()
    .returning('*')
    ).then(function (data) {
      res.send(data)
    })
})

// WORKING
router.delete('/all/:helperid', function(req, res, next){
  let id = req.params.helperid
  return (
    db('queues')
    .where({helper_id: id})
    .del()
    .returning('*')
    ).then(function (data) {
      res.send(data)
    })
})


// WORKING
router.delete('/:requestid', function(req, res, next){
  let id = req.params.requestid
  return (
    db('queues')
    .where({request_id: id})
    .del()
    .returning('*')
    ).then(function (data) {
      res.send(data)
    })
})

module.exports = router