// Imports
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoute')


const app = express();

// Variáveis de ambiente
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('./public'))
app.use(cookieParser())

// Routes
app.use(authRouter) // Rotas de autenticação

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome</h1>')
});

app.get('/set-cookies', (req,res) => {
    res.cookie('Verify', true)
    res.cookie('Admin', false, {})

    res.send('You got the cookie')
})

app.get('/get-cookies', (req,res) => {
    console.log(req.cookies)
    res.send(req.cookies)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});