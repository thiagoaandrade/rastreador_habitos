// Imports
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoute')
const habitsRouter = require('./routes/habitsRoute')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware')
const path = require('path')

const app = express()

// Variáveis de ambiente
const PORT = process.env.PORT || 5000

// Middlewares
app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(express.static('./public'))
app.use(cookieParser())

// Routes
app.all('*', checkUser)
app.use(authRouter) // Rotas de autenticação
app.use(requireAuth, habitsRouter)

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve('../frontend/homepage.html'))
})

app.get('/usuario', requireAuth, (req,res) => {
    console.log(req.user)
    res.send(`<h1>Bem vindo ${req.user.username}</h1>`)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})