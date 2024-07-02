let mongoose = require('mongoose')
let userSchema= new mongoose.Schema({
    role :{
        type : String,
        required : [true, 'Role is required *'],
        enum : ['user', 'admin', 'organaization', 'hospital']
    },
    name : {
        type : String,
        required : function (){
            if(this.role == 'user' || this.role == 'admin') return true
            else return false
        }
    },
    email : {
        type : String,
        required : [true, 'Email is required *'],
        unique : true
    },
    password : {
        type : String,
        require : [true, 'Password is required *']
    },
    phone : {
        type : Number,
        required : [true, 'Phone number is required *']
    },
    address : {
        type : String,
        required : [true, 'Address is required *']
    },
    organaizationName : {
        type : String,
        required : function (){
            if(this.role == 'organaization') return true
            else return false
        }
    },
    hospitalName : {
        type : String,
        required : function (){
            if(this.role == 'hospital') return true
            else return false
        }
    }
},{timestamps : true})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel