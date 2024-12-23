import React from 'react';
import { Link } from 'react-router-dom';

function OurService() {
  return (
    <div className="container mt-5">
      <div className="row text-center mb-4">
        <div className="col-12">
          <h2>Our Services</h2>
          <p className="lead">Explore the wide range of services that ABC Bank offers to help you manage your finances and achieve your goals.</p>
        </div>
      </div>

      {/* Home Loan Service */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <img className="card-img-top" src="https://media.istockphoto.com/id/1328126737/photo/sign-a-house-sale-agreement.jpg?s=2048x2048&w=is&k=20&c=L89y-KsygKlrQ3q8IZdwdHNP85kktzCZo3-jbcc3oCw=" alt="Home Loan" />
            <div className="card-body">
              <h5 className="card-title">Home Loan</h5>
              <p className="card-text">Get the best home loan options with low-interest rates and flexible terms.</p>
              <Link to="/home-loan" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>

        {/* Account Opening */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img className="card-img-top" src="https://media.istockphoto.com/id/173884748/photo/application-to-open-a-checking-account.jpg?s=2048x2048&w=is&k=20&c=Ez415UVi4R1LStpiqeSe9J0pdsEZEG_XXmXgzYQvHWg=" alt="Open Account" />
            <div className="card-body">
              <h5 className="card-title">Open an Account</h5>
              <p className="card-text">Start your banking journey with ABC Bank. We offer a variety of accounts to meet your needs.</p>
              <Link to="/open-account" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>

        {/* Fixed Deposit */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img className="card-img-top" src="https://media.istockphoto.com/id/691586724/photo/fixed-deposit.jpg?s=2048x2048&w=is&k=20&c=_R7Vx-EHIe-HjQ7bLOoemsssB6QnGJbUSxQDShp4Mew=" alt="Fixed Deposit" />
            <div className="card-body">
              <h5 className="card-title">Fixed Deposit</h5>
              <p className="card-text">Secure your savings with our Fixed Deposit plans. Get higher interest rates with guaranteed returns.</p>
              <Link to="/fixed-deposit" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="row text-center mt-5">
        <div className="col-12">
          <h3>Explore More Services</h3>
          <p>We offer a range of services such as personal loans, business loans, and insurance. Contact us for personalized assistance!</p>
          <Link to="/all-services" className="btn btn-secondary">Explore All Services</Link>
        </div>
      </div>
    </div>
  );
}

export default OurService;
