const db = require('../../db')
const bcrypt = require('bcrypt')

function getOneByUserName(username) {
  return (
    db('users')
    .where({
      username
    })
    .first()
  )
}

function getAllUsers(limit) {
  return limit ? db('users').slice(0, limit) : db('users')
}

function getAllOfferingHelp(limit) {
  return (
    limit ? db('users').slice(0, limit) :
    db('users')
    .where({
      online: 'online'
    })
    .andWhere({
      queue_status: 'offering help'
    })
    .orWhere({
      queue_status: 'offering help in session'
    })
  )
}

function getUserByUser_ID(user_id) {
  return (
    db('users')
    .where({
      id: user_id
    })
  )
}

function newUser(username, password) {
  return (
    getOneByUserName(username)
    .then(function (data) {
      if (data) throw {
        status: 400,
        message: 'Username already exists'
      }
      return bcrypt.hash(password, 10)
    })
    .then(function (hashedPassword) {
      return (
        db('users')
        .insert({
          username,
          password: hashedPassword
        })
        .returning('*')
      )
    })
    .then(function ([data]) {
      delete data.password
      return data
    })
  )
}

function updateUser(id, update) {
  return (
    db('users')
    .where({
      id
    })
    .update(update)
    .returning('*')
  )
}

module.exports = {
  getOneByUserName,
  getUserByUser_ID,
  getAllUsers,
  newUser,
  updateUser,
  getAllOfferingHelp
}