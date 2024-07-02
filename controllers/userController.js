const userModel = require("../models/user")
const bcrypt = require('bcrypt')

let registerController = async (req, res, next)=>{
    try{
        if(!req.body.email){
            return res.status(404).send({message : 'All fields required', success : false})
        }
        let existUser = await userModel.findOne({email : req.body.email})
        if(existUser){
            return res.status(200).send({message : "User is already exist", success : false})
        }

        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(req.body.password, salt)
        let newUser = await userModel({...req.body, password : hashPassword})
        await newUser.save()
        res.status(201).send({
            message : "Succesfully Registered",
            success : true,
            newUser
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            message : 'Something wrong in registration',
            error,
            success : false
        })
    }
}

module.exports = registerController