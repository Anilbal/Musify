import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from './api/userApi'

const SelectiveRoutes = () => {
  
  return (
    <>
     {
      isAuthenticated()?
      <>
      <Outlet/>
      </>
      :
      <>
      <Navigate to={'/login'}/>
      </>
     }    
    </>
  )
}

export default SelectiveRoutes