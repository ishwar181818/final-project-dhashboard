import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LoanApplicationSanctionedData = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for navigation

  useEffect(() => {
    axios
      .get("http://localhost:8089/dis/get/Accepted")
      .then((response) => {
        setLoanApplications(response.data); // Set the data from the API
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching loan applications.");
        setLoading(false);
      });
  }, []);

  // Function to handle loan disbursement
  const handleLoanDisbursement = (customerId) => {
    axios
      .put(`http://localhost:8089/dis/add/${customerId}`)
      .then((response) => {
        if (response.status === 200) {
          alert("Loan Disbursed Successfully!");
        }
      })
      .catch((error) => {
        alert("Error disbursing loan.");
        console.error("There was an error disbursing the loan!", error);
      });
  };

  // Function to handle ledger generation
  const handleGenerateLedger = (customerId) => {
    axios
      .put(`http://localhost:8089/dis/led/${customerId}`)
      .then((response) => {
        if (response.status === 201) {
          alert("Ledger has been created!");
        }
      })
      .catch((error) => {
        alert("Error generating ledger.");
        console.error("There was an error generating the ledger!", error);
      });
  };

  // Function to handle viewing loan disbursement details
  const handleViewLoanDisbursement = (customerid) => {
    navigate(`/easyfinance/loan-disbursement/${customerid}`); // Navigate to the LoanDisbursement component
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Loan Applications - Sanction Letter Accepted</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Tenure</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Additional Mobile No</th>
              <th>Amount Paid for Home</th>
              <th>Total Loan Required</th>
              <th>Loan Status</th>
              <th>Sanction Letter Status</th>
              <th>Sanction Date</th>
              <th>Applicant Name</th>
              <th>Loan Disbursement</th>
              <th>Generate Ledger</th> {/* New column for Generate Ledger button */}
              <th>View Loan Disbursement</th> {/* New column for View Loan Disbursement button */}
            </tr>
          </thead>
          <tbody>
            {loanApplications.map((loan) => (
              <tr key={loan.customerid}>
                <td>{loan.customerid}</td>
                <td>{loan.customername}</td>
                <td>{loan.dateofbirth}</td>
                <td>{loan.customerage}</td>
                <td>{loan.requiretenure}</td>
                <td>{loan.customergender}</td>
                <td>{loan.customeremail}</td>
                <td>{loan.customermobileno}</td>
                <td>{loan.customeradditionalmobileno}</td>
                <td>{loan.amountpaidforhome}</td>
                <td>{loan.totalloanrequired}</td>
                <td>{loan.loanstatus}</td>
                <td>{loan.sanctionletter?.status}</td>
                <td>{loan.sanctionletter?.sanctiondate}</td>
                <td>{loan.sanctionletter?.applicantname}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleLoanDisbursement(loan.customerid)}
                  >
                    Loan Disbursement
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleGenerateLedger(loan.customerid)}
                  >
                    Generate Ledger
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleViewLoanDisbursement(loan.customerid)}
                  >
                    View Loan Disbursement
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanApplicationSanctionedData;
