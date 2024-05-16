import React, { useEffect, useRef, useState } from 'react'
import { FaCircleArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { createPlaylist, getPlayListByMembers } from '../api/playListsApi'
import { isAuthenticated } from '../api/userApi'
import { API } from '../config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Playlists = () => {
  const [playlits,setPlaylits]=useState([])
  const [open,setOpen]=useState(false)
  const {user}=isAuthenticated()
  let clickRef=useRef()
  const [newPlaylist,setNewPlaylist]=useState({
    title:"",
    description:"",
    imageUrl:"",
    formData:new FormData
  })
  useEffect(()=>{
    getPlayListByMembers(user._id)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setPlaylits(data)
      }
    })

    let handler=(e)=>{
      if(!clickRef.current.contains(e.target)){
        setOpen(false)
      }
    };
    document.addEventListener("mousedown",handler)
  },[])

  const {token}=isAuthenticated()
  const {formData}=newPlaylist
  const handleChange=(e)=>{
    let name=e.target.name
    let value=e.target.value
    if(name==="imageUrl"){
      formData.set(name,e.target.files[0])
    }else{
      setNewPlaylist({...newPlaylist,[name]:value})
      formData.set(name,value)
    }
  }

  const handleClick=(e)=>{
    e.preventDefault()
    createPlaylist(formData,token)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
      }else{
        toast.success("New Playlist created")
      }
    })
    .catch(error=>console.error(error))
  }
  return (
    <div className='text-white  p-6 flex flex-col gap-9'>
      <ToastContainer position='top-right'/>
      <div className='flex  items-center gap-3 cursor-pointer w-[150px] text-[20px]'>
      <Link to={'/musify/library'} className='flex items-center gap-3'>
      <FaCircleArrowLeft />
      <p>Go Back</p>
      </Link>
      </div>
      <div className='flex gap-5 sm:items-center sm:flex-row ml-[20px] flex-col-reverse justify-between' ref={clickRef}>
      <h2 className='text-[25px] sm:text-[30px] font-bold uppercase tracking-wider underline'>All Playlists :</h2>
      <button className='mr-[50px] border border-gray-500 rounded h-[40px] w-[180px] font-bold bg-black text-white hover:text-[orangered]' onClick={()=>setOpen(!open)}>Create new playlist</button>
      <div className={open?' absolute bg-black text-white top-[270px] right-[20px] sm:top-[150px] sm:right-[270px] sm:w-[350px] h-[500px] w-[280px] lg:w-[400px] lg:right-[280px] xl:w-[500px] xl:right-[350px] flex flex-col items-center  justify-center ease-in-out gap-9 z-[99999]':"hidden"}>
              <h2 className='font-bold text-[25px]'>Create new playlist</h2>
              <div className='flex flex-col w-full p-4 gap-2'>
                  <label htmlFor="title">Title</label>
                  <input type="text" id='title' name='title' placeholder='Name' className='outline-none p-2 placeholder:text-black text-black' onChange={handleChange}/>

                  <label htmlFor="description">Description</label>
                  <input type="text" name="description" id="description" placeholder='Enter your description' className='outline-none p-2 placeholder:text-black text-black' onChange={handleChange}/>

                  <label htmlFor="imageUrl">Image</label>
                  <input type="file" id='imageUrl' name='imageUrl' onChange={handleChange}/>
              </div>
              <button className='h-[35px] w-[120px] bg-[orangered] rounded tracking-wider font-semibold hover:text-black' onClick={handleClick}>Create</button>
      </div>
      </div>
      <div className='mt-[10px] px-10 playlist-grid'>
        {
          playlits.length>0?
          <>
          {
            playlits.map((item,i)=>{
              return <div className='flex flex-col items-center gap-2'>
              <h2 className=' text-[20px]'>Playlist no.{i+1}</h2>
              <div className=' text-white bg-white/5 bg-opacity-80 backdrop-blur-sm cursor-pointer  w-[200px] p-2  rounded h-[280px] border sm:w-[300px]  border-slate-700 flex flex-col gap-5'>
                <Link to={`/musify/myplaylist/${item._id}`}>  
                <img src={`${API}/${item.image}`} alt={item.title} className='h-[200px] w-full'/>
                <p className='text-[18px] ml-[10px] hover:underline  w-full'>{item.title}</p>
                </Link>
              </div>
            </div>
            })
          }
          </>:
          <p className='text-red-600 text-[20px]'>No playlist yet</p>
        }
          
      </div>
    </div>
  )
}

export default Playlists