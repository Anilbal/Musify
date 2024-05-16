const Playlist=require("../models/playListsModel")
const User=require("../models/userModel")
const Song=require('../models/songModel')
// !new playlist creating
exports.newPlaylist=async(req,res)=>{
    let {title,description,songs}=req.body
    let playlist=await Playlist.create({
        title,
        description,
        image:req.file?.path,
        admin:req.user.user,
        members:req.user.user,
        songs
    })
    const user=await User.findByIdAndUpdate(req.user.user,{
        $push:{playLists:playlist._id}
    })
    if(!playlist){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(playlist)
}

// !get all playlists
exports.getALlPLaylist=async(req,res)=>{
    let playlist=await Playlist.find()
    if(!playlist){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(playlist)
}


//! update playlist
exports.updatePlaylist=async(req,res)=>{
    let playlist=await Playlist.findById(req.params.id)
    if(!playlist){
        return res.status(400).json({error:"Playlist not found"})
    }
    if(req.user.user.toString()===playlist.admin.toString()){
        let {title,description,songs}=req.body
        let updatePlaylist=await Playlist.findByIdAndUpdate(req.params.id,{
            title,
            description,
            image:req.file?.path,
            songs
        },{new:true})
        
        if(!updatePlaylist){
            return res.status(400).json({error:"something went wrong"})
        }
        res.send(updatePlaylist)
    }else{
        return res.status(400).json({error:"Unauthorized"})
    }
}

// !delete playlists
exports.deletePlaylist=async(req,res)=>{
    let playList=await Playlist.findById(req.params.id)
    if(!playList){
        return res.status(400).json({error:"Playlist not found"})
    }
    if(req.user.user.toString()===playList.admin.toString()){
        let deletePlaylist=await Playlist.findByIdAndDelete(req.params.id)
        if(!deletePlaylist){
            return res.status(400).json({error:"Playlist not deleted"})
        }
        res.send({messsage:"Playlist deleted successfully"})
    }else{
        return res.status(400).json({error:"Unauthorized"})
    }
}

// !add new members in playlist
exports.addMembersPlaylist=async(req,res)=>{
    const {playListId}=req.params
    const {userId}=req.body
    let playList=await Playlist.findById(playListId)
    if(!playList){
        return res.status(400).json({error:"Playlist not found"})
    }
    if(playList.members.includes(userId)){
        return res.status(400).json({error:"User is already added"})
    }else{
        let addMembers=await Playlist.findByIdAndUpdate(playListId,{
            $push:{members:userId}
        },{new:true})
        res.send(addMembers)
    }
}

// !add new members in playlist
exports.removeMembersPlaylist=async(req,res)=>{
    const {playListId}=req.params
    const {userId}=req.body
    let playList=await Playlist.findById(playListId)
    if(!playList){
        return res.status(400).json({error:"Playlist not found"})
    }
    if(req.user.user.toString()===playList.admin.toString()){
        return res.status(400).json({error:"You cant leave cause you are admin.Delete instead?"})
    }else{
        if(playList.members.includes(userId)){
            let removeMembers=await Playlist.findByIdAndUpdate(playListId,{
                $pull:{members:userId}
            },{new:true})
            res.send(removeMembers)
        }else{
            return res.status(400).json({error:"You havent joined"})
        }
    }
}

//!add songs in playlists
exports.addSongsToPlaylists=async(req,res)=>{
    const {playListId}=req.params
    const {songId}=req.body
    let playlist=await Playlist.findById(playListId)
    if(!playlist){
        return res.status(400).json({error:"Playlist not found"})
    }
    if(req.user.user.toString()===playlist.admin.toString()){

        if(playlist.songs.includes(songId)){
            return res.status(400).json({error:"Song is already in your playlist"})
        }else{
            let addSong=await Playlist.findByIdAndUpdate(playListId,{
                $push:{songs:songId}
            },{new:true})
            res.send({messsage:"Song is added to your playlist"})
        }
    }else{
        return res.status(400).json({error:"Unauthorized"})
    }

}   

// !removesongs from playlists
exports.removeSongFromPlaylists=async(req,res)=>{
    const {playListId}=req.params
    const {songId}=req.body
    let playlist=await Playlist.findById(playListId)
    if(!playlist){
        return res.status(400).json({error:"Playlist not found"})
    }
    if(req.user.user.toString()===playlist.admin.toString()){

        if(playlist.songs.includes(songId)){
            let addSong=await Playlist.findByIdAndUpdate(playListId,{
                $pull:{songs:songId}
            },{new:true})
            res.send({messsage:"Song is removed from playlist"})
        }else{
            return res.status(400).json({error:"Song is already in your playlist"})
        }
    }else{
        return res.status(400).json({error:"Unauthorized"})
    }
}


// // !get random playlists
// exports.getRandomPlaylist=async(req,res)=>{
//     const count = await Playlist.countDocuments();
//     const randomIndex = Math.floor(Math.random() * count);
//     const randomPlaylists = await Playlist.find().skip(randomIndex).limit(5); // Get 5 random playlists
//     res.send(randomPlaylists);
// }

// !get playlists by members
exports.getPlaylistByMembers=async(req,res)=>{
    let playlist=await Playlist.find({members:req.params.id})
    if(!playlist){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(playlist)
}


// !get related playlists
exports.getRelatedPlaylists=async(req,res)=>{
    let playlist=await Playlist.findById(req.params.id)
    let playlists=await Playlist.find({_id:{$ne:playlist._id}})
    if(!playlists){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(playlists)
}

// !get playlists by id
exports.getPlaylistById=async(req,res)=>{
    let playlist=await Playlist.findById(req.params.id).populate('admin',"username")
    if(!playlist){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(playlist)
}

// !get songs of playlists by ids
exports.getSongsOfPlaylists=async(req,res)=>{
    let playlist=await Playlist.findById(req.params.id)
    let allSongs=[]
    const songIds = playlist.songs
    const songs=await Song.find({_id:{$in :songIds.map(song=>song._id)}}).populate('artist',"username")
    allSongs=allSongs.concat(songs)
    if(!allSongs){
        return res.status(400).json({error:"Something went wrong"})

    }
    res.send(allSongs)
}