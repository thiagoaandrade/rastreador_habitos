const jwt = require('jsonwebtoken')

// Função que cria o JWT
const createToken = (user, maxAge) => {
    return jwt.sign({id:user.id}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

// Mensagens de error para quando for se registrar
const signupErrorMsg = (error) => {
    let errorMsg = "Error, user not created"
    if(error.constraint === 'unique_username'){
        errorMsg = "Username is already registered"
    }
    else if(error.constraint === 'unique_email'){
        errorMsg = "Email is already registered"
    }
    return errorMsg
}

module.exports = {
    createToken,
    signupErrorMsg
}