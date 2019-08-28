const express = require('express')
const router = express.Router()
const db = require('../../db')
const queuesController = require('../controllers/queues')


// Gets all Queues
router.get('/', queuesController.getAllQueue)

// Gets Queues by Helper id
router.get('/helper/:id', queuesController.getQueueByHelper_ID)

// Gets Queue by Request id
router.get('/request/:id', queuesController.getQueueByRequest_ID)

// Gets all Requester profiles in a Helpers Queue by Helper id.
router.get('/allqueueprofiles/:helper_id', queuesController.getAllRequesterProfilesInQueueByHelper_ID)

// Gets a Helpers Session information from the Queue by Helper id
router.get('/helpersSessionFromQueue/:helper_id', queuesController.getHelperSessionsFromQueueByHelper_ID)

// Creates a Queue
router.post('/', queuesController.createQueue)

// Updates a Queue as deleted with a timestamp. 
// Does not actually delete form database just marks the Queue as deleted. 
router.delete('/:request_id', queuesController.deleteQueueByRequest_ID)

// Deletes all Queues - Not nessassary for MVC
router.delete('/all', function (req, res, next) {
  return (
    db('queues')
    .del()
    .returning('*')
  ).then(function (data) {
    res.send(data)
  })
})

// Deletes all Queues by Helper id - Not nessassary for MVC
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