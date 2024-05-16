const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema

const playListSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    admin:{
        type:ObjectId,
        ref:"User",
        required:true
    }
    ,
    members:[
        {
            type:ObjectId,
            ref:"User",
            required:true
        }
    ],
    image:{
        type:String,
        // required:true
    },
    songs:[
        {
            type:ObjectId,
            ref:"Song",
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model("Playlist",playListSchema)

