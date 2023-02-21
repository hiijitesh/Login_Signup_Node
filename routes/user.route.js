const express = require('express')
const router = express.Router()

//for routing we neeed controller
const userController = require('../controllers/user.controller')

router.get('/test', userController.testApp)
router.post('/signup', userController.SignUp)
router.post('/login', userController.Login)


module.exports = router