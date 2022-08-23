import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'

const Layout = () => {
  return (
    <div className='layout'>
      <Header />
      <div className='layout-content container-fluid'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
