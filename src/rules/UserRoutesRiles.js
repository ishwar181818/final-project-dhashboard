import EmployeeEnrollment from "../pages/employee/EmployeeEnrollment";
import ViewAllEmployess from "../pages/employee/ViewAllEmployess";
import FeedbackEnquires from "../pages/enquiry/FeedbackEnquires";
import RegisteredEnquiries from "../pages/enquiry/RegisteredEnquiries";
import ViewAllEnquiries from "../pages/enquiry/ViewAllEnquiries";

export const userRoutes=[
    //0 index
    {
      ADMIN:[
        {path:'add-employee' , component:<EmployeeEnrollment/>},
        {path:'view-employee' , component:<ViewAllEmployess/>},
        {path:'View-enquiries' , component:<ViewAllEnquiries/>}
        ],
       CRM:[
        {path:'view-new-enquiries' ,component:<RegisteredEnquiries/>},
        {path:'view-enquiry-feedback' ,component:<FeedbackEnquires/>}
       ],
       OE:[]   
    }
] 