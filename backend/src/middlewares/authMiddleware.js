const jwt = require('jsonwebtoken')
const auth = require('../models/authModel')


const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt

    // Verifica se existe o jwt e valida
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                return res.redirect('/login')
            }
            console.log(decodedToken)
            return next()
        })
    }else{
        return res.redirect('/login')
    }
}

const checkUser = (req,res,next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err)
                res.locals.user = null
                return next()
            }
            console.log(decodedToken)
            let user = await auth.getUserById(decodedToken.userId)
            res.locals.user = user
            next()
        })
    }else{
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }