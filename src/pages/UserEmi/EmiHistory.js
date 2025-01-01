import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EmiHistory() {
    const { cid } = useParams();  // `cid` is the name of the URL parameter
    const customerid = cid;
    const [ledgerData, setLedgerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch ledger data on component mount or when customerid changes
    useEffect(() => {
        axios.get(`http://localhost:8089/dis/getloan/${customerid}`)
            .then(response => {
                // Sort the ledger data by ledgerid to ensure the sequence
                const sortedData = response.data.led.sort((a, b) => a.ledgerid - b.ledgerid);
                setLedgerData(sortedData); // Set sorted ledger data
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [customerid]);

    // If data is still loading or there's an error, show loading or error message
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Emi History for Customer {customerid}</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Installment</th>
                        <th style={tableHeaderStyle}>Next EMI Start Date</th>
                        <th style={tableHeaderStyle}>Next EMI End Date</th>
                        <th style={tableHeaderStyle}>Monthly EMI</th>
                        <th style={tableHeaderStyle}>Amount Paid Till Date</th>
                        <th style={tableHeaderStyle}>Current EMI Status</th>
                        <th style={tableHeaderStyle}>Payable Amount with Interest</th>
                    </tr>
                </thead>
                <tbody>
                    {ledgerData.map((ledger, index) => (
                        <tr key={ledger.ledgerid}>
                            <td style={tableCellStyle}>{`${index + 1}st Installment`}</td>
                            <td style={tableCellStyle}>{ledger.nextemidatestart}</td>
                            <td style={tableCellStyle}>{ledger.nextemidateend}</td>
                            <td style={tableCellStyle}>₹{ledger.monthlyemi}</td>
                            <td style={tableCellStyle}>₹{ledger.amountpaidtilldate}</td>
                            <td style={tableCellStyle}>{ledger.currentmonthemistatus}</td>
                            <td style={tableCellStyle}>₹{ledger.payableamountwithinterest}</td>
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

export default EmiHistory;
