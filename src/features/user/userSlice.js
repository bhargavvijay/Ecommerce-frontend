import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders,updateUser,fetchLoggedInUser } from './userAPI';
const initialState = {
  status: 'idle',
  userInfo: null,
  userInfoLoaded:false,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (updated) => {
    const response = await updateUser(updated);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo=action.payload
        state.userInfoLoaded=true
      })
      .addCase(updateUserAsync.rejected,(state)=>{
        state.status='idle';
        state.userInfoLoaded=true
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      });
  },
});
export const selectUserOrders = (state)=>state.user.userInfo.orders;

export const selectUserInfoLoded=(state)=>state.user.userInfoLoaded;

export const selectUserInfo = (state)=>state.user.userInfo;

export const { increment } = userSlice.actions;

export default userSlice.reducer;