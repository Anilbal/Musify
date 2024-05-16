const mongoose=require('mongoose')
const uuidv1=require('uuidv1')
const crypto=require('crypto')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        // required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    followBy:[{
        type:String
    }],
    playLists:[
        {
            type:String
        }
    ],
    songs:[
        {
            type:String
        }
    ],
    salt:String
},{timestamps:true})


// hashing password
userSchema.virtual('password')
.set(function(password){
    this._password=password
    this.salt=uuidv1()
    this.hashed_password=this.encrypt(this._password)
})

userSchema.methods={
    encrypt:function(password){
        try{
            return crypto.createHmac('sha256',this.salt).update(password).digest('hex')
        }
        catch{
            return null
        }
    },
    authenticate:function(password){
        return this.hashed_password=this.encrypt(password)
    }
     }

module.exports=mongoose.model("User",userSchema)