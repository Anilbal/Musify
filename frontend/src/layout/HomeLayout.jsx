import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
     <Outlet/>
    </>
  )
}

export default HomeLayout

// className='h-screen bg-gradient-to-br from-black to-[#121286] 