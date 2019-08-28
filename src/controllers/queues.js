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

function getQueueByHelper_ID(req, res, next) {
  let helper_id = req.params.id
  if (!helper_id) {
    return next({
      status: 404,
      message: 'No helper id, cannot get queue information'
    })
  }
  modelsQueues.getQueueByHelper_ID(helper_id)
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

function getQueueByRequest_ID(req, res, next) {
  let request_id = req.params.id
  if (!request_id) {
    return next({
      status: 404,
      message: 'No request id, cannot get queue information'
    })
  }
  modelsQueues.getQueueByRequest_ID(request_id)
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

function getAllRequesterProfilesInQueueByHelper_ID(req, res, next) {
  let helper_id = req.params.helper_id
  if (!helper_id) {
    return next({
      status: 404,
      message: 'No helper id, cannot get queue information'
    })
  }
  modelsQueues.getAllRequesterProfilesInQueueByHelper_ID(helper_id)
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

function getHelperSessionsFromQueueByHelper_ID(req, res, next) {
  let helper_id = req.params.helper_id
  if (!helper_id) {
    return next({
      status: 404,
      message: 'No helper id, cannot get queue information'
    })
  }
  modelsQueues.getHelperSessionsFromQueueByHelper_ID(helper_id)
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

function deleteQueueByRequest_ID(req, res, next) {
  let request_id = req.params.request_id
  if (!request_id) {
    return next({
      status: 404,
      message: 'No request id, cannot delete to queue'
    })
  }
  modelsQueues.deleteQueueByRequest_ID(request_id)
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
  getQueueByHelper_ID,
  getQueueByRequest_ID,
  getAllRequesterProfilesInQueueByHelper_ID,
  getHelperSessionsFromQueueByHelper_ID,
  createQueue,
  deleteQueueByRequest_ID
}