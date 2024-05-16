import React, { useEffect, useState } from 'react'
import { isAuthenticated, topArtist } from '../api/userApi'
import { API } from '../config'
import { IoMdCheckmark } from "react-icons/io";
import { Link } from 'react-router-dom';



const Artists = () => {
  const {user}=isAuthenticated()
  const [artist,setArtist]=useState([])

  useEffect(()=>{
    topArtist()
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setArtist(data)
      }
    })
  },[])

  console.log(artist)
  return (
    <div className='flex flex-col p-10 gap-10'>
      <div className='text-white'>
          <p className='font-bold text-[40px] tracking-wider'>Top Artists</p>
          <p>Lists based on followers</p>
      </div>
      <div className='flex flex-col gap-7'>
        {
          artist.map((item,i)=>{
            return <div className='rounded-sm flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row  items-center  justify-between  p-4 px-5 hover:bg-gray-700 cursor-pointer text-white bg-[#211d35] gap-5' key={i}>
            <div className='flex items-center flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-9'>
            <p>#{i+1}</p>
            <img src={`${API}/${item.profile}`} alt="" className='h-[150px] w-[150px] rounded-full'/>
            <p className=' capitalize'>{item.username}</p>
            </div>
            <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-5 items-center'>
            <p>Songs: {item.songs && item.songs.length}</p>
            <p>Followers: {item.followBy && item.followBy.length}</p>
            </div>
            <div>
              <Link to={`/musify/singleartist/${item._id}`}>
                <button className='border bg-white text-blue-600 font-bold flex items-center justify-center rounded-2xl h-[40px] w-[100px]'>Profile</button>
              </Link>
            </div>
          </div>
          })
        }
      
        
      </div>
      {/* <div>
        {
          artist.map((item,i)=>{
            return <div className='flex items-center  justify-between  p-2 px-5 hover:bg-gray-700 cursor-pointer text-white' key={i}>
            <div className='flex items-center gap-9'>
            <p>#{i+1}</p>
            <img src={`${API}/${item.profile}`} alt="" className='h-[150px] w-[150px] rounded-sm'/>
            <p className=' capitalize'>{item.username}</p>
            </div>
            <div className='hidden  flex-col sm:flex md:flex lg:flex xl:flex 2xl:flex gap-5'>
            <p>Songs: {item.songs && item.songs.length}</p>
            <p>Followers: {item.followBy && item.followBy.length}</p>
            </div>
            <div>
              <Link to={`/musify/singleartist/${item._id}`}>
                <button className='border bg-white text-blue-600 font-bold flex items-center justify-center rounded-2xl h-[40px] w-[100px]'>Profile</button>
              </Link>
            </div>
          </div>
          })
        }
      
        
      </div> */}
    </div>
  )
}

export default Artists