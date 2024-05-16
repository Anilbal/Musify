import React, { useState } from 'react'
import { isAuthenticated, updateUser } from '../../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditProfile = () => {
  let [users,setUser]=useState({
    username:"",
    email:"",
    password:"",
    imageUrl:"",
    formData:new FormData
  })
  const {user}=isAuthenticated()
  const {formData}=users
  
  const handleChange=(e)=>{
    let name=e.target.name
    let value=e.target.value
    if(name==="imageUrl"){
      formData.set(name,e.target.files[0])
    }else{
      setUser({...users,[name]:value})
      formData.set(name,value)
    }
  }

  const handleClick=(e)=>{
    e.preventDefault()
    updateUser(formData,user._id)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
      }else{
        toast.success("User updated successfully")
      }
    })
    .catch(error=>console.error(error))
  }
  return (
    <div className='text-white flex items-center justify-center'>
      <ToastContainer position='top-right'/>
      <div className='flex flex-col w-[60%] items-center p-5 gap-10 mt-[20px]'>
      <h2 className='text-[30px]'>Edit Profile</h2>
              <div className='flex flex-col  gap-3 w-full'>
                  <label htmlFor="username">Username</label>
                  <input type="text" id='username' name='username' placeholder='New name' className='outline-none p-2 placeholder:text-black text-black' onChange={handleChange}/>

                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" placeholder='New email' className='outline-none p-2 placeholder:text-black text-black' onChange={handleChange}/>

                  <label htmlFor="password">Password</label>
                  <input type="text" id='password' name='password' placeholder='New password' className='outline-none p-2 placeholder:text-black text-black' onChange={handleChange}/>

                  <label htmlFor="imageUrl">Profile</label>
                  <input type="file" id='imageUrl' name='imageUrl' onChange={handleChange}/>

              </div>
              <button className='h-[35px] w-[120px] bg-[orangered] rounded tracking-wider font-semibold hover:text-black' onClick={handleClick}>Update</button>
      </div>
      </div>
  )
}

export default EditProfile