const mongoose = require('mongoose')
require('colors')

let databaseConnection = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URL}/blood`)
        console.log(`Database connected succesfully`.bgGreen.white);
    }
    catch (err){
        console.log('Something went wrong while connecting the database')
    }
}

module.exports = databaseConnection