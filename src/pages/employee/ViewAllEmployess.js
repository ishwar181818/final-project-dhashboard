import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ViewAllEmployees() {
  const [employees, setEmployees] = useState([]);

  // Fetch all employees from the backend
  const getEmployees = () => {
    axios.get('http://localhost:8083/adm/getAll')
      .then(res => {
        if (res.status === 200) {
          setEmployees(res.data); // Set employee data in state
        }
      })
      .catch(error => alert(error.message)); // Handle errors
  };

  // Fetch employee data on component mount
  useEffect(() => {
    getEmployees();
  }, []);

  // Helper function to convert binary data to base64 string for images
  const convertToBase64 = (data) => {
    return `data:image/jpeg;base64,${data}`;
  };

  return (
    <div className="container mt-2">
      <h1 className="text-primary text-center fs-2 mb-4">All Employee Data</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {employees.map(employee => (
          <div key={employee.userid} className="col">
            <div className="card h-100">
              {/* Wrapper div for centering the image */}
              <div className="d-flex justify-content-center mt-3">
                <img
                  src={employee.employeeImage ? convertToBase64(employee.employeeImage) : '#'}
                  alt="Employee Image"
                  className="card-img-top"
                  style={{ width: '50%', height: '180px', objectFit: 'cover' }}
                />
              </div>
              <div className="card-body">
                {/* Display Employee Details */}
                <h5 className="card-title">Name: {employee.firstName} {employee.lastName}</h5>
                <p className="card-text"><strong>Email:</strong> {employee.email}</p>
                <p className="card-text"><strong>Salary:</strong> ${employee.employeeSalary}</p>
                <p className="card-text"><strong>Age:</strong> {employee.employeeAge}</p>
                <p className="card-text"><strong>User Type:</strong> {employee.userType}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAllEmployees;
