import React from 'react'
import Discover from '../components/Discover'
import RightSidebar from '../components/RightSidebar'
import Navbar from '../components/Navbar'

const HomePage = () => {
    
  return (
    <>
    <div className=' p-3 grid-main'>
     <Discover/>
     <RightSidebar/>
    </div>
    </>
    
  )
}

export default HomePage