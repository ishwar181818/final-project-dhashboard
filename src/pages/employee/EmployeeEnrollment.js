import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeEnrollment() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const navigate = useNavigate();
  const { userid } = useParams(); // Get user ID from URL
  const [employee, setEmployee] = useState({});
  const [employeePhoto, setEmployeePhoto] = useState(null); // Store employee image
  const [employeePancard, setEmployeePancard] = useState(null); // Store pancard image

  // Fetch employee data if userid exists
  useEffect(() => {
    if (userid) {
      axios.get(`http://localhost:8083/adm/get/${userid}`)
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            setEmployee(data); // Set employee data in state

            // Pre-fill the form with employee data
            setValue('firstName', data.firstName);
            setValue('lastName', data.lastName);
            setValue('email', data.email);
            setValue('employeeSalary', data.employeeSalary);
            setValue('employeeAge', data.employeeAge);
            setValue('userType', data.userType); // Set the userType value

            // Convert binary image data to base64
            if (data.employeeImage) {
              setEmployeePhoto(`data:image/jpeg;base64,${data.employeeImage}`);
            }
            if (data.employeePancard) {
              setEmployeePancard(`data:image/jpeg;base64,${data.employeePancard}`);
            }
          }
        })
        .catch(error => console.log(error)); // Handle errors
    } else {
      // Reset the form and states when there's no user ID (Add Employee mode)
      reset();
      setEmployeePhoto(null);
      setEmployeePancard(null);
    }
  }, [userid, setValue, reset]);

  // Handle file selection for image and pancard
  const onSelectEmpPhoto = event => setEmployeePhoto(event.target.files[0]);
  const onSelectPancard = event => setEmployeePancard(event.target.files[0]);

  // Function to save or update employee data
  const saveData = (employeeData) => {
    const formData = new FormData();
    formData.append("info", JSON.stringify(employeeData));
    formData.append("empImage", employeePhoto); // For employee photo
    formData.append("empPancard", employeePancard); // For pancard

    if (userid) {
      // If userid exists, update the employee with PUT request
      axios.put(`http://localhost:8083/adm/update/${userid}`, formData)
        .then(res => {
          if (res.status === 200) {
            alert("Employee updated successfully!");
            navigate('/easyfinance/view-employee'); // Navigate to the employee list page
          }
        })
        .catch(error => console.log(error));
    } else {
      // If no userid, create a new employee with POST request
      axios.post('http://localhost:8083/adm/add', formData)
        .then(res => {
          if (res.status === 201) {
            alert("Employee added successfully!");
            reset();
            navigate('/easyfinance/view-employee');
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='card w-50 p-3'>
        <form onSubmit={handleSubmit(saveData)}>
          <div className='mt-2'>
            <label className='form-label'>Employee Full Name:</label>
            <input type='text' className='form-control' {...register('firstName')} />
          </div>
          <div className='mt-2'>
            <label className='form-label'>Employee Last Name:</label>
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
            <select className='form-control' {...register('userType')}>
              <option value='AH'>AH</option>
              <option value='CRM'>CRM</option>
              <option value='CM'>CM</option>
              <option value='ADMIN'>ADMIN</option>
              <option value='OE'>OE</option>
            </select>
          </div>

          {/* Display the employee photo */}
          <div className='mt-2'>
            <label className='form-label'>Employee Photo:</label>
            <input type='file' className='form-control' onChange={onSelectEmpPhoto} />
            {employeePhoto && <img src={employeePhoto} alt="Employee Preview" style={{ width: '100px', height: '100px' }} />}
          </div>

          {/* Display the pancard */}
          <div className='mt-2'>
            <label className='form-label'>Employee Pancard:</label>
            <input type='file' className='form-control' onChange={onSelectPancard} />
            {employeePancard && <img src={employeePancard} alt="Pancard Preview" style={{ width: '100px', height: '100px' }} />}
          </div>

          <button className='btn btn-success'>Save</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeEnrollment;
