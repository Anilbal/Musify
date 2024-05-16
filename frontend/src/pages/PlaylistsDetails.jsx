import React, { useEffect, useState } from 'react'
import { API } from '../config'
import { IoMdLogOut } from "react-icons/io";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import {  addSongsToPlaylist, addToPlaylist, deletePlayList, getRelatedPlayLists, getSinglePlaylist, removeFromPlaylist, removeSongsFromPlaylist, songsByPlaylists } from '../api/playListsApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../api/userApi';
import { relatedSongs } from '../api/songApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const PlaylistsDetails = () => {

  const {user}=isAuthenticated()
  const [details,setDetails]=useState({})
  const [songs,setSongs]=useState([])
  const [related,setRelated]=useState([])
  const {id}=useParams()
  const [playlist,setPlaylist]=useState([])
  const [updated,setUpdated]=useState(false)
  useEffect(()=>{
    getSinglePlaylist(id)
    .then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            setDetails(data)
        }
    })
    getRelatedPlayLists(id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setPlaylist(data)
            }
        })

    songsByPlaylists(id)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setSongs(data)
      }
    })

    relatedSongs(id)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setRelated(data)
      }
    })
  },[id,updated])


  const {token}=isAuthenticated()
  // to remove members from playlist
  const handleRemove=()=>{
    removeFromPlaylist(token,id,user._id)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
        setUpdated(false)
      }else{
        toast.success("You left this playlist")
        setUpdated(true)
      }
    })
  }

  // to add members to playlist
  const handleAdd=()=>{
    addToPlaylist(token,id,user._id)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
        setUpdated(false)
      }else{
        toast.success("You joined this playlist")
        setUpdated(true)

      }
    })
  }


  // to delete playlist
  const navigate=useNavigate()
  const handleDelete=()=>{
    deletePlayList(id,token)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
      }else{
        Swal.fire({
          title:"Playlist deleted successfully",
          icon:"success"
        })
        navigate('/musify/library/playlist')
      }
    })
  }

  // adding songs to playlist
  const addingSongsToPlaylist=(songId)=>{
    addSongsToPlaylist(songId,token,id)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
        setUpdated(false)
      }else{
        toast.success("Song added")
        setUpdated(true)
      }
    })
  }

    // removing songs to playlist
const removingSongsFromPlaylist=(songId)=>{
      removeSongsFromPlaylist(songId,token,id)
      .then(data=>{
        if(data.error){
          toast.error(data.error)
          setUpdated(false)
        }else{
          toast.success("Song removed")
          setUpdated(true)
        }
      })
    }
  return (
    <div className='text-white'>
      <ToastContainer position='top-right'/>
      <div className=' py-10 px-20 w-full flex justify-between gap-[20px]'>
          <div className='flex gap-6 items-center'>
            <img src={`${API}/${details.image}`} alt="" className='h-[200px] w-[220px] rounded-sm'/>
            <div className='text-white flex flex-col gap-4'>
                <p>Playlist</p>
                <p className='uppercase text-[60px] font-bold'>{details.title}</p>
                <p>{details.description}</p>
                <div className='flex flex-col justify-center gap-3 text-[18px]'>
                  <p>Admin: {details.admin?.username}</p>
                    <div className='flex gap-5'>
                    <p>Songs: {details.songs && details.songs.length}</p>
                    <p>Members: {details.members && details.members.length}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className=''>
            {
              details.members && details.members.includes(user._id)?
              <button className='flex text-[18px] items-center h-[40px] w-[100px] mt-[180px] justify-center gap-3 bg-[orangered] rounded-sm hover:text-black' onClick={handleRemove}>Leave <IoMdLogOut /></button>
              :
              <button className='flex text-[18px] items-center h-[40px] w-[100px] mt-[180px] justify-center gap-3 bg-[orangered] rounded-sm hover:text-black' onClick={handleAdd}>Join <IoMdLogOut /></button>
            }
        </div>
         </div>

         <div className='flex flex-col gap-10 p-10 text-white bg-gradient-to-br from-black to-[#262654]'>
            <div className='flex items-center justify-between'>
              <button className='h-[50px] w-[50px] flex items-center justify-center rounded-full bg-green-600'>
               <FaPlay className='text-black text-[30px] ml-1'/> 
              </button>
            <button className='flex text-[18px] items-center h-[40px] w-[120px] justify-center gap-3 bg-[orangered] rounded-sm hover:text-black' onClick={handleDelete}>Delete playlist</button> 
            </div>
           {/* songs lists div */}
            <div className='flex flex-col gap-5'>
           <div>
           <p className='text-[25px] font-bold tracking-wider'>Available Songs</p>
           </div>
           <div>
        {
            songs.length>0?
           <div className=''>
            {
                songs.map((item,i)=>{
                    return <div className='flex items-center justify-between p-3 hover:bg-gray-700 cursor-pointer' key={i}>
                    <div className='flex items-center gap-5'>
                    <p>{i+1}</p>
                    <img src={`${API}/${item.imageUrl}`} alt="" className='h-[50px] w-[50px]'/>
                    <div>
                        <p>{item.title}</p>
                        <p>{item.artist.username}</p>
                    </div>
                    </div>
                    <p>{item.title}</p>
                    <div className='flex gap-8 items-center'>
                        <p>3.33</p>
                        <RiDeleteBin3Fill className='text-[25px] hover:text-red-500' onClick={()=>removingSongsFromPlaylist(item._id)}/>     
                    </div>
                </div>
                })
            }
            
           </div>:
           <p className='text-red-600'>No songs available</p>
           }
    </div>
            </div>

           {/* related songs div */}

           <div className='flex flex-col gap-5'>
           <div>
           <p className='text-[25px] font-bold tracking-wider'>Recommended</p>
           <p>List of songs you want to add</p>
           </div>
           <div>
        {
            related.length>0?
           <div className=''>
            {
                related.map((item,i)=>{
                    return <div className='flex items-center justify-between p-3 hover:bg-gray-700 cursor-pointer' key={i}>
                    <div className='flex items-center gap-5'>
                    <p>{i+1}</p>
                    <img src={`${API}/${item.imageUrl}`} alt="" className='h-[50px] w-[50px]'/>
                    <div>
                        <p>{item.title}</p>
                        <p>{item.artist.username}</p>
                    </div>
                    </div>
                    <p>{item.title}</p>
                    <div>
                      <button className='border h-[40px] w-[100px] rounded-lg font-semibold tracking-wider hover:text-[orangered]' onClick={()=>addingSongsToPlaylist(item._id)}>Add</button>     
                    </div>
                </div>
                })
            }
            
           </div>:
           <p className='text-red-600'>No songs available</p>
           }
    </div>
            </div>
            {/* related playlists */}
            <div className=' flex flex-col gap-4 p-6'>
                <h2 className='text-[25px] font-bold tracking-wider'>Other Playlists:</h2>
                {
                    playlist.length>0?
                <div className='playlist-grid p-[10px]'>
                    {
                        playlist.map((item)=>{
                            return <div className=' text-white bg-white/5 bg-opacity-80 backdrop-blur-sm cursor-pointer  w-[300px] p-2  rounded h-[280px] border  border-slate-700 flex flex-col gap-5' key={item._id}>
                            <img src={`${API}/${item.image}`} alt="" className='h-[200px] w-full'/>
                             <Link to={`/musify/myplaylist/${item._id}`}>
                             <p className='text-[18px] ml-[10px] hover:underline w-full'>{item.title}</p>
                            </Link>
                            </div>
                        })
                    }
                
                </div>:
                <p className='text-red-600 ml-5'>No playlists yet!!</p>
                }
             </div>
         </div>
    </div>
  )
}

export default PlaylistsDetails