import { useSelector } from "react-redux";
import { storeDataProps } from "../type/reducer";

export const useToken =()=>{
    return useSelector((state:storeDataProps) => state.login.token);
    
}

export const useType = () => {
    return localStorage.getItem("userType")
}