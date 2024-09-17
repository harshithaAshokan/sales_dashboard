import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user_id: null,
  userType: null,
  requirementsList: [],
  enquiryListData: [],
  categoryList: [],
};
export const reduc = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleUserId: (state, action) => {
      state.user_id = action.payload;
    },
    handleUserType: (state, action) => {
      state.userType = action.payload;
    },
    handleRequirementsList: (state, action) => {
      state.requirementsList = action.payload;
    },
    handleCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    handleEnquiryListData: (state, action) => {
      state.enquiryListData = action.payload;
    },
  },
});
export const {
  handleUserId,
  handleUserType,
  handleRequirementsList,
  handleCategoryList,
  handleEnquiryListData,
} = reduc.actions;
export default reduc.reducer;
