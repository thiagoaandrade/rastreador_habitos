const jwt = require('jsonwebtoken')
const auth = require('../models/authModel')

// Permitir acesso se o usuário tiver realizado um login válido
const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt
    // Verifica se existe o jwt e valida
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                return res.redirect('/login')
            }
            return next()
        })
    }else{
        return res.redirect('/login')
    }
}

// Checa se o usuário está logado e guarda as informações do usuário na variável req.user
const checkUser = (req,res,next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err)
                req.user = null
                return next()
            }
            let user = await auth.getUserById(decodedToken.id)
            req.user = user
            next()
        })
    }else{
        req.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }