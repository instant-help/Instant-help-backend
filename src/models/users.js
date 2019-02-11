const db = require('../../db')
const bcrypt = require('bcrypt')

function getOneByUserName(username){
  return (
    db('users')
    .where({ username })
    .first()
  )
}


function getAllUsers(limit){
  return limit ? db('users').slice(0, limit) : db('users')
}

function getUser(username){
///////////// NEED TO UPDATE THIS CODE ////////////////

}

function deleteUser(){
///////////// NEED TO UPDATE THIS CODE ////////////////

}

function newUser(username, password){
///////////// NEED TO UPDATE THIS CODE ////////////////
  return getOneByUserName(username)
    .then(function(data){
      if(data) throw { status: 400, message:'User already exists'}
      return bcrypt.hash(password, 10)
    })
    .then(function(hashedPassword){
      return (
        db('users')
        .insert({ username, password: hashedPassword })
        .returning('*')
      )
    })
    .then(function([ data ]){
      delete data.password
      return data
    })
}


function updateUser(){
///////////// NEED TO UPDATE THIS CODE ////////////////

}

module.exports = { getOneByUserName, getAllUsers, getUser, deleteUser, newUser, updateUser }

