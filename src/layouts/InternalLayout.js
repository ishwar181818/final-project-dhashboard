import React, { useEffect, useState } from 'react'
import ProfileNav from '../templates/ProfileNav';

function InternalLayout() {
 const [employee,setEmployee]= useState({})
const  getSessionData = ()=>{
 const userJson= sessionStorage.getItem('user');
 const user=JSON.parse(userJson);
    setEmployee(user);
}

  useEffect(getSessionData,[]);
  return (
    <div>
        <ProfileNav data={employee}/>
    </div>
  )
}

export default InternalLayout