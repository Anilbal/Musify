import React, { useEffect, useState } from 'react'
import { followingUser, isAuthenticated } from '../../api/userApi'
import { API } from '../../config'
import { FaPlayCircle } from "react-icons/fa";
import { getSongsBYUser } from '../../api/songApi';
import { Link } from 'react-router-dom';
import {getPlayListByMembers} from '../../api/playListsApi'
import { FaCirclePlay } from 'react-icons/fa6';
import { IoMdPlay } from "react-icons/io";

const UserProfile = () => {
    const {user}=isAuthenticated()
    const [songs,setSongs]=useState([])
    const [playlist,setPlaylist]=useState([])
    const [followUser,setFollowUser]=useState([])
    // const [open,setOpen]=useState(false)
    useEffect(()=>{
        getSongsBYUser(user._id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setSongs(data)
            }
        })
        getPlayListByMembers(user._id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setPlaylist(data)
            }
        })
        followingUser(user._id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setFollowUser(data)
            }
        })
    },[])
    console.log(followUser)
    
  return (
    <div className='w-full '>
         {/*profile div  */}
         <div className=' p-10 w-full flex flex-col items-center md:flex-row  gap-[0px] md:gap-[20px]'>
            <div className='flex flex-col items-center gap-5'>
            <p className='text-white'>Profile</p>
            <img src={`${API}/${user.profile}`} alt="" className='h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] rounded-full'/>
            </div>
            <div className='text-white mt-9 flex gap-5 flex-col items-center'>
                <p className='uppercase text-[40px] sm:text-[50px] md:text-[70px] font-bold'>{user.username}</p>
                <div className='flex gap-5 flex-col items-center md:flex-row'> 
                    <p>Songs: {songs.length>0?songs.length:0}</p>
                    <p>Playlists: {playlist.length>0?playlist.length:0}</p>
                    <p>Following: {followUser.length>0?followUser.length:0}</p>
                </div>
            </div>
         </div>
         <div className='flex flex-col p-10 gap-8 text-white bg-gradient-to-br from-black to-[#262654]'>
           {/* songs lists div */}
            <div className='flex flex-col gap-8 p-5 '>
           <div>
           <p className='text-[20px] font-bold tracking-wider'>Your uploaded songs:</p>
           <p>Only visible to you</p>
           </div>
           {
            songs.length>0?
           <div className='flex flex-col gap-8'>
            {
                songs.map((item,i)=>{
                    return <div className='flex items-center justify-between  p-2 hover:bg-gray-700 cursor-pointer' key={item._id}>
                    <div className='flex flex-col p-2 sm:flex-row ml-[20px] sm:ml-[40px] items-center gap-5'>
                    <p>#{i+1}</p>
                    <img src={`${API}/${item.imageUrl}`} alt="" className='h-[200px] w-[150px] sm:h-[50px] sm:w-[50px] hover:bg-gray-500 relative'/>
                    <div className='sm:hidden absolute mt-[130px] h-[40px] w-[40px] flex justify-center items-center rounded-full bg-black'>
                    <IoMdPlay className='text-white text-[25px] ml-[5px]'/>
                    </div>

                    <div>
                        <p>{item.title}</p>
                        <p>{item.artist.username}</p>
                    </div>
                    </div>
                    <p className='hidden sm:block'>{item.title}</p>
                    <div className='hidden sm:flex gap-8 items-center'>
                        <p>3.33</p>
                        <FaPlayCircle className='text-[25px]'/>     
                    </div>
                </div>
                })
            }
            
           </div>:
           <p className='text-red-600'>No songs available</p>
           }
            </div>

            {/* playlist lists */}
            <div className=' flex flex-col gap-4'>
                <h2 className='text-[25px] font-bold tracking-wider'>Your Playlists:</h2>
                {
                    playlist.length>0?
                <div className='playlist-grid p-[10px]'>
                    {
                        playlist.map((item)=>{
                            return <div className=' text-white bg-white/5 bg-opacity-80 backdrop-blur-sm cursor-pointer   p-2  rounded h-[280px] w-[220px] sm:w-[250px] md:w-[300px] border  border-slate-700 flex flex-col gap-5' key={item._id}>
                            <img src={`${API}/${item.image}`} alt="" className='h-[200px] w-full'/>
                             <Link to={`/musify/myplaylist/${item._id}`}>
                             <p className='text-[18px] ml-[10px] hover:underline  w-full'>{item.title}</p>
                            </Link>
                            </div>
                        })
                    }
                
                </div>:
                <p className='text-red-600 ml-5'>No playlists yet!!</p>
                }
             </div>

             {/* Following Artist div */}
             <div className='flex flex-col gap-5'>
                <h2 className='text-[25px] font-bold tracking-wider'>Following Artist:</h2>
                <div className='user-grid'>
                {/* followingArtist-grid */}
                {
                    followUser.length>0?
                    <>
                    {
                        followUser.map((item)=>{
                            return <div key={item._id} className='p-2 hover:bg-slate-800'>
                                <Link to={`/musify/singleartist/${item._id}`}>
                                <img src={`${API}/${item.profile}`} alt="" className='h-[150px] w-[150px] rounded-full'/>
                                <p className='text-[20px]'>{item.username}</p>
                                </Link>
                            </div>
                        })
                    }
                    </>
                     
                    :
                    <p className='text-red-600'>You haven't follow anyone</p>  
                }
                </div>
             </div>
         </div>
    </div>
  )
}

export default UserProfile