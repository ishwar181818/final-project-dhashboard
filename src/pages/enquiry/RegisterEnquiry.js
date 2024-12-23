import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';  // Make sure axios is imported for API calls

function RegisterEnquiry() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const fieldValidations = {
    firstname: {
      required: { value: true, message: 'First Name is required' },
      pattern: { value: /^[A-Za-z]+$/, message: 'First Name can only contain letters' },
    },
    lastname: {
      required: { value: true, message: 'Last Name is required' },
      pattern: { value: /^[A-Za-z]+$/, message: 'Last Name can only contain letters' },
    },
    age: {
      required: { value: true, message: 'Age is required' },
      min: { value: 18, message: 'Age must be at least 18' },  // Assuming age should be 18 or older
      max: { value: 100, message: 'Age must be less than or equal to 100' },  // Adjust max age if necessary
    },
    email: {
      required: { value: true, message: 'Email is required' },
      pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email' },
    },
    mobileno: {
      required: { value: true, message: 'Mobile number is required' },
      pattern: { value: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits' },
    },
    pancard: {
      required: { value: true, message: 'Pancard is required' },
      pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: 'Please enter a valid Pancard number' }, // Example pattern for PAN card
    },
  };

  const onSubmit = (data) => {
    setErrorMessage('');
    axios
      .post('http://localhost:8081/enq/add', data)
      .then(() => {
        alert('Enquiry submitted successfully!');
        reset();
      })
      .catch(() => {
        setErrorMessage('Failed to submit the enquiry');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Submit Enquiry</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded shadow-lg">
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">First Name</label>
          <input
            type="text"
            id="firstname"
            className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
            {...register('firstname', fieldValidations.firstname)}
          />
          <div className="invalid-feedback">{errors.firstname?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastname"
            className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
            {...register('lastname', fieldValidations.lastname)}
          />
          <div className="invalid-feedback">{errors.lastname?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            id="age"
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            {...register('age', fieldValidations.age)}
          />
          <div className="invalid-feedback">{errors.age?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', fieldValidations.email)}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="mobileno" className="form-label">Mobile Number</label>
          <input
            type="text"
            id="mobileno"
            className={`form-control ${errors.mobileno ? 'is-invalid' : ''}`}
            {...register('mobileno', fieldValidations.mobileno)}
          />
          <div className="invalid-feedback">{errors.mobileno?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="pancard" className="form-label">Pancard Number</label>
          <input
            type="text"
            id="pancard"
            className={`form-control ${errors.pancard ? 'is-invalid' : ''}`}
            {...register('pancard', fieldValidations.pancard)}
          />
          <div className="invalid-feedback">{errors.pancard?.message}</div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterEnquiry;
