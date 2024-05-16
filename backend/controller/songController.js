const Song=require('../models/songModel')
const User=require('../models/userModel')
const musicMetadata=require('music-metadata')
const Playlist=require('../models/playListsModel')
//! creating new song 
exports.newSong=async(req,res)=>{
    let songUrl;
    let imageUrl;
    if(req.files && req.files['songUrl']){
        songUrl=req.files['songUrl'][0].path
    }
    if(req.files && req.files['imageUrl']){
        imageUrl=req.files['imageUrl'][0].path
    }
    
    const metaData=await musicMetadata.parseFile(songUrl)
    const song=await Song.create({
        title:req.body.title,
        artist:req.user.user,
        genre:req.body.genre,
        songUrl,
        imageUrl,
        duration:metaData.format.duration
    })
    let user=await User.findByIdAndUpdate(req.user.user,{
        $push:{songs:song._id}
    })
    if(!song){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(song)
}

    // changing into minutes and seconds


// !get all songs
exports.getAllSongs=async(req,res)=>{
    const song=await Song.find().populate("artist","username")
    if(!song){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(song)
}

// !updating songs
exports.updateSOng=async(req,res)=>{
    let song=await Song.findById(req.params.id)
    if(req.user.user.toString()===song.artist.toString()){
        let songUrl;
        let imageUrl;
        if(req.files && req.files['songUrl']){
            songUrl=req.files['songUrl'][0].path
        }
        if(req.files && req.files['imageUrl']){
            imageUrl=req.files['imageUrl'][0].path
        }
        const updateSong=await Song.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            genre:req.body.genre,
            songUrl,
            imageUrl,
            duration:req.body.duration
        },{new:true})
    
        if(!updateSong){
            return res.status(400).json({error:"Something went wrong"})
        }
        res.send(updateSong)
    }else{
        return res.status(400).json({error:"You are not allowed to update this songs"})
    }
}

// !delete songs 
exports.deleteSong=async(req,res)=>{
    let song=await Song.findById(req.params.id)
    if(req.user.user.toString()===song.artist.toString()){
        let deleteSong=await Song.findByIdAndDelete(req.params.id)
        if(!deleteSong){
        return res.status(400).json({error:"Something went wrong"})
        }
        res.send({message:"Song deleted successfully"})
    }else{
        return res.status(400).json({error:"You are not allowed to delete this song"})
}
}

// !like songs 
exports.likeSong=async(req,res)=>{
    const userId=req.user.user
    const song=await Song.findById(req.params.id)
    if(!song){
        return res.status(400).json({error:"Song not found"})
    }
    if(song.likedByUser.includes(userId)){
        return res.status(400).json({error:"You have already liked this song"})
    }else{
        const userLiked=await Song.findByIdAndUpdate(req.params.id,{
            $push:{likedByUser:userId}
        },{new:true})
        res.send(userLiked)
    }
}

// !dislike songs 
exports.dislikeSong=async(req,res)=>{
    const userId=req.user.user
    const song=await Song.findById(req.params.id)
    if(!song){
        return res.status(400).json({error:"Song not found"})
    }
    if(!song.likedByUser.includes(userId)){
        return res.status(400).json({error:"You haven't  liked this song"})
    }else{
        const userLiked=await Song.findByIdAndUpdate(req.params.id,{
            $pull:{likedByUser:userId}
        },{new:true})
        res.send({message:"Your like is removed "})
    }
}

// !get all likes songs
exports.getALlLikedSongs=async(req,res)=>{
    const user=await User.findById(req.user.user)
    const song=await Song.find({likedByUser:user._id}).populate('artist',"username")
    if(!song){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(song)
}

// !trending songs by likes of users
exports.getTrending=async(req,res)=>{
    let song=await Song.find().sort({likedByUser:-1}).populate("artist","username").limit(10)
    if(!song){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(song)
}


// !get songs by artist id
exports.getSongsByUser=async(req,res)=>{
    let song=await Song.find({artist:req.params.artist}).populate("artist","username")
    if(!song){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(song)
}


// !get songs by id
exports.getSongsById=async(req,res)=>{
    let song=await Song.findById(req.params.id)
    if(!song){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(song)
}

//!getting songs only outside of playlists added songs 
exports.getSongsExpectPlaylist=async(req,res)=>{
    let playlist=await Playlist.findById(req.params.id)
    
    const playlistSongIds =playlist.songs.map(playlist => playlist._id);

    const songsToAdd = await Song.find({
      _id: { $nin: playlistSongIds }
    }).populate("artist","username")
    if(!songsToAdd){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(songsToAdd)
}