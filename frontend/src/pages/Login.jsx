import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { authenticate, login } from '../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  const handleClick=(e)=>{
    e.preventDefault()
    login(email,password)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
      }else{
        Swal.fire({
          title:"Logged in",
          timer:1500,
          icon:"success",
        })
        authenticate(data)
        navigate('/musify')
      }
    })
    .catch(error=>console.log(error))
  }
  return (
    <div className='bg-gradient-to-r from-indigo-600 to-black h-screen'>
      <ToastContainer position='top-right'/>
      <Link to={'/'}>
        <h2 className='text-[40px] p-[10px] ml-[50px] font-bold text-white tracking-[3px] cursor-pointer' >Musify</h2>
      </Link>
        <div className='flex justify-center items-center p-20 flex-col gap-[30px]'>
            <h2 className='text-[30px] text-white'>Sign in</h2>
            <form className='flex flex-col gap-2'>

                <label htmlFor="email" className='text-[18px] text-white'>Email</label>
                <input type="text" placeholder='Email' id='email' className='p-[7px] placeholder:text-black border-none w-[400px]' onChange={(e)=>setEmail(e.target.value)}/>

                <label htmlFor="password" className='text-[18px] text-white'>Password</label>
                <input type="text" placeholder='Password' id='password' className='p-[7px] placeholder:text-black border-none w-[400px]' onChange={(e)=>setPassword(e.target.value)}/>

                <p className='text-[red] cursor-pointer mt-[10px]'>Forget Password?</p>
            </form>
            <button className='border-none rounded-[4px] h-[35px] w-[200px] text-[20px] text-white bg-[orangered] hover:bg-black' onClick={handleClick}>Login</button>
            <div className='flex gap-[10px] align-center'>
                    <p className='text-white text-[15px]'>Doesn't have an account?</p>
                    <Link to={'/register'}>
                    <p className='text-red-600 underline cursor-pointer'>Register here</p>
                    </Link>
                </div>
        </div>
    </div>
  )
}

export default Login