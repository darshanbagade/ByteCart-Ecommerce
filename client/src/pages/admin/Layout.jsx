import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar,DashboardMenu } from '../../components/index'
function Layout() {
  return (
    <>
        <Navbar/>
        <div className='relative '>
          <DashboardMenu/>
          <Outlet/>

        </div>
    </>
  )
}

export default Layout