import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <div className='flex flex-col text-white  bg-gradient-to-r from-indigo-600 to-black '>
      <div className='flex p-20 justify-around'>
        <h2 className='text-[40px] font-bold tracking-widest'>Musify</h2>
        <div>
          <h3 className='text-[25px] font-bold underline'>Pages</h3>
          <ul className='mt-3'>
            <li>Home</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>
        <div >
          <h3 className='text-[25px] font-bold underline'>Useful Links</h3>
        <ul className='mt-3'>
            <li>Your Account</li>
            <li>Discover friends</li>
            <li>Help</li>
          </ul>
        </div>
        <div>
          <h3 className='text-[25px] font-bold underline'>Contact</h3>
          <ul className='mt-3'>
            <li className='flex items-center gap-[10px]'><FaHome />Nepal</li>
            <li className='flex items-center gap-[10px]'><MdEmail />anilfullstack@gmail.com</li>
            <li className='flex items-center gap-[10px]'><MdPhone /> Contact Us</li>
          </ul>
        </div>
        </div>
        <hr />
        <p className='text-center p-2 tracking-[5px] text-[20px]'>&copy; MUSIFY NEPAL</p>
    </div>
  )
}

export default Footer