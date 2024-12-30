import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ViewLedger = () => {
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

  const handleViewLedger = (customerid) => {
    // Navigate to the ViewLedgerDetail component and pass the customerid
    navigate(`/easyfinance/view-ledger-history/${customerid}`);
  };

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
              <th>Action</th> {/* Add a new column for the button */}
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
                  {/* Add View Ledger Button */}
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewLedger(loan.customerid)}
                  >
                    View Ledger
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

export default ViewLedger;
