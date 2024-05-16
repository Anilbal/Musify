import React, { useEffect, useState } from 'react'
import { getSongsById } from '../api/songApi'

const TestingSongPage = () => {
    const [song,setSong]=useState({})
    const id="65fc7aa0f589504b32ec3510"
    useEffect(()=>{
        getSongsById(id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setSong(data)
            }
        })
    },[])
    const durationInSeconds=song.duration
    const formatDuration = () => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.round(durationInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
    console.log(song)
  return (
    <div className='text-white'>{formatDuration()}</div>
  )
}

export default TestingSongPage