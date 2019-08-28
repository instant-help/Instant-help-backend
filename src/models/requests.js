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

function getCurrentReqeustsByUser_ID(user_id) {
  return (
    db('requests')
    .where({
      user_id
    })
    .whereNot({
      request_status: 'closed'
    })
  )
}

function getRequestByUser_ID(user_id) {
  return (
    db('requests')
    .where({
      user_id
    })
  )
}

function getRequestsByRequest_ID(request_id) {
  return (
    db('requests')
    .where({
      id: request_id
    })
  )
}

function updateRequestByRequest_ID(request_id, description, request_status) {
  return (
    db('requests')
    .where({
      id: request_id
    })
    .update({
      description,
      request_status: status
    })
    .returning('*')
  )
}

function createRequest(user_id, description) {
  return (
    db('requests').insert({
      user_id,
      description,
      request_status: 'pending'
    }).returning('*')
  )
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