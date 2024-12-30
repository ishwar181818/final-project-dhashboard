import EmployeeEnrollment from "../pages/employee/EmployeeEnrollment";
import ViewAllEmployess from "../pages/employee/ViewAllEmployess";
import FeedbackEnquires from "../pages/enquiry/FeedbackEnquires";
import RegisteredEnquiries from "../pages/enquiry/RegisteredEnquiries";
import ViewAllEnquiries from "../pages/enquiry/ViewAllEnquiries";
import OperationDashboard from "../pages/enquiry/OperationDashboard";
import ApprovedEnquires from "../pages/CRM Files/ApprovedEnquires";
import LoanApplicationForm from "../pages/loan-application/LoanApplicationForm";
import CustomerManagerLoanApplicationForm from "../pages/loan-application/CustomerManagerLoanApplicationForm"
import AllLoanApplications from "../pages/loan-application/AllLoanApplications";
import EditLoanApplication from "../pages/loan-application/EditLoanApplication";
import LoanApplication from '../pages/OE Files/LoanApplication';
import CreditManager from "../pages/CreditManager/CreditManager";
import CreditLimitDetails from "../pages/CreditManager/CreditLimitDetails";
import SanctionLetter from "../pages/sanction/SanctionLetter";
import ViewSanctionLetter from "../pages/sanction/ViewSanctionLetter";
import LoanApplicationSanctionedData  from '../pages/Account Head/LoanApplicationSanctionedData';
import LoanDisbursement from "../pages/Account Head/LoanDisbursement";
import ViewLedger from "../pages/Account Head/ViewLedger";
import ViewLedgerHistory from "../pages/Account Head/ViewLedgerHistory";



export const userRoutes=[
    //0 index
    {
      ADMIN:[
        {path:'add-employee' , component:<EmployeeEnrollment/>},
        {path:'view-employee' , component:<ViewAllEmployess/>},
        {path:'View-enquiries' , component:<ViewAllEnquiries/>},
        {path:'employee-enrollment/:userid', component:<EmployeeEnrollment/>},
        {path:'employee-delete/:userid', component:<ViewAllEmployess/>}

        
        ],
       CRM:[
        {path:'view-new-enquiries' ,component:<ViewAllEnquiries/>},
        {path:'view-enquiry-feedback' ,component:<FeedbackEnquires/>},
        {path:'view-approved-enquires', component:<ApprovedEnquires/>},
        {path:'loan-application/:cid', component:<CustomerManagerLoanApplicationForm/>},
        {path:'view-all-loan-applications', component:<AllLoanApplications/>},
        {path:'edit-loan/:customerid', component:<EditLoanApplication/>}
       ],
       OE:[{path:'view-enquiries' ,component:<ViewAllEnquiries/>},
        {path:'view-enquiry' ,component:<OperationDashboard/>},
        {path:'loan-status-verify' ,component:<LoanApplication/>}

       ] ,
       CM:[{path:'loan-application-sanctioning' ,component:<CreditManager/>},
        {path:'credit-limit/:customerid' ,component:<CreditLimitDetails/>},
        {path:'sanction-letter/:customerid' ,component:<SanctionLetter/>},
        {path:'view-sanction-letter/:customerid' ,component:<ViewSanctionLetter/>}


       ],
       AH:[{path:'sanction-letter-Accepted' ,component:<LoanApplicationSanctionedData/>},
        {path:'loan-disbursement/:customerid' ,component:<LoanDisbursement/>},
        {path:'view-ledger-details' ,component:<ViewLedger/>},
        {path:'view-ledger-history/:customerid' ,component:<ViewLedgerHistory/>}

       ] 
    }
] 