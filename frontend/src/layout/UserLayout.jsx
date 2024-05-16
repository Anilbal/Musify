import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import LeftSidebar from '../components/LeftSidebar'
import SongPlayCard from '../components/SongPlayCard'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'


const UserLayout = () => {
    const [openSide,setOpenSide]=useState(false)
    const [item,setItem]=useState('')
    const getUrlParams=async()=>{
        let path=await window.location.href
        if(path.match(/trending/)){
          return "trending"
        }else if(path.match(/library/)){
          return "library"
        }else if(path.match(/music/)){
          return "music"
        }else if(path.match(/artist/)){
          return "artist"
        }else{
          return "home"
        }
      }
      useEffect(()=>{
        getUrlParams()
        .then(data=>setItem(data))
      },[useParams()])
      // const se
const openToogle=useSelector(state=>state.isOpen)
  return (
    <>
    <div className='main-page'>
      <div>
      <LeftSidebar active={item} setOpenSide={setOpenSide} openSide={openSide}/>
      </div>
        <div className='bg-gradient-to-br from-black to-[#121286]'>
          <Navbar setOpenSide={setOpenSide} openSide={openSide}/>
          <Outlet/>
        </div>
    </div>
    <div className=' fixed h-[100px] bottom-0 w-full'>
      {
        openToogle?<SongPlayCard/>:""
      }
      
    </div>
    </>
  )
}

export default UserLayout