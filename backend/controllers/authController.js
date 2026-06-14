const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const User=require('../models/User')

const generateToken=(userId) => {
    return jwt.sign({id:userId},process.env.JWT_ACCESS_TOKEN,{expiresIn:'1d'})
}

const registerUser=async (req,res) => {
    try{
        const {name,email,password,profileImageUrl}=req.body
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"user already exists"})
        }

        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({name,email,password:hashedPassword,profileImageUrl})
        res.status(201).json({id:user._id,name:user.name,email:user.email,profileImageUrl:user.profileImageUrl,token:generateToken(user._id)})
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message})
    }
}

const loginUser=async (req,res) => {
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"Invalid email or password"})
        }

        const verifyUser=await bcrypt.compare(password,user.password)
        if(!verifyUser){
            return res.status(404).json({message:"Invalid email or password"})
        }

        res.status(200).json({
            id:user._id,
            email:user.email,
            name:user.name,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id)
        })

    }catch(err){
        res.status(500).json({message:"Server error",error:err.message})
    }
}

const getUserProfile=async (req,res) => {
    try{
        const user=await User.findById(req.user.id).select('-password')
        if(!user){
            res.status(404).json({message:"User not found"})
        }

        res.json(user)
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message})
    }
}


const uploadUserImage=async(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No image has been uploaded"})
    }

    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    res.status(200).json({imageUrl})
}

module.exports={getUserProfile,registerUser,loginUser,uploadUserImage}