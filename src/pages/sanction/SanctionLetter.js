import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function SanctionLetter() {
  const { customerid } = useParams();  // Get customerId from the URL
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit handler for the form
  const onSubmit = (data) => {
    setIsSubmitting(true);
    axios
      .put(`http://localhost:8088/hm/generate/${customerid}`, data)
      .then((response) => {
        alert('Sanction letter is generated');
        navigate('/easyfinance/loan-application-sanctioning'); // Redirect back to Credit Manager
      })
      .catch((error) => {
        console.error('There was an error generating the sanction letter:', error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Generate Sanction Letter</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="table table-bordered table-striped table-hover">
        <tbody>
          <tr>
            <td>Contact Details</td>
            <td><input {...register("contactdetails")} className="form-control" required /></td>
          </tr>
          <tr>
            <td>Interest Type</td>
            <td><input {...register("interesttype")} className="form-control" required /></td>
          </tr>
          <tr>
            <td>Mode of Payment</td>
            <td><input {...register("modeofpayment")} className="form-control" required /></td>
          </tr>
          <tr>
            <td>Remarks</td>
            <td><textarea {...register("remarks")} className="form-control" required /></td>
          </tr>
          <tr>
            <td>Terms & Conditions</td>
            <td><textarea {...register("termscondition")} className="form-control" required /></td>
          </tr>
          <tr>
            <td>Status</td>
            <td><input {...register("status")} className="form-control" required /></td>
          </tr>
        </tbody>

        <div className="d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-success" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/easyfinance/loan-application-sanctioning')}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default SanctionLetter;
