const express=require('express')
const {registerUser,loginUser,getUserProfile,uploadUserImage}=require('../controllers/authController')
const {protect}=require('../middlewares/authMiddleware')
const upload=require('../middlewares/uploadMiddleware')

const router=express.Router({mergeParams:true})

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',protect,getUserProfile)
router.post('/upload-image',upload.single('image'),uploadUserImage)

module.exports=router