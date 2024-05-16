import React, { useEffect, useRef, useState } from 'react'
import { FaHeart, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { API } from '../config';
import { isAuthenticated, logout } from '../api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = ({setOpenSide,openSide}) => {
    const [open,setOpen]=useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    let clickRef=useRef()
    useEffect(()=>{
      let handler=(e)=>{
        if(!clickRef.current.contains(e.target)){
          setOpen(false)
        }
      };
      document.addEventListener('mousedown',handler)

      // responsive
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },[])

    const isMobile = windowWidth < 640;
    const isProfile=windowWidth<400

    const navigate=useNavigate()
    const {user}=isAuthenticated()
    const favourite=useSelector(state=>state.favourite.length)

    const handleLogout=()=>{
      logout()
      .then(data=>{
        if(data.error){
          console.log(error)
        }else{
          Swal.fire({
            title:"Logout successfully",
            icon:"success",
            position:"top"
          })
          navigate('/login')
        }
      })
    }
  return (
    <div className='flex justify-between p-[15px] bg-transparent h-[80px] w-full'>
      <div className='flex items-center ml-2 sm:ml-5 md:ml-6  gap-2 sm:gap-4 md:gap-6 lg:gap-6'>
    <GiHamburgerMenu className='text-white text-[35px] lg:hidden xl:hidden 2xl:hidden' onClick={()=>setOpenSide(!openSide)}/>
    <div className='text-white p-5 flex gap-2 items-center h-[30px] w-[200px] sm:w-[350px] md:w-[400px] lg:w-[400px] ml-4 rounded-md bg-[#303041]'>
      <FaSearch className='text-[20px]'/>
      <input type="text" placeholder='Search' className='px-2 py-[2px] border-none outline-none bg-transparent' />
    </div>
      </div>

    <div className=' flex items-center gap-6'>
      {
        isMobile? 
        <>
        
    
        <div  ref={clickRef}> 
        {
          isProfile? 
          <>
          </>:
        <div className='mr-[20px] relative' onClick={()=>setOpen(!open)}>
          <img src={`${API}/${user.profile}`} alt="" className='h-[50px] w-[50px] rounded-full'/>
        </div>
        }
        <div className={open?'flex flex-col opacity-1 ease-in items-center p-4 gap-4 text-white bg-black w-[150px] absolute z-[99999] right-[40px] top-[70px] ':"hidden"}>
          <h2 className=' capitalize'>{user.username}</h2>
          <hr className='text-white w-full'/>
          <ul className='flex flex-col gap-4 cursor-pointer'>
              <Link to={'/musify/profile'}>
            <li className='flex items-center gap-2 hover:text-gray-400'>
            <CgProfile />
            <p>Profile</p>
            </li>
              </Link>
            <Link to={'/musify/edit'}>
            <li className='flex items-center gap-2 hover:text-gray-400'>
            <FiEdit />
            <p>Edit Profile</p>
            </li>
            </Link>
            <Link to={'/musify/library/favourite'}>
            <li className='flex items-center gap-2 hover:text-gray-400'>
            <FaHeart />
            <p>Favourite</p>
            </li>
            </Link>
            <li className='flex items-center gap-2 hover:text-gray-400'>
            <IoMdLogOut />
            <p onClick={()=>handleLogout()}>Logout</p>
            </li>
          </ul>
        </div>
      </div>
      </>
      :
      <>
        <Link to={'/musify/library/favourite'}>
    <div className=' text-red-600 border h-[50px] hidden sm:flex md:flex lg:flex xl:flex 2xl:flex w-[50px] border-1 border-black items-center justify-center rounded-full bg-white '>
    <FaHeart className='text-[30px] relative'/>
      <p className=' absolute top-[9px] ml-[18px] text-green-600 font-bold text-[25px]'>{favourite}</p>
    </div>
      </Link>
      
    <div  ref={clickRef}> 
      <div className='mr-[20px] relative' onClick={()=>setOpen(!open)}>
        <img src={`${API}/${user.profile}`} alt="" className='h-[50px] w-[50px] rounded-full'/>
      </div>
      <div className={open?'flex flex-col opacity-1 ease-in items-center p-4 gap-4 text-white bg-black w-[150px] absolute z-[99999] right-[40px] top-[70px] ':"hidden"}>
        <h2 className=' capitalize'>{user.username}</h2>
        <hr className='text-white w-full'/>
        <ul className='flex flex-col gap-4 cursor-pointer'>
            <Link to={'/musify/profile'}>
          <li className='flex items-center gap-2 hover:text-gray-400'>
          <CgProfile />
          <p>Profile</p>
          </li>
            </Link>
            <Link to={'/musify/edit'}>
          <li className='flex items-center gap-2 hover:text-gray-400'>
          <FiEdit />
          <p>Edit Profile</p>
          </li>
          </Link>
          <li className='flex items-center gap-2 hover:text-gray-400'>
          <IoMdLogOut />
          <p onClick={()=>handleLogout()}>Logout</p>
          </li>
        </ul>
      </div>
    </div>
    </>
      }
    </div>
    </div>
  )
}

export default Navbar