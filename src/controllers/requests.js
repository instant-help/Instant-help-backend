const modelsRequests = require('../models/requests')

function getAllRequests(req, res, next) {
  modelsRequests.getAllRequests()
    .then(function (result) {
      if (!result) {
        return next({
          status: 404,
          message: 'No users were found,  - ctrl-users 1'
        })
      }
      res.status(200).send(result)
    })
}

function getAllCurrentReqeusts(req, res, next) {
  modelsRequests.getAllCurrentReqeusts()
    .then(function (result) {
      if (!result) {
        return next({
          status: 404,
          message: 'No current requests found'
        })
      }
      res.status(200).send(result)
    })
}

function getCurrentReqeustsByUserID(req, res, next) {
  let user_id = req.params.requsterUserID
  if (!user_id) {
    return next({
      status: 404,
      message: 'No user id'
    })
  }
  modelsRequests.getCurrentReqeustsByUserID(user_id)
    .then(function (result) {
      if (!result) {
        return next({
          status: 404,
          message: 'No request found'
        })
      }
      res.status(200).send(result)
    })
}

function getRequestByUserID(req, res, next) {
  let user_id = req.params.id
  if (!user_id) {
    return next({
      status: 404,
      message: 'No user id, cannont get information'
    })
  }
  modelsRequests.getRequestByUserID(user_id)
    .then(function (result) {
      if (!result) {
        return next({
          status: 404,
          message: 'No results found'
        })
      }
      res.status(200).send(result)
    })
}

function getRequestsByRequestID(req, res, next) {
  let request_id = req.params.id
  if (!request_id) {
    return next({
      status: 404,
      message: 'No request id, cannot get information'
    })
  }
  modelsRequests.getRequestsByRequestID(request_id)
    .then(function (result) {
      if (!result) {
        return next({
          status: 404,
          message: 'No resutls found'
        })
      }
      res.status(200).send(result)
    })
}

function updateRequestByRequestID(req, res, next) {
  let request_id = req.params.id
  let description = req.body.description
  let status = req.body.request_status

  if (!request_id) {
    return next({
      status: 404,
      message: 'No request id, cannot get information'
    })
  }
  if (!description && !status) {
    return next({
      status: 404,
      message: 'No description or status was provided, cannot update request'
    })
  }
  modelsRequests.updateRequestByRequestID(request_id, description, status)
    .then(function (result) {
      if (!result) {
        return next({
          status: 404,
          message: 'No resutls found'
        })
      }
      res.status(200).send(result)
    })
}

function createRequest(req, res, next) {
  let user_ID = req.params.id
  let description = req.body.description
  if (!user_ID) {
    return next({
      status: 404,
      message: 'No user id, cannot create request'
    })
  }
  if (!description) {
    return next({
      status: 404,
      message: 'No description cannot create request'
    })
  }
  modelsRequests.createRequest(user_ID, description)
    .then(function (result) {
      if (!result) {
        return next({
          status: 404,
          message: 'Request not created'
        })
      }
      res.status(200).send(result)
    })
}

module.exports = {
  getAllRequests,
  getAllCurrentReqeusts,
  getCurrentReqeustsByUserID,
  getRequestByUserID,
  getRequestsByRequestID,
  updateRequestByRequestID,
  createRequest
}