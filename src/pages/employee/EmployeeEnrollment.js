import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function EmployeeEnrollment() {
   const { register, handleSubmit } = useForm();
   const navigate = useNavigate();
   let employeePhoto; // Aadhar card Photo
   let employeePancard; // Pancard Photo or Pdf

   // Function to save new employee
   const saveData = (employee) => {
      let employeeJson = JSON.stringify(employee);
      const formData = new FormData();
      formData.append("info", employeeJson);
      formData.append("empImage", employeePhoto);
      formData.append("empPancard", employeePancard);

      // POST request to add a new employee
      axios.post('http://localhost:8083/adm/add', formData)
         .then(res => {
            if (res.status === 201) {
               alert("Employee added successfully!");
               
            }
         })
         .catch(error => console.log(error));
   };

   // Handle file selection
   const onSelectEmpPhoto = event => employeePhoto = event.target.files[0];
   const onSelectPancard = event => employeePancard = event.target.files[0];

   return (
      <div className='d-flex justify-content-center'>
         <div className='card w-50 p-3'>
            <form onSubmit={handleSubmit(saveData)}>

               <div className='mt-2'>
                  <label className='form-label'>Employee Full Name:</label>
                  <input type='text' className='form-control' {...register('firstName')} />
               </div>

               <div className='mt-2'>
                  <label className='form-label'>Employee last Name:</label>
                  <input type='text' className='form-control' {...register('lastName')} />
               </div>

               <div className='mt-2'>
                  <label className='form-label'>Employee Email:</label>
                  <input type='text' className='form-control' {...register('email')} />
               </div>

               <div className='mt-2'>
                  <label className='form-label'>Employee Salary:</label>
                  <input type='number' className='form-control' {...register('employeeSalary')} />
               </div>

               <div className='mt-2'>
                  <label className='form-label'>Employee Age:</label>
                  <input type='number' className='form-control' {...register('employeeAge')} />
               </div>

               <div className='mt-2'>
                  <label className='form-label'>Employee User Type:</label>
                  <input type='text' className='form-control' {...register('userType')} />
               </div>

               <div className='mt-2'>
                  <label className='form-label'>Employee Pancard:</label>
                  <input type='file' className='form-control' onChange={onSelectPancard} />
                  
               </div>

               <div className='mt-2'>
                  <label className='form-label'>Employee Photo:</label>
                  <input type='file' className='form-control' onChange={onSelectEmpPhoto} />
                  
               </div>

               <button className='btn btn-success'>Submit</button>
            </form>
         </div>
      </div>
   );
}

export default EmployeeEnrollment;
