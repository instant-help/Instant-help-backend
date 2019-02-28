const modelsUsers = require('../models/users')

function getAllOfferingHelp(req, res, next){
  const limit = req.query.limit
  modelsUsers.getAllOfferingHelp(limit).then(function(result){
  if (!result) {
    return next({ status: 404, message: 'No users were found,  - ctrl Offering help'})
  }
  res.status(200).send(result)
  })
}

function getAllUsers(req, res, next){
  const limit = req.query.limit
  modelsUsers.getAllUsers(limit).then(function(result){
  if (!result) {
    return next({ status: 404, message: 'No users were found,  - ctrl-users 1'})
  }
  res.status(200).send(result)
  })
}

///////////// NEED TO UPDATE THIS CODE ////////////////
function getUser(req, res, next){
  const id = req.params.id
  if (!id) {
    return next({ status: 400, message: 'You need to provide an id, ctrl-users 2'})
  }
  const result = modelsUsers.getUser(id)
  res.status(200).send(result)
}

///////////// NEED TO UPDATE THIS CODE ////////////////
function deleteUser(req, res, next){
  const id = req.params.id
  const result = modelsUsers.deleteCar(id)
  if (!result) {
    return next({ status: 404, message: 'The car was not found so it was not deleted, ctrl-users 3'})
  }
  res.status(200).send(result)
}


///////////// NEED TO UPDATE THIS CODE ////////////////
function newUser(req, res, next){
  const { username, password } = req.body
  if(!username) {
    return next ({ status: 400, message: 'The user was not created. Bad username!, ctrl-users 4'})
  }
  if(!password) {
    return next ({ status: 400, message: 'The user was not created. Needs a password!, ctrl-users 5'})
  }
  modelsUsers.newUser(username,password)
  .then(function(result){
    return res.status(201).send(result)
  })
  .catch(next)
}





///////////// NEED TO UPDATE THIS CODE ////////////////
function updateUser(req, res, next){
  const id = req.params.id
  if (!id) {
    return next ({ status: 400, message: 'The user cannot be found without an id.'})
  }
  if (!req.body) {
    return next ({ status: 400, message: 'Must attach a body to update a user'})
  }

  const { ...update } = req.body

  modelsUsers.updateUser( id, update )
  .then(result => {
    if (!result) {
      return next({ status: 404, message: 'The user was not found so it was not updated'})
    }
    res.status(201).send(result[0])
  })
  
}
///////////// NEED TO UPDATE THIS CODE ////////////////


module.exports = { getAllUsers, getUser, deleteUser, newUser, updateUser, getAllOfferingHelp }

