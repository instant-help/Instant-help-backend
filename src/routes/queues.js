const express = require('express')
const router = express.Router()
const db = require('../../db')
const queuesController = require('../controllers/queues')


// working 
// router.post('/', function(req, res, next){
//   console.log(req.body)
//   let { helper_id, request_id } = req.body
//   console.log(helper_id, request_id)
//   return (
//     db('queues')
//     .insert({
//       helper_id: helper_id, 
//       request_id: request_id
//     }).returning('*')
//     .then(function (data) {
//       res.send(data)
//     })
//   )
// })

// works
// Creates a Queue
router.post('/', queuesController.createQueue)

// WORKING 
// router.get('/', function(req, res, next){
//   return (
//     db('queues').whereNull('deleted_at')
//     .then(function (data) {
//       res.send(data)
//     })
//   )
// })

//working
// Gets all Queues
router.get('/', queuesController.getAllQueue)

// WORKING
// router.get('/helper/:id', function(req, res, next){
//   let id = req.params.id
//   return (
//     db('queues')
//     .where({helper_id: id})
//     .whereNull('deleted_at')
//     .then(function (data) {
//       res.send(data)
//     })
//   )
// })

// gets Queues by helper id
//working
router.get('/helper/:id', queuesController.getQueueByHelperID)

// WORKING
// router.get('/request/:id', function(req, res, next){
//   let id = req.params.id
//   return (
//     db('queues')
//     .where({request_id: id})
//     .whereNull('deleted_at')
//     .then(function (data) {
//       console.log(data, 111117287127897812879128712)
//       res.send(data)
//     })
//   )
// })

// works
// gets Queue by request id
router.get('/request/:id', queuesController.getQueueByRequestID)






// workings
// gets all requester profiles in a helpers queue by helper id.
router.get('/allqueueprofiles/:helper_id', queuesController.getAllRequesterProfilesInQueueByHelperID)
// finally working!!!!!!!! 
// router.get('/allqueueprofiles/:helperid', function(req, res, next){
//   let id = req.params.helperid
//   return (
//     db('queues').whereNull('deleted_at')
//     .select('queues.id as queues_id', 'request_id', 'user_id')

//     .where({helper_id: id})
//     .fullOuterJoin('requests', 'queues.request_id', 'requests.id')
//   )
//   .then(function (data1) {
//     const promises1 = data1.map( dataItem => {
//       return db('sessions').where('sessions.request_id', dataItem.request_id)
//         .then(function (data) {
//           dataItem.session = data
//             return dataItem 
//         })
//     })
//     return Promise.all(promises1)
//   })
//   .then(function (data2) {
//     const promises2 = data2.map( dataItem => {
//       return db('users').where('users.id', dataItem.user_id)
//         .then(function (data) {
//           dataItem.user_Requester = data
//             return dataItem 
//         })
//     })
//     return Promise.all(promises2)
//   }).then(function (data) {
//   res.send(data)
//   })
// })

//
// gets a helpers session information from the queue by helper id
router.get('/helpersSessionFromQueue/:helper_id', queuesController.getHelperSessionsFromQueueByHelperID)

// router.get('/helpersSessionFromQueue/:helperid', function(req, res, next){
//   let id = req.params.helperid
//   function getHelperSessionFromQueue(id) {
//   return( 
//     db('queues').whereNull('deleted_at')
//     .select('queues.id as queues_id', 'request_id', 'user_id')
//     .where({helper_id: id})
//     .fullOuterJoin('requests', 'queues.request_id', 'requests.id')
//   )
//   .then(function (data1) {
//     const promises1 = data1.map( dataItem => {
//       return db('sessions').where('sessions.request_id', dataItem.request_id)
//         .then(function (data) {
//           dataItem.session = data
//             return dataItem 
//         })
//     })
//     return Promise.all(promises1)
//   })
//   .then(function (data2) {
//     const promises2 = data2.map (dataItem2 => {
//       return db('requests').where('requests.id', dataItem2.request_id)
//         .then(function (data) {
//           dataItem2.request = data
//             return dataItem2
//         })
//     })
//     return Promise.all(promises2)

//   })
//   }
//   function getActiveSessionInfo(queueData){
//     for (const queue of queueData ) {
//       if (queue.request[0].request_status === 'in session') {
//         return queue.request[0].id
//       }
//     }
//   }
//   getHelperSessionFromQueue(id)
//   .then(function (data) {
//     console.log(data)

//     res.send({id: getActiveSessionInfo(data)})
//     })
// })


// WORKING
// router.delete('/:requestid', function(req, res, next){
//   let id = req.params.requestid
//   return (
//     db('queues')
//     .where({request_id: id})
//     // .del()
//     .update({deleted_at: new Date()})
//     .returning('*')
//     ).then(function (data) {
//       res.send(data)
//     })
// })

// working
// Updates a Queue as deleted. 
// Does not actually delete form database just marks the queue as deleted. 
router.delete('/:request_id', queuesController.deleteQueueByRequest_id)

// WORKING - Not nessassary for MVC
router.delete('/all', function (req, res, next) {
  return (
    db('queues')
    .del()
    .returning('*')
  ).then(function (data) {
    res.send(data)
  })
})

// WORKING - Not nessassary for MVC
router.delete('/all/:helperid', function (req, res, next) {
  let id = req.params.helperid
  return (
    db('queues')
    .where({
      helper_id: id
    })
    .del()
    .returning('*')
  ).then(function (data) {
    res.send(data)
  })
})

module.exports = router