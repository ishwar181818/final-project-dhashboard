import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";

const LoanDisbursement = () => {
  const { customerid } = useParams(); // Get the customerid from the URL
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [loanDisbursement, setLoanDisbursement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(customerid);

  useEffect(() => {
    axios
      .get(`http://localhost:8089/dis/getloan/${customerid}`)
      .then((response) => {
        console.log(response.data);
        setLoanDisbursement(response.data); // Set the loan disbursement data
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching loan disbursement details.");
        setLoading(false);
      });
  }, [customerid]);

  // Function to navigate back to the original page
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Loan Disbursement Details</h2>
      {loanDisbursement ? (
        <div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Loan Agreement ID</th>
                <th>Loan Number</th>
                <th>Agreement Date</th>
                <th>Amount Paid Type</th>
                <th>Total Amount</th>
                <th>Bank Name</th>
                <th>Account Number</th>
                <th>IFSC Code</th>
                <th>Account Type</th>
                <th>Transfer Amount</th>
                <th>Payment Status</th>
                <th>Amount Paid Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{loanDisbursement.ld.agreementid}</td>
                <td>{loanDisbursement.ld.loanno}</td>
                <td>{loanDisbursement.ld.agreementdate}</td>
                <td>{loanDisbursement.ld.amountpaytype}</td>
                <td>{loanDisbursement.ld.totalamount}</td>
                <td>{loanDisbursement.ld.bankname}</td>
                <td>{loanDisbursement.ld.accountnumber}</td>
                <td>{loanDisbursement.ld.ifsccode}</td>
                <td>{loanDisbursement.ld.accounttype}</td>
                <td>{loanDisbursement.ld.transferamount}</td>
                <td>{loanDisbursement.ld.paymentstatus}</td>
                <td>{loanDisbursement.ld.amountpaiddate}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn btn-secondary mb-4"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      ) : (
        <div>No loan disbursement found.</div>
      )}
    </div>
  );
};

export default LoanDisbursement;
