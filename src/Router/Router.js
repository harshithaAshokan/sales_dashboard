import React from 'react';
import Login from '../Screens/Login/Login/Login.js';
import { AuthPrivate, HomePrivate } from '../Router/PrivateRouter.js';
import { createBrowserRouter } from 'react-router-dom';
import Navbar from '../Screens/Home/Navbar/Navbar.js';
import Dashboard from '../Screens/Home/Dashboard/Dashboard.js';
import Admin from '../Screens/Home/User_Management/Admin/Admin.js';
import Dealer from '../Screens/Home/User_Management/Dealer.js';
import Employee from '../Screens/Home/User_Management/Employee.js';
import Leads from '../Screens/Home/Leads/Leads.js';
import ForgotPassword from '../Screens/Login/ForgotPassword/ForgotPassword.js';
import VerifyOtp from '../Screens/Login/VerifyOTP/VerifyOtp.js';
import ResetPassword from '../Screens/Login/ResetPassword/ResetPassword.js';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthPrivate />,
        children: [
            {
                path: "login",
                element: <Login />,
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
        path: "/",
        element: <HomePrivate />,
        children: [
            {
                path: "/",
                element: <Navbar/>,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard/>,
                    },
                    {
                        path: "admin",
                        element: <Admin/>,
                    },
                    {
                        path: "dealer",
                        element: <Dealer/>
                    },
                    {
                        path: "employee",
                        element: <Employee/>
                    },
                    {
                        path: "lead",
                        element: <Leads/>
                    },

                ]
            }
        ]
    }
]);
