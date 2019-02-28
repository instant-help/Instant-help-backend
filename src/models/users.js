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

function getAllOfferingHelp(limit){
  return limit ? db('users').slice(0, limit) 
  : db('users')
  .where({ online: 'online'})
  .andWhere({ queue_status: 'offering help' })
  .orWhere({ queue_status: 'offering help in session' })
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


function updateUser( id, update ){
///////////// NEED TO UPDATE THIS CODE ////////////////
// console.log('user model user update 3')
console.log(id, update)
  return db('users')
    .where({ id })
    .update( update )
    .returning('*')
      // .then( function (data){
      //   // console.log('data',data)
      //   // console.log(' //////////////////////// ')
      //     return data
      //   })
}

module.exports = { getOneByUserName, getAllUsers, getUser, deleteUser, newUser, updateUser, getAllOfferingHelp }

