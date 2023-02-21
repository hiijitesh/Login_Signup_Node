require('dotenv').config()
require('./config/db.connection').connect()
const { urlencoded } = require('express')
const userController = require('./controllers/user.controller')
const express = require('express')

const user = require('./routes/user.route')
const auth = require('./middlewares/auth.middleware')
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))

//Register
app.use('/api', user)


module.exports = app
