let express = require('express')
const authorizeUser = require('../middleware/authMiddleware')
const { createInventoryController, getInventoryController } = require('../controllers/inventoryController')

let inventoryRoute = express.Router()

inventoryRoute.post('/create-inventory', authorizeUser, createInventoryController)

inventoryRoute.get('/get-inventory', authorizeUser,  getInventoryController)

module.exports = inventoryRoute