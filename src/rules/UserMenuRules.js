const prefix='/easyfinance/';


export const userMenus=[
    //0 index
     {
     ADMIN:[
         {url:`${prefix}add-employee` , label:'Add Employee'},
         {url:`${prefix}view-employee` , label:'View Employee'},
         {url:`${prefix}View-enquiries`, label:'View Enquiries'},
         {url:`${prefix}admin-dashboard`, label:'Admin Dashboard'}

     ],
     CRM:[
         {url:`${prefix}view-new-enquiries`, label:'Registerd Enquiries'},
         {url:`${prefix}view-enquiry-feedback`, label:'Feedback Enquiries'},
         {url:`${prefix}view-approved-enquires`, label:'Approved Enquires/Apply for Loan'},
         {url:`${prefix}view-all-loan-applications`, label:'All Loan Applications'}
         
     ],
     OE:[{url:`${prefix}view-enquiries`, label:'View Enquires'},
        {url:`${prefix}view-enquiry`, label:'View All Enquires'},
        {url:`${prefix}loan-status-verify`, label:'Loan Application Status Update'}

     ],
     CM:[{url:`${prefix}loan-application-sanctioning`, label:'Loan Application Sanctioning'}],
     AH:[{url:`${prefix}sanction-letter-Accepted`, label:'Loan Application Sanction letter Accepted'},
        {url:`${prefix}view-ledger-details`, label:'View Ledger Details'}
        
        
     ]
     
 } 
 ]