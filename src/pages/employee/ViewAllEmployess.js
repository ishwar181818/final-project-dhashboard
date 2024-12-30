import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ViewAllEmployees() {
  const [employees, setEmployees] = useState([]);
  const { userid } = useParams(); // Get the userid from the URL (for deletion)
  const navigate = useNavigate(); // Use to navigate after deletion

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

  // Function to handle employee deletion
  const handleDelete = (userid) => {
    // Perform the delete operation
    axios.delete(`http://localhost:8083/adm/del/${userid}`)
      .then((response) => {
        if (response.status === 204) {
          // If successful, remove the deleted employee from the state
          setEmployees(employees.filter(employee => employee.userid !== userid));
          alert('Employee Deleted ');
          getEmployees();
          navigate('/easyfinance/view-employee');
        } else {
          alert('Failed to delete the employee');
        }
      })
      .catch(error => {
        console.error("There was an error deleting the employee!", error);
        alert('Error deleting the employee');
      });
  };

  // Fetch employee data on component mount
  useEffect(() => {
    getEmployees();
  }, []);

  // Perform deletion if userid exists in the params
  useEffect(() => {
    if (userid) {
      handleDelete(userid); // Perform deletion directly
    }
  }, [userid]);

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
                <p className="card-text"><strong>Salary:</strong> ₹{employee.employeeSalary}</p>
                <p className="card-text"><strong>Age:</strong> {employee.employeeAge}</p>
                <p className="card-text"><strong>User Type:</strong> {employee.userType}</p>

                {/* Edit Link */}
                <Link to={`/easyfinance/employee-enrollment/${employee.userid}`} className="btn btn-primary mr-2">
                  Edit
                </Link>

                {/* Delete Link */}
                <Link 
                  to={`/easyfinance/employee-delete/${employee.userid}`} 
                  className="btn btn-danger"
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAllEmployees;
