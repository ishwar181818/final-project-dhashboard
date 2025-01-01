import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashBoard() {
  const [userCounts, setUserCounts] = useState({
    OECount: 0,
    CRMCount: 0,
    CMCount: 0,
    AHCount: 0,
    AdminCount: 0,
    UserCount: 0
  });

  const [enquiryCounts, setEnquiryCounts] = useState({
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0
  });

  // Fetching user counts from the backend
  useEffect(() => {
    axios.get('http://localhost:8083/adm/getUserTypeCounts')
      .then(response => {
        setUserCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching the user type counts:', error);
      });
  }, []);

  // Fetching enquiry status counts from the backend
  useEffect(() => {
    axios.get('http://localhost:8081/enq/getEnquiryStatusCounts')
      .then(response => {
        setEnquiryCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching the enquiry status counts:', error);
      });
  }, []);

  // Function to format the titles with spaces and uppercase letters
  const formatTitle = (title) => {
    return title.replace(/([A-Z])/g, ' $1').toUpperCase().trim();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <div className="row">
        {Object.entries(userCounts).map(([userType, count]) => (
          <div key={userType} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{formatTitle(userType)}:</h5>
                <div className={`user-count-circle d-flex justify-content-center align-items-center ${count > 0 ? 'bg-success' : 'bg-secondary'}`}>
                  <span className="text-white font-weight-bold" style={{ fontSize: '20px' }}>
                    {count > 0 ? count : 'No Users'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-5">
        {/* Enquiry Status Counts */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">PENDING ENQUIRIES:</h5>
              <div className={`user-count-circle d-flex justify-content-center align-items-center ${enquiryCounts.pendingCount > 0 ? 'bg-warning' : 'bg-secondary'}`}>
                <span className="text-white font-weight-bold" style={{ fontSize: '20px' }}>
                  {enquiryCounts.pendingCount > 0 ? enquiryCounts.pendingCount : 'No Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">APPROVED ENQUIRIES:</h5>
              <div className={`user-count-circle d-flex justify-content-center align-items-center ${enquiryCounts.approvedCount > 0 ? 'bg-success' : 'bg-secondary'}`}>
                <span className="text-white font-weight-bold" style={{ fontSize: '20px' }}>
                  {enquiryCounts.approvedCount > 0 ? enquiryCounts.approvedCount : 'No Approved'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">REJECTED ENQUIRIES:</h5>
              <div className={`user-count-circle d-flex justify-content-center align-items-center ${enquiryCounts.rejectedCount > 0 ? 'bg-danger' : 'bg-secondary'}`}>
                <span className="text-white font-weight-bold" style={{ fontSize: '20px' }}>
                  {enquiryCounts.rejectedCount > 0 ? enquiryCounts.rejectedCount : 'No Rejected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard;
