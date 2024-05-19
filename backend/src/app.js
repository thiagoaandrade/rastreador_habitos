// Imports
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoute')
const { requireAuth } = require('./middlewares/authMiddleware')
const path = require('path')

const app = express();

// Variáveis de ambiente
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('./public'))
app.use(cookieParser())

// Routes
// app.get('*', checkUser)
app.use(authRouter) // Rotas de autenticação

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve('../frontend/homepage.html'))
});

app.get('/usuario', requireAuth, (req,res) => {
    res.send('<h1>Usuário</h1>')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});