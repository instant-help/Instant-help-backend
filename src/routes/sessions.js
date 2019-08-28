const express = require('express')
const router = express.Router()
const sessionsController = require('../controllers/sessions')

// Gets all Sessions
router.get('/', sessionsController.getAllSessions)

//Gets Sessions by Request id
router.get('/:id', sessionsController.getSessionByRequest_ID)

// Gets active Session by Request id
router.get('/active/:id', sessionsController.getActiveSessionByRequest_ID)

// Updates a Session by Request id
router.put('/:id', sessionsController.updateSessionByRequest_ID)

// Creates a New Session
router.post('/', sessionsController.createSession)




module.exports = router