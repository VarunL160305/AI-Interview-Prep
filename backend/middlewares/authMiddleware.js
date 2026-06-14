const jwt=require('jsonwebtoken')

const User=require('../models/User')

const protect=async(req,res,next)=>{
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            const token=req.headers.authorization.split(" ")[1]
            const decoded=jwt.verify(token,process.env.JWT_ACCESS_TOKEN)
            req.user=await User.findById(decoded.id).select('-password')
            next()    
        }
        else{
            res.status(401).json({message:"not authorized, please login"})
        }
    }
    catch(err){
        res.status(401).json({message:"no token",error:err.message})
    }
}

module.exports={protect}