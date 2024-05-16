const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema
const songSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    genre:{
        type:ObjectId,
        required:true
    },
    songUrl:
    {
            type:String,
            required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    likedByUser:[
        {
            type:ObjectId,
            ref:"User"
        }
    ]
    
},{timestamps:true})

module.exports=mongoose.model("Song",songSchema)