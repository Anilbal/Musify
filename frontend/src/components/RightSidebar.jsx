import React, { useEffect, useState } from 'react'
import { FaCirclePlay } from "react-icons/fa6";
import { getTrending } from '../api/songApi';
import { API } from '../config';
import { isAuthenticated, topArtist } from '../api/userApi';
import { Link } from 'react-router-dom';

const RightSidebar = () => {
    const [songs,setSongs]=useState([])
    const [artist,setArtist]=useState([])
    useEffect(()=>{
        getTrending()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setSongs(data)
            }
        })
        topArtist()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setArtist(data)
            }
        })
    },[])
    const {user}=isAuthenticated()
  return (
    <div className='flex flex-col  w-full p-5 gap-6 h-[100vh] sticky top-0'>

        {/* songs div */}
        <div className='flex flex-col gap-6 p-2 h-[420px] overflow-y-scroll scrollbar-hide scroll-smooth'>
            <div className='flex justify-between items-center text-white'>
                <h2 className='text-3xl font-bold'>Top charts</h2>
                <p className='cursor-pointer'>See all</p>
            </div>

            {/* !songs cards */}
            {
                songs.map((item,i)=>{
                    return <div className='flex items-center justify-between text-white ' key={i}>
                    <div className='flex items-center gap-5'>
                        <p>{i+1}</p>
                        <img src={`${API}/${item.imageUrl}`} alt="" className='h-[50px] w-[50px]'/>
                        <div className='flex flex-col'>
                            <p>{item.title}</p>
                            <p>{item.artist.username}</p>
                        </div>
                    </div>
                    <FaCirclePlay className='text-white text-[30px] cursor-pointer hover:text-green-600'/>
                </div>
                })
            }
            
        </div>

        {/* artist div */}
        <div className='flex flex-col gap-6'>
        <div className='flex justify-between items-center text-white'>
                <h2 className='text-3xl font-bold'>Top Artist</h2>
                <p className='cursor-pointer'>See all</p>
            </div>
            <div className='flex gap-5 overflow-x-scroll scrollbar-hide'>
                {
                    artist.map((item,i)=>(
                        // <Link>
                        <img src={`${API}/${item.profile}`} alt="" className='h-[130px] w-[130px] rounded-full' key={i}/>
                        // </Link>
                    )    
                    )
                }
                
            </div>
        </div>
    </div>
  )
}

export default RightSidebar