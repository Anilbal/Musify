import React, { useEffect, useRef, useState } from 'react'
import { isAuthenticated } from '../api/userApi'
import { API } from '../config'
import { MdDelete } from 'react-icons/md'
import { addSong, getSongsBYUser } from '../api/songApi'
import { RiEditBoxFill } from "react-icons/ri";
import { getAllGenre } from '../api/categoryApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyMusic = () => {
  const {user}=isAuthenticated()
  const [open,setOpen]=useState(false)
  const [songs,setSongs]=useState([])
  const [genre,setGenre]=useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let clickRef=useRef()
  const {token}=isAuthenticated()
  const [newSong,setNewSong]=useState({
    title:"",
    genre:"",
    imageUrl:"",
    songUrl:"",
    formData:new FormData
  })
  useEffect(()=>{
    getSongsBYUser(user._id)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setSongs(data)
      }
    })

    getAllGenre()
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setGenre(data)
      }
    })

    let handler=(e)=>{
      if(!clickRef.current.contains(e.target)){
        setOpen(false)
      }
    };
    document.addEventListener("mousedown",handler)

     // responsive
     const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])
  const isMobile = windowWidth < 400;


  // uploading new songs
  const {formData}=newSong
  const handleChange=(e)=>{
    let name=e.target.name
    let value=e.target.value

    if(name==="imageUrl" && name==="songUrl"){
      formData.set(name,e.target.files[0])
    }else{
      setNewSong({...newSong,[name]:value})
      formData.set(name,value)

    }
  }
console.log(newSong)
  const handleADD=(e)=>{
    e.preventDefault()
    addSong(formData,token)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        toast.success("New song added successfully")
      }
    })
  }
  return (
    <div className=' pb-10'>
      <div className='relative h-[300px]'>
      <img src={`${API}/${user.profile}`} alt="" className='h-full w-full relative blur-[1px]'/>
        <div className='text-white absolute top-14 ml-[20px] sm:ml-[40px] md:ml-[50px] lg:ml-[60px] xl:ml-[60px] 2xl:ml-[60px] flex flex-col gap-8'>
          <p className='font-bold text-[20px] tracking-widest'>My Music</p>
          <p className='font-bold text-[50px] sm:text-[60px] md:text-[70px] lg:text-[70px] xl:text-[70px] 2xl:text-[70px] uppercase tracking-wide'>{user.username}</p>
        </div>
      </div>

      {/* songs div */}
      <div className='p-6 text-white flex flex-col gap-7'>
        <div className='flex flex-col-reverse sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row  justify-between gap-5'>
          <div>
          <p className='text-[28px] font-bold uppercase'>My songs</p>
          <p>List of songs you uploaded</p>
          </div>
          <div ref={clickRef}>
            <button className='mr-10 border rounded-md tracking-wide bg-white text-red-600 font-bold h-[50px] w-[150px] hover:text-black relative' onClick={()=>setOpen(!open)} >Upload new song</button>
            <div className={open?' music_import absolute bg-black text-white top-[470px] sm:top-[150px] right-[50px] flex xl:right-[400px] sm:right-[250px] md:right-[300px]   flex-col items-center ease-in justify-center gap-9 p-3 w-[250px] sm:w-[350px]  ':"hidden"}>
              <h2 className='font-bold text-[25px]'>Create new songs</h2>
              <div className='flex flex-col p-3 w-full gap-2'>
                  <label htmlFor="title">Title</label>
                  <input type="text" id='title' name='title' placeholder='Name' className='outline-none p-2 placeholder:text-black text-black' onChange={handleChange}/>

                  <label htmlFor="genre">Choose genre</label>
                  <select name="genre" id="genre" className='p-2 text-black outline-none'onChange={handleChange}>
                    {
                      genre.map((item)=>{
                        return <option value={item._id} key={item._id} >{item.title}</option>
                      })
                    
                    }
                  </select>

                  <label htmlFor="imageUrl">Image</label>
                  <input type="file" id='imageUrl' accept='image/*' name='imageUrl' onChange={handleChange}/>

                  <label htmlFor="songUrl">Audio</label>
                  <input type="file" id='songUrl' accept='audio/*' name='songUrl' onChange={handleChange}/>
              </div>
              <button className='h-[35px] w-[120px] bg-[orangered] rounded tracking-wider font-semibold hover:text-black' onClick={handleADD}>Create</button>
            </div>
          </div>
        </div>
      <div className='mt-[10px]'>
      {
        songs.length>0?
        <div className='flex flex-col gap-10'>
      {
        songs.map((item,i)=>{
          return <div key={i}>
            {
              isMobile?
          <div className='border border-gray-600 flex items-center gap-7 flex-col p-2 hover:bg-gray-700 cursor-pointer' >
          <div className='flex items-center gap-10 sm:gap-5 md:gap-5 xl:gap-5 lg:gap-5 2xl:gap-5'>
          <p>#{i+1}</p>
          <img src={`${API}/${item.imageUrl}`} alt="" className='h-[50px] w-[50px]'/>
          <div>
              <p>{item.title}</p>
              <p>{item.artist.username}</p>
          </div>
          </div>
          <div className='flex gap-12 sm:gap-5 md:gap-5 xl:gap-5 lg:gap-5 2xl:gap-5 items-center'>
              <div className='flex items-center gap-12 sm:gap-5 md:gap-5 xl:gap-5 lg:gap-5 2xl:gap-5'>
              <div className=' h-[35px] w-[35px] flex items-center justify-center rounded-full bg-white'>
              <RiEditBoxFill className='text-[25px] text-green-600'/>     
              </div>
              <div className=' h-[35px] w-[35px] flex items-center justify-center rounded-full bg-white'>
              <MdDelete className='text-[25px] text-red-600'/>     
              </div>
              </div>
          </div>
        </div>
        :
          <div className='flex items-center justify-between  p-2 hover:bg-gray-700 cursor-pointer' >
          <div className='flex items-center gap-5'>
          <p>{i+1}.</p>
          <img src={`${API}/${item.imageUrl}`} alt="" className='h-[50px] w-[50px]'/>
          <div>
              <p>{item.title}</p>
              <p>{item.artist.username}</p>
          </div>
          </div>
          <div className='flex gap-8 items-center'>
              <p>3.33</p>
              <div className='flex items-center gap-3'>
              <div className=' h-[35px] w-[35px] flex items-center justify-center rounded-full bg-white'>
              <RiEditBoxFill className='text-[25px] text-green-600'/>     
              </div>
              <div className=' h-[35px] w-[35px] flex items-center justify-center rounded-full bg-white'>
              <MdDelete className='text-[25px] text-red-600'/>     
              </div>
              </div>
          </div>
        </div>
            }
        </div>
        })
      }
        </div>:
        <p className='text-red-500 text-[20px]'>No songs yet!!!</p>
      }
      </div>
      </div>
    </div>
  )
}

export default MyMusic