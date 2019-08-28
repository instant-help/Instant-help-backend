const db = require('../../db')

function getAllSessions() {
  return (
    db('sessions')
  )
}

function getSessionByRequest_ID(request_id) {
  return (
    db('sessions')
    .where({
      request_id
    })
  )
}

function getActiveSessionByRequest_ID(request_id) {
  return (
    db('sessions')
    .where({
      request_id
    })
    .fullOuterJoin('requests', 'requests.id', 'sessions.request_id')
    .then(function (data1) {
      const promises1 = data1.map(dataItem => {
        return db('users').where('users.id', dataItem.user_id)
          .then(function (data) {
            dataItem.user_Requester = data
            return dataItem
          })
      })
      return Promise.all(promises1)
    })
  )
}

function updateSessionByRequest_ID(request_id, session_status) {
  return (
    db('sessions')
    .where({
      request_id
    })
    .update({
      session_status
    }).returning('*')
  )
}

function createSession(request_id, queue_id) {
  return (
    db('sessions')
    .insert({
      request_id,
      queue_id,
      session_status: "started"
    }).returning('*')
  )
}

module.exports = {
  getAllSessions,
  getSessionByRequest_ID,
  getActiveSessionByRequest_ID,
  updateSessionByRequest_ID,
  createSession
}