import React from 'react'
import { Link, Links } from 'react-router-dom'

function Header() {
  return (
      <header className='bg-dark text-white d-flex justify-content-between p-2'>
         <h1>Easy-Finance</h1>
         <div className='mt-2'>
             <Link className='btn btn-light me-2' to={'/visitors/about'}>About</Link>
             <Link className='btn btn-light me-2' to={'/visitors/services'}>Our Service</Link>
             <Link className='btn btn-light me-2' to={'/visitors/emi-calculator'}>EMI Calculator</Link>
             <Link className='btn btn-light me-2' to={'/visitors/enquiry'}>Register Enquiry</Link>
             <Link className='btn btn-light me-2' to={'/visitors/sign-in'}>Sign-in</Link>
         </div>
      </header>
  )
}

export default Header