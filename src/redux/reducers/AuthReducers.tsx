import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user_id: null,
  userType: null, 
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
  },
});

export const {
  handleUserId,
  handleUserType,
} = reduc.actions;
export default reduc.reducer;
