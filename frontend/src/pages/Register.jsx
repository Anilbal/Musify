import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { register } from '../api/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  let [user,setUser]=useState({
    username:"",
    email:"",
    password:"",
    imageUrl:"",
    formData:new FormData
  })

  const {formData}=user
  
  const handleChange=(e)=>{
    let name=e.target.name
    let value=e.target.value
    if(name==="imageUrl"){
      formData.set(name,e.target.files[0])
    }else{
      setUser({...user,[name]:value})
      formData.set(name,value)
    }
  }

  const handleClick=(e)=>{
    e.preventDefault()
    register(formData)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
      }else{
        toast.success("Verify link has been sent")
      }
    })
    .catch(error=>console.error(error))
  }
  return (
    <div className='bg-gradient-to-r from-indigo-600 to-black '>
      <ToastContainer position='top-right'/>
        <h2 className='text-[40px] p-[10px] ml-[50px] font-bold text-white tracking-[3px] cursor-pointer' >Musify</h2>
        <div className='flex justify-center items-center p-20 flex-col gap-[30px]'>
            <h2 className='text-[30px] text-white'>Register</h2>
            <form className='flex flex-col gap-2'>
                <label htmlFor="username" className='text-[18px] text-white'>Username</label>
                <input type="text" placeholder='Username' id='username' className='p-[7px] placeholder:text-black border-none w-[400px]' name='username'  onChange={handleChange}/>

                <label htmlFor="email" className='text-[18px] text-white'>Email</label>
                <input type="text" placeholder='Email' id='email' className='p-[7px] placeholder:text-black border-none w-[400px]' name='email' onChange={handleChange}/>

                <label htmlFor="password" className='text-[18px] text-white'>Password</label>
                <input type="text" placeholder='Password' id='password' className='p-[7px] placeholder:text-black border-none w-[400px]' name='password' onChange={handleChange}/>

                <label htmlFor="imageUrl" className='text-white'>UPLOAD YOUR PROFILE</label>
                <input type="file" id='imageUrl' className=' text-white flex gap-10' name='imageUrl' onChange={handleChange} />
            </form>
            <button className='border-none rounded-[4px] h-[35px] w-[200px] text-[20px] text-white bg-[orangered] hover:bg-black' onClick={handleClick}>Register</button>
            <div className='flex gap-[10px] align-center'>
                    <p className='text-white text-[15px]'>Already have an account?</p>
                    <Link to={'/login'}>
                    <p className='text-red-600 underline cursor-pointer'>Sign in here</p>
                    </Link>
                </div>
        </div>
    </div>
  )
}

export default Register