const  express = require('express')
const registerController = require('../controllers/userController')

const route = express.Router()

route.post('/register', registerController)

module.exports = route