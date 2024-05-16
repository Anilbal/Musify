import React from 'react'
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { GiNextButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { GiPreviousButton } from "react-icons/gi";
import { FaVolumeUp } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { isAuthenticated } from '../api/userApi';
import { API } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { toggleClose } from '../redux/reduxActions';

const SongPlayCard = () => {
    const {user}=isAuthenticated()
    const dataTooggle=useSelector(state=>state.isOpen)
    console.log(dataTooggle)
  const dispatch=useDispatch()
    const handleClose=()=>{
      dispatch(toggleClose())
    }
  return (
    <div className=' text-white h-full  w-full flex justify-between px-[20px] items-center bg-[#181517]'>
        <div className='flex gap-5 items-center '>
            <img src={`${API}/${user.profile}`} alt="" className='h-[50px] w-[50px] '/> 
            <div className='flex flex-col text-white'>
                <p className=' font-bold text-[15px]'>Lorem, ipsum is hello</p>
                <p>artist name</p>
            </div>
            <FaRegHeart className='text-white text-[25px] cursor-pointer'/>
            {/* <FaHeart className='bg-white'/> */}
        </div>

        <div className='flex flex-col gap-1  w-[600px] items-center justify-center'>
        <div className='flex gap-8 text-[20px] items-center cursor-pointer'>
        <GiPreviousButton className='hover:text-gray-400'/>
        <div className='h-[40px] w-[40px] rounded-full bg-white text-[#191216] border flex items-center justify-center hover:bg-gray-400'>
        <FaPlay />
        </div>
        <GiNextButton className='hover:text-gray-400'/>
        </div>
        <div className='flex items-center gap-4'>
        <p>0.00</p>
        <div className='bg-white rounded h-[5px] w-[300px] '></div>
        <p>- 3.33</p>
        </div>
        </div>

        <div className=' flex gap-10 text-[20px]'>
        <div className='flex items-center gap-2 cursor-pointer'>
        <FaVolumeUp />
        <div className='w-[100px] bg-white rounded h-[5px]'></div>
        </div>

        <RxCross2 className='text-[25px] cursor-pointer' onClick={handleClose}/>
        </div>
    </div>
  )
}

export default SongPlayCard