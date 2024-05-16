import React from 'react'
import { FaCircleArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../api/userApi'
import { API } from '../config'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { removeFromFavourite } from '../redux/reduxActions'


const FavouriteArtist = () => {
  const {user}=isAuthenticated()
  const favourite=useSelector(state=>state.favourite)
  console.log(favourite)

  const dispatch=useDispatch()
  const handleRemove=(id)=>{
    dispatch(removeFromFavourite(id))
  }

  // const handleFollow=()=>{
  //   if(favourite && favourite.map(item=>))
  // }
  return (
    <div className='text-white h-screen px-10 flex flex-col gap-5 mb-10'>
      <Link to={'/musify/library'}>
      <div className='flex items-center gap-3 cursor-pointer w-[150px] text-[20px]'>
      <FaCircleArrowLeft />
      <p>Go Back</p>
      </div>
      </Link>
      <h2 className='text-[30px] font-bold uppercase tracking-wider underline'>Favourite Artists</h2>
      <div>
      {/* single user div */}
        {
          favourite.length>0?
          <>
          {
            favourite.map((item,i)=>{
              return <div className='flex border border-gray-600 items-center gap-10 w-full justify-evenly h-[200px]' key={i}>
                <div className='flex items-center gap-3'>
                <p>{i+1}.</p>
              <img src={`${API}/${item.profile}`} alt="" className='h-[150px] w-[200px]'/>
                </div>
              <div className='flex flex-col gap-6'>
                <p className='font-bold capitalize text-[20px]'>{item.username}</p>
                <div className='flex gap-4'>
                  <Link to={`/musify/singleartist/${item.user}`}>
                  <button className=' h-[35px] w-[120px] bg-white text-blue-600 font-bold'>Go Profile</button>
                  </Link>
                  {
                    item.followBy && item.followBy.includes(user._id)?
                  <button className=' h-[35px] w-[120px]  bg-white text-red-600 font-bold'>Followed</button>:
                  <button className=' h-[35px] w-[120px]  bg-white text-blue-600 font-bold'>Follow</button>
                  }
                </div>
              </div>
              <div className='flex gap-8'>
                <div>
                    <p className='font-bold'>Songs</p>
                    <p>{item.playlists && item.playlists.length }</p>
                  </div>  
                  <div>
                    <p className='font-bold'>Playlists</p>
                    <p>{item.playlists && item.playlists.length }</p>
                  </div>
                  <div>
                    <p className='font-bold'>Followers</p>
                    <p>{item.followBy && item.followBy.length}</p>
                  </div>
                </div>
                <button className='text-[30px] text-red-600 border h-[40px] w-[40px] flex items-center justify-center bg-white rounded-full hover:text-black' onClick={()=>handleRemove(item.user)}><MdDelete /></button>
            </div>
            })
          }
          
          </>:
          <p className='text-red-600 text-[25px]'>No favourite yet!!</p>
        }
      </div>
    </div>
  )
}

export default FavouriteArtist