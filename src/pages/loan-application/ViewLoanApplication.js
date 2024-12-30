import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewLoanApplication = () => {
  const { cid } = useParams(); // Extract customer ID from URL
  const [loanData, setLoanData] = useState(null); // Store fetched loan data
  const [error, setError] = useState(null); // Store any errors
  
  // Function to convert binary data to base64
  const convertToBase64 = (data) => {

    console.log(data);
    return `data:image/jpeg;base64,${data}`;
  };

  // Fetch the data on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8082/lo/getsingledata/${cid}`)
      .then((response) => {
        setLoanData(response.data); // Set the loan data state
      })
      .catch((err) => {
        console.error("Error fetching loan data:", err);
        setError("Failed to fetch loan data");
      });
  }, [cid]); // Re-run effect when customerid changes

  if (error) {
    return <div>{error}</div>;
  }

  if (!loanData) {
    return <div>Loading...</div>;
  }

  // Render loan data in a table
  return (
    <div className="d-flex justify-content-center">
    <div className="loan-data-table col-lg-8">
           <h3>Loan Application Details</h3>
      <table className="table table-bordered mx-auto">
        <tbody>
          <tr>
            <td>Customer Name</td>
            <td>{loanData.customername}</td>
          </tr>
          <tr>
            <td>Customer Age</td>
            <td>{loanData.customerage}</td>
          </tr>
          <tr>
            <td>Customer Email</td>
            <td>{loanData.customeremail}</td>
          </tr>
          <tr>
            <td>Customer Mobile No</td>
            <td>{loanData.customermobileno}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{loanData.dateofbirth}</td>
          </tr>
          <tr>
            <td>Loan Tenure</td>
            <td>{loanData.requiretenure}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{loanData.customergender}</td>
          </tr>
          <tr>
            <td>Additional Mobile Number</td>
            <td>{loanData.customeradditionalmobileno}</td>
          </tr>
          <tr>
            <td>Amount Paid for Home</td>
            <td>{loanData.amountpaidforhome}</td>
          </tr>
          <tr>
            <td>Total Loan Required</td>
            <td>{loanData.totalloanrequired}</td>
          </tr>
          <tr>
            <td>Loan Status</td>
            <td>{loanData.loanstatus}</td>
          </tr>
          <tr>
            <td>Personal Docs Status</td>
            <td>{loanData.allpersonaldoc?.docstatus}</td>
          </tr>

          {/* Family Information */}
          <tr>
            <td>No. of Family Members</td>
            <td>{loanData.fdo?.nooffamilymember}</td>
          </tr>
          <tr>
            <td>No. of Children</td>
            <td>{loanData.fdo?.noofchild}</td>
          </tr>
          <tr>
            <td>Marital Status</td>
            <td>{loanData.fdo?.martialstatus}</td>
          </tr>
          <tr>
            <td>Dependent Member</td>
            <td>{loanData.fdo?.dependentMember}</td>
          </tr>
          <tr>
            <td>Family Income</td>
            <td>{loanData.fdo?.familyincome}</td>
          </tr>

          {/* Address Information */}
          <tr>
            <td>Permanent Address Area Name</td>
            <td>{loanData.customeraddress?.permanentaddress?.areaname}</td>
          </tr>
          <tr>
            <td>Permanent Address City Name</td>
            <td>{loanData.customeraddress?.permanentaddress?.cityname}</td>
          </tr>
          <tr>
            <td>Permanent Address District</td>
            <td>{loanData.customeraddress?.permanentaddress?.district}</td>
          </tr>
          <tr>
            <td>Permanent Address State</td>
            <td>{loanData.customeraddress?.permanentaddress?.state}</td>
          </tr>
          <tr>
            <td>Permanent Address Pincode</td>
            <td>{loanData.customeraddress?.permanentaddress?.pincode}</td>
          </tr>
          <tr>
            <td>Permanent Address House No</td>
            <td>{loanData.customeraddress?.permanentaddress?.houseno}</td>
          </tr>
          <tr>
            <td>Permanent Address Street Name</td>
            <td>{loanData.customeraddress?.permanentaddress?.streetname}</td>
          </tr>

          {/* Local Address */}
          <tr>
            <td>Local Address Area Name</td>
            <td>{loanData.customeraddress?.localaddress?.areaname}</td>
          </tr>
          <tr>
            <td>Local Address City Name</td>
            <td>{loanData.customeraddress?.localaddress?.cityname}</td>
          </tr>
          <tr>
            <td>Local Address District</td>
            <td>{loanData.customeraddress?.localaddress?.district}</td>
          </tr>
          <tr>
            <td>Local Address State</td>
            <td>{loanData.customeraddress?.localaddress?.state}</td>
          </tr>
          <tr>
            <td>Local Address Pincode</td>
            <td>{loanData.customeraddress?.localaddress?.pincode}</td>
          </tr>
          <tr>
            <td>Local Address House No</td>
            <td>{loanData.customeraddress?.localaddress?.houseno}</td>
          </tr>
          <tr>
            <td>Local Address Street Name</td>
            <td>{loanData.customeraddress?.localaddress?.streetname}</td>
          </tr>

          {/* Upload Documents (now with Base64 conversion) */}
          <tr>
            <td>Address Proof</td>
            <td>{loanData.allpersonaldoc?.addressproof && <img src={loanData.allpersonaldoc.addressproof? convertToBase64(loanData.allpersonaldoc.addressproof) : '#'} alt="Address Proof" style={{ width: '150px', height: 'auto' }} />}</td>
          </tr>
          <tr>
            <td>PAN Card</td>
            <td>{loanData.allpersonaldoc?.pancard && <img src={loanData.allpersonaldoc.pancard ? convertToBase64(loanData.allpersonaldoc.pancard) : '#'} alt="PAN Card"  style={{ width: '150px', height: 'auto' }}/>}</td>
          </tr>
          <tr>
            <td>Income Tax</td>
            <td>{loanData.allpersonaldoc?.incometax && <img src={loanData.allpersonaldoc.incometax ? convertToBase64(loanData.allpersonaldoc.incometax) : '#'} alt="Income Tax" style={{ width: '150px', height: 'auto' }} />}</td>
          </tr>
          <tr>
            <td>Aadhaar Card</td>
            <td>{loanData.allpersonaldoc?.adharcard && <img src={loanData.allpersonaldoc.adharcard ? convertToBase64(loanData.allpersonaldoc.adharcard) : '#'} alt="Aadhaar Card"  style={{ width: '150px', height: 'auto' }}/>}</td>
          </tr>
          <tr>
            <td>Photo</td>
            <td>{loanData.allpersonaldoc?.photo && <img src={loanData.allpersonaldoc.photo ? convertToBase64(loanData.allpersonaldoc.photo) : '#'} alt="Photo" style={{ width: '150px', height: 'auto' }} />}</td>
          </tr>
          <tr>
            <td>Signature</td>
            <td>{loanData.allpersonaldoc?.signature && <img src={loanData.allpersonaldoc.signature ? convertToBase64(loanData.allpersonaldoc.signature) : '#'} alt="Signature"  style={{ width: '150px', height: 'auto' }}/>}</td>
          </tr>
          <tr>
            <td>Cheque</td>
            <td>{loanData.allpersonaldoc?.bankcheque && <img src={loanData.allpersonaldoc.bankcheque ? convertToBase64(loanData.allpersonaldoc.bankcheque) : '#'} alt="Cheque" style={{ width: '150px', height: 'auto' }} />}</td>
          </tr>
          <tr>
            <td>Salary Slip</td>
            <td>{loanData.allpersonaldoc?.salaryslip && <img src={loanData.allpersonaldoc.salaryslip ? convertToBase64(loanData.allpersonaldoc.salaryslip) : '#'} alt="Salary Slip" style={{ width: '150px', height: 'auto' }} />}</td>
          </tr>
          <tr>
            <td>Account Type</td>
            <td>{loanData.ac?.accounttype}</td>
          </tr>
          <tr>
            <td>Account Balance</td>
            <td>{loanData.ac?.accountbalance}</td>
          </tr>
          <tr>
            <td>Account HolderName</td>
            <td>{loanData.ac?.accountholdername}</td>
          </tr>
          <tr>
            <td>AccountStatus</td>
            <td>{loanData.ac?.accountstatus}</td>
          </tr>
          <tr>
            <td>AccountNumber</td>
            <td>{loanData.ac?.accountnumber}</td>
          </tr>
          <tr>
            <td>Gurantor Name</td>
            <td>{loanData.gd?.guarantorname}</td>
          </tr>
          <tr>
            <td>Guarantor Date of Birth</td>
            <td>{loanData.gd?.dateofbirth}</td>
          </tr>
          <tr>
            <td>Guarantor Relationship with Customer</td>
            <td>{loanData.gd?.relationshipwithcustomer}</td>
          </tr>
          <tr>
            <td>Guarantor Mobile No</td>
            <td>{loanData.gd?.mobileno}</td>
          </tr>
          <tr>
            <td>Guarantor gurantoradharcardno</td>
            <td>{loanData.gd?.gurantoradharcardno}</td>
          </tr>
          <tr>
            <td>Guarantor Mortage Details</td>
            <td>{loanData.gd?.jobdetails}</td>
          </tr>
          
          <tr>
            <td>Guarantor localaddress </td>
            <td>{loanData.gd?.localaddress}</td>
          </tr>
          <tr>
            <td>Guarantor permanentAddress</td>
            <td>{loanData.gd?.permanantaddress}</td>
          </tr>
          <tr>
            <td>Verification Status</td>
            <td>{loanData.cv?.customerverificationstatus}</td>
          </tr>

          <tr>
            <td>Verification Date</td>
            <td>{loanData.cv?.verificationdate}</td>
          </tr>

          <tr>
            <td>Remarks</td>
            <td>{loanData.cv.remarks}</td>
          </tr>

        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ViewLoanApplication;
