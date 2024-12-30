import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    firstname: '',
    lastname: '',
    age: '',
    email: '',
    mobileno: '',
    pancard: '',
    enquirystatus: '',
    enquiryOpenOrClose: '' // New filter field for 'enquiryOpenOrClose'
  });

  // Fetch all enquiries from the backend
  const getEnquiries = () => {
    axios.get('http://localhost:8081/enq/getAll')
      .then(res => {
        if (res.status === 200) {
          setEnquiries(res.data); // Set enquiries data in state
          setFilteredEnquiries(res.data); // Initially show all data
        }
      })
      .catch(error => alert('Error fetching enquiries: ' + error.message))
      .finally(() => setLoading(false)); // Set loading to false after request completion
  };

  // Fetch enquiries data on component mount
  useEffect(() => {
    getEnquiries();
  }, []);

  // Handle changes in filter input fields
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      filterEnquiries(newFilters); // Apply filter immediately
      return newFilters;
    });
  };

  // Function to filter enquiries based on the current filter values
  const filterEnquiries = (filterCriteria) => {
    const filteredData = enquiries.filter((enquiry) => {
      return (
        (filterCriteria.firstname === '' || enquiry.firstname.toLowerCase().includes(filterCriteria.firstname.toLowerCase())) &&
        (filterCriteria.lastname === '' || enquiry.lastname.toLowerCase().includes(filterCriteria.lastname.toLowerCase())) &&
        (filterCriteria.age === '' || enquiry.age.toString().includes(filterCriteria.age)) &&
        (filterCriteria.email === '' || enquiry.email.toLowerCase().includes(filterCriteria.email.toLowerCase())) &&
        (filterCriteria.mobileno === '' || enquiry.mobileno.toString().includes(filterCriteria.mobileno)) &&
        (filterCriteria.pancard === '' || enquiry.pancard.toLowerCase().includes(filterCriteria.pancard.toLowerCase())) &&
        (filterCriteria.enquirystatus === '' || enquiry.enquirystatus.toLowerCase().includes(filterCriteria.enquirystatus.toLowerCase())) &&
        (filterCriteria.enquiryOpenOrClose === '' || enquiry.enquiryOpenOrClose.toLowerCase().includes(filterCriteria.enquiryOpenOrClose.toLowerCase())) // New filter logic
      );
    });
    setFilteredEnquiries(filteredData); // Update filtered data
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center fs-2 mb-4">All Enquiries</h1>

      {/* Loading indicator */}
      {loading ? <p>Loading enquiries...</p> : null}

      {/* Filter Inputs */}
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            name="firstname"
            placeholder="Filter by First Name"
            value={filters.firstname}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            name="lastname"
            placeholder="Filter by Last Name"
            value={filters.lastname}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            name="age"
            placeholder="Filter by Age"
            value={filters.age}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Filter by Email"
            value={filters.email}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            name="mobileno"
            placeholder="Filter by Mobile No"
            value={filters.mobileno}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            name="pancard"
            placeholder="Filter by Pancard"
            value={filters.pancard}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            name="enquirystatus"
            placeholder="Filter by Status"
            value={filters.enquirystatus}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            name="enquiryOpenOrClose"
            placeholder="Filter by Open or Closed"
            value={filters.enquiryOpenOrClose}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Enquiries Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Pancard</th>
            <th>Enquiry Status</th>
            <th>Enquiry Open/Close</th> {/* New column for enquiryOpenOrClose */}
          </tr>
        </thead>
        <tbody>
          {filteredEnquiries.map((enquiry) => (
            <tr key={enquiry.cid}>
              <td>{enquiry.firstname}</td>
              <td>{enquiry.lastname}</td>
              <td>{enquiry.age}</td>
              <td>{enquiry.email}</td>
              <td>{enquiry.mobileno}</td>
              <td>{enquiry.pancard}</td>
              <td>{enquiry.enquirystatus}</td>
              <td>{enquiry.enquiryOpenOrClose}</td> {/* New field displayed in the table */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Enquiries;
