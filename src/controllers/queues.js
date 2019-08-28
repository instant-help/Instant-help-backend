const modelsQueues = require('../models/queues')

function getAllQueue(req, res, next) {
  modelsQueues.getAllQueue()
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

function getQueueByHelperID(req, res, next) {
  let helper_id = req.params.id
  if (!helper_id) {
    return next({
      status: 404,
      message: 'No helper id, cannot get queue information'
    })
  }
  modelsQueues.getQueueByHelperID(helper_id)
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

function getQueueByRequestID(req, res, next) {
  let request_id = req.params.id
  if (!request_id) {
    return next({
      status: 404,
      message: 'No request id, cannot get queue information'
    })
  }
  modelsQueues.getQueueByRequestID(request_id)
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

function getAllRequesterProfilesInQueueByHelperID(req, res, next) {
  let helper_id = req.params.helper_id
  if (!helper_id) {
    return next({
      status: 404,
      message: 'No helper id, cannot get queue information'
    })
  }
  modelsQueues.getAllRequesterProfilesInQueueByHelperID(helper_id)
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

function getHelperSessionsFromQueueByHelperID(req, res, next) {
  let helper_id = req.params.helper_id
  if (!helper_id) {
    return next({
      status: 404,
      message: 'No helper id, cannot get queue information'
    })
  }
  modelsQueues.getHelperSessionsFromQueueByHelperID(helper_id)
    .then(function (result) {
      if (!result) {
        return next({
          status: 404,
          message: 'No resutls found'
        })
      }
      res.status(200).send({
        id: getActiveSessionInfo(result)
      })
    })
}

function getActiveSessionInfo(queueData) {
  for (const queue of queueData) {
    if (queue.request[0].request_status === 'in session') {
      return queue.request[0].id
    }
  }
}

function createQueue(req, res, next) {
  let {
    helper_id,
    request_id
  } = req.body
  if (!helper_id || !request_id) {
    return next({
      status: 404,
      message: 'No request id or helper id, cannot post to queue'
    })
  }
  modelsQueues.createQueue(helper_id, request_id)
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

function deleteQueueByRequest_id(req, res, next) {
  let request_id = req.params.request_id
  if (!request_id) {
    return next({
      status: 404,
      message: 'No request id, cannot delete to queue'
    })
  }
  modelsQueues.deleteQueueByRequest_id(request_id)
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



module.exports = {
  getAllQueue,
  getQueueByHelperID,
  getQueueByRequestID,
  getAllRequesterProfilesInQueueByHelperID,
  getHelperSessionsFromQueueByHelperID,
  createQueue,
  deleteQueueByRequest_id
}