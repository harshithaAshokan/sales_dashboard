import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showAddModal: false,
  showDeleteModal: false,
  showUpdateModal: false,
  showIsActiveModal:false,
  user_id: null,
  userType: null,
  search: {},
  showUpdateStatusModal: false,
  reassignlead:false,
  requirementsList:[],
  enquiryListData:[],
  categoryList:[]
};
export const reduc = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
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
    
    handleSearch: (state, action) => {
      state.search = action.payload;
    },
    handleUpdateStatusModal: (state, action) => {
      state.showUpdateStatusModal = action.payload;
    },
    
    handleReassign : (state,action) => {
      state.reassignlead = action.payload
    },
    handleEmployeeId : (state,action) => {
      state.employee_ids = action.payload
    },
    handleRequirementsList: (state,action) => {
      state.requirementsList = action.payload
    },
    handleCategoryList: (state,action) => {
      state.categoryList = action.payload
    },
    handleEnquiryListData: (state,action) => {
      state.enquiryListData = action.payload
    },

  },
});
export const {
  handleShowAddModal,
  handleShowDeleteModal,
  handleShowUpdateModal,
  handleUserId,
  handleUserType,
  handleSearch,
  handleUpdateStatusModal,
  handleReassign,
  handleShowIsActiveModal,
  handleRequirementsList,
  handleCategoryList,
  handleEnquiryListData
} = reduc.actions;
export default reduc.reducer;
