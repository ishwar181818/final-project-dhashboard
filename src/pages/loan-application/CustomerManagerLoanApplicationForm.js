import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

const LoanApplicationForm = () => {
  const { cid } = useParams();
  console.log(`Making API call with CID: ${cid}`);
  const { register, handleSubmit, setValue, watch } = useForm();
  const [currentStep, setCurrentStep] = useState(1); // Track current step
  const [isLocalAddressSame, setIsLocalAddressSame] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/enq/get/${cid}`)
      .then((response) => {
        const enquiryData = response.data;

        // Auto-fill fields using the fetched enquiry data
        setValue("customername", `${enquiryData.firstname} ${enquiryData.lastname}`);
        setValue("customerage", enquiryData.age);
        setValue("customeremail", enquiryData.email);
        setValue("customermobileno", enquiryData.mobileno);
      })
      .catch((error) => {
        console.error("Error fetching enquiry data:", error);
      });
  }, [cid, setValue]);

  const handleLocalAddressCheck = () => {
    const permanentAddress = watch("customeraddress.permanentaddress");
    if (isLocalAddressSame && permanentAddress) {
      setValue("customeraddress.localaddress.areaname", permanentAddress?.areaname || "");
      setValue("customeraddress.localaddress.cityname", permanentAddress?.cityname || "");
      setValue("customeraddress.localaddress.district", permanentAddress?.district || "");
      setValue("customeraddress.localaddress.state", permanentAddress?.state || "");
      setValue("customeraddress.localaddress.pincode", permanentAddress?.pincode || "");
      setValue("customeraddress.localaddress.houseno", permanentAddress?.houseno || "");
      setValue("customeraddress.localaddress.streetname", permanentAddress?.streetname || "");
    } else {
      // Clear local address if not same
      setValue("customeraddress.localaddress", {});
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    const formSubmitData = new FormData();

    formSubmitData.append("info", JSON.stringify(data));

    // Add files if they exist
    ["addressproof", "pan", "incometax", "addhar", "photo", "sign", "cheque", "slip"].forEach((field) => {
      if (data[field] && data[field][0]) formSubmitData.append(field, data[field][0]);
    });

    axios
      .post("http://localhost:8082/lo/loan", formSubmitData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Loan Application submitted successfully");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        alert("Failed to submit the loan application");
      });
  };

  // Move to next step
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  // Move to previous step
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="loan-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="table table-bordered">
          {currentStep === 1 && (
            <tbody>
              <tr>
                <td colSpan="2"><h3>Step 1: Personal Details</h3></td>
              </tr>
              <tr>
                <td>Customer Name</td>
                <td>
                  <input type="text" className="form-control" {...register("customername", { required: true })} />
                </td>
              </tr>
              <tr>
                <td>Customer Age</td>
                <td>
                  <input type="number" className="form-control" {...register("customerage", { required: true })} />
                </td>
              </tr>
              <tr>
                <td>Customer Email</td>
                <td>
                  <input type="email" className="form-control" {...register("customeremail", { required: true })} />
                </td>
              </tr>
              <tr>
                <td>Customer Mobile No</td>
                <td>
                  <input type="number" className="form-control" {...register("customermobileno", { required: true })} />
                </td>
              </tr>
              <tr>
              <td>Date of Birth</td>
              <td>
                <input
                  type="date"
                  className="form-control"
                  {...register("dateofbirth", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Loan Tenure</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("requiretenure", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customergender", { required: true })}
                />
              </td>
            </tr>

            

            <tr>
              <td>Additional Mobile Number</td>
              <td>
                <input
                  type="tel"
                  className="form-control"
                  {...register("customeradditionalmobileno", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Amount Paid for Home</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("amountpaidforhome", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Total Loan Required</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("totalloanrequired", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Loan Status</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("loanstatus", { required: true })}
                />
              </td>
            </tr>

            {/* Personal Docs */}
            <tr>
              <td>Personal Docs Status</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("allpersonaldoc.docstatus", { required: true })}
                />
              </td>
            </tr>

              <tr>
                
                <td colSpan="2">
                  <button type="button" onClick={nextStep}>Next</button>
                </td>
              </tr>
            </tbody>
          )}

          {currentStep === 2 && (
            <tbody>
              <tr>
                <td colSpan="2"><h3>Step 2: Family Information</h3></td>
              </tr>
              
              <tr>
              <td>No. of Family Members</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("fdo.nooffamilymember", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>No. of Children</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("fdo.noofchild", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Marital Status</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("fdo.martialstatus", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Dependent Member</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("fdo.dependentMember", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Family Income</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("fdo.familyincome", { required: true })}
                />
              </td>
            </tr>
              
              
              
              <tr>
                <td colSpan="2">
                  <button type="button" onClick={prevStep}>Back</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </td>
              </tr>
            </tbody>
          )}

          {currentStep === 3 && (
            <tbody>
              <tr>
                <td colSpan="2"><h3>Step 3: Address Details</h3></td>
              </tr>
              <tr>
              <td>Permanent Address Area Name</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customeraddress.permanentaddress.areaname", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Permanent Address City Name</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customeraddress.permanentaddress.cityname", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Permanent Address District</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customeraddress.permanentaddress.district", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Permanent Address State</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customeraddress.permanentaddress.state", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Permanent Address Pincode</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("customeraddress.permanentaddress.pincode", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Permanent Address House No</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("customeraddress.permanentaddress.houseno", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Permanent Address Street Name</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customeraddress.permanentaddress.streetname", { required: true })}
                />
              </td>
            </tr>
             {/* Local Address - Copy from Permanent Address */}
             <tr>
              <td>Is Local Address Same as Permanent Address?</td>
              <td>
                <input
                  type="checkbox"
                  checked={isLocalAddressSame}
                  onChange={() => {
                    setIsLocalAddressSame(!isLocalAddressSame);
                    handleLocalAddressCheck();
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Local Address Area Name</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customeraddress.localaddress.areaname", { required: true })}
                  disabled={isLocalAddressSame}
                />
              </td>
            </tr>
            <tr>
              <td>Local Address City Name</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customeraddress.localaddress.cityname", { required: true })}
                  disabled={isLocalAddressSame}
                />
              </td>
            </tr>
            <tr>
              <td>Local Address District</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customeraddress.localaddress.district", { required: true })}
                  disabled={isLocalAddressSame}
                />
              </td>
            </tr>
            <tr>
              <td>Local Address State</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customeraddress.localaddress.state", { required: true })}
                  disabled={isLocalAddressSame}
                />
              </td>
            </tr>
            <tr>
              <td>Local Address Pincode</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("customeraddress.localaddress.pincode", { required: true })}
                  disabled={isLocalAddressSame}
                />
              </td>
            </tr>
            <tr>
              <td>Local Address houseno</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("customeraddress.localaddress.houseno", { required: true })}
                  disabled={isLocalAddressSame}
                />
              </td>
            </tr>
            <tr>
              <td>Local Address StreetName</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("customeraddress.localaddress.streetname", { required: true })}
                  disabled={isLocalAddressSame}
                />
              </td>
            </tr>
             
              <tr>
                <td colSpan="2">
                  <button type="button" onClick={prevStep}>Back</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </td>
              </tr>
            </tbody>
          )}

          {currentStep === 4 && (
            <tbody>
              <tr>
                <td colSpan="2"><h3>Step 4: Upload Documents</h3></td>
              </tr>
              <tr>
              <td>Address Proof</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  {...register("addressproof", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>PAN Card</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  {...register("pan", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Income Tax</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  {...register("incometax", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Aadhaar Card</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  {...register("addhar", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Photo</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  {...register("photo", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Signature</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  {...register("sign", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Cheque</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  {...register("cheque", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Salary Slip</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  {...register("slip", { required: true })}
                />
              </td>
            </tr>
              <tr>
                <td colSpan="2">
                  <button type="button" onClick={prevStep}>Back</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </td>
              </tr>
            </tbody>
          )}
          
          {currentStep === 5 && (
            <tbody>
              <tr>
                <td colSpan="2"><h3>Step 5: Account Details</h3></td>
              </tr>
              <tr>
              <td>Account Type</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("ac.accounttype", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Account Balance</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("ac.accountbalance", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Account HolderName</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("ac.accountholdername", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td> AccountStatus</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("ac.accountstatus", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>AccountNumber</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("ac.accountnumber", { required: true })}
                />
              </td>
            </tr>
             
              <tr>
                <td colSpan="2">
                  <button type="button" onClick={prevStep}>Back</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </td>
              </tr>
            </tbody>
          )}

{currentStep === 6 && (
            <tbody>
              <tr>
                <td colSpan="2"><h3>Step 6: Gurantor Details</h3></td>
              </tr>
              <tr>
              <td>Guarantor Name</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("gd.guarantorname", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Guarantor Date of Birth</td>
              <td>
                <input
                  type="date"
                  className="form-control"
                  {...register("gd.dateofbirth", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Guarantor RelationshipwithCustomer</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("gd.relationshipwithcustomer", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Guarantor Mobile No</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("gd.mobileno", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Guarantor gurantoradharcardno</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  {...register("gd.gurantoradharcardno", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Guarantor Mortage Details</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("gd.mortgagedetails", { required: true })}
                />
              </td>
            </tr>
            
            <tr>
              <td>Guarantor Job Details</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("gd.jobdetails", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Guarantor localaddress </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("gd.localaddress", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td>Guarantor permanentAddress </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("gd.permanantaddress", { required: true })}
                />
              </td>
            </tr>

            
             
              <tr>
                <td colSpan="2">
                  <button type="button" onClick={prevStep}>Back</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </td>
              </tr>
            </tbody>
          )}

{currentStep === 7 && (
            <tbody>
              <tr>
                <td colSpan="2"><h3>Step 7:Customer Verification</h3></td>
              </tr>
              <tr>
              <td>Verification Status</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  {...register("cv.customerverificationstatus", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Verification Date</td>
              <td>
                <input
                  type="date"
                  className="form-control"
                  {...register("cv.verificationdate", { required: true })}
                />
              </td>
            </tr>

            <tr>
              <td>Remarks</td>
              <td>
                <textarea
                  className="form-control"
                  {...register("cv.remarks", { required: true })}
                />
              </td>
            </tr>
             
              <tr>
                <td colSpan="2">
                  <button type="button" onClick={prevStep}>Back</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </td>
              </tr>
            </tbody>
          )}


          {currentStep === 8 && (
            <tbody>
              <tr>
                <td colSpan="2"><h3>Step 8: Final Confirmation</h3></td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={prevStep}>Back</button>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
