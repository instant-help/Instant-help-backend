const express = require('express')
const router = express.Router()
const requestsController = require('../controllers/requests')

// Gets all Requests
router.get('/', requestsController.getAllRequests)

// Gets all current Requests
router.get('/current', requestsController.getAllCurrentReqeusts)

// Gets current Request by the Reqeusters User id
router.get('/current/:requsterUserID', requestsController.getCurrentReqeustsByUser_ID)

// Gets Request by User id 
router.get('/user/:id', requestsController.getRequestByUser_ID)

// Gets Request by Request id
router.get('/:id', requestsController.getRequestsByRequest_ID)

// Updates Request by Request id
router.put('/:id', requestsController.updateRequestByRequest_ID)

// Creates a new Request
router.post('/:id', requestsController.createRequest)

module.exports = router