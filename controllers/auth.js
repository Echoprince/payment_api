const {validationResult} = require('express-validator')
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {TOKEN_SECRET} = ('../config.js')

//Registering or Signing Up New Users
exports.registerUser = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }
    const name = req.body.name
    const password = req.body.password
    const email = req. body.email
   bcrypt.hash(password, 12)
    .then(hashedPw => {
        const user = new User({
            password: hashedPw,
            email: email,
            name: name
        })
        return user.save()
    }).then(result => {
        res.status(201)
        .json({message: 'User Created Successfully', 
        result: result})
    
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })

} 


//Sign in Users Logic
exports.signin = (req, res, next) => {
const email = req.body.email
const password = req.body.password
let loadedUser
User.findOne({email: email})
.then(user => {
    if(!user){
    const error = new Error('User with Email does not exist, Please register')
    error.statusCode = 401
    throw error
    }
    loadedUser = user
    return bcrypt.compare(password, 
        user.password)
})
.then(isEqual => {
    if(!isEqual){
        const error = new Error('Password does not match, please insert correct password.')
        error.statusCode = 401
       throw error
    }
    const token = jwt
    .sign({email: loadedUser.email, 
        userId: loadedUser.id.toString()}, 
        `${TOKEN_SECRET}`, 
        {expiresIn: '1hr'})
    res.status(200)
    .json({message: 'User Signed in Successfully', 
    token: token, userId: loadedUser.id.toString()})
}).catch(err => {
    console.log(err)
    if(!err.statusCode){
    err.statusCode = 500}
    next(err)
    
})

}  