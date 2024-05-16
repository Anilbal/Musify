const express=require('express')
const { authJwt } = require('../utils/auth')
const { newSong, getAllSongs, updateSOng, deleteSong, likeSong, dislikeSong, getALlLikedSongs, getTrending, getSongsByUser, getSongsById, getSongsExpectPlaylist } = require('../controller/songController')
const upload = require('../utils/fileUpload')

const router=express.Router()

// new song routes
router.post('/newsong',authJwt,upload.fields([{name:"songUrl",maxCount:1},{name:"imageUrl",maxCount:1}]),newSong)
// get all songs
router.get('/allsongs',getAllSongs)
// update songs
router.put("/updatesong/:id",authJwt,upload.fields([{name:"songUrl",maxCount:1},{name:"imageUrl",maxCount:1}]),updateSOng)
// delete songs
router.delete("/deletesong/:id",authJwt,deleteSong)
// like songs 
router.put("/likesong/:id",authJwt,likeSong)
// dislike song
router.put('/dislikesong/:id',authJwt,dislikeSong)
// get all liked songs
router.get("/likedsongs",authJwt,getALlLikedSongs)
// trending songs
router.get('/trending',getTrending)
// get songs by user
router.get("/songbyartist/:artist",getSongsByUser)
//get songs by id
router.get('/singlesong/:id',getSongsById)
// get related songs for playlist
router.get('/getrelatedsongs/:id',getSongsExpectPlaylist)

module.exports=router