import { Navigate, Outlet } from "react-router-dom";

export const AuthPrivate =()=>{
    const userdata = localStorage.getItem("userdata");
    return !userdata ? <Outlet/> :<Navigate to={"/dashboard"}/>
}

export const HomePrivate =()=>{
    const userdata = localStorage.getItem("userdata");
    return userdata ? <Outlet/> :<Navigate to={"/login"} />
}