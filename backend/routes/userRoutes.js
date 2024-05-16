const express=require('express')
const { register, login, verifyEmail, forgotPassword, resetPassword, signOut, resentVerification, deleteUser, getAllUser, followUser, getTopArtist, getUserById, getUserDetails, getListofFollowingUser, updateUser } = require('../controller/userController')
const upload = require('../utils/fileUpload')
const { userCheck, validate } = require('../utils/validation')
const { authJwt } = require('../utils/auth')
const router=express.Router()


// register
router.post('/register',upload.single("imageUrl"),register)
// resent verification
// router.get('/resentverification/:token',resentVerification)

// veriy user
router.get('/verifyemail/:token',verifyEmail)
// login
router.post('/login',login)

// logout
router.post('/logout',signOut)
// // forget password
// router.post('/forgetpassword',forgotPassword)
// // reset passowrd
// router.post('/resetpassword/:token',resetPassword)
// all user
router.get("/alluser",getAllUser)
// get user by id
router.get('/singleuser/:id',getUserById)
// get user profile
router.get('/userdetails',authJwt,getUserDetails)
// delete user
router.delete("/deleteuser/:id",deleteUser)
//update user
router.put("/updateuser/:id",upload.single("imageUrl"),updateUser)
// follow users
router.put("/followuser/:userId",authJwt,followUser)
// top artists
router.get('/topartist',getTopArtist)
// get list of follwoing user
router.get("/followinglists/:id",getListofFollowingUser)

module.exports=router