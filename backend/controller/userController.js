const User=require('../models/userModel')
const Token=require('../models/tokenModel')
const sendEmail = require('../utils/sendEmail')
const crypto=require('crypto')
const jwt=require('jsonwebtoken')
const {expressjwt}=require('express-jwt')


// register
exports.register=async(req,res)=>{
    let {email}=req.body
    // check user exists or not
    let userExists=await User.findOne({email})

    // if yes
    if(userExists){
        return res.status(400).json({error:"Email already exists"})
    }

    // check username is already exists or not
    let usernameExsist=await User.findOne({username:req.body.username})

     // if yes
     if(usernameExsist){
        return res.status(400).json({error:"Username not available"})
    }

    // creating new user
    let newUser=await User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        profile:req.file?.path,
    })
    if(!newUser){
        return res.status(400).json({error:'Something went wrong!!'})
    }

    let token=await Token.create({
        token:crypto.randomBytes(16).toString('hex'),
        user:newUser._id
    })

    if(!token){
        return res.status(400).json({error:'Something went wrong!!'})
    }

    const url=`http://localhost:5000/verifyemail/${token.token}`

    // sending email format
    sendEmail({
        from:"noreply@something.com",
        to:email,
        subject:"Email verification",
        text:"Click to verify"+ url,
        html:`<a href='${url}'><button>Click here to verify</a>`
    })

    res.send({message:"Verification link send to your email"})
}

// // resentent verification
// exports.resentVerification=async(req,res)=>{
//     // check if email exits
//     let user=await User.findOne({email:req.body.email})
//     if(!user){
//         return res.status(400).json({error:"Email Not exists"})
//     }
//     // check if password is correct
//     if(!user.isAuthenticated(req.body.password)){
//         return res.status(400).json({error:"Password in correct"})

//     }

//     // check if already verified
//     if(!user.isVerified){
//         return res.status(400).json({error:"User not verified"})
//     }
//     // generate token
//     let token=await Token.create({
//         user:user._id,
//         token:crypto.randomBytes(16).toString("hex")
//      })
//      if(!token){
//         return res.status(400).json({error:"Something went wrong"})
//      }

//     // send reset password link to email
//     const url=`http://localhost:5000/resentverification/${token.token}`

//     sendEmail({
//         from:"noreply@something.com",
//         to:req.body.email,
//         subject:" reset verification sent ",
//         text:"Please click on link to reset verify" +url,
//         html:`<a href="${url}"><button>Click To verify</button></a>`
//     })
//     res.send({message:"Reset link has been sent to your email"})
// }


// login
exports.login=async(req,res)=>{
    let {email,password}=req.body
    // check if email is registered
    let user=await User.findOne({email:email})
    if(!user){
        return res.status(400).json({error:"User not registered"})
    }
    // check if passowrd is registered or not
    if(!user.authenticate(password)){
        return res.status(400).json({error:"Email and password doesnt match"})
    }
    // check if user is verified or not
    if(!user.isVerified){
        return res.status(400).json({error:"User not verified"})
    }
    // generate login token from jsonwebtoken to authenticate
    let token=jwt.sign({
        user:user._id,
        role:user.role,
        email:user.email,
        username:user.username,
        profile:user.profile
     },process.env.SECRET_KEY)
     if(!token){
        return res.status(400).json({error:"Something went wrong"})
     }

    //  set info in cookie
     res.cookie("myCookie",token,{expire:Date.now()+86400})

    // sent info to frontend 
    const {_id,role,username,profile}=user
    res.send({token:token,user:{_id,role,email,username,profile}})
}

// verify email
exports.verifyEmail=async(req,res)=>{
    // searching token 
    let token=await Token.findOne({token:req.params.token})

    // if not found or expired
    if(!token){
        return res.status(400).json({error:"Token expired"})
    }
    
    // if found then checks user
    let user=await User.findById(token.user)

    // if user not found
    if(!user){
        return res.status(400).json({error:"User not found"})
    }

    // checking verified or not 
    if(user.isVerified){
        return res.status(400).json({error:"User already verified"})
    }

    // if not then
    user.isVerified=true
    user=await user.save()

    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }

    res.send({message:"User verified successfully"})
}

// // forget password
// exports.forgotPassword=async(req,res)=>{
//     // if email exists or not
//     let user=await User.findOne({email:req.body.email})

//     // if not found user
//     if(!user){
//         return res.status(400).json({error:"User not registered"})
//     }

//     // if found then generate token
//     let token=await Token.create({
//         user:user._id,
//         token:crypto.randomBytes(16).toString('hex')
//     })

//     if(!token){
//         return res.status(400).json({error:"Token not generated"})
//     }

//     //send password reset link 
//     const url=`http://localhost:5000/resetpassword/${token.token}`
//     sendEmail({
//         from:"noreply@something.com",
//         to:req.body.email,
//         subject:'Password link resent',
//         text:"Click Here to reset your password"+url,
//         html:`<a href="${url}"><button>Reset password</button></a>`

//     })

//     res.send({message:"Password link  has been send to your email"})
// }

// // reset password
// exports.resetPassword=async(req,res)=>{
//       // searching token 
//       let token=await Token.findOne({token:req.params.token})
//       if(!token){
//          return res.status(400).json({error:"Invalid token"})
//       }
  
//       // find user
//       let user=await User.findById(token.user)
//       if(!user){
//           return res.status(400).json({error:"User not found"})
//       }
//       // reset passowrd
//       user.password=req.body.password
//       user=await user.save()
//       if(!user){
//           return res.status(400).json({error:"Something went wrong"})
//       }
//       res.send({message:"Password Changed Successfully"})
  
// }

// signout
exports.signOut=async(req,res)=>{
    let response= await res.clearCookie('myCookie')
    if(!response){
     return res.status(400).json({error:"Somthing went wrong"})
    }
     res.send({message:"Signout Successfully"})
 }
 
// !find all users
exports.getAllUser=async(req,res)=>{
    let user=await User.find()
    
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}


// !delete user
exports.deleteUser=async(req,res)=>{
    
    let userExists=await User.find({email:req.body.email})
    if(!userExists){
        return res.status(400).json({error:"User not existed"})
    }
    let user=await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"User deleted Successfully"})
}


// !update user
exports.updateUser=async(req,res)=>{
    
    let userExists=await User.find({email:req.body.email})
    if(!userExists){
        return res.status(400).json({error:"User not existed"})
    }
    let user=await User.findByIdAndUpdate(req.params.id,{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        profile:req.file?.path
    },{new:true})
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}

//! get user by id
exports.getUserById=async(req,res)=>{
    let user=await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}

// user profile
exports.getUserDetails=async(req,res)=>{
    let user=await User.findById(req.user.user)
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}

//!followed by other users
exports.followUser=async(req,res)=>{
    let {userId}=req.params
    let loggedId=req.user.user

    let user=await User.findById(userId)
    // let loggedUser=await User.findById(loggedId)
    if(userId===loggedId){
        return res.status(400).json({error:"You can't follow yourself"})
    }else{
        if(user.followBy.includes(loggedId)){
            return res.status(400).json({error:"Already followed "})
        }else{
            let newFollow=await User.findByIdAndUpdate(userId,{
                $push:{followBy:loggedId}
            },{new:true})
            res.send(newFollow)
        }
    }
}

// !top artists lists
exports.getTopArtist=async(req,res)=>{
    let user=await User.find().sort({followBy:-1}).limit(10)
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}   

// !get lists of follwoing user
exports.getListofFollowingUser=async(req,res)=>{
    let user=await User.find({followBy:req.params.id})
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}