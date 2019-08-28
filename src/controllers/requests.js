const modelsRequests = require('../models/requests')

function getAllRequests(req, res, next) {
  modelsRequests.getAllRequests()
    .then(function (result) {
      if (!result) {
        return next({
          status: 404,
          message: 'No users were found'
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

function getCurrentReqeustsByUser_ID(req, res, next) {
  let user_id = req.params.requsterUserID
  if (!user_id) {
    return next({
      status: 400,
      message: 'No user id'
    })
  }
  modelsRequests.getCurrentReqeustsByUser_ID(user_id)
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

function getRequestByUser_ID(req, res, next) {
  let user_id = req.params.id
  if (!user_id) {
    return next({
      status: 400,
      message: 'No user id, cannont get information'
    })
  }
  modelsRequests.getRequestByUser_ID(user_id)
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

function getRequestsByRequest_ID(req, res, next) {
  let request_id = req.params.id
  if (!request_id) {
    return next({
      status: 400,
      message: 'No request id, cannot get information'
    })
  }
  modelsRequests.getRequestsByRequest_ID(request_id)
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

function updateRequestByRequest_ID(req, res, next) {
  let request_id = req.params.id
  let description = req.body.description
  let request_status = req.body.request_status
  if (!request_id) {
    return next({
      status: 400,
      message: 'No request id, cannot get information'
    })
  }
  if (!description && !request_status) {
    return next({
      status: 400,
      message: 'No description or status was provided, cannot update request'
    })
  }
  modelsRequests.updateRequestByRequest_ID(request_id, description, request_status)
    .then(function (result) {
      if (!result) {
        return next({
          status: 404,
          message: 'No resutls found'
        })
      }
      res.status(201).send(result)
    })
}

function createRequest(req, res, next) {
  let user_ID = req.params.id
  let description = req.body.description
  if (!user_ID) {
    return next({
      status: 400,
      message: 'No user id, cannot create request'
    })
  }
  if (!description) {
    return next({
      status: 400,
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
      res.status(201).send(result)
    })
}

module.exports = {
  getAllRequests,
  getAllCurrentReqeusts,
  getCurrentReqeustsByUser_ID,
  getRequestByUser_ID,
  getRequestsByRequest_ID,
  updateRequestByRequest_ID,
  createRequest
}