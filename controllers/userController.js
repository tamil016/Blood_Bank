const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

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
        let secretPassword = await bcrypt.hash(req.body.favfood,salt)
        let newUser = await userModel({...req.body, password : hashPassword, favfood : secretPassword})
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

let loginController = async(req, res, next)=>{
    try{
        if(!req.body.email || !req.body.password) return res.status(400).send({message : 'All fields are required'})
        let findData = await userModel.findOne({email : req.body.email})
        if(!findData) return res.status(400).send({message : "Either email or password invalid", success : false})
            console.log('email', findData.email);

        let comparePassword  =await bcrypt.compare(req.body.password, findData.password)
        if(!comparePassword) return res.status(400).send({message : "Either email or password invalid", success : false})

        let token = jwt.sign({userId : findData._id}, process.env.SECRET_KEY, {expiresIn : '20days'})
        res.status(200).send({message : "User login successfull", success: true, token, user : findData})
    }
    catch (error){
        console.log(error)
        res.status(500).send({message : 'Something wrong while login', success : false, error})
    }
}

let getCurrentUserController = async (req, res, next)=>{
    try{
        let userId = req.userId
        console.log(userId);
        let user = await userModel.findOne({_id : userId})
        console.log(user);
        res.status(200).send({message : 'User get successfully', success : true, user})
    }
    catch(error){
        console.log(error);
        res.status(500).send({message : 'Something wrong wile fetching current-user', success: false, error})
    }
}

let passwordController = async (req, res, next) =>{
    try{
        if(!req.body.email || !req.body.favfood ||!req.body.password) return res.status(400).send({message : "Email or favfood or password is mandatory field to change passoword", success: false})
        let findData = await userModel.findOne({email : req.body.email})
        if(!findData) return res.status(400).send({message : "Email is not found to change password", success: false})
        
        let compareFavfood = await bcrypt.compare(req.body.favfood, findData.favfood)
        if(!compareFavfood) return res.status(400).send({message : "favfood is invalid", success : false})
        
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(req.body.password, salt)
        let updatedUser = await userModel.findOneAndUpdate({email : req.body.email}, {password : hashPassword}, {new : true})
        res.status(200).send({message : "Password updated succesfully", success : true, updatedUser})
    }
    catch(error){
        console.log(error);
        res.status(500).send({message : "Something worng wile changing the password", success: false, error})
    }
}


module.exports = {registerController, loginController, getCurrentUserController, passwordController}