const db = require('../../db')

function getAllQueue() {
  return (
    db('queues')
    .whereNull('deleted_at')
  )
}

function getQueueByHelper_ID(helper_id) {
  return (
    db('queues')
    .where({
      helper_id
    })
    .whereNull('deleted_at')
  )
}

function getQueueByRequest_ID(request_id) {
  return (
    db('queues')
    .where({
      request_id
    })
    .whereNull('deleted_at')
  )
}

function getAllRequesterProfilesInQueueByHelper_ID(helper_id) {
  return (
      db('queues')
      .whereNull('deleted_at')
      .select('queues.id as queues_id', 'request_id', 'user_id')
      .where({
        helper_id
      })
      .fullOuterJoin('requests', 'queues.request_id', 'requests.id')
    )
    .then(function (data1) {
      const promises1 = data1.map(dataItem => {
        return db('sessions')
          .where('sessions.request_id', dataItem.request_id)
          .then(function (data) {
            dataItem.session = data
            return dataItem
          })
      })
      return Promise.all(promises1)
    })
    .then(function (data2) {
      const promises2 = data2.map(dataItem => {
        return db('users')
          .where('users.id', dataItem.user_id)
          .then(function (data) {
            dataItem.user_Requester = data
            return dataItem
          })
      })
      return Promise.all(promises2)
    })
}

function getHelperSessionsFromQueueByHelper_ID(helper_id) {
  return (
      db('queues')
      .whereNull('deleted_at')
      .select('queues.id as queues_id', 'request_id', 'user_id')
      .where({
        helper_id
      })
      .fullOuterJoin('requests', 'queues.request_id', 'requests.id')
    )
    .then(function (data1) {
      const promises1 = data1.map(dataItem => {
        return db('sessions')
          .where('sessions.request_id', dataItem.request_id)
          .then(function (data) {
            dataItem.session = data
            return dataItem
          })
      })
      return Promise.all(promises1)
    })
    .then(function (data2) {
      const promises2 = data2.map(dataItem2 => {
        return db('requests')
          .where('requests.id', dataItem2.request_id)
          .then(function (data) {
            dataItem2.request = data
            return dataItem2
          })
      })
      return Promise.all(promises2)
    })
}

function createQueue(helper_id, request_id) {
  return (
    db('queues')
    .insert({
      helper_id,
      request_id
    }).returning('*')
  )
}

function deleteQueueByRequest_ID(request_id) {
  return (
    db('queues')
    .where({
      request_id
    })
    .update({
      deleted_at: new Date()
    })
    .returning('*')
  )
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