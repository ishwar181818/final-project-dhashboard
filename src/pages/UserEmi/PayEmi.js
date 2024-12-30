import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios

function PayEmi() {
  // Use the useParams hook to extract the cid from the URL
  const { cid } = useParams();  // `cid` is the name of the URL parameter
  const customerid = cid;

  // State variables
  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ledger data function using axios (without async/await)
  const fetchLedgerData = () => {
    axios
      .get(`http://localhost:8089/dis/getloan/${customerid}`)
      .then((response) => {
        const data = response.data;
        // Sort the ledger data by ledgerid to ensure the sequence
        const sortedData = data.led.sort((a, b) => a.ledgerid - b.ledgerid);
        setLedgerData(sortedData); // Set sorted ledger data
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || 'Failed to fetch loan data');
        setLoading(false);
      });
  };

  // Fetch ledger data when component mounts or when customerid changes
  useEffect(() => {
    fetchLedgerData();
  }, [cid]);

  // Handle EMI payment using axios (without async/await)
  const handlePayEmi = (ledgerid) => {
    axios
      .put(`http://localhost:8089/dis/pay/${customerid}/${ledgerid}`)
      .then((response) => {
        if (response.status === 200) {
          alert('Current EMI status updated to Paid');
          // Refresh the ledger data after payment update
          fetchLedgerData();
        } else {
          throw new Error('Failed to update EMI status');
        }
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  // If data is still loading or there's an error, show loading or error message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Pay EMI</h2>
      <p>Customer ID: {cid}</p>  {/* Display the customer ID */}

      <h2>Ledger History for Customer {cid}</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Ledger ID</th>
            <th style={tableHeaderStyle}>Created Date</th>
            <th style={tableHeaderStyle}>Total Loan Amount</th>
            <th style={tableHeaderStyle}>Payable Amount with Interest</th>
            <th style={tableHeaderStyle}>Tenure</th>
            <th style={tableHeaderStyle}>Monthly EMI</th>
            <th style={tableHeaderStyle}>Amount Paid Till Date</th>
            <th style={tableHeaderStyle}>Remaining Amount</th>
            <th style={tableHeaderStyle}>Next EMI Start Date</th>
            <th style={tableHeaderStyle}>Next EMI End Date</th>
            <th style={tableHeaderStyle}>Defaulter Count</th>
            <th style={tableHeaderStyle}>Previous EMI Status</th>
            <th style={tableHeaderStyle}>Current EMI Status</th>
            <th style={tableHeaderStyle}>Loan End Date</th>
            <th style={tableHeaderStyle}>Loan Status</th>
            <th style={tableHeaderStyle}>Actions</th> {/* Add Actions column */}
          </tr>
        </thead>
        <tbody>
          {ledgerData.map((ledger) => (
            <tr key={ledger.ledgerid}>
              <td style={tableCellStyle}>{ledger.ledgerid}</td>
              <td style={tableCellStyle}>{ledger.ledgercreateddate}</td>
              <td style={tableCellStyle}>{ledger.totalloanamount}</td>
              <td style={tableCellStyle}>{ledger.payableamountwithinterest}</td>
              <td style={tableCellStyle}>{ledger.tenure}</td>
              <td style={tableCellStyle}>{ledger.monthlyemi}</td>
              <td style={tableCellStyle}>{ledger.amountpaidtilldate}</td>
              <td style={tableCellStyle}>{ledger.remainingamount}</td>
              <td style={tableCellStyle}>{ledger.nextemidatestart}</td>
              <td style={tableCellStyle}>{ledger.nextemidateend}</td>
              <td style={tableCellStyle}>{ledger.defaultercount}</td>
              <td style={tableCellStyle}>{ledger.previousemistatus}</td>
              <td style={tableCellStyle}>{ledger.currentmonthemistatus}</td>
              <td style={tableCellStyle}>{ledger.loanenddate}</td>
              <td style={tableCellStyle}>{ledger.loanstatus}</td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => handlePayEmi(ledger.ledgerid)}
                  style={buttonStyle}
                >
                  Pay Current EMI
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Inline styles for table header and cell borders
const tableHeaderStyle = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2'
};

const tableCellStyle = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'left',
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default PayEmi;
