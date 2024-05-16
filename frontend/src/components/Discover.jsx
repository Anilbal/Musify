import React, { useEffect, useState } from 'react'
import SongCard from './SongCard'
import { allSongs } from '../api/songApi'
import { isAuthenticated } from '../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllGenre } from '../api/categoryApi';

const Discover = () => {

  const [songs,setSongs]=useState([])
  const [genre,setGenre]=useState([])
  const {token}=isAuthenticated()
  useEffect(()=>{
    allSongs(token)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
      }else{
        setSongs(data)
      }
    })

    getAllGenre()
    .then(data=>{
      if(data.error){
        toast.error(data.error)
      }else{
        setGenre(data)
      }
    })
  },[])
  // console.log(songs)
  return (
    <div className='flex flex-col p-4 gap-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-white text-3xl '>Discover</h2>
          <select className='text-gray-300  bg-black p-2 text-sm outline-none rounded border cursor-pointer'>
            {
              genre.map((item)=>{
                return <option key={item._id}>{item.title}</option>
              })
            }
            
          </select>
        </div>

        <div className='discover_grid '>
          {
            songs.map((item)=>{
              return <SongCard song={item} key={item._id}/>
            })
          }
          
        </div>
    </div>
  )
}

export default Discover