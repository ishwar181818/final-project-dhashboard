import React, { useState } from 'react';

function EmiClalculator() {
  // States for loan amount, interest rate, loan tenure, and the calculated EMI
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEmi] = useState(null);

  // Function to calculate the EMI
  const calculateEmi = () => {
    if (loanAmount && interestRate && loanTenure) {
      const principal = parseFloat(loanAmount);
      const rateOfInterest = parseFloat(interestRate) / 100 / 12;
      const tenureInMonths = parseInt(loanTenure) * 12;

      // EMI formula
      const emiAmount =
        (principal * rateOfInterest * Math.pow(1 + rateOfInterest, tenureInMonths)) /
        (Math.pow(1 + rateOfInterest, tenureInMonths) - 1);

      setEmi(emiAmount.toFixed(2));
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>EMI Calculator</h2>
      
      {/* Form for user inputs */}
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='mb-3'>
            <label htmlFor='loanAmount' className='form-label'>
              Loan Amount
            </label>
            <input
              type='number'
              id='loanAmount'
              className='form-control'
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder='Enter loan amount'
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='interestRate' className='form-label'>
              Annual Interest Rate (%)
            </label>
            <input
              type='number'
              id='interestRate'
              className='form-control'
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder='Enter annual interest rate'
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='loanTenure' className='form-label'>
              Loan Tenure (Years)
            </label>
            <input
              type='number'
              id='loanTenure'
              className='form-control'
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              placeholder='Enter loan tenure in years'
            />
          </div>

          <button className='btn btn-primary w-100' onClick={calculateEmi}>
            Calculate EMI
          </button>

          {/* Show EMI result */}
          {emi && (
            <div className='mt-4 alert alert-success'>
              <h4>Your Monthly EMI: ₹{emi}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmiClalculator;
