import React, { useState,useEffect } from 'react'
import CustomerProfileNav from '../templates/CustomerProfileNav';
import { Routes ,Route} from 'react-router-dom';
import LoanApplicationForm from '../pages/loan-application/LoanApplicationForm'
import ViewLoanApplication from '../pages/loan-application/ViewLoanApplication';
import ViewSingleEnquiry from '../pages/enquiry/ViewSingleEnquiry';
import SanctionLetter from '../pages/sanction/SanctionLetter';
import ViewSanctionLetter from '../pages/sanction/ViewSanctionLetter';
import Payemi from '../pages/UserEmi/PayEmi';
import EmiHistory from '../pages/UserEmi/EmiHistory';

function CustomerLayout() {

const[loginEnquiry,setLoginEnquiry]=useState();

function  getLoginEnquiry(){

    const enquiryJSON=sessionStorage.getItem('enquiry');
    const enquiry=JSON.parse(enquiryJSON);

    setLoginEnquiry(enquiry);

}

useEffect(getLoginEnquiry,[]);



  return (
    <div>
    <CustomerProfileNav  enquiry={loginEnquiry}  setEnquiry={setLoginEnquiry}/>

    <Routes>

    <Route path="loan-apply/:cid" element={<LoanApplicationForm />} />
    <Route path="view-loan/:cid" element={<ViewLoanApplication/>} />
    <Route path="view-enquiry/:cid" element={<ViewSingleEnquiry/>} />
    <Route path="view-sanction/:cid" element={<ViewSanctionLetter/>} />
    <Route path="pay-emi/:cid" element={<Payemi/>} />
    <Route path="emi-history/:cid" element={<EmiHistory/>} />
                    
    </Routes>

    </div>
  )
}

export default CustomerLayout