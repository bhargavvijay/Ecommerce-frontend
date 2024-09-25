import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, createUser, signOut, checkAuth, resetPasswordRequest, resetPassword, emailVerification } from './authAPI';

const initialState = {
  loggedInUserToken: null,
  allInfoUser: null,
  status: 'idle',
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false,
  emailVerified: false,
};

export const resetPasswordRequestAsync = createAsyncThunk(
  'user/resetPasswordRequest',
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const EmailVerificationAsync = createAsyncThunk(
  'user/emailVerification',
  async (data, { rejectWithValue }) => {
    try {
      const response = await emailVerification(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    return response.data;
  }
);

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
      console.log(error);
    }
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
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload.token;
        state.allInfoUser = action.payload.user;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload.token;
        state.allInfoUser = action.payload.userWithoutSensitiveInfo;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
        state.allInfoUser = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.allInfoUser = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.status = 'idle';
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(EmailVerificationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(EmailVerificationAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.emailVerified = true;
      })
      .addCase(EmailVerificationAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.user.loggedInUserToken;

export const selectAllUserInfo = (state) => state.user.allInfoUser;

export const selectUserChecked = (state) => state.user.userChecked;

export const selectError = (state) => state.user.error;

export const selectMailSent = (state) => state.user.mailSent;

export const selectPasswordReset = (state) => state.user.passwordReset;

export const selectEmailVerified = (state) => state.user.emailVerified;

export default userSlice.reducer;