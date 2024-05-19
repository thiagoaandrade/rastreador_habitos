const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const {emptySignupFields, passwordValidLength, emailValidator, hashingPassword} = require('../middlewares/signupValidator')

router.get('/signup', authController.signup_get)
router.post('/signup',[
    emptySignupFields,
    emailValidator,
    passwordValidLength
], hashingPassword , authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.get('/logout', authController.logout_get)
router.get('/authverify', authController.authVerify )

module.exports = router