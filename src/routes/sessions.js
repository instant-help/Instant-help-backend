const express = require('express')
const router = express.Router()
// const sessionsController = require('../controllers/sessions')
const db = require('../../db')

// get all sessions
router.get('/', function(req, res, next){
  return (
    db('sessions')
    .then(function (data) {
      res.send(data)
    })
  )
})

// get by request id
router.get('/:id', function(req, res, next){
  let id = req.params.id
  return (
    db('sessions')
    .where({
      request_id: id 
    })
    .then(function (data) {
      res.send(data)
    })
  )
})

///////////////////////////////////////
router.get('/active/:id', function(req, res, next){
  let id = req.params.id
  return (
    db('sessions')
    .where({
      request_id: id 
    })
    .fullOuterJoin('requests', 'requests.id', 'sessions.request_id')
    .then(function (data1) {
      const promises1 = data1.map( dataItem => {
        return db('users').where('users.id', dataItem.user_id)
          .then(function (data) {
            dataItem.user_Requester = data
              return dataItem 
          })
      })
      return Promise.all(promises1)
    })
    .then(function (data) {
      res.send(data)
    })
  )
})

//working
// updates session status
router.put('/:id', function(req, res, next){
  let requestId = req.params.id
  let status = req.body.session_status
  console.log(requestId, status)
  return db('sessions')
    .where({
      request_id: requestId 
    })
    .update({
      session_status: status
    }).returning('*')
    .then(function (data) {
      res.send(data)
  })
})

// created new session
router.post('/', function(req, res, next){
  let { request_id, queue_id } = req.body
  console.log(request_id, queue_id)
  return db('sessions')
    .insert({
      request_id: request_id,
      queue_id: queue_id,
      session_status: "started"
    }).returning('*')
    .then(function (data) {
      res.send(data)
    })
})


module.exports = router