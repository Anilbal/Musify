import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../api/userApi'
import { MdDelete } from "react-icons/md";
import { API } from '../config'
import { dislikeSongs, getAllLikedSOngs } from '../api/songApi';
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LikedSongs = () => {
const {token}=isAuthenticated()
const [songs,setSongs]=useState([])
const [updated,setUpdated]=useState(false)
useEffect(()=>{
  getAllLikedSOngs(token)
  .then(data=>{
    if(data.error){
      console.log(data.error)
    }else{
      setSongs(data)
    }
  })
},[updated])
// console.log(songs)
  const handleRemove=(id)=>{
    dislikeSongs(id,token)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
        setUpdated(false)
      }else{
        toast.success(data.message)
        setUpdated(true)
      }
    })
  }
  return (
    <div className='text-white  p-6 flex flex-col gap-5'>
      <ToastContainer position='top-right'/>
      <Link to={'/musify/library'}>
      <div className='flex items-center gap-3 cursor-pointer w-[150px] text-[20px]'>
      <FaCircleArrowLeft />
      <p>Go Back</p>
      </div>
      </Link>
      <h2 className='text-[30px] font-bold uppercase tracking-wider underline'>Liked songs :</h2>
      <div className='mt-[10px] flex flex-col gap-10'>
      {
        songs.length>0?
        <>
      {
        songs.map((item,i)=>{
          return <div className='flex items-center justify-center sm:justify-between  border-gray-700 p-2 hover:bg-gray-700 cursor-pointer' key={i}>
          <div className='flex flex-col sm:flex-row items-center gap-5'>
          <p>{i+1}.</p>
          <img src={`${API}/${item.imageUrl}`} alt="" className='h-[200px] w-[150px] sm:h-[70px] sm:w-[70px]'/>
          <div className='flex items-center gap-10'>
          <div>
              <p>{item.title}</p>
              <p>{item.artist.username}</p>
          </div>
          <div className=' h-[35px] sm:hidden w-[35px] flex items-center justify-center rounded-full bg-white' onClick={()=>handleRemove(item._id)}>
              <MdDelete className='text-[25px] text-red-600'/>     
          </div>
          </div>
          </div>
          <p className='hidden sm:block'>{item.title}</p>
          <div className='hidden sm:flex gap-8 items-center'>
              <p>3.33</p>
              <div className=' h-[35px] w-[35px] flex items-center justify-center rounded-full bg-white' onClick={()=>handleRemove(item._id)}>
              <MdDelete className='text-[25px] text-red-600'/>     
              </div>
          </div>
</div>
        })
      }
        </>:
        <p className='text-red-500 text-[20px]'>No songs yet!!!</p>
      }
      </div>
    </div>
  )
}

export default LikedSongs