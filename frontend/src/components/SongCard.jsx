import React from 'react'
import PlayLoader from './PlayLoader'
import { API } from '../config'
import { useDispatch } from 'react-redux'
import {  toogleOpen } from '../redux/reduxActions'

const SongCard = ({song}) => {
  const activeSong='test'
  const songs={title:"Hello"}

    const dispatch=useDispatch()
    const handleOpen=()=>{
      dispatch(toogleOpen())
    }
    
  return (
    <div className='song_card text-white bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup cursor-pointer  w-[250px] flex flex-col justify-center  p-4 gap-[20px] rounded' onClick={handleOpen}>
      <div className='relative w-full h-56 group'>
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title===songs.title?"flex bg-black bg-opacity-70":"hidden"}`}>
          <PlayLoader/>
        </div>
        <img src={`${API}/${song.imageUrl}`} alt="" className='w-full h-full'/>
      </div>
        <div className='flex flex-col'>
            <p>{song.title}</p>
            <p>{song.artist.username}</p>
        </div>
    </div>
  )
}

export default SongCard