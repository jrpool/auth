const DbUsers = require('../../db/users')
const {renderError} = require('../utils')

const router = require('express').Router()

router.get('/login', (request, response) => {
  response.render('login')
})

router.post('/login', (request, response, next) => {
  if (!request.body.username.length || !request.body.password.length) {
    response.send('Your username or password was missing!')
    return
  }
  DbUsers.validateUser(request.body)
  .then(user => {
    if (user !== null) {
      response.redirect('../contacts')
      return ''
    }
    else {
      response.send('Your username or password was invalid!')
      return ''
    }
  })
  .catch( error => renderError(error, response, response) )
})

router.get('/signup', (request, response) => {
  response.render('signup')
})

router.post('/signup', (request, response, next) => {
  if (request.body.password2 !== request.body.password1) {
    response.send('Your passwords are not identical!')
    return
  }
  DbUsers.checkUser(request.body)
  .then(user => {
    if (user !== null) {
      response.send('You are already registered!')
      return ''
    }
    else {
      return DbUsers.createUser(request.body)
    }
  })
  .then(user => {
    if (user) {
      return response.redirect('../contacts')
      next()
    }
  })
  .catch( error => renderError(error, response, response) )
})

module.exports = router
