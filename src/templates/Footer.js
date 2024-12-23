import React from 'react';

function Footer() {
  return (
    <footer className='bg-dark text-white p-3'>
      <div className='d-flex flex-column gap-4'>
        {/* App Title */}
        <h1>My Micro-finance app</h1>

        {/* Description/Explanation */}
        <p>
          My Micro-finance app aims to provide financial assistance to individuals and businesses with limited access to traditional banking services. We offer flexible loan solutions, helping people improve their lives and grow their businesses.
        </p>

        {/* Contact Details Section */}
        <div>
          <h5>Contact Us:</h5>
          <ul>
            <li><strong>Email:</strong> support@microlending.com</li>
            <li><strong>Phone:</strong> +1 234 567 890</li>
            <li><strong>Address:</strong> 123 Micro Finance Lane, Suite 101, City, Country</li>
          </ul>
        </div>

        {/* Banking Info Section */}
        <div>
          <h5>Banking Information:</h5>
          <ul>
            <li><strong>Account Type:</strong> Savings & Current Accounts</li>
            <li><strong>Bank Hours:</strong> Monday to Friday, 9 AM to 5 PM</li>
            <li><strong>SWIFT Code:</strong> MICLXXXX1234</li>
            <li><strong>IFSC Code:</strong> MICL0001234</li>
            <li><strong>Branch Code:</strong> 00123</li>
          </ul>
        </div>

        {/* Careers Section */}
        <div>
          <h5>Careers</h5>
          <p>
            Join our mission to empower individuals and businesses with financial solutions! We are always looking for passionate and talented individuals to be part of our team.
          </p>
          <ul>
            <li><strong>Email:</strong> careers@microlending.com</li>
            <li><strong>Available Positions:</strong> Loan Officer, Customer Support, Marketing Executive, and more!</li>
            <li><strong>Apply Online:</strong> Visit our <a href="https://www.microlending.com/careers" target="_blank" rel="noopener noreferrer" className="text-light">careers page</a> to explore open positions and submit your application.</li>
          </ul>
        </div>

        {/* Google Map Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.877593450643!2d73.81255727524174!3d18.48920297013151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfdcf97b5d95%3A0x7d7b3c2e67368888!2sCJC%20by%20Kunal%20sir%20(Java%20Python%20Cloud%20and%20Devops)!5e0!3m2!1sen!2sin!4v1734755963062!5m2!1sen!2sin"
          width="400"
          height="350"
          style={{border: 0}}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </footer>
  );
}

export default Footer;
