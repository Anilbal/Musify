import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../api/userApi'

const Hero = () => {
  const {user}=isAuthenticated()
  return (
    <div className='bg-gradient-to-r from-indigo-600 to-black h-screen'>
        <div className="flex  h-20 items-center pt-10 pl-20 pr-20 pb-10 justify-between">
            <h2 className='text-[40px] font-bold tracking-widest text-white cursor-pointer'>Musify</h2>
            
              {
                user?
                <>
                  <Link to={'/musify'}>
                <button className='text-[20px] tracking-wider text-white mr-[70px] border h-10 w-36 rounded hover:text-gray-700'>Home</button>
                </Link>
                </>:
                <>
                <Link to={'/login'}>
                <button className='text-[20px] tracking-wider text-white mr-[70px] border h-10 w-36 rounded hover:text-gray-700'>Sign in</button>
                </Link>
                </>
              }
            
            
        </div>
        <div className='flex justify-center mt-[6%]'>
            <div className='flex items-center flex-col '>
                <p className='text-[20px] tracking-widest text-white'>Intuitive.Powerful.Runs Everywhere</p>
                <h2 className='text-[55px] font-bold tracking-wider text-white'>Open the World of music.</h2>
                <h2 className='text-[55px] font-bold tracking-wider text-white'>It's all here.</h2>
                <Link to={"/register"}>
                <button className='text-[25px] tracking-wide text-white border-none h-[50px] w-[240px] rounded hover:text-white hover:bg-black mt-[40px] bg-[orangered]'>Get Started now</button>
                </Link>
            </div>
             
        </div>
    </div>
  )
}

export default Hero