const path = require('path')
const auth = require('../models/authModel')
const jwt = require('jsonwebtoken')

const maxAge = 60 * 60 * 24 * 6 // Segundos -> Minutos -> Horas -> Dias

// Função que cria o JWT
const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_TOKEN, {
        expiresIn: maxAge
    })
}


const login_get = (req,res) => {
    res.status(200).sendFile(path.resolve('../frontend/auth/login.html'))
}

const signup_get = (req,res) => {
    res.status(200).sendFile(path.resolve('../frontend/auth/signup.html'))
}
 
const login_post = (req,res) => {   
    res.send('post login')
}

const signup_post = async (req,res) => {
    const {username, email, password} = req.body

    try {
        const newUser = await auth.createUser(email, username, password)
        console.log(newUser)
        const token = createToken( newUser.id )
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ msg: "User created succcessfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: "Error, user not created"})
    }
}

module.exports = {
    login_get,
    signup_get,
    login_post,
    signup_post
}