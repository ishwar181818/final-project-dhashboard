import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function CreditManager() {
  const [loanApplications, setLoanApplications] = useState([]);
  const navigate = useNavigate();

  // Fetch loan application data when the component is mounted
  useEffect(() => {
    axios
      .get('http://localhost:8088/sa/get')
      .then((response) => {
        setLoanApplications(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data:', error);
      });
  }, []);

  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-4">Loan Application Data</h1>
        
      </div>

      {loanApplications.length > 0 ? (
        <table className="table table-bordered table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Loan Status</th>
              <th>Date of Birth</th>
              <th>Customer Age</th>
              <th>Tenure</th>
              <th>Gender</th>
              <th>Mail</th>
              <th>Amount paid For Home</th>
              <th>Total Loan Required</th>
              <th>View Credit Limit</th>
              <th>Generate Sanction Letter</th>
              <th>View Sanction Letter</th>  {/* New column for the button */}
            </tr>
          </thead>
          <tbody>
            {loanApplications.map((loan) => (
              <tr key={loan.customerid}>
                <td>{loan.customerid}</td>
                <td>{loan.customername}</td>
                <td>{loan.loanstatus}</td>
                <td>{loan.dateofbirth}</td>
                <td>{loan.customerage}</td>
                <td>{loan.requiretenure}</td>
                <td>{loan.customergender}</td>
                <td>{loan.customeremail}</td>
                
                <td>{loan.amountpaidforhome}</td>
                <td>{loan.totalloanrequired}</td>
                <td>
                  <Link
                    to={`/easyfinance/credit-limit/${loan.customerid}`}
                    className="btn btn-info"
                  >
                    View Credit Limit
                  </Link>
                </td>
                <td>
                  {/* Link to navigate to SanctionLetter page */}
                  <Link
                    to={`/easyfinance/sanction-letter/${loan.customerid}`}
                    className="btn btn-warning"
                  >
                    Generate Sanction Letter
                  </Link>
                </td>
                <td>
         <Link 
         to={`/easyfinance/view-sanction-letter/${loan.customerid}`} 
         className="btn btn-info">
             View Sanction Letter
             </Link>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="alert alert-warning">No loan applications found.</p>
      )}
    </div>
  );
}

export default CreditManager;
