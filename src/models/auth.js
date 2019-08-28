const bcrypt = require('bcrypt')
const userModel = require('./users')

function login(username, password) {
  let user
  console.log(username, password)
  return userModel.getOneByUserName(username)
    .then(function (data) {
      if (!data) throw {
        status: 400,
        message: 'Bad request'
      }
      user = data

      return bcrypt.compareSync(password, data.password)
    })
    .then(function (status) {
      if (!status) throw {
        status: 401,
        message: 'Unauthorized'
      }
      delete user.password
      return user
    })
}

module.exports = {
  login
}