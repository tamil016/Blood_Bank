const  express = require('express')
const {registerController, loginController, getCurrentUserController, passwordController} = require('../controllers/userController')
const authorizeUser = require('../middleware/authMiddleware')

const route = express.Router()

route.post('/register', registerController)

route.post('/login', loginController)

route.get('/current-user', authorizeUser, getCurrentUserController)

route.post('/forget-password', passwordController)

module.exports = route