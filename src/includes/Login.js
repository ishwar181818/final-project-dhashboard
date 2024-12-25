import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function Login() {
  const {register,handleSubmit,reset,setValue,formState:{errors}}=useForm();
    const navigate    =     useNavigate();
  const onLogin = data =>{
       if(data.isStaff){
         axios.get(`http://localhost:8083/adm/verify/${data.username}/${data.password}`)
              .then(res=>{if(res.status===200){
                      console.log(res.data)
                      sessionStorage.setItem('user',JSON.stringify(res.data))
                     navigate('/easyfinance') 
              }})
              .catch(error=>alert(error.response.data))
       }
       else{
          alert("customer trying to login")

          
       }
  }
  return (
    <div className='d-flex justify-content-center'>
          <div className='card w-50 mt-5 p-3'>
               <h1 className='fs-3 text-center '>Login here...!</h1>
               <form onSubmit={handleSubmit(onLogin)}>
                     <div className='p-2'>
                         <label className='form-label fs-4'>Enter username:</label>
                         <input type='text' className='form-control' {...register('username')}/>
                     </div>
                     <div className='p-2'>
                         <label className='form-label fs-4'>Enter password:</label>
                         <input type='text' className='form-control' {...register('password')}/>
                     </div>
                     <div className='p-2'>
                         
                         <input type='checkbox' className='form-check-input' {...register('isStaff')}/>
                         <label className='form-label ps-3 fs-5'> Are you organization staff ?</label>
                     </div>

                     <button type='submit' className='btn btn-success ms-5 w-25'>Login</button>

               </form>
          </div>
    </div>
  )
}

export default Login