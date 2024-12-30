import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const OperationDashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);
  const [forwardClicked, setForwardClicked] = useState({}); // Track if "Forward to CRM Manager" is clicked
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch all enquiries (assuming you already have this API working)
    axios.get('http://localhost:8084/oe/getAllEnquiry')
      .then(response => {
        setEnquiries(response.data); // Assuming the response is an array of enquiries
      })
      .catch(error => {
        console.error("There was an error fetching the enquiries!", error);
        setError("Error fetching enquiries.");
      });

    // Check localStorage for any saved forwardClicked state and update it
    const savedForwardClicked = JSON.parse(localStorage.getItem('forwardClicked')) || {};
    setForwardClicked(savedForwardClicked);
  }, []); // Only run this effect on mount

  // Function to generate CIBIL score using POST request
  const generateCibilScore = (cid) => {
    // Assuming you want to POST to generate the CIBIL score
    axios.post(`http://localhost:8084/oe/generateCreditScore/${cid}`)
      .then(response => {
        const updatedEnquiry = response.data;
        setEnquiries(enquiries.map(enquiry =>
          enquiry.cid === updatedEnquiry.cid ? updatedEnquiry : enquiry
        ));
        alert(`CIBIL score generated for customer ID: ${cid}`);
      })
      .catch(error => {
        console.error("There was an error generating the CIBIL score!", error.response ? error.response.data : error.message);
        setError(`Error generating CIBIL score: ${error.response ? error.response.data : error.message}`);
      });
  };

  // Function to update enquiry status based on CIBIL score
  const updateEnquiryStatus = (cid) => {
    axios.put(`http://localhost:8084/oe/put/${cid}`)
      .then(response => {
        const updatedEnquiry = response.data;
        setEnquiries(enquiries.map(enquiry =>
          enquiry.cid === updatedEnquiry.cid ? updatedEnquiry : enquiry
        ));
        alert(`Enquiry status for customer ${cid} updated to: ${updatedEnquiry.enquirystatus}`);
      })
      .catch(error => {
        console.error("There was an error updating the enquiry status!", error.response ? error.response.data : error.message);
        setError(`Error updating enquiry status: ${error.response ? error.response.data : error.message}`);
      });
  };

  // Function to forward the enquiry to CRM Manager (Just an alert for now)
  const forwardToCRM = (cid) => {
    alert(`Forwarding Enquiry with Customer ID: ${cid} to CRM Manager.`);
    
    // Disable the button after clicking and save the state in localStorage
    const updatedForwardClicked = { ...forwardClicked, [cid]: true };
    setForwardClicked(updatedForwardClicked);

    // Save updated state to localStorage
    localStorage.setItem('forwardClicked', JSON.stringify(updatedForwardClicked));
  };

  return (
    <div>
      <h2>Operation Executive Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="container">
        <h3>Enquiries</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>CIBIL Status</th>
              <th>Enquiry Status</th>
              <th>Enquiry Open/Closed</th> {/* New column for Enquiry Open/Close */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enquiry => (
              <tr key={enquiry.cid}>
                <td>{enquiry.cid}</td>
                <td>{`${enquiry.firstname} ${enquiry.lastname}`}</td>
                <td>{enquiry.cb ? enquiry.cb.status : 'N/A'}</td>
                <td>{enquiry.enquirystatus}</td>
                <td>{enquiry.enquiryOpenOrClose}</td> {/* Display the value of enquiryOpenOrClose */}
                <td>
                  {/* Generate CIBIL Score Button */}
                  {(!enquiry.cb || !enquiry.cb.cibilscore) && (
                    <button
                      onClick={() => generateCibilScore(enquiry.cid)}
                      className="btn btn-warning"
                    >
                      Generate CIBIL Score
                    </button>
                  )}

                  {/* Update Enquiry Status Button */}
                  {enquiry.enquirystatus === "pending" && (
                    <button
                      onClick={() => updateEnquiryStatus(enquiry.cid)}
                      className="btn btn-primary"
                    >
                      Update Enquiry Status
                    </button>
                  )}

                  {/* Forward to CRM Manager Button */}
                  {enquiry.enquirystatus === "Approved" && (
                    <button
                      onClick={() => forwardToCRM(enquiry.cid)}
                      className="btn btn-success"
                      disabled={forwardClicked[enquiry.cid]} // Disable after click
                    >
                      Forward to CRM Manager
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

export default OperationDashboard;
