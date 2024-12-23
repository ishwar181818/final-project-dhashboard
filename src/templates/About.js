import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container mt-5">
      <div className="row text-center mb-4">
        <div className="col-12">
          <h2>Welcome to ABC Bank</h2>
          <p className="lead">We are committed to offering exceptional banking services with a global presence and a focus on customer satisfaction.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <img className="card-img-top" src="https://media.istockphoto.com/id/515518781/photo/dream-big.jpg?s=2048x2048&w=is&k=20&c=y9oLGusjUc02AIWXTWbPiIjxEQQop8-d0VUhVpBkVZ8=" alt="Mission" />
            <div className="card-body">
              <h5 className="card-title">Our Mission</h5>
              <p className="card-text">ABC Bank is driven by a commitment to provide innovative, customer-focused banking services across the globe.</p>
              <Link to="/mission" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <img className="card-img-top" src="https://media.istockphoto.com/id/1129342452/photo/portrait-of-cheerful-young-manager-handshake-with-new-employee.jpg?s=2048x2048&w=is&k=20&c=AH2VkYE1MAvyXv_Exl1-OmqfNkeaUktLBeeD_IhIRUQ=" alt="Values" />
            <div className="card-body">
              <h5 className="card-title">Our Values</h5>
              <p className="card-text">We believe in integrity, transparency, and trust. Our values guide everything we do at ABC Bank.</p>
              <Link to="/values" className="btn btn-primary">Get in Touch</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 text-center">
          <h3>Our Awards & Recognition</h3>
          <p>We have received numerous awards and recognitions for excellence in financial services:</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Best Digital Bank (2023)</h5>
              <p className="card-text">Recognized for innovative digital banking solutions.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Excellence in Customer Service (2022)</h5>
              <p className="card-text">For our commitment to providing outstanding customer experiences.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Global Financial Innovation Award (2021)</h5>
              <p className="card-text">Honored for our leading-edge financial products and services.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
