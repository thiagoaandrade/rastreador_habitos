const bcrypt = require('bcrypt')

// Verifica e valida apenas se nenhum dos campos estiverem vazios
const emptySignupFields = (req,res,next) => {
    if(!req.body.email){
        return res.status(400).json({msg: 'The email field is empty'})
    }
    if(!req.body.username){
        return res.status(400).json({msg: 'The username field is empty'})
    }
    if(!req.body.password){
        return res.status(400).json({msg: 'The password field is empty'})
    }
     next()
}

// Verifica e valida apenas se a senha tiver 8 caracteres ou mais.
const passwordValidLength = (req,res,next) => {
    const {password} = req.body

    if(password.length < 8){
        return res.status(400).json({msg: 'Enter a password with 8 characters or more'})
    }
    next()
}

// Valida se o email segue o padrão fornecido
const emailValidator = (req,res,next) => {
    req.body.email = req.body.email.toLowerCase()
    // Definindo o padrão aceito para o email _@_._
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)

    if(!validEmail){
        return res.status(400).json({msg: 'Enter a valid email'})
    }
    next()
}

// Criptografa a senha
const hashingPassword = async (req,res,next) => {
    try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    emptySignupFields,
    passwordValidLength,
    emailValidator,
    hashingPassword
}