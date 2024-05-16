import React, { useEffect, useState } from 'react'
import { FaHome } from "react-icons/fa";
import { BiLibrary } from "react-icons/bi";
import { IoMusicalNotesSharp } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { IoIosMicrophone } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { API } from '../config';
import { isAuthenticated } from '../api/userApi';



const LeftSidebar = ({active,openSide,setOpenSide}) => {
  const {user}=isAuthenticated()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   useEffect(()=>{
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
  return (
    <>
    {
      isMobile?
      <div className='fixed z-[999999]'>
      <div className={openSide?" absolute  gap-2 bg-[#191624] transition ease-in-out":'lg:flex xl:flex 2xl:flex flex-col transition ease-in delay-250  navbar-left gap-2 bg-[#191624] lg:sticky xl:sticky 2xl:sticky hidden left-0 top-0'}>
        <div className='flex items-center p-3 gap-6'>
        <h2 className='text-3xl font-bold tracking-widest text-center p-3 cursor-pointer text-[orangered] logo_app'>Musify</h2>
        <h2 className='lg:hidden xl:hidden 2xl:hidden flex text-white border border-gray-600 rounded p-2 items-center justify-center gap-1' onClick={()=>setOpenSide(!openSide)}>Close <IoMdClose className='mt-[3px] text-[20px]'/></h2>
        </div>
        <div className='flex flex-col mt-[10px] '>
          {/* home or discover page */}
          {
            active==="home"?
            <>
            <Link to={'/musify'}>
              <ul className='flex list-none items-center gap-2 text-[20px] text-cyan-400 bg-[#302f35]   p-4 cursor-pointer'>
            <li><FaHome /></li>
            <li className='font-bold'>Home</li>
          </ul>
            </Link>
            </>:
            <Link to={'/musify'}>
            <ul className='flex list-none items-center gap-2 text-[20px] text-white  p-4 cursor-pointer hover:bg-black opacity-80 hover:text-gray-700'>
            <li><FaHome /></li>
            <li className='font-bold'>Home</li>
          </ul>
            </Link>
          }

          {/* Library */}
          {
            active==="library"?
            <>
            <Link to={'/musify/library'}>
             <ul className='flex list-none items-center gap-2 text-[20px] text-cyan-400 bg-[#302f35]   p-4 cursor-pointer'>
            <li><BiLibrary /></li>
            <li className='font-bold'>Your Library</li>
          </ul>
            </Link>
            </>:
            <>
            <Link to={'/musify/library'}>
            <ul className='flex list-none items-center gap-2 text-[20px]  p-4 cursor-pointer hover:bg-black opacity-80 hover:text-gray-700 text-white'>
            <li><BiLibrary /></li>
            <li className='font-bold'>Your Library</li>
          </ul>
            </Link>
            </>
          }
          
          {/* music page */}
          {
            active==="music"?
            <>
             <Link to={'/musify/music'}>
             <ul className='flex list-none items-center gap-2 text-[20px] text-cyan-400 bg-[#302f35]   p-4 cursor-pointer'>
            <li><IoMusicalNotesSharp /></li>
            <li className='font-bold'>Your Music</li>
          </ul>
            </Link>
            </>:
            <>
            <Link to={'/musify/music'}>
          <ul className='flex list-none items-center gap-2 text-[20px] text-white  p-4 cursor-pointer hover:bg-black opacity-80 hover:text-gray-700' >
            <li><IoMusicalNotesSharp /></li>
            <li className='font-bold'>Your Music</li>
          </ul>
          </Link>
            </>
          }

          {/* artsits pages */}
          {
            active==="artist"?
            <>
            <Link to={'/musify/artist'}>
             <ul className='flex list-none items-center gap-2 text-[20px] text-cyan-400 bg-[#302f35]   p-4 cursor-pointer'>
            <li><IoIosMicrophone /></li>
            <li className='font-bold'>Top Artist</li>
          </ul>
            </Link>
            </>:
            <>
            <Link to={'/musify/artist'}>
          <ul className='flex list-none items-center gap-2 text-[20px]  text-white p-4 cursor-pointer hover:bg-black opacity-80 hover:text-gray-700'>
            <li><IoIosMicrophone /></li>
            <li className='font-bold'>Top Artist</li>
          </ul>
            </Link>
            </>
          }

          {/* trending pages */}
          {
            active==="trending"?
            <>
            <Link to={'/musify/trending'}>
            <ul className='flex list-none items-center gap-2 text-[20px] text-cyan-400 bg-[#302f35]   p-4 cursor-pointer'>
            <li><FaFire /></li>
            <li className='font-bold'>Trending</li>
          </ul>
            </Link>
            </>:
            <>
            <Link to={'/musify/trending'}>
          <ul className='flex list-none items-center gap-2 text-[20px]  text-white p-4 cursor-pointer hover:bg-black opacity-80 hover:text-gray-700'>
            <li><FaFire /></li>
            <li className='font-bold'>Trending</li>
          </ul>
            </Link>
            </>
          }
        </div>
          <hr />
          <div className='text-white flex flex-col gap-5 p-4'>
            <Link to={'/musify/profile'}>
            <div className='flex  items-center gap-5 mt-6 ml-7 '>
            <img src={`${API}/${user.profile}`} alt="" className='h-[50px] w-[50px] rounded-full'/>
            <h2 className='font-bold'>{user.username}</h2>
            </div>
          </Link>
            <div className='flex flex-col gap-1 px-4 font-bold'>
            <Link to={'/musify/edit'}>
              <p className='border-t-2  px-9 p-2'>Edit Account</p>
            </Link>
              <p className='border-t-2  px-9 p-2'>Logout</p>
            </div>
        </div>
    </div>
      </div>
    :
    <div className={openSide?" absolute z-[999999] h-screen gap-2 bg-[#191624] transition ease-in-out":'lg:flex xl:flex 2xl:flex flex-col transition ease-in delay-250  h-screen navbar-left gap-2 bg-[#191624] lg:sticky xl:sticky 2xl:sticky hidden left-0 top-0'}>
        <div className='flex items-center p-3 gap-6'>
        <h2 className='text-3xl font-bold tracking-widest text-center p-3 cursor-pointer text-[orangered] logo_app'>Musify</h2>
        <h2 className='lg:hidden xl:hidden 2xl:hidden flex text-white border border-gray-600 rounded p-2 items-center justify-center gap-1' onClick={()=>setOpenSide(!openSide)}>Close <IoMdClose className='mt-[3px] text-[20px]'/></h2>
        </div>
        <div className='flex flex-col mt-[10px] '>
          {/* home or discover page */}
          {
            active==="home"?
            <>
            <Link to={'/musify'}>
              <ul className='flex list-none items-center gap-2 text-[20px] text-cyan-400 bg-[#302f35]   p-4 cursor-pointer'>
            <li><FaHome /></li>
            <li className='font-bold'>Home</li>
          </ul>
            </Link>
            </>:
            <Link to={'/musify'}>
            <ul className='flex list-none items-center gap-2 text-[20px] text-white  p-4 cursor-pointer hover:bg-black opacity-80 hover:text-gray-700'>
            <li><FaHome /></li>
            <li className='font-bold'>Home</li>
          </ul>
            </Link>
          }

          {/* Library */}
          {
            active==="library"?
            <>
            <Link to={'/musify/library'}>
             <ul className='flex list-none items-center gap-2 text-[20px] text-cyan-400 bg-[#302f35]   p-4 cursor-pointer'>
            <li><BiLibrary /></li>
            <li className='font-bold'>Your Library</li>
          </ul>
            </Link>
            </>:
            <>
            <Link to={'/musify/library'}>
            <ul className='flex list-none items-center gap-2 text-[20px]  p-4 cursor-pointer hover:bg-black opacity-80 hover:text-gray-700 text-white'>
            <li><BiLibrary /></li>
            <li className='font-bold'>Your Library</li>
          </ul>
            </Link>
            </>
          }
          
          {/* music page */}
          {
            active==="music"?
            <>
             <Link to={'/musify/music'}>
             <ul className='flex list-none items-center gap-2 text-[20px] text-cyan-400 bg-[#302f35]   p-4 cursor-pointer'>
            <li><IoMusicalNotesSharp /></li>
            <li className='font-bold'>Your Music</li>
          </ul>
            </Link>
            </>:
            <>
            <Link to={'/musify/music'}>
          <ul className='flex list-none items-center gap-2 text-[20px] text-white  p-4 cursor-pointer hover:bg-black opacity-80 hover:text-gray-700' >
            <li><IoMusicalNotesSharp /></li>
            <li className='font-bold'>Your Music</li>
          </ul>
          </Link>
            </>
          }

          {/* artsits pages */}
          {
            active==="artist"?
            <>
            <Link to={'/musify/artist'}>
             <ul className='flex list-none items-center gap-2 text-[20px] text-cyan-400 bg-[#302f35]   p-4 cursor-pointer'>
            <li><IoIosMicrophone /></li>
            <li className='font-bold'>Top Artist</li>
          </ul>
            </Link>
            </>:
            <>
            <Link to={'/musify/artist'}>
          <ul className='flex list-none items-center gap-2 text-[20px]  text-white p-4 cursor-pointer hover:bg-black opacity-80 hover:text-gray-700'>
            <li><IoIosMicrophone /></li>
            <li className='font-bold'>Top Artist</li>
          </ul>
            </Link>
            </>
          }

          {/* trending pages */}
          {
            active==="trending"?
            <>
            <Link to={'/musify/trending'}>
            <ul className='flex list-none items-center gap-2 text-[20px] text-cyan-400 bg-[#302f35]   p-4 cursor-pointer'>
            <li><FaFire /></li>
            <li className='font-bold'>Trending</li>
          </ul>
            </Link>
            </>:
            <>
            <Link to={'/musify/trending'}>
          <ul className='flex list-none items-center gap-2 text-[20px]  text-white p-4 cursor-pointer hover:bg-black opacity-80 hover:text-gray-700'>
            <li><FaFire /></li>
            <li className='font-bold'>Trending</li>
          </ul>
            </Link>
            </>
          }
        </div>
        {/* <  */}
    </div>
    }


    
    </>
  )
}

export default LeftSidebar