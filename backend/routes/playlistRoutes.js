const express=require("express")
const { authJwt } = require("../utils/auth")
const { newPlaylist, updatePlaylist, getALlPLaylist, deletePlaylist, addMembersPlaylist, addSongsToPlaylists, removeSongFromPlaylists, getPlaylistByMembers, getRelatedPlaylists, getPlaylistById, getSongsOfPlaylists, removeMembersPlaylist } = require("../controller/playlistController")
const upload = require("../utils/fileUpload")

const router=express.Router()

// creating new playlist
router.post("/newplaylist",authJwt,upload.single("imageUrl"),newPlaylist)
// update playlist
router.put("/updateplaylist/:id",authJwt,upload.single("imageUrl"),updatePlaylist)
// get all playlists
router.get('/allplaylist',authJwt,getALlPLaylist)   
// delete playlist
router.delete('/deleteplaylist/:id',authJwt,deletePlaylist)
// add new members in playlist
router.put('/addmembers/:playListId',authJwt,addMembersPlaylist)
// remove  members in playlist
router.put('/removemember/:playListId',authJwt,removeMembersPlaylist)
// add songs to playlists
router.put('/addsongtoplaylist/:playListId',authJwt,addSongsToPlaylists)
// remove song from playlists
router.put('/removesongfromplaylist/:playListId',authJwt,removeSongFromPlaylists)
// random playlists
router.get('/playlistbymembers/:id',getPlaylistByMembers)
// get related playlists
router.get('/relatedplaylist/:id',getRelatedPlaylists)
// get playlists by ids
router.get('/singleplaylist/:id',getPlaylistById)
// getting songs of playlists
router.get('/songsbyplaylist/:id',getSongsOfPlaylists)

module.exports=router