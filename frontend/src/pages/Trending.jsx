import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../api/userApi'
import { API } from '../config'
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { getTrending, likeSongs } from '../api/songApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Trending = () => {
  const {user}=isAuthenticated()
  const [songs,setSongs]=useState([])
  const {token}=isAuthenticated()
  useEffect(()=>{
    getTrending()
    .then(data=>{
      if(data.error){
        console.log(error)
      }else{
        setSongs(data)
      }
    })
  },[])
  console.log(songs)

  const handleLike=(id)=>{
    likeSongs(id,token)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        toast.success("You liked this song")
      }
    })
  }
  return (
    <div className='flex flex-col px-10 gap-10'>
      <ToastContainer position='top-right'/>
      <div className='text-white'>
          <p className='font-bold text-[40px] tracking-wider'>Top Trending</p>
          <p>Lists based on liked songs</p>
      </div>
      <div className='flex flex-col gap-8'>
        {
          songs.map((item,i)=>{
            return <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row  items-center justify-between gap-9  p-4 px-5 hover:bg-gray-700 cursor-pointer text-white bg-[#211d35]' key={i}>
            <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center gap-9'>
            <p>#{i+1}</p>
            <img src={`${API}/${item.imageUrl}`} alt="" className='h-[150px] w-[150px] rounded-full'/>
            <div className='flex flex-col items-center gap-5'>
            <p>{item.title}</p>
            <p>{item.artist.username}</p>
            
            </div>
            </div>
            <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-9 items-center'>
            <p className=' capitalize'>Total likes: {item.likedByUser && item.likedByUser.length}</p>
            {
              item.likedByUser && item.likedByUser.includes(user._id)?
              <FaHeart className='text-[35px] text-red-600'/>
              :
              <FaHeart className='text-[35px] text-white' onClick={()=>handleLike(item._id)}/>
            }
            </div>
            <button className='border bg-white text-black font-bold flex items-center justify-center rounded-full h-[50px] w-[50px]'>
            <FaPlay className='text-[25px] ml-1' />
            </button>
          </div> 
          })
        }
               
      </div>
    </div>
  )
}

export default Trending