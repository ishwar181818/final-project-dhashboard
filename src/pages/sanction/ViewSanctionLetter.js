import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewSanctionLetter() {
    
    const { customerid, cid } = useParams();
    const idToUse = customerid || cid;
  
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    // Make a request to fetch the sanction letter PDF
    axios
      .get(`http://localhost:8088/hm/getsanction/${idToUse}`, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        setPdfUrl(fileURL);
      })
      .catch((error) => {
        console.error('Error fetching PDF:', error);
      });
  }, [customerid]);

  const sendSanctionLetterToCustomer = () => {
    axios
      .get(`http://localhost:8088/hm/sendSantionLetterMail/${idToUse}`)
      .then((response) => {
        alert('Mail has been sent to the customer!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('There was an error sending the email.');
      });
  };

  const handleStatusUpdate = (status) => {
    // Send the status (Accepted or Rejected) to the backend
    axios
      .put(`http://localhost:8088/sa/put/${idToUse}/${status}`)
      .then((response) => {
        alert(`Customer has ${status} the loan Sanctioned Proposal`);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        alert('There was an error updating the status.');
      });
  };

  return (
    <div className="container mt-4">
      <h2>Sanction Letter</h2>
      {pdfUrl ? (
        <iframe src={pdfUrl} title="Sanction Letter" width="100%" height="600px" />
      ) : (
        <p>Loading...</p>
      )}
      <div className="mt-3">
        <button onClick={sendSanctionLetterToCustomer} className="btn btn-success">
          Send Sanction Letter to Customer
        </button>
      </div>
      <div className="mt-3">
        {/* Buttons to update the status */}
        <button onClick={() => handleStatusUpdate('Accepted')} className="btn btn-primary">
          Customer has Accepted the Sanction Letter
        </button>
        <button onClick={() => handleStatusUpdate('Rejected')} className="btn btn-danger ml-2">
          Customer has Rejected the Sanction Letter
        </button>
      </div>
    </div>
  );
}

export default ViewSanctionLetter;
