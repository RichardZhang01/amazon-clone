import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { DisplayUser } from "./models/DisplayUser.interface";
import { Jwt } from "./models/Jwt";
import { NewUser } from "./models/NewUser";
import authService from "./services/auth.service";

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt;
  isAuthenticated?: boolean;
}

export const signup = createAsyncThunk(
  "auth/signup",
  async (newUser: NewUser, thunkAPI) => {
    try {
      return await authService.signup(newUser);
    } catch (error) {
      return thunkAPI.rejectWithValue("unable to signup!");
    }
  }
);

const initialState: AuthState = {
  user: null,
  jwt: null,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //  SIGNUP
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth;
}

export default authSlice.reducer;
