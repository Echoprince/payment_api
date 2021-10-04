const express = require('express')
const {body} = require('express-validator')
const User = require('../model/user')
const authControllers = require('../controllers/auth')

//Initialize router
const router = express.Router()

router.put('/register', 
[body('email')
.isEmail()
.withMessage('Please enter a valid e-mail.')
.custom((value, {req}) => {
  return  User.findOne({email: value})
  .then(userData => {
       if(userData){
           return Promise.reject('Email already exist.')
       }
   })
}).normalizeEmail(), 
body('password')
.trim()
.isLength({min: 5})
.withMessage('Password cannot be less than 5 words'), 
body('name')
.trim()
.notEmpty()
.withMessage('Name cannot be empty.')], 
authControllers.registerUser)

router.post('/signin', authControllers.signin)

module.exports = router