import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productList: [],
  adminList: [],
  dealerList: [],
  employeeList: [],
  showAddModal: false,
  showDeleteModal: false,
  showUpdateModal: false,
  showIsActiveModal:false,
  user_id: null,
  userType: null,
  leadList: [],
  dealer_ids: [],
  employee_ids:[],
  requirements: [],
  search: {},
  message: "",
  showUpdateStatusModal: false,
  leadStatusList:[],
  reassignlead:false,
  isActive : null,
  enquiryList:null,
  competitorList:null
};
export const reduc = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleProducts: (state, action) => {
      state.productList = action.payload;
    },
    handleAdminList: (state, action) => {
      state.adminList = action.payload;
    },
    handleDealerList: (state, action) => {
      state.dealerList = action.payload;
    },
    handleEmployeeList: (state, action) => {
      state.employeeList = action.payload;
    },
    handleShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
    handleShowDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload;
    },
    handleShowIsActiveModal: (state, action) => {
      state.showIsActiveModal = action.payload;
    },
    handleShowUpdateModal: (state, action) => {
      state.showUpdateModal = action.payload;
    },
    handleUserId: (state, action) => {
      state.user_id = action.payload;
    },
    handleUserType: (state, action) => {
      state.userType = action.payload;
    },
    handleLeadList: (state, action) => {
      state.leadList = action.payload;
    },
    handleDealerId: (state, action) => {
      state.dealer_ids = action.payload;
    },
    handleRequirements: (state, action) => {
      state.requirements = action.payload;
    },
    handleSearch: (state, action) => {
      state.search = action.payload;
    },
    handleMessage: (state, action) => {
      state.message = action.payload;
    },
    handleUpdateStatusModal: (state, action) => {
      state.showUpdateStatusModal = action.payload;
    },
    handleLeadStatusList : (state,action) => {
      state.leadStatusList = action.payload
    },
    handleReassign : (state,action) => {
      state.reassignlead = action.payload
    },
    handleEmployeeId : (state,action) => {
      state.employee_ids = action.payload
    },
    handleIsActive : (state,action) => {
      state.isActive = action.payload
    },
    handleEnquiryList: (state,action) => {
      state.enquiryList = action.payload
    },
    handleCompetitorList: (state,action) => {
      state.competitorList = action.payload
    }
  },
});
export const {
  handleProducts,
  handleAdminList,
  handleDealerList,
  handleEmployeeList,
  handleShowAddModal,
  handleShowDeleteModal,
  handleShowUpdateModal,
  handleUserId,
  handleUserType,
  handleLeadList,
  handleDealerId,
  handleRequirements,
  handleSearch,
  handleMessage,
  handleUpdateStatusModal,
  handleLeadStatusList,
  handleReassign,handleEmployeeId,
  handleShowIsActiveModal,
  handleIsActive,
  handleEnquiryList,
  handleCompetitorList
} = reduc.actions;
export default reduc.reducer;
