import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ApprovedEnquires() {
  const [enquiries, setEnquiries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch all enquiries when the component mounts
  useEffect(() => {
    // Display the initial "Welcome CRM Manager" message
    alert('Welcome CRM Manager, click on the button above to show the results.');

    // Fetch the enquiries data
    axios
      .get('http://localhost:8082/cm/get/Approved')
      .then((response) => {
        setEnquiries(response.data);
      })
      .catch((error) => {
        setErrorMessage('Failed to fetch enquiries');
      });
  }, []);

  // Function to handle logout
  

  // Handle Apply for Loan button click - Open in a new window
  const handleApplyForLoan = (cid) => {
    console.log(cid);
    navigate(`/easyfinance/loan-application/${cid}`, '_blank');
    
  };

  return (
    <div className="container mt-5">
      <h1>Welcome CRM Manager</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      

      

      {/* Render the Enquiries List */}
      <h3>All Customer Enquiries</h3>
      <div className="list-group">
        {enquiries.map((enquiry) => (
          <div key={enquiry.id} className="list-group-item d-flex justify-content-between">
            <div>
              <p><strong>Name:</strong> {enquiry.firstname} {enquiry.lastname}</p>
              <p><strong>Email:</strong> {enquiry.email}</p>
              <p><strong>Phone:</strong> {enquiry.mobileno}</p>
              <p><strong>Age:</strong> {enquiry.age}</p>
              <p><strong>Enquiry Status:</strong> {enquiry.enquirystatus}</p>
              <p><strong>Pancard:</strong> {enquiry.pancard}</p>
            </div>

            {/* Apply for Loan Button */}
            {enquiry.enquirystatus === 'Approved' ? (
              <button
                className="btn btn-success btn-sm py-0" 
                onClick={() => handleApplyForLoan(enquiry.cid)}
              >
                Apply for Loan
              </button>
            ) : (
              <button className="btn btn-success btn-sm py-0"  disabled>
                Apply for Loan
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApprovedEnquires;
