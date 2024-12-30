import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanApplications = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all loan applications when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8084/oe/getAllCustomer')
      .then(response => {
        setLoanApplications(response.data); // Assuming the response is an array of loan applications
      })
      .catch(error => {
        console.error("There was an error fetching loan applications!", error);
        setError("Error fetching loan applications.");
      });
  }, []);

  // Function to verify loan status
  const verifyLoanStatus = (customerid) => {
    axios.put(`http://localhost:8084/oe/put/${customerid}/verified`)
      .then(response => {
        const updatedLoan = response.data;
        setLoanApplications(loanApplications.map(loan =>
          loan.customerid === updatedLoan.customerid ? updatedLoan : loan
        ));
        alert(`Loan status for customer ID: ${customerid} has been verified.`);
      })
      .catch(error => {
        console.error("There was an error verifying loan status!", error);
        setError("Error verifying loan status.");
      });
  };

  // Function to update loan status to Sanctioned
  const updateLoanStatusToSanctioned = (customerid) => {
    axios.put(`http://localhost:8088/hm/set/${customerid}/Sanctioned`)
      .then(response => {
        const updatedLoan = response.data;
        setLoanApplications(loanApplications.map(loan =>
          loan.customerid === updatedLoan.customerid ? updatedLoan : loan
        ));
        alert(`Loan status for customer ID: ${customerid} has been updated to Sanctioned.`);
      })
      .catch(error => {
        console.error("There was an error updating loan status to Sanctioned!", error);
        setError("Error updating loan status to Sanctioned.");
      });
  };

  return (
    <div>
      <h2>Loan Applications</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="container">
        <h3>Loan Applications</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Loan Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loanApplications.map(loan => (
              <tr key={loan.customerid}>
                <td>{loan.customerid}</td>
                <td>{loan.customername}</td>
                <td>{loan.loanstatus}</td>
                <td>
                  {/* Verify Loan Status Button */}
                  {loan.loanstatus !== "Verified" && (
                    <button
                      onClick={() => verifyLoanStatus(loan.customerid)}
                      className="btn btn-primary mr-2"
                    >
                      Verify Loan Status
                    </button>
                  )}
                  
                  {/* Update Loan Status to Sanctioned Button */}
                  {loan.loanstatus !== "Sanctioned" && (
                    <button
                      onClick={() => updateLoanStatusToSanctioned(loan.customerid)}
                      className="btn btn-success ms-3"
                    >
                      Update to Sanctioned
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanApplications;
