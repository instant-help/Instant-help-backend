const db = require('../../db')

function getAllRequests() {
  return (
    db('requests')
  )
}

function getAllCurrentReqeusts() {
  return (
    db('requests')
    .whereNot({
      request_status: 'closed'
    })
  )
}

function getCurrentReqeustsByUserID(user_id) {
  return (
    db('requests')
    .where({
      user_id: user_id
    })
    .whereNot({
      request_status: 'closed'
    })
  )
}

function getRequestByUserID(user_id) {
  return (
    db('requests')
    .where({
      user_id
    })
  )
}

function getRequestsByRequestID(request_id) {
  return (
    db('requests')
    .where({
      id: request_id
    })
  )
}

function updateRequestByRequestID(request_id, description, status) {
  return (
    db('requests')
    .where({
      id: request_id
    })
    .update({
      description: description,
      request_status: status
    })
    .returning('*')
  )
}

function createRequest(user_id, description) {
  return (
    db('requests').insert({
      user_id: user_id,
      description: description,
      request_status: 'pending'
    }).returning('*')
  )
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