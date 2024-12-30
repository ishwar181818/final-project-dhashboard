import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Hook to access route params

function CreditLimitDetails() {
  const { customerid } = useParams();  // Get customerId from the URL params
  const navigate = useNavigate();  // Hook to navigate between pages
  const [creditLimitData, setCreditLimitData] = useState(null);
  const [isCreditLimitGenerated, setIsCreditLimitGenerated] = useState(false);

  useEffect(() => {
    // Fetch credit limit data based on customerId
    axios
      .get(`http://localhost:8088/sa/getcredit/${customerid}`)  // API URL to get credit limit data by customer ID
      .then((response) => {
        setCreditLimitData(response.data);  // Update the state with the fetched data
        if (response.data) {
          setIsCreditLimitGenerated(true);  // Credit limit exists, set flag to disable button
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the credit limit data:', error);
      });
  }, [customerid]);  // Re-fetch when customerId changes

  const handleGenerateCreditLimit = () => {
    // Make API call to generate credit limit
    axios
      .post(`http://localhost:8088/sa/gen/${customerid}`)
      .then((response) => {
        alert('Credit Limit Generated Successfully!');
        setIsCreditLimitGenerated(true);  // Disable button after generation
      })
      .catch((error) => {
        console.error('Error generating credit limit:', error);
        alert('Failed to generate credit limit.');
      });
  };

  const handleBackButtonClick = () => {
    navigate('/easyfinance/loan-application-sanctioning');  // Navigate back to the Credit Manager dashboard
  };

  return (
    <div className="container mt-4">
      <h2>Credit Limit Details for Customer ID: {customerid}</h2>
      {creditLimitData ? (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Credit Limit Information</h5>
            <p><strong>Credit Limit:</strong> {creditLimitData.creditlimit} INR</p>
            <p><strong>Required Tenure:</strong> {creditLimitData.requiredtenure} months</p>
            <p><strong>Interest Rate:</strong> {creditLimitData.interestrate}%</p>
            <p><strong>Monthly EMI:</strong> ${creditLimitData.monthlyemi} INR</p>
          </div>
        </div>
      ) : (
        <p>Credit Limit Not Available. Please create a Credit Limit.</p>
      )}

      {/* Only show the Generate Credit Limit button if no data is available */}
      {!isCreditLimitGenerated && !creditLimitData && (
        <button
          className="btn btn-success mt-4"
          onClick={handleGenerateCreditLimit}
        >
          Generate Credit Limit
        </button>
      )}

      <button
        className="btn btn-secondary mt-2"
        onClick={handleBackButtonClick}
      >
        Back
      </button>
    </div>
  );
}

export default CreditLimitDetails;
