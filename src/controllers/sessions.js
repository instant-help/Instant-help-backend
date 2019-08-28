const modelsSessions = require('../models/sessions')

function getAllSessions(req, res, next){
  modelsSessions.getAllSessions()
  .then(function (result) {
    if (!result) {
      return next({ status: 404, message: 'No results found'})
    }
    res.status(200).send(result)
  })
}

function getSessionByRequest_id(req, res, next){
  let request_id = req.params.id
  if (!request_id){
    return next ({ status: 400, message: 'No request id, cannot get session'})
  }
  modelsSessions.getSessionByRequest_id(request_id)
  .then(function(result){
    if (!result){
      return next({ status: 404, message: 'No session results found'})
    }
    res.status(200).send(result)
  })
}

function getActiveSessionByRequest_id(req, res, next){
  let request_id = req.params.id
  if (!request_id){
    return next ({ status: 400, message: 'No request id, cannot get session'})
  }
  modelsSessions.getActiveSessionByRequest_id(request_id)
  .then(function(result){
  if (!result){
    return next({ status: 404, message: 'No active session results found'})
  }
  res.status(200).send(result)
  })
}

function updateSessionByRequest_id(req, res, next){
  let request_id = req.params.id
  let session_status = req.body.session_status
  if (!request_id){
    return next ({ status: 400, message: 'No request id, cannot update session'})
  }
  if (!session_status){
    return next ({ status: 400, message: 'No session status, cannot update session'})
  }
  modelsSessions.updateSessionByRequest_id(request_id, session_status)
  .then(function(result){
  if (!result){
    return next({ status: 404, message: 'No updated session results found'})
  }
  res.status(200).send(result)
  })
}

function createSession(req, res, next){
  let { request_id, queue_id } = req.body
  if (!request_id){
    return next ({ status: 400, message: 'No request id, cannot create session'})
  }
  if (!queue_id){
    return next ({ status: 400, message: 'No queue id, cannot create session'})
  }
  modelsSessions.createSession(request_id, queue_id)
  .then(function(result){
  if (!result){
    return next({ status: 404, message: 'No created session results found'})
  }
  res.status(200).send(result)
  })
}



module.exports = { getAllSessions, getSessionByRequest_id, getActiveSessionByRequest_id, updateSessionByRequest_id, createSession}