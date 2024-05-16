import React from 'react'
import { Link } from 'react-router-dom'

const Library = () => {

  return (
    <div className=' p-[20px] w-full'>
        <h2 className='text-white text-[25px] tracking-widest underline uppercase font-bold'>My Library:</h2>
        <div className=' library'>
          {/* liked songs div */}
            <div className=' text-white bg-white/5 bg-opacity-80 backdrop-blur-sm cursor-pointer  w-[220px] p-2  md:w-[300px] xl:w-[300px] lg:w-[300px] 2xl:w-[300px]  rounded h-[280px] border  border-slate-700 flex flex-col gap-5'>
              <Link to={'/musify/library/likedsongs'}>
              <img src="https://i1.sndcdn.com/artworks-lDClTdsmmX9QVbQ1-h7pnRw-t500x500.jpg" alt="" className='h-[200px] w-full'/>
              <p className='text-[18px] ml-[10px] hover:underline  w-[120px]'>Liked Songs</p>
              </Link>
            </div>
          {/* playlists div */}
          <div className=' text-white bg-white/5 bg-opacity-80 backdrop-blur-sm cursor-pointer   w-[220px] p-2  md:w-[300px] xl:w-[300px] lg:w-[300px] 2xl:w-[300px]  rounded h-[280px] border  border-slate-700 flex flex-col gap-5'>
              <Link to={'/musify/library/playlist'}>
              <img src="https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxheWxpc3R8ZW58MHx8MHx8fDA%3D" alt="" className='h-[200px] w-full'/>
              <p className='text-[18px] ml-[10px] hover:underline  w-[120px]'>My Playlists</p>
              </Link>
            </div>
          {/* followed artist div */}
          <div className=' text-white bg-white/5 bg-opacity-80 backdrop-blur-sm cursor-pointer   w-[220px] p-2 md:w-[300px] xl:w-[300px] lg:w-[300px] 2xl:w-[300px]  rounded h-[280px] border  border-slate-700 flex flex-col gap-5'>
              <Link to={'/musify/library/favourite'}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJIE5bBA1dGyKDK8Bi1C5VJ4iDKswWPF-JYw&usqp=CAU" alt="" className='h-[200px] w-full'/>
              <p className='text-[18px] ml-[10px] hover:underline  w-[120px]'>Favourite Artist</p>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Library