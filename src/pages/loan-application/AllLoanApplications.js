import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For navigation

const AllLoanApplications = () => {
  const [loanApplications, setLoanApplications] = useState([]);

  useEffect(() => {
    // Fetching all loan applications from the backend
    axios.get('http://localhost:8082/lo/getAll')
      .then(response => {
        setLoanApplications(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the loan applications!', error);
      });
  }, []);

  return (
    <div>
      <h2>All Loan Applications</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Loan Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {loanApplications.map(application => (
            <tr key={application.customerid}>
              <td>{application.customerid}</td>
              <td>{application.customername}</td>
              <td>{application.loanstatus}</td>
              <td>
                <Link to={`/easyfinance/edit-loan/${application.customerid}`}>
                  {/* Use Bootstrap Icons with class names */}
                  <i className="bi bi-pencil-square"></i> Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllLoanApplications;
