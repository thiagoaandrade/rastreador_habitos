// Imports
const path = require('path')
const auth = require('../models/authModel')
const utils = require('../utils/authUtils')
const bcrypt = require('bcrypt')

const maxAge = 60 * 60 * 24 * 6 // Segundos -> Minutos -> Horas -> Dias

const login_get = (req,res) => {
    res.status(200).sendFile(path.resolve('../frontend/auth/login.html'))
}

const signup_get = (req,res) => {
    res.status(200).sendFile(path.resolve('../frontend/auth/signup.html'))
}

const login_post = async (req,res) => {   
    const { email, password } = req.body 
    // Verifica se existe algum usuário com o email enviado e retorna o usuário
    const user = await auth.getUserByEmail(email)
    if(user){
        // Valida se a senha enviada é igual a senha do usuário que esta com hash
        const validPassword = await bcrypt.compare(password, user.password)
        if(validPassword){
            const token = utils.createToken(user.id, maxAge)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
            return res.status(200).json({msg: "Login successfull"})
        }
    }
    return res.status(400).json({msg: 'Incorrect email or password'})
}

const signup_post = async (req,res) => {
    const {username, email, password} = req.body

    try {
        // Cria usuário no banco de dados
        const newUser = await auth.createUser( email, username, password ) 
        // Cria jwt
        const token = utils.createToken( newUser.id, maxAge ) 
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        return res.status(201).json({ msg: "User created succcessfully"})

    } catch (error) {
        return res.status(400).json({msg: utils.signupErrorMsg(error)})
    }
}

const logout_get = (req,res) => {
    // Alterando o valor do cookie jwt para uma string vazia e colocando para que tenha duração de 1 milissegundo
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}

module.exports = {
    login_get,
    signup_get,
    login_post,
    signup_post,
    logout_get
}