import instance from "./axios";

export const loginServices = (data) => {
    return instance.post("/sales_mguru_api/login", data);
};

export const listUsers = (page,size,data) => {
    return instance.post(`sales_mguru_api/user/list_users?page=${page}&size=${size}`, data);

};

export const datacount = (data) => {
    return instance.post("/sales_mguru_api/dashboard/all_data_count",data);
}

export const createuser = (data) => {
    return instance.post("/sales_mguru_api/user/create_user",data)
}

export const deleteuser = (data) => {
    return instance.post("/sales_mguru_api/user/delete_user",data)
}

export const updateuser = (data) => {
    return instance.post("/sales_mguru_api/user/update_user",data)
}

export const viewuser = (data) => {
    return instance.post("/sales_mguru_api/user/view_user",data)
}

export const listLead  = (page,size,data) => {
    return instance.post(`/sales_mguru_api/lead/list_lead?page=${page}&size=${size}`,data)
}

export const createLead = (data) => {
    return instance.post("/sales_mguru_api/lead/create_lead",data)
}

export const dropdownRequirements = (data) => {
    return instance.post("/sales_mguru_api/dropdown/dropdownRequirements",data)
}

export const forgotPassword = (data) => {
    return instance.post("/sales_mguru_api/forgotPassword",data)
}

export const verifyOtp = (data) => {
    return instance.post("/sales_mguru_api/verify_otp",data)
}

export const resetPassword = (data) => {
    return instance.post("/sales_mguru_api/reset_password",data)
}

export const updateLead = (data) => {
    return instance.post("/sales_mguru_api/lead/lead_update",data)
}

export const deleteLead = (data) => {
    return instance.post("/sales_mguru_api/lead/delete_lead",data)
}

export const viewLead = (data) => {
    return instance.post("/sales_mguru_api/lead/view_lead",data)
}

export const listLeadStatus = (data) => {
    return instance.post("/sales_mguru_api/dropdown/dropdownLead",data)
}

export const changeLeadStatus = (data) => {
    return instance.post("/sales_mguru_api/lead/changeLeadStatus",data)
}

export const hotLead = (data) => {
    return instance.post("/sales_mguru_api/lead/hot_lead",data);
}

export const leadReassign = (data) => {
    return instance.post("/sales_mguru_api/lead/lead_reassign",data);
}

export const dealerDropdown = (data) => {
    return instance.post("/sales_mguru_api/dropdown/userDropdown",data);
}

export const employeeDropdown = (data) => {
    return instance.post("/sales_mguru_api/dropdown/employeeDropDown",data)
}

export const resendOtp = (data)=> {
    return instance.post("/sales_mguru_api/resend_otp",data)
}

export const dropdownEnquiry = (data) => {
    return instance.post("/sales_mguru_api/dropdown/dropdownEnquiry",data)
}

export const dropdownCompetitor = (data) => {
    return instance.post("/sales_mguru_api/dropdown/dropdownCompetitor",data)
}

export const listEnquiry = (page,size,data) => {
    return instance.post(`/sales_mguru_api/masters/list_enquiry_type?page=${page}&size=${size}`,data)
}

export const createMasters = (data,value) => {
    return instance.post(`/sales_mguru_api/masters/create_${value}`,data)
}

export const updateMasters = (data,value) => {
    return instance.post(`/sales_mguru_api/masters/update_${value}`,data)
}

export const deleteMasters = (data,value) => {
    return instance.post(`/sales_mguru_api/masters/delete_${value}`,data)
}

export const listRequirements = (page,size,data) => {
    return instance.post(`/sales_mguru_api/masters/list_requirements?page=${page}&size=${size}`,data)
}


export const listCategory = (page,size,data) => {
    return instance.post(`/sales_mguru_api/masters/list_category?page=${page}&size=${size}`,data)
}

