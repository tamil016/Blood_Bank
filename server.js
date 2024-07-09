const express = require('express')
const app = express()
const cors = require('cors')
require('colors')
const morgan = require('morgan')
const databaseConnection = require('./config/db')
const route = require('./routes/auth')
const inventoryRoute = require('./routes/inventoryRoute')

require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
databaseConnection()

app.use('/auth/v1',route)
app.use('/inventory/v1', inventoryRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running in http://localhost:${PORT}`.bgMagenta.white)
})