import { AuthPrivate, HomePrivate } from './PrivateRouter';
import { createBrowserRouter } from 'react-router-dom';
import Navbar from '../Screens/Home/Navbar/Navbar';
import Dashboard from '../Screens/Home/Dashboard/Dashboard';
import Admin from '../Screens/Home/User_Management/Admin/Admin';
import Dealer from '../Screens/Home/User_Management/Dealer/Dealer';
import Employee from '../Screens/Home/User_Management/Employee/Employee';
import Leads from '../Screens/Home/Leads/Leads';
import ForgotPassword from '../Screens/Login/ForgotPassword/ForgotPassword';
import VerifyOtp from '../Screens/Login/VerifyOTP/VerifyOtp';
import ResetPassword from '../Screens/Login/ResetPassword/ResetPassword';
import Requirements from '../Screens/Home/Masters/Requirements/Requirements';
import Enquiry from '../Screens/Home/Masters/Enquiry/Enquiry';
import Category from '../Screens/Home/Masters/Category/Category';
import LeadsAddModal from '../Screens/Home/Modal/LeadsModals/LeadAddModal';
import Login from '../Screens/Login/Login/Login';
import HomeNew from '../Screens/Home/HomeNew/HomeNew';

const userRoutes = [
    {
        path: "employee",
        element: <Employee/>
    },
    {
        path: "lead",
        element: <Leads/>
    },
   
    {
        path: "leadsAdd",
        element: <LeadsAddModal/>
    },
]
const userType = localStorage.getItem("userType");
if(userType === "2" || userType === "1") 
{
    userRoutes.push({
        path: "admin",
        element: <Admin/>,
    },{
        path: "dealer",
        element: <Dealer/>
    }, {
        path: "requirements",
        element: <Requirements/>
    },
    {
        path: "enquiry",
        element: <Enquiry/>
    },
    {
        path: "category",
        element: <Category/>
    },)
}
export const router = createBrowserRouter([
    {
       
        element: <AuthPrivate />,
        children: [
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "forgotpwd",
                element: <ForgotPassword/>
            },
            {
                path: "verifyotp",
                element:<VerifyOtp/>
            },
            {
                path: "resetpwd",
                element:<ResetPassword/>
            }
        ]
    },
    {
        
        element: <HomePrivate />,
        children: [
            {
                path:"/",
                element: <Navbar/>,
                children: [
                    {
                        path: "dashboard",
                        element: <HomeNew/>,
                    },
                    ...userRoutes,

                ]

            }
        ]
    }
]);
