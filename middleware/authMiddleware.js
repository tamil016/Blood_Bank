let jwt = require('jsonwebtoken')
let authorizeUser = async (req, res, next)=>{
    try{
        let token = req.headers.authorization;
        if(!token) return res.status(401).send({message : 'User is not authorized'})
        jwt.verify(token, process.env.SECRET_KEY, (err,decode)=>{
            if(err) return res.status(401).send({message : 'User is not authorized'})
            req.userId = decode.userId
        next()
    })
    }
    catch(error){
        console.log(error);
        res.status(500).send({message : "Something wrong", success : false, error})
    }
}

module.exports = authorizeUser