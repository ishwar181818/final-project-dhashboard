import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewSingleEnquiry = () => {
  // Fetch the 'cid' parameter from the URL
  const { cid } = useParams();

  // Set up state to hold the enquiry data
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data using axios
    axios
      .get(`http://localhost:8081/enq/get/${cid}`)
      .then((response) => {
        // Set the enquiry data to state
        setEnquiry(response.data);
        setLoading(false);
      })
      .catch((err) => {
        // Handle error
        setError('Failed to fetch enquiry data');
        setLoading(false);
      });
  }, [cid]); // Runs every time 'cid' changes

  // Show a loading message until the data is fetched
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Show error message if something goes wrong
  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  // If data is fetched successfully, display it in a Bootstrap table
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Enquiry Details</h2>
      {enquiry && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Field</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>First Name</strong></td>
              <td>{enquiry.firstname}</td>
            </tr>
            <tr>
              <td><strong>Last Name</strong></td>
              <td>{enquiry.lastname}</td>
            </tr>
            <tr>
              <td><strong>Age</strong></td>
              <td>{enquiry.age}</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td>{enquiry.email}</td>
            </tr>
            <tr>
              <td><strong>Mobile No</strong></td>
              <td>{enquiry.mobileno}</td>
            </tr>
            <tr>
              <td><strong>PAN Card</strong></td>
              <td>{enquiry.pancard}</td>
            </tr>
            <tr>
              <td><strong>Enquiry Status</strong></td>
              <td>{enquiry.enquirystatus}</td>
            </tr>
            <tr>
              <td><strong>Enquiry Open/Close</strong></td>
              <td>{enquiry.enquiryOpenOrClose}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewSingleEnquiry;
