import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';

function CustomerProfileNav({enquiry,setEnquiry}) {

  const navigate = useNavigate();

const [statusColour,setStatusColor]=useState('white');

useEffect(()=>{
console.log(enquiry)
if(enquiry){

    if(enquiry.enquirystatus=='pending')

        {
             setStatusColor('Orange')

        }

        else if(enquiry.enquirystatus=='Approved')

            {

                setStatusColor('Blue')
            }

            else if(enquiry.enquirystatus=='Rejected')

                {
                    setStatusColor('Red')
                    
                }

                




}



},[enquiry])

function  getUpdatedEnquiry()
   {
      axios.get(`http://localhost:8081/enq/get/${enquiry.cid}`)
           .then(res=>{
                    setEnquiry(res.data)
                    sessionStorage.setItem('enquiry',JSON.stringify(res.data))
           }
                  );
   }

   const makeDisable= e=>{
    const status=['Rejected','pending']
    if(status.includes(enquiry.enquirystatus)){
      e.preventDefault();
    }
   
  }


 












  return (
    <div>
<header className='bg-dark text-white p-2 text-start  '>
    <h1 className='fs-5'>Enquiry ID:{enquiry && enquiry.cid}</h1>
    <h1 className='fs-6'  style={{color:statusColour}}>Status:{enquiry && enquiry.enquirystatus}</h1>
    <button className='btn btn-primary btn-sm' onClick={getUpdatedEnquiry}>Reload</button>
     <Link className='btn btn-danger logout-btn float-end' to={'/'}>Logout</Link>
</header>

<nav  className='ms-5 me-5 d-flex'>
<Link className="btn btn-link" to={enquiry ? `/easyfinance/customer/view-enquiry/${enquiry.cid}` : '#'}>View Enquiry</Link>
                <Link className="btn btn-dark" onClick={makeDisable} to={enquiry ? `/easyfinance/customer/loan-apply/${enquiry.cid}` : '#'}>Apply For Loan</Link>
                <Link className="btn btn-link" onClick={makeDisable} to={enquiry ? `/easyfinance/customer/view-loan/${enquiry.cid}` : '#'}>View Loan Application</Link>
                <Link className="btn btn-link" onClick={makeDisable} to={enquiry ? `/easyfinance/customer/view-sanction/${enquiry.cid}` : '#'}>View Sanction</Link>
                <Link className="btn btn-link"  onClick={makeDisable} to={enquiry ? `/easyfinance/customer/pay-emi/${enquiry.cid}` : '#'}>Pay EMI</Link>
                <Link className="btn btn-link" onClick={makeDisable} to={enquiry ? `/easyfinance/customer/emi-history/${enquiry.cid}` : '#'}>EMI History</Link>
    
</nav>
</div>
  )
}

export default CustomerProfileNav