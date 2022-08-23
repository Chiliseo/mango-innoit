import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from './../../../assets/images/mango.svg'
import './header.scss'
const Header = () => {
  return (
    <header className="header-mango">
      <nav className='navbar navbar-expand-lg'>
        <div
          className='collapse navbar-collapse w-100 order-1 order-lg-0'
          id='navbarNav'
        >
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/exercise1'>
                Exercise1
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/exercise2'>
                Exercise2
              </Link>
            </li>
          </ul>
        </div>
        <div className='d-flex w-100 order-0'>
          <div className='w-100'>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbarNav'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
          </div>
          <a className='navbar-brand text-center w-100' href='#'>
            <Logo className='logo' />
          </a>
          <span className='w-100'></span>
        </div>
        <span className='w-100'></span>
      </nav>
    </header>
  )
}

export default Header
