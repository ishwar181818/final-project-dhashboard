import React from 'react'
import '../styles/ProfileNav.css'
import { Link } from 'react-router-dom'

function ProfileNav({data:{username, userType ,employeeImage}}) {

  return (
    <nav className='bg-dark p-3 text-white d-flex  justify-content-between'>
       <div className='d-flex'>
       <img className='profileImage' src={`data:image/jpeg;base64,${employeeImage}`}></img>
         <div className='ms-2'>
         <h1 className='fs-3'>Username:- {username}</h1>
         <h1 className='fs-3'>UserType:- {userType}</h1>
         </div>
       </div>
        
        <Link className='btn btn-danger logout-btn' to={'/'}>Logout</Link>
    </nav>
  )
}

export default ProfileNav