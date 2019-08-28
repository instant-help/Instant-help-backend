const express = require('express')
const router = express.Router()
const requestsController = require('../controllers/requests')

// gets all requests
router.get('/', requestsController.getAllRequests)

// gets all current requests
router.get('/current', requestsController.getAllCurrentReqeusts)

// gets current request by the reqeusters User id
router.get('/current/:requsterUserID', requestsController.getCurrentReqeustsByUserID)

// gets request but user id 
router.get('/user/:id', requestsController.getRequestByUserID)

// gets request but request id
router.get('/:id', requestsController.getRequestsByRequestID)

// updates request by request id
router.put('/:id', requestsController.updateRequestByRequestID)

// creates a new request
router.post('/:id', requestsController.createRequest)

module.exports = router
