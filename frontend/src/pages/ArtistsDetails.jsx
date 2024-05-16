import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { followNewUser, isAuthenticated, singleUser } from '../api/userApi'
import { API } from '../config'
import { getSongsBYUser } from '../api/songApi'
import { BsThreeDots } from 'react-icons/bs'
import { FaHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { addToFavourite } from '../redux/reduxActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ArtistsDetails = () => {
    const {id}=useParams()
    const {user}=isAuthenticated()
    const [users,setUsers]=useState("")
    const [songs,setSongs]=useState([])
    const [updated,setUpdated]=useState(false)
    useEffect(()=>{
      singleUser(id)
      .then(data=>{
        if(data.error){
          console.log(data.error)
        }else{
          setUsers(data)
        }
      })
      getSongsBYUser(id)
      .then(data=>{
        if(data.error){
          console.log(data.error)
        }else{
          setSongs(data)
        }
      })
    },[updated])


    // add to favourite
    const dispatch=useDispatch()
    const handleFavourite=(id)=>{
      dispatch(addToFavourite(id))
    }

    // follow new user
    const {token}=isAuthenticated()
    const followUser=()=>{
      followNewUser(id,token)
      .then(data=>{
        if(data.error){
          toast.error(data.error)
          setUpdated(false)
        }else{
          toast.success("You followed")
          setUpdated(true)
        }
      })
    }
  return (
    <div className='text-white px-5'>
      <ToastContainer position='top-right'/>
        <div>
        <div className=' w-full flex gap-[20px]'>
            <img src={`${API}/${users.profile}`} alt="" className='h-[300px] w-full relative blur-[2.5px]'/>
            <div className='text-white absolute ml-[70px] mt-8'>
                <p className='text-[20px]'>Profile</p>
                <p className='uppercase text-[90px] font-bold'>{users.username}</p>
                <div className='flex gap-8 items-center text-[25px] font-bold mt-[10px]'>
                    <p>Songs: {songs.length}</p>
                    {
                      users.followBy && users.followBy.includes(user._id)?
                      <button className='text-red-500 bg-white tracking-wider  h-[50px] w-[150px] rounded-lg cursor-pointer'>Following</button>
                      :
                      <button className='text-blue-600 bg-white  tracking-wide h-[40px] w-[150px] rounded-lg cursor-pointer'onClick={followUser}>Follow</button>
                    }
                      <button className='text-[30px] text-white border h-[50px] w-[50px] border-1 border-black flex items-center justify-center rounded-full bg-black' onClick={()=>handleFavourite(users._id)}><FaHeart /></button>
                </div>
            </div>
         </div>
         <div className='flex flex-col gap-5 p-5 mt-[20px]'>
           <p className='text-[30px] font-bold tracking-widest uppercase '>Songs</p>
           {
            songs.length>0?
           <div>
            {
                songs.map((item,i)=>{
                    return <div className='flex items-center justify-between  p-2 hover:bg-gray-700 cursor-pointer' key={item._id}>
                    <div className='flex items-center gap-5'>
                    <p>{i+1}</p>
                    <img src={`${API}/${item.imageUrl}`} alt="" className='h-[50px] w-[50px]'/>
                    <div>
                        <p>{item.title}</p>
                        <p>{item.artist.username}</p>
                    </div>
                    </div>
                    <p>{item.title}</p>
                    <div className='flex gap-8 items-center'>
                        <p>3.33</p>
                        <BsThreeDots className='text-[25px]'/>     
                    </div>
                </div>
                })
            }
            
           </div>:
           <p className='text-red-600'>No songs available</p>
           }
            </div>
        </div>
    </div>
    // {
    //   followedUser?
    //   <button>Following</button>:
    //   <button>Follow</button>
    // }
  )
}

export default ArtistsDetails