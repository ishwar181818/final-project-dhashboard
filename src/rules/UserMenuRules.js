const prefix='/easyfinance/';


export const userMenus=[
    //0 index
     {
     ADMIN:[
         {url:`${prefix}add-employee` , label:'Add Employee'},
         {url:`${prefix}view-employee` , label:'View Employee'},
         {url:`${prefix}View-enquiries`, label:'View Enquiries'}   
     ],
     CRM:[
         {url:`${prefix}view-new-enquiries`, label:'Registerd Enquiries'},
         {url:`${prefix}view-enquiry-feedback`, label:'Feedback Enquiries'}
     ],
     OE:[],
     
 } 
 ]